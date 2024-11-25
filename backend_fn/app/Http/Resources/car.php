<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class car extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'car_id' => $this->car_id,
            'car_name' => $this->car_name,
            'seats' => $this->seats,
            'model' => $this->model,
            'license_plate' => $this->license_plate,
            'rental_price' => $this->rental_price,
            'car_status' => $this->car_status,
            'mileage' => $this->mileage,
            'car_image' => $this->car_image,
            'car_description' => $this->car_description,
            'brandid' => $this->brandid
        ];
    }
}
