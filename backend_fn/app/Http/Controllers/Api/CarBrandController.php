<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\CarBrand;

class CarBrandController
{
    public function index()
    {
        $brand = CarBrand::with('cars')->get();
        return response()->json($brand);
    }

    public function show($id)
    {
        $brand = CarBrand::with('cars')->findOrFail($id);
        return response()->json($brand);
    }

}
