<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Car;
use App\Models\Voucher;


class BookingController extends Controller
{
    // Lấy tất cả booking
    public function index()
    {

        $bookings = Booking::with('car')->get();
        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        // Xác thực đầu vào
        $request->validate([
            'user_id' => 'required|exists:users,id', // Kiểm tra user_id phải tồn tại trong bảng users
            'car_id' => 'required|exists:car,car_id', // Kiểm tra car_id phải tồn tại trong bảng car
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date', // Đảm bảo end_date phải sau start_date
            'address' => 'nullable|string',  // Địa chỉ có thể để trống
            'city' => 'nullable|string',     // Thành phố có thể để trống
            'state' => 'nullable|string',    // Tình trạng có thể để trống
            'voucher_id' => 'nullable|exists:voucher,voucher_id', // Kiểm tra voucher nếu có
        ]);

        // Lấy ID người dùng từ yêu cầu
        $userId = $request->user_id;

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
        $startDate = \Carbon\Carbon::createFromFormat('Y-m-d', $request->start_date);
        $endDate = \Carbon\Carbon::createFromFormat('Y-m-d', $request->end_date);
        $numberOfDays = ($endDate->timestamp - $startDate->timestamp) / (60 * 60 * 24);

        $numberOfDays = (int) $numberOfDays;
        $totalCost = $numberOfDays * $car->rental_price;  // Tính tổng chi phí

        // Nếu có voucher, áp dụng chiết khấu
        if ($request->has('voucher_id')) {
            $voucher = Voucher::find($request->voucher_id);
            if ($voucher && $voucher->expiration_date > now()) {
                $discount = $totalCost * ($voucher->discount_percentage / 100);
                $totalCost -= $discount; // Trừ phần chiết khấu vào tổng chi phí
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
            'total_cost' => $totalCost, // Lưu tổng chi phí sau khi trừ chiết khấu (nếu có)
            'booking_status' => 1, // Đặt trạng thái mặc định là pending
            'address' => $request->address, // Lưu địa chỉ
            'city' => $request->city, // Lưu city
            'state' => $request->state, // Lưu state
            'voucher_id' => $request->voucher_id, // Lưu voucher_id nếu có
        ]);

        return response()->json(['message' => 'Booking thành công', 'booking' => $booking], 201);
    }

    public function show($id)
    {
        // Lấy thông tin booking theo booking_id
        $booking = Booking::with(['car', 'user']) // Giả sử bạn đã định nghĩa quan hệ trong model
            ->where('booking_id', $id)
            ->first();

        // Kiểm tra xem booking có tồn tại không
        if (!$booking) {
            return response()->json(['message' => 'Booking not found.'], 404);
        }

        return response()->json(['booking' => $booking], 200);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'booking_status' => 'required|integer',
        ]);
        $booking = Booking::findOrFail($id);

        if (!$booking) {
            return response()->json([
                'message' => 'không tìm thấy booking',
            ], 404);
        }

        $booking->booking_status = $validatedData['booking_status'];

        $booking->save();

        return response()->json([
            'message' => 'Cập nhật thành công'
        ], 200);
    }

    public function destroy($id)
    {
        // Tìm booking theo booking_id
        $booking = Booking::find($id);

        // Kiểm tra xem booking có tồn tại không
        if (!$booking) {
            return response()->json(['message' => 'Booking not found.'], 404);
        }

        // Kiểm tra trạng thái của booking nếu cần (ví dụ: chỉ cho phép xóa booking chưa được xác nhận)
        // if ($booking->booking_status !== 'pending') {
        //     return response()->json(['message' => 'Only pending bookings can be deleted.'], 400);
        // }

        // Xóa booking
        $booking->delete();

        return response()->json(['message' => 'Booking deleted successfully.'], 200);
    }

    public function cancelByAdmin(Request $request, $id)
    {
        $request->validate([
            'cancel_reason' => 'required|string|max:255', // Lý do hủy bắt buộc
        ]);

        // Lấy booking dựa trên ID
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Không tìm thấy booking'], 404);
        }

        // Cập nhật trạng thái booking thành hủy
        $booking->booking_status = 5; // -1 = Hủy do admin
        $booking->cancel_reason = $request->cancel_reason; // Lưu lý do hủy
        $booking->save();

        return response()->json([
            'message' => 'Admin đã hủy booking thành công.',
            'booking' => $booking
        ], 200);
    }
}
