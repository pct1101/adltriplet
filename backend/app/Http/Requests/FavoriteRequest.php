<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
use App\Models\Favorite;



class FavoriteRequest
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function validate()
    {
        $this->data['date_favorite'] = $this->data['date_favorite'] ?? now();
        $validator = Validator::make($this->data, [
            'user_id' => 'required|exists:users,id',
            'car_id'  => 'required|exists:car,car_id',
            'date_favorite' => 'required|date',
        ], [
            'user_id.required' => 'User ID là bắt buộc.',
            'user_id.exists'   => 'User không tồn tại.',
            'car_id.required'  => 'Car ID là bắt buộc.',
            'car_id.exists'    => 'Xe không tồn tại.',
            'date_favorite.required' => 'Ngày yêu thích là bắt buộc.',
            'date_favorite.date' => 'Ngày yêu thích phải là một ngày hợp lệ.',
        ]);

        if ($validator->passes()) {
            $existingFavorite = Favorite::where('user_id', $this->data['user_id'])
                ->where('car_id', $this->data['car_id'])
                ->first();
            if ($existingFavorite) {
                return $existingFavorite;
            }
        }


        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
