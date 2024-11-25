<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class feedback extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'feedback_id' => $this->feedback_id,
            'content' => $this->content,
            'rating' => $this->rating,
            'feedback_date' => $this->feedback_date,
            'user_id' => $this->user_id,
            'car_id' => $this->car_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}


