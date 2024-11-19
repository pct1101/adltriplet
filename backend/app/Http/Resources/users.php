<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class users extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id, // Trả về khóa chính của users
            'name' => $this->name, // Tên users
            'email' => $this->email, // email user
            'email_verified_at' => $this->email_verified_at, // email verified user
            'password' => $this->password, // email user
            'remember_token' => $this->remember_token, // email user
            'created_at' => $this->created_at, // created_at user
            'updated_at' => $this->updated_at, // updated_at user
            'image' => $this->image, // image user
            'gender' => $this->gender, // created_at user
            'birth_date' => $this->birth_date, // birth_date user
            'role' => $this->role, // birth_date user
            'phone' => $this->phone, // phone user
            'status' => $this->status, // status user
            'api_token' => $this->api_token, // api_token user
        ];
    }
}
