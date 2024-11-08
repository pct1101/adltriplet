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

        $numberOfDays = (int)$numberOfDays;
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
        // Xác thực đầu vào
        $request->validate([
            'user_id' => 'required|exists:users,id', // Kiểm tra user_id
            'car_id' => 'sometimes|exists:car,car_id', // Kiểm tra car_id nếu có thay đổi
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date', // Đảm bảo end_date phải sau start_date
            'address' => 'nullable|string',  // Địa chỉ có thể để trống
            'city' => 'nullable|string',     // Thành phố có thể để trống
            'state' => 'nullable|string',    // Tình trạng có thể để trống
            'voucher_id' => 'nullable|exists:voucher,voucher_id', // Kiểm tra voucher nếu có
        ]);

        // Tìm booking theo booking_id
        $booking = Booking::find($id);

        // Kiểm tra xem booking có tồn tại không
        if (!$booking) {
            return response()->json(['message' => 'Booking not found.'], 404);
        }

        // Kiểm tra xung đột thời gian booking cho người dùng
        $conflictUserBooking = Booking::where('user_id', $request->user_id)
            ->where('booking_status', 1) // Chỉ kiểm tra các đơn hàng đang hoạt động
            ->where('booking_id', '!=', $booking->booking_id)
            ->where(function ($query) use ($request, $booking) {
                // Kiểm tra trùng lịch trong khoảng thời gian
                $query->whereBetween('start_date', [$request->start_date ?? $booking->start_date, $request->end_date ?? $booking->end_date])
                    ->orWhereBetween('end_date', [$request->start_date ?? $booking->start_date, $request->end_date ?? $booking->end_date])
                    ->orWhere(function ($q) use ($request, $booking) {
                        $q->where('start_date', '<=', $request->start_date ?? $booking->start_date)
                            ->where('end_date', '>=', $request->end_date ?? $booking->end_date);
                    });
            })
            ->exists();

        // Kiểm tra xem xe đã được đặt trong khoảng thời gian này chưa
        $conflictCarBooking = Booking::where('car_id', $request->car_id ?? $booking->car_id)
            ->where('booking_status', 1) // Chỉ kiểm tra các đơn hàng đang hoạt động
            ->where('booking_id', '!=', $booking->booking_id) // Loại trừ booking hiện tại
            ->where(function ($query) use ($request, $booking) {
                // Kiểm tra trùng lịch trong khoảng thời gian
                $query->whereBetween('start_date', [$request->start_date ?? $booking->start_date, $request->end_date ?? $booking->end_date])
                    ->orWhereBetween('end_date', [$request->start_date ?? $booking->start_date, $request->end_date ?? $booking->end_date])
                    ->orWhere(function ($q) use ($request, $booking) {
                        $q->where('start_date', '<=', $request->start_date ?? $booking->start_date)
                            ->where('end_date', '>=', $request->end_date ?? $booking->end_date);
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

        // Cập nhật thông tin booking, giữ nguyên thông tin cũ nếu không có thay đổi
        $booking->car_id = $request->car_id ?? $booking->car_id;
        $booking->user_id = $request->user_id ?? $booking->user_id;
        $booking->start_date = $request->start_date ?? $booking->start_date;
        $booking->end_date = $request->end_date ?? $booking->end_date;
        $booking->address = $request->address ?? $booking->address;
        $booking->city = $request->city ?? $booking->city;
        $booking->state = $request->state ?? $booking->state;
        $booking->voucher_id = $request->voucher_id ?? $booking->voucher_id;

        // Nếu có thay đổi về ngày, tính lại tổng chi phí
        if ($request->has('start_date') || $request->has('end_date')) {
            // Tính toán tổng chi phí dựa trên số ngày thuê
            $startDate = \Carbon\Carbon::createFromFormat('Y-m-d', $booking->start_date);
            $endDate = \Carbon\Carbon::createFromFormat('Y-m-d', $booking->end_date);
            $numberOfDays = ($endDate->timestamp - $startDate->timestamp) / (60 * 60 * 24);
            $totalCost = $numberOfDays * $booking->car->rental_price;  // Tính tổng chi phí

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

            $booking->total_cost = $totalCost; // Cập nhật tổng chi phí
        }

        // Lưu thông tin booking
        $booking->save();

        return response()->json(['message' => 'Booking updated successfully!', 'booking' => $booking], 200);
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
}
