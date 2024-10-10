<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CarFeedback extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "content" => $this->content,
            "rating" => $this->rating,
            "feedback" => $this->feedback_date,
            "user_id" => $this->user_id,
            "car_id" => $this->car_id,
        ];
    }
}
