<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CarFeedback;
use App\Http\Resources\CarFeedback as CarFeedbackResource;

class CarFeedbackController extends Controller
{
    function showfeedback($car_id){
        $carfeedback = CarFeedback::where('car_id', $car_id)->get();
        $data = CarFeedbackResource::collection($carfeedback);
        return response()->json($data);
    }
}
