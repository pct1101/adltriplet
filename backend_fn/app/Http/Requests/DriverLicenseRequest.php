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
        // Quy tắc chung
        $rules = [
            'license_number' => [
                'required',
                'digits:12',
                // Kiểm tra tính duy nhất
                function ($attribute, $value, $fail) {
                    // Kiểm tra khi sửa
                    if ($this->isMethod('put')) {
                        // Lấy bản ghi hiện tại khi đang sửa
                        $currentLicense = \App\Models\DriverLicenses::find($this->route('driver_license'));

                        // Nếu license_number thay đổi thì kiểm tra tính duy nhất
                        if ($currentLicense && $currentLicense->license_number !== $value) {
                            $existingLicense = \App\Models\DriverLicenses::where('license_number', $value)->first();
                            if ($existingLicense) {
                                // Trả về thông báo lỗi giống như khi thêm mới
                                $fail('Số giấy phép đã tồn tại trong hệ thống.');
                            }
                        }
                    } else {
                        // Kiểm tra khi thêm mới
                        $existingLicense = \App\Models\DriverLicenses::where('license_number', $value)->first();
                        if ($existingLicense) {
                            // Trả về thông báo lỗi
                            $fail('Số giấy phép đã tồn tại trong hệ thống.');
                        }
                    }
                }
            ],
            'license_holder' => 'required|string|max:255',
            'license_type' => 'nullable|in:B2,C,D,E',
            'license_image_front' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'license_image_back' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'license_status' => 'nullable|in:active,inactive',
            'issue_date' => 'nullable|date',
            'expiry_date' => 'nullable|date|after:issue_date',
            'issued_by' => 'nullable|string|max:255',
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'license_number.required' => 'Số giấy phép là bắt buộc.',
            'license_number.digits' => 'Số giấy phép phải gồm đúng 12 chữ số.',
            'license_holder.required' => 'Tên người sở hữu giấy phép là bắt buộc.',
            'license_holder.string' => 'Tên người sở hữu giấy phép phải là một chuỗi ký tự hợp lệ.',
            'license_holder.max' => 'Tên người sở hữu giấy phép không được vượt quá 255 ký tự.',
            'license_type.in' => 'Loại giấy phép không hợp lệ. Chỉ chấp nhận các giá trị: B2, C, D, E.',
            'license_image_front.required' => 'Ảnh mặt trước của giấy phép là bắt buộc.',
            'license_image_front.file' => 'Ảnh mặt trước của giấy phép phải là một tệp hợp lệ.',
            'license_image_front.mimes' => 'Ảnh mặt trước của giấy phép chỉ chấp nhận các định dạng: jpeg, png, jpg, gif, svg.',
            'license_image_front.max' => 'Dung lượng ảnh mặt trước của giấy phép không được vượt quá 2MB.',
            'license_image_back.required' => 'Ảnh mặt sau của giấy phép là bắt buộc.',
            'license_image_back.file' => 'Ảnh mặt sau của giấy phép phải là một tệp hợp lệ.',
            'license_image_back.mimes' => 'Ảnh mặt sau của giấy phép chỉ chấp nhận các định dạng: jpeg, png, jpg, gif, svg.',
            'license_image_back.max' => 'Dung lượng ảnh mặt sau của giấy phép không được vượt quá 2MB.',
            'license_status.in' => 'Trạng thái giấy phép không hợp lệ. Chỉ chấp nhận: active hoặc inactive.',
            'issue_date.date' => 'Ngày cấp phải là một ngày hợp lệ.',
            'expiry_date.date' => 'Ngày hết hạn phải là một ngày hợp lệ.',
            'expiry_date.after' => 'Ngày hết hạn phải sau ngày cấp.',
            'issued_by.string' => 'Cơ quan cấp giấy phép phải là một chuỗi ký tự hợp lệ.',
            'issued_by.max' => 'Cơ quan cấp giấy phép không được vượt quá 255 ký tự.',
        ];
    }
}
