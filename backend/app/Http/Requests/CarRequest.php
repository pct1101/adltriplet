<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class CarRequest
{
    protected $data;
    protected $carId;

    public function __construct(array $data, $carId = null)
    {
        $this->data = $data;
        $this->carId = $carId;
    }

    public function validate()
    {
        // Kiểm tra và xử lý ảnh
        if (isset($this->data['car_image'])) {
            $image = $this->data['car_image'];

            if ($image instanceof \Illuminate\Http\UploadedFile && $image->isValid()) {

                if (isset($this->data['old_car_image']) && $this->data['old_car_image']) {
                    $oldImagePath = public_path('cars/image/' . $this->data['old_car_image']);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);  // Xóa ảnh cũ
                    }
                }
                $destinationPath = public_path('cars/image');
                $image->move($destinationPath, $image->getClientOriginalName());
                $this->data['car_image'] = $image->getClientOriginalName();
            } else {
                // Thay đổi ngoại lệ `ValidationException` để truyền đối tượng `Validator`
                throw ValidationException::withMessages(['car_image' => ['Tệp tải lên không hợp lệ.']]);
            }
        }


        // Thiết lập ID xe để bỏ qua khi xác thực duy nhất
        $carId = $this->carId;

        // Xác thực dữ liệu
        $validator = Validator::make($this->data, [
            'car_name'        => 'required|string|max:255',
            'seats'           => 'nullable|integer|min:2',
            'model'           => 'nullable|integer|digits:4',
            'license_plate'   => [
                'required',
                'string',
                'max:50',
                Rule::unique('car')->ignore($carId, 'car_id')
            ],
            'rental_price'    => 'nullable|numeric|min:0',
            'car_status'      => 'nullable|boolean',
            'mileage'         => 'nullable|numeric|min:0',
            'car_image'       => 'nullable|string|max:255',
            'car_description' => 'nullable|string|max:1000',
            'brandid'         => 'required|integer|exists:carbrand,brand_id',
        ], [
            'car_name.required'        => 'Vui lòng cung cấp tên xe.',
            'car_name.string'          => 'Tên xe phải là chuỗi.',
            'car_name.max'             => 'Tên xe không được vượt quá 255 ký tự.',
            'seats.integer'            => 'Số ghế phải là một số nguyên.',
            'seats.min'                => 'Số ghế phải lớn hơn hoặc bằng 2.',
            'model.integer'            => 'Năm sản xuất phải là một số nguyên.',
            'model.digits'             => 'Năm sản xuất phải có 4 chữ số.',
            'license_plate.required'   => 'Vui lòng cung cấp biển số xe.',
            'license_plate.string'     => 'Biển số xe phải là chuỗi.',
            'license_plate.unique'     => 'Biển số xe đã tồn tại.',
            'license_plate.max'        => 'Biển số xe không được vượt quá 20 ký tự.',
            'rental_price.numeric'     => 'Giá thuê phải là số.',
            'rental_price.min'         => 'Giá thuê không được nhỏ hơn 0.',
            'car_status.boolean'       => 'Trạng thái xe phải là một giá trị boolean.',
            'mileage.numeric'          => 'Số km đã đi phải là một số.',
            'mileage.min'              => 'Số km đã đi không được nhỏ hơn 0.',
            'car_description.string'   => 'Mô tả xe phải là chuỗi.',
            'car_description.max'      => 'Mô tả xe không được vượt quá 1000 ký tự.',
            'brandid.required'         => 'Vui lòng cung cấp ID thương hiệu.',
            'brandid.exists'           => 'Thương hiệu không tồn tại.',
        ]);

        // Kiểm tra nếu xác thực thất bại
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Trả về dữ liệu đã xác thực
        return $validator->validated();
    }
}
