<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\car;
use App\Http\Resources\car as CarResource;

class CarController extends Controller
{
    //Lấy tất cả sản phẩm
    function index()
    {
        $listCar = car::all();
        $data = CarResource::collection($listCar);
        return response()->json($data);
    }

    //Lấy chi tiết sản phẩm
    function get_details($id = 0)
    {
        $car = car::findOrFail($id);
        $data = new CarResource($car);
        return response()->json($data);
    }

    //Lấy sản phẩm trong loại
    function get_kind_of_car($id = 0)
    {
        $kindOfCar = car::where('brandid', $id)->orderBy('car_id', 'asc')->get();
        $data = CarResource::collection($kindOfCar);
        return response()->json($data);
    }
}
