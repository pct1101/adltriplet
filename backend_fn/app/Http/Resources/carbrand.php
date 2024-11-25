<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class carbrand extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'brand_id' => $this->brand_id, // Trả về khóa chính của carbrand
            'brand_name' => $this->brand_name, // Tên thương hiệu
            'brand_description' => $this->brand_description, // Mô tả thương hiệu
        ];
    }
}
