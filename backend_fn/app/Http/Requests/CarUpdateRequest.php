<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CarUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //return false;
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $car = $this->route('id') ? \App\Models\Car::find($this->route('id')) : null;
        if (request()->isMethod('post')) {
        return [
            'car_name'          => 'required|string|max:255',
            'seats'             => 'nullable|integer|min:2',
            'transmission_type' => 'nullable|in:Số sàn,Số tự động',
            'fuel_type'         => 'nullable|in:Xăng,Dầu,Điện',
            'model'             => 'nullable|integer|digits:4',
            'license_plate'     => [
                'required',
                'string',
                // Kiểm tra tính duy nhất chỉ khi biển số xe có thay đổi
                $car && $car->license_plate != $this->license_plate ? 'unique:car,license_plate' : '',
            ],
            'rental_price'      => 'nullable|numeric|min:0',
            'car_status'        => 'boolean',
            'mileage'           => 'nullable|numeric|min:0',
            'car_image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'car_description'   => 'nullable|string|max:65535',
        ];
        }else{
            return [
                'car_name'          => 'required|string|max:255',
                'seats'             => 'nullable|integer|min:2',
                'transmission_type' => 'nullable|in:Số sàn,Số tự động',
                'fuel_type'         => 'nullable|in:Xăng,Dầu,Điện',
                'model'             => 'nullable|integer|digits:4',
                'license_plate'     => [
                'required',
                'string',
                    // Kiểm tra tính duy nhất chỉ khi biển số xe có thay đổi
                    $car && $car->license_plate != $this->license_plate ? 'unique:car,license_plate' : '',
                ],
                'rental_price'      => 'nullable|numeric|min:0',
                'car_status'        => 'boolean',
                'mileage'           => 'nullable|numeric|min:0',
                'car_image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'car_description'   => 'nullable|string|max:65535',
            ];
        }
    }

    public function messages()
    {
        if (request()->isMethod('post')) {
            return [
                'car_name.required'          => 'Tên xe là bắt buộc.',
                'car_name.string'            => 'Tên xe phải là một chuỗi ký tự.',
                'car_name.max'               => 'Tên xe không được vượt quá 255 ký tự.',
                'seats.integer'              => 'Số chỗ ngồi phải là một số nguyên.',
                'seats.min'                  => 'Số chỗ ngồi phải ít nhất là 2.',
                'transmission_type.in'       => 'Loại hộp số phải là "Số sàn" hoặc "Số tự động".',
                'fuel_type.in'               => 'Loại nhiên liệu phải là một trong các giá trị: "Xăng", "Dầu", hoặc "Điện".',
                'model.integer'              => 'Năm sản xuất phải là một số nguyên.',
                'model.digits'               => 'Năm sản xuất phải gồm 4 chữ số.',
                'license_plate.required'     => 'Biển số xe là bắt buộc.',
                'license_plate.string'       => 'Biển số xe phải là một chuỗi ký tự.',
                'license_plate.unique'       => 'Biển số xe này đã được sử dụng.',
                'rental_price.numeric'       => 'Giá thuê xe phải là một số.',
                'rental_price.min'           => 'Giá thuê xe phải lớn hơn hoặc bằng 0.',
                'car_status.boolean'         => 'Trạng thái xe phải là đúng hoặc sai.',
                'mileage.numeric'            => 'Số km đã đi phải là một số.',
                'mileage.min'                => 'Số km đã đi phải lớn hơn hoặc bằng 0.',
                'car_image.image'            => 'Ảnh xe phải là một tệp hình ảnh hợp lệ.',
                'car_image.mimes'            => 'Ảnh xe phải là một tệp thuộc các định dạng: jpeg, png, jpg, gif, svg.',
                'car_image.max'              => 'Ảnh xe không được vượt quá 2MB.',
                'car_description.string'     => 'Mô tả xe phải là một chuỗi ký tự.',
                'car_description.max'        => 'Mô tả xe không được vượt quá 65,535 ký tự.',
            ];
        }else{
            return [
                'car_name.required'          => 'Tên xe là bắt buộc.',
                'car_name.string'            => 'Tên xe phải là một chuỗi ký tự.',
                'car_name.max'               => 'Tên xe không được vượt quá 255 ký tự.',
                'seats.integer'              => 'Số chỗ ngồi phải là một số nguyên.',
                'seats.min'                  => 'Số chỗ ngồi phải ít nhất là 2.',
                'transmission_type.in'       => 'Loại hộp số phải là "Số sàn" hoặc "Số tự động".',
                'fuel_type.in'               => 'Loại nhiên liệu phải là một trong các giá trị: "Xăng", "Dầu", hoặc "Điện".',
                'model.integer'              => 'Năm sản xuất phải là một số nguyên.',
                'model.digits'               => 'Năm sản xuất phải gồm 4 chữ số.',
                'license_plate.required'     => 'Biển số xe là bắt buộc.',
                'license_plate.string'       => 'Biển số xe phải là một chuỗi ký tự.',
                'license_plate.unique'       => 'Biển số xe này đã được sử dụng.',
                'rental_price.numeric'       => 'Giá thuê xe phải là một số.',
                'rental_price.min'           => 'Giá thuê xe phải lớn hơn hoặc bằng 0.',
                'car_status.boolean'         => 'Trạng thái xe phải là đúng hoặc sai.',
                'mileage.numeric'            => 'Số km đã đi phải là một số.',
                'mileage.min'                => 'Số km đã đi phải lớn hơn hoặc bằng 0.',
                'car_image.image'            => 'Ảnh xe phải là một tệp hình ảnh hợp lệ.',
                'car_image.mimes'            => 'Ảnh xe phải là một tệp thuộc các định dạng: jpeg, png, jpg, gif, svg.',
                'car_image.max'              => 'Ảnh xe không được vượt quá 2MB.',
                'car_description.string'     => 'Mô tả xe phải là một chuỗi ký tự.',
                'car_description.max'        => 'Mô tả xe không được vượt quá 65,535 ký tự.',
            ];
        }
    }
}
