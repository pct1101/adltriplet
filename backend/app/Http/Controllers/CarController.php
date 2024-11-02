<?php

namespace App\Http\Controllers;

use App\Http\Resources\carbrand as ResourceCarBrand;
use App\Models\carImage;
use Illuminate\Http\Request;
use App\Models\car;
use App\Models\carbrand;
use App\Http\Resources\car as CarResource;
use App\Http\Resources\carimage as CarImageResource;



// --------------------------------------Trang này dùng để xuất các api như sản phẩm, loại xe, bình luận, xe yêu thích từ databasse lên ------------------------



class CarController extends Controller
{
    function trangchu()
    {
        $query = car::limit(4)->get();
        $brand = carbrand::all();
        return view('trangchu', ['data' => $query, 'brand' => $brand]);
    }
    function getone($id = 0)
    {
        $car = car::findOrFail($id);
        $brand = carbrand::all();
        return view('detail', ['car' => $car, 'brand' => $brand]);
    }



    //Lấy tất cả sản phẩm
    function get_car()
    {
        $listCar = car::all();
        $data = CarResource::collection($listCar);
        return response()->json($data);
    }

    //Lấy chi tiết sản phẩm
    function get_details_car($id = 0)
    {
        $car = car::findOrFail($id);
        $data = new CarResource($car);
        return response()->json($data);
    }
    function get_brands_car()
    {
        $brands = carbrand::all();
        $data = ResourceCarBrand::collection($brands);
        return response()->json($data);
    }
    //Lấy sản phẩm trong loại
    function get_brands_of_car($id = 0)
    {
        $kindOfCar = car::where('brandid', $id)->orderBy('car_id', 'asc')->get();
        $data = CarResource::collection($kindOfCar);
        return response()->json($data);
    }

    function get_sub_image_of_car($id = 0)
    {
        $carImage = carImage::where('car_id', $id)->orderBy('carImage_id', 'asc')->get();
        $data = CarImageResource::collection($carImage);
        return response()->json($data);
    }
}
