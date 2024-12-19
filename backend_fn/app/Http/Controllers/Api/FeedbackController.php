<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Feedback;
use App\Models\Booking;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        // Lấy tất cả feedback của xe qua ID xe
        $feedback = Feedback::where('car_id', $id)->with('user')->get();

        // Trả về phản hồi dưới dạng JSON
        return response()->json($feedback);
    }


    /**
     * Store a newly created resource in storage.
     */

    // Phản hồi người dùng cho xe đã đặt
    public function store(Request $request, $id)
    {
        $userId = Auth::id(); // Lấy ID của người dùng đang đăng nhập

        // Kiểm tra xem người dùng có đơn nào đã hoàn thành chưa mới được bình luận
        $userBooking = Booking::where('user_id', $userId)
        ->where('car_id', $id)
        ->where('booking_status', 6)->first();

        // Nếu không tìm thấy booking phù hợp trả về lỗi
        if(!$userBooking){
            return response()->json(['message' => 'Chỉ khách hàng đã hoàn thành đặt xe này mới có thể gửi bình luận'], 403);
        }

        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5', // Giả sử đánh giá là số từ 1 đến 5
        ]);

        // Kiểm tra nếu có lỗi trong việc xác thực
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        // Tạo feedback mới
        try {
            $feedback = Feedback::create([
                'content' => $request->content,
                'rating' => $request->rating,
                'feedback_date' => now(), // Lấy thời gian hiện tại
                'car_id' => $id, // ID xe từ URL
                'user_id' => $userId // Gán user_id là ID của người dùng đang đăng nhập
            ]);

            return response()->json(['message' => 'Feedback created successfully!', 'feedback' => $feedback], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create feedback. Please try again.'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $userId = Auth::id(); // Lấy ID của người dùng đang đăng nhập

        // Lấy tất cả feedback của xe qua ID xe
        $feedback = Feedback::where('id', $id)
        ->where('user_id', $userId)
        ->with('user')
        ->get();

        // Trả về phản hồi dưới dạng JSON
        return response()->json($feedback);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Tìm feedback theo feedback_id và user_id
        $feedback = Feedback::where('id', $id)
            ->where('user_id', Auth::id()) // Chỉ cho phép người tạo xóa
            ->first(); // Sử dụng first() để nhận một bản ghi duy nhất

        // Kiểm tra xem feedback có tồn tại hay không
        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found or you do not have permission to delete it.'], 404);
        }

        // Xóa feedback
        $feedback->delete();

        return response()->json(['message' => 'Feedback deleted successfully.'], 200);
    }
}
