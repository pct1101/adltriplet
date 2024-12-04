<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('id');
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($userId, 'id'),
            ],
            'password' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'gender' => ['nullable', 'in:male,female,other'],
            'birth_date' => ['nullable', 'date', 'before:today'],
            'phone' => [
                'required',
                'string',
                'regex:/^(?:\+?84|0)(?:\d{9})$/',
                Rule::unique(User::class)->ignore($userId, 'id'),
            ],
            'address' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'in:user,admin'],
        ];
    }

    public function messages(): array
{
    return [
        'name.required' => 'Họ và tên là bắt buộc.',
        'name.string' => 'Họ và tên phải là chuỗi ký tự.',
        'name.max' => 'Họ và tên không được vượt quá 255 ký tự.',
        'email.required' => 'Email là bắt buộc.',
        'email.string' => 'Email phải là chuỗi ký tự.',
        'email.lowercase' => 'Email phải viết thường.',
        'email.email' => 'Email không hợp lệ.',
        'email.max' => 'Email không được vượt quá 255 ký tự.',
        'email.unique' => 'Email đã được sử dụng.',
        'password.required' => 'Mật khẩu là bắt buộc',
        'password.string' => 'Mật khẩu phải là chuỗi ký tự',
        'password.max' => 'Mật khẩu không được vượt quá 255 ký tự',
        'image.file' => 'Ảnh đại diện phải là một tệp tin hợp lệ.',
        'image.mimes' => 'Ảnh đại diện phải có định dạng jpeg, png, jpg, gif hoặc svg.',
        'image.max' => 'Ảnh đại diện không được vượt quá 2MB.',
        'gender.in' => 'Giới tính phải là male, female hoặc other.',
        'birth_date.date' => 'Ngày sinh phải là một ngày hợp lệ.',
        'birth_date.before' => 'Ngày sinh phải trước ngày hiện tại.',
        'phone.required' => 'Số điện thoại là bắt buộc',
        'phone.string' => 'Số điện thoại phải là chuỗi ký tự.',
        'phone.regex' => 'Số điện thoại không đúng định dạng (+84 Bắt đầu bằng 0 với 9 số khác).',
        'phone.unique' => 'Số điện thoại đã được sử dụng.',
        'address.string' => 'Địa chỉ phải là chuỗi ký tự.',
        'address.max' => 'Địa chỉ không được vượt quá 255 ký tự.',
        'role.in' => 'Vai trò phải là user hoặc admin.',
    ];
}
}
