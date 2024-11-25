<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\Feedback;

class FeedbackRequest
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function validate()
    {
        $this->data['feedback_date'] = $this->data['feedback'] ?? now();
        $validator = Validator::make($this->data, [
            'content' => 'nullable|string|max:255',
            'rating' => 'required|integer|between:1,5',
            'feedback_date' => 'required|date',
            'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:car,car_id',
        ], [
            'content.string' => 'Nội dung phân hồi phải là chuỗi.',
            'content.max' => 'Nội dung phản hồi không được vượt quá 255 ký tự.',
            'rating.required' => 'Đánh giá là bắt buộc.',
            'rating.integer' => 'Đánh giá phải là một số nguyên.',
            'rating.between' => 'Đánh giá phải từ 1 đến 5.',
            'feedback_date.required' => 'Ngày phản hồi là bắt buộc.',
            'feedback_date.date' => 'Ngày phản hồi phải là một ngày hợp lệ.',
            'user_id.required' => 'User ID là bắt buộc.',
            'user_id.exists' => 'User không tồn tại.',
            'car_id.required' => 'Car ID là bắt buộc.',
            'car_id.exists' => 'Xe không tồn tại.',
        ]);

        // Nếu dữ liệu không hợp lệ, ném ValidationException
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
