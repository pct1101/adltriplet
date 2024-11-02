<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    // Phương thức lấy tất cả feedback
    public function index()
    {
        // Lấy tất cả feedback từ bảng feedback
        $feedback = Feedback::all();

        // Trả về dữ liệu feedback dưới dạng JSON
        return response()->json($feedback);
    }
    // Phương thức tạo feedback
    public function store(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5', // Rating từ 1-5
            'car_id' => 'required|exists:car,car_id' // Đảm bảo car_id tồn tại trong bảng car
        ]);

        // Kiểm tra lỗi xác thực
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        // Lấy ID của người dùng đang đăng nhập
        $userId = Auth::id();

        // Tạo feedback mới
        $feedback = Feedback::create([
            'content' => $request->input('content'),
            'rating' => $request->input('rating'),
            'feedback_date' => now(), // Lấy ngày hiện tại
            'car_id' => $request->input('car_id'),
            'user_id' => $userId // Gán user_id là ID của người dùng đang đăng nhập
        ]);

        // Trả về phản hồi thành công
        return response()->json(['message' => 'Feedback created successfully!', 'feedback' => $feedback], 201);
    }

    // Phương thức lấy 1 feedback
    public function show($id)
    {
        // Tìm feedback theo feedback_id
        $feedback = Feedback::find($id);

        // Kiểm tra xem feedback có tồn tại không
        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found.'], 404);
        }

        // Trả về chi tiết feedback
        return response()->json($feedback, 200);
    }

    // Phương thức cập nhật feedback
    public function update(Request $request, $id)
    {
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'content' => 'sometimes|required|string',
            'rating' => 'sometimes|required|integer|min:1|max:5',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        // Chỉ cập nhật nếu có giá trị mới từ yêu cầu
        if ($request->has('content')) {
            $feedback->content = $request->input('content');
        }

        if ($request->has('rating')) {
            $feedback->rating = $request->input('rating');
        }

        // Lưu lại thông tin feedback
        $feedback->save();

        return response()->json(['message' => 'Feedback updated successfully!', 'feedback' => $feedback]);
    }

    // Phương thức xóa feedback
    public function destroy($id)
    {
        // Tìm feedback theo feedback_id
        $feedback = Feedback::where('id', $id)->first();

        // Kiểm tra xem feedback có tồn tại hay không
        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found.'], 404);
        }

        // Xóa feedback
        $feedback->delete();

        return response()->json(['message' => 'Feedback deleted successfully.']);
    }
}
