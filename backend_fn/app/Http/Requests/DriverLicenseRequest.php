<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class DriverLicenseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Lấy ID của giấy phép hiện tại (nếu có) từ route
        $driverLicenseId = $this->route('id');

        return [
            'license_number' => [
                $this->isMethod('post') ? 'required' : 'nullable',
                'digits:12',
                Rule::unique('driver_licenses', 'license_number')->ignore($driverLicenseId, 'driver_license_id'),
            ],
            'license_holder' => [
                $this->isMethod('post') ? 'required' : 'nullable',
                'string',
                'max:255'
            ],
            'license_type' => 'nullable|in:B2,C,D,E',
            'license_image' => [
                $this->isMethod('post') ? 'required' : 'nullable', // Chỉ bắt buộc khi tạo mới
                'file',
                'mimes:jpeg,png,jpg,gif,svg',
                'max:2048',
            ],
            'license_status' => 'nullable|in:active,inactive,invalid',
            'expiry_date' => 'nullable|date',
            'issued_by' => 'nullable|string|max:255',
            'rejection_reason' => 'nullable|string|max:5000'
        ];
    }

    public function messages(): array
    {
        return [
            'license_number.required' => 'Số giấy phép là bắt buộc.',
            'license_number.digits' => 'Số giấy phép phải gồm đúng 12 chữ số.',
            'license_number.unique' => 'Số giấy phép đã tồn tại trong hệ thống.',
            'license_holder.required' => 'Tên người sở hữu giấy phép là bắt buộc.',
            'license_holder.string' => 'Tên người sở hữu giấy phép phải là một chuỗi ký tự hợp lệ.',
            'license_holder.max' => 'Tên người sở hữu giấy phép không được vượt quá 255 ký tự.',
            'license_type.in' => 'Loại giấy phép không hợp lệ. Chỉ chấp nhận các giá trị: B2, C, D, E.',
            'license_image.required' => 'Ảnh giấy phép là bắt buộc.',
            'license_image.file' => 'Ảnh giấy phép phải là một tệp hợp lệ.',
            'license_image.mimes' => 'Ảnh giấy phép chỉ chấp nhận các định dạng: jpeg, png, jpg, gif, svg.',
            'license_image.max' => 'Dung lượng ảnh giấy phép không được vượt quá 2MB.',
            'license_status.in' => 'Trạng thái giấy phép không hợp lệ. Chỉ chấp nhận: active, inactive, invalid.',
            'expiry_date.date' => 'Ngày hết hạn phải là một ngày hợp lệ.',
            'issued_by.string' => 'Cơ quan cấp giấy phép phải là một chuỗi ký tự hợp lệ.',
            'issued_by.max' => 'Cơ quan cấp giấy phép không được vượt quá 255 ký tự.',
            'rejection_reason.string' => 'Lý do hủy phải là một chuỗi ký tự.',
            'rejection_reason.max' => 'Lý do hủy không được vượt quá 1000 ký tự.',
        ];
    }
}
