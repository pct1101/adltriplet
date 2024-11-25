<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class CarBrandRequest
{
    protected $data;
    protected $id;

    public function __construct(array $data, $id = null)
    {
        $this->data = $data;
        $this->id = $id;
    }

    public function validate()
    {
        $validator = Validator::make($this->data, [
            'brand_name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('carbrand', 'brand_name')->ignore($this->id, 'brand_id')
            ],
            'brand_description' => 'nullable|string|max:255',
        ], [
            'brand_name.required' => 'Tên thương hiệu là bắt buộc.',
            'brand_name.max' => 'Tên thương hiệu không được vượt quá 100 ký tự.',
            'brand_name.unique' => 'Tên thương hiệu đã tồn tại.',
            'brand_description.max' => 'Mô tả thương hiệu không được vượt quá 255 ký tự.',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
