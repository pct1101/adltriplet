<?php

namespace App\Http\Controllers\ApiAdmin;

use Exception;
use App\Models\Feedback;
use App\Http\Controllers\Controller;
use App\Http\Requests\FeedbackRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class FeedbackController extends Controller
{
    // Phương thức lấy tất cả feedback
    public function index()
    {
        try {
            $feedbacks = Feedback::with('car','user')->get();
            if ($feedbacks->isEmpty()) {
                return $this->errorResponse("Không có feedback nào", 404);
            }
            return $this->successResponse("Lấy danh sách feedback", $feedbacks, 200);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    // Phương thức lấy 1 feedback
    public function show($id)
    {
        try {
            $feedback = Feedback::find($id);
            if (!$feedback) {
                return $this->errorResponse("Không tìm thấy feedback với ID: $id", 404);
            }
            return $this->successResponse("Lấy feedback với ID: $id", $feedback, 200);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    // Phương thức tạo feedback
    public function store(Request $request)
    {
        try {
            $feedbackRequest = new FeedbackRequest($request->all());
            $validatedData = $feedbackRequest->validate();
            $feedback = Feedback::create($validatedData);
            return $this->successResponse("Thêm feedback với ID: $feedback->id", $feedback, 201);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }


    // Phương thức cập nhật feedback
    public function update(Request $request, $id)
    {
        try {
            $feedback = Feedback::findOrFail($id);
            $feedbackRequest = new FeedbackRequest($request->all());
            $validatedData = $feedbackRequest->validate();
            $feedback->update($validatedData);
            return $this->successResponse("Cập nhật feedback với ID: $id thành công", $feedback, 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy feedback với ID: $id", 404);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    // Phương thức xóa feedback
    public function destroy($id)
    {
        try {
            $feedback = Feedback::findOrFail($id);
            $feedback->delete();
            return $this->successResponse("Xóa feedback với ID: $id", null, 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy feedback với ID: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
