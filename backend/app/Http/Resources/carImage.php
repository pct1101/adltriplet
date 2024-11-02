<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class carimage extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'carImage_id' => $this->carImage_id,
            'carImage_url' => $this->carImage_url,
            'carImage_description' => $this->carImage_description,
            'car_id' => $this->car_id
        ];
    }
}
