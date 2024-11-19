<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
use App\Models\DriverLicenses;



class DriverLicenseRequest
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function validate()
    {
        $validator = Validator::make($this->data, [
            'license_number' => 'required|string|max:255',
            'license_holder' => 'required|string|max:255',
            'license_type' => 'nullable|in:B2,C,D,E',
            'license_image' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'license_status' => 'nullable|in:active,inactive',
            'issue_date' => 'nullable|date',
            'expiry_date' => 'nullable|date|after:issue_date',
            'issued_by' => 'nullable|string|max:255',
        ], [
            'license_number.required' => 'Số giấy phép là bắt buộc',
            'license_number.string' => 'Số giấy phép phải là một chuỗi ký tự hợp lệ',
            'license_number.max' => 'Số giấy phép không được vượt quá 255 ký tự',
            'license_holder.required' => 'Tên người sở hữu giấy phép là bắt buộc',
            'license_holder.string' => 'Tên người sở hữu giấy phép phải là một chuỗi ký tự hợp lệ',
            'license_holder.max' => 'Tên người sở hữu giấy phép không được vượt quá 255 ký tự',
            'license_type.in' => 'Loại giấy phép không hợp lệ. Chỉ chấp nhận các giá trị: B2, C, D, E',
            'license_image.required' => 'Ảnh giấy phép là bắt buộc',
            'license_image.file' => 'Ảnh giấy phép phải là một tệp hợp lệ',
            'license_image.mimes' => 'Ảnh giấy phép chỉ chấp nhận các định dạng: jpeg, png, jpg, gif, svg',
            'license_image.max' => 'Dung lượng ảnh giấy phép không được vượt quá 2MB',
            'license_status.in' => 'Trạng thái giấy phép không hợp lệ. Chỉ chấp nhận: active hoặc inactive',
            'issue_date.date' => 'Ngày cấp phải là một ngày hợp lệ',
            'expiry_date.date' => 'Ngày hết hạn phải là một ngày hợp lệ',
            'expiry_date.after' => 'Ngày hết hạn phải sau ngày cấp',
            'issued_by.string' => 'Cơ quan cấp giấy phép phải là một chuỗi ký tự hợp lệ',
            'issued_by.max' => 'Cơ quan cấp giấy phép không được vượt quá 255 ký tự',
        ]);

        // Kiểm tra lỗi validation trước
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Trả về dữ liệu hợp lệ
        return $validator->validated();
    }
}
