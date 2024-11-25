<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Http\Resources\users as UsersResources;
use Illuminate\Http\Request;
use App\Models\car;
use App\Http\Resources\car as CarResources;
use App\Models\carImage;
use App\Http\Resources\carimage as CarImageResources;
use App\Models\feedback;
use App\Http\Resources\feedback as FeedbackResources;
use App\Models\favorite;
use App\Http\Resources\favorite as FavoriteResources;

// -------------------------------------------------------------------flie này dùng để xuất api cho các bạn front-end --------------------------------

class AdminCarContrloller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $listCar = car::all();
        $data = CarResources::collection($listCar);
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $sp = car::create($input);
        $data = new CarResources($sp);
        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id = 0)
    {
        $car = car::findOrFail($id);
        $data = new CarResources($car);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'car_name' => 'required|string|max:255',
            'seats' => 'required|integer',
            'model' => 'required|integer',
            'license_plate' => 'required|string|max:255',
            'rental_price' => 'required|numeric',
            'car_status' => 'required|boolean',
            'mileage' => 'required|numeric',
            'car_description' => 'nullable|string',
            'brandid' => 'required|exists:carbrand,brand_id'
        ]);
        $car = car::find($id);
        if (!$car) {
            return response()->json(['message' => 'Car không tồn tại'], 404);
        }

        // Cập nhật chi tiết xe
        $car->car_name = $request->input('car_name');
        $car->seats = $request->input('seats');
        $car->model = $request->input('model');
        $car->license_plate = $request->input('license_plate');
        $car->rental_price = $request->input('rental_price');
        $car->car_status = $request->input('car_status');
        $car->mileage = $request->input('mileage');
        $car->car_description = $request->input('car_description');
        $car->brandid = $request->input('brandid');
        $car->save();

        return response()->json([
            'message' => 'Car updated successfully!',
            'car' => $car
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        car::where('car_id', $id)->delete();
        return response()->json([], 204);
    }



    public function get_user_api()
    {
        $user = user::all();
        $data = UsersResources::collection($user);
        return response()->json($data);
    }


    public function get_feedback_api()
    {
        $feeback = feedback::all();
        $data = FeedbackResources::collection($feeback);
        return response()->json($data);
    }


    public function get_favorite_api()
    {
        $favorite = favorite::all();
        $data = FavoriteResources::collection($favorite);
        return response()->json($data);
    }
}
