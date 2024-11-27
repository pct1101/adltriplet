<?php

namespace App\Http\Controllers\Api;


use App\Models\Booking;
use App\Models\Car;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class BookingController
{
    public function create(Request $request)
    {
        // Xác thực đầu vào
        $request->validate([
            'car_id' => 'required|exists:car,car_id', // Kiểm tra car_id phải tồn tại trong bảng car
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date', // Đảm bảo end_date phải sau start_date
            'address' => 'nullable|string',  // Địa chỉ có thể để trống
            'city' => 'nullable|string',     // Thành phố có thể để trống
            'state' => 'nullable|string',    // Tình trạng có thể để trống
            'voucher_id' => 'nullable|exists:voucher,voucher_id', // Kiểm tra voucher nếu có
        ]);

        // Lấy ID người dùng hiện tại
        $userId = Auth::id();

        // Kiểm tra xung đột thời gian booking cho người dùng
        $conflictUserBooking = Booking::where('user_id', $userId)
            ->where('booking_status', 1) // Chỉ kiểm tra các đơn hàng đang hoạt động
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                    ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('start_date', '<=', $request->start_date)
                            ->where('end_date', '>=', $request->end_date);
                    });
            })
            ->exists();

        // Kiểm tra xem xe đã được đặt trong khoảng thời gian này chưa
        $conflictCarBooking = Booking::where('car_id', $request->car_id)
            ->where('booking_status', 1) // Chỉ kiểm tra các đơn hàng đang hoạt động
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                    ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('start_date', '<=', $request->start_date)
                            ->where('end_date', '>=', $request->end_date);
                    });
            })
            ->exists();

        // Kiểm tra xung đột
        if ($conflictUserBooking) {
            return response()->json(['message' => 'Bạn không thể đặt xe vì bạn đang có đơn'], 400);
        }

        if ($conflictCarBooking) {
            return response()->json(['message' => 'Chiếc xe này đã được đặt trong khoảng thời gian bạn chọn'], 400);
        }

        // Lấy thông tin xe từ bảng car
        $car = Car::findOrFail($request->car_id);

        // Tính toán tổng chi phí dựa trên số ngày thuê
        $startDate = \Carbon\Carbon::createFromFormat('Y-m-d H:i', $request->start_date);
        $endDate = \Carbon\Carbon::createFromFormat('Y-m-d H:i', $request->end_date);
        $numberOfDays = ($endDate->timestamp - $startDate->timestamp) / (60 * 60 * 24);

        $numberOfDays = (int) $numberOfDays;
        $totalCost = $numberOfDays * $car->rental_price;  // Tính tổng chi phí
        $totalCost_after_voucher = $totalCost;
        // Nếu có voucher, áp dụng chiết khấu
        if ($request->has('voucher_id')) {
            $voucher = Voucher::find($request->voucher_id);
            if ($voucher && $voucher->expiration_date > $request->end_date) {
                $discount = $totalCost * ($voucher->discount_percentage / 100);
                $totalCost_after_voucher -= $discount; // Trừ phần chiết khấu vào tổng chi phí
            } else {
                return response()->json(['message' => 'Voucher không hợp lệ hoặc đã hết hạn'], 400);
            }
        }

        // Tạo booking mới
        $booking = Booking::create([
            'user_id' => $userId,
            'car_id' => $request->car_id,
            'booking_date' => now(),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_cost' => $totalCost,
            'booking_status' => 1, // Đặt trạng thái mặc định là pending
            'address' => $request->address, // Lưu địa chỉ
            'city' => $request->city, // Lưu city
            'state' => $request->state, // Lưu state
            'voucher_id' => $request->voucher_id, // Lưu voucher_id nếu có
        ]);

        return response()->json([
            'message' => 'Booking thành công',
            'booking' => $booking,
            'totalCost_after_voucher' => $totalCost_after_voucher, // Trả về số tiền đã tính toán
        ], 201);
    }

    // Danh sách bookings của người dùng
    public function index()
    {
        $userId = Auth::id();
        $bookings = Booking::with('car')->where('user_id', $userId)->get();
        return response()->json($bookings);
    }

    // Chi tiết một booking của người dùng
    public function show($id)
    {
        // Lấy thông tin người dùng hiện tại
        $userId = Auth::id();

        // Tìm booking dựa trên ID và kiểm tra xem nó có thuộc về người dùng hiện tại không
        $booking = Booking::where('booking_id', $id)
            ->where('user_id', $userId) // Chỉ lấy booking của người dùng hiện tại
            ->firstOrFail(); // Trả về 404 nếu không tìm thấy booking

        return response()->json($booking);
    }

    // Cập nhật một booking
    public function update(Request $request, $id)
    {
        // Kiểm tra xem booking có tồn tại không và người dùng có quyền sửa
        $booking = Booking::where('booking_id', $id)
            ->where('user_id', Auth::id()) // Chỉ người tạo mới có quyền hủy
            ->firstOrFail();

        // Kiểm tra trạng thái booking trước khi cập nhật
        if ($booking->booking_status !== 1) {
            return response()->json(['message' => 'Chỉ có thể cập nhật booking đang hoạt động'], 400);
        }

        // Cập nhật trạng thái booking
        $booking->booking_status = 0; // Cập nhật thành trạng thái hủy (0)
        $booking->save();

        return response()->json(['message' => 'Cập nhật booking thành công', 'booking' => $booking], 200);
    }

    public function cancelByUser(Request $request, $id)
    {
        // Xác thực đầu vào
        $request->validate([
            'cancel_reason' => 'required|string|max:255', // Lý do hủy bắt buộc
        ]);
        // Lấy booking dựa trên ID và người dùng hiện tại
        $booking = Booking::where('booking_id', $id)
            ->where('user_id', Auth::id()) // Chỉ cho phép hủy booking của chính họ
            ->where('booking_status', 1) // Chỉ có thể hủy booking đang hoạt động
            ->first();

        if (!$booking) {
            return response()->json(['message' => 'Booking không hợp lệ hoặc không thể hủy'], 400);
        }

        // Cập nhật trạng thái booking thành hủy
        $booking->booking_status = 4; // 0 = Hủy do người dùng
        $booking->cancel_reason = $request->cancel_reason; // Lưu lý do hủy
        $booking->save();

        return response()->json([
            'message' => 'Đã hủy booking thành công.',
            'booking' => $booking
        ], 200);
    }
}
