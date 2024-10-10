<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CarFavorite;
use App\Http\Resources\CarFavorite as CarFavoriteResource;

class CarFavoriteController extends Controller
{
    function index(){
        // $listcf là danh sách xe yêu thích
        $listcf = CarFavorite::all();
        $data = CarFavoriteResource::collection($listcf);
        return response()->json($data);
    }
    function add(Request $request){
        $input = $request->all();
        $carfavorite = CarFavorite::create($input);
        $data = new CarFavoriteResource($carfavorite);
        return response()->json($data, 201);
    }
}
