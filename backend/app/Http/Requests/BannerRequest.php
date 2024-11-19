<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class BannerRequest
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function validate()
    {
        $validator = Validator::make($this->data, [
            'banner_url'     => 'nullable|max:255',
            'banner_status'  => 'nullable|boolean',
        ], [
            'banner_url.max'         => 'Địa chỉ URL không được dài quá 255 ký tự.',
            'banner_status.boolean'  => 'Trạng thái banner phải là một giá trị boolean.',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
