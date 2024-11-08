<?php

namespace App\Http\Controllers\ApiAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Car::all();
        return response()->json($cars);
    }


    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     // Xác thực đầu vào
    //     $validator = Validator::make($request->all(), [
    //         'car_name' => 'nullable|required|string|max:255',
    //         'model' => 'nullable|required|string|max:10',
    //         'license_plate' => 'required|string|max:20|unique:car', // Kiểm tra biển số có bị trùng không
    //         'rental_price' => 'nullable|required|integer',
    //         'car_status' => 'required|boolean',
    //         'mileage' => 'nullable|required|integer',
    //         'car_image' => 'nullable|string',
    //         'car_description' => 'nullable|string',
    //         'brandid' => 'required|integer',
    //     ]);

    //     // Kiểm tra nếu có lỗi trong việc xác thực
    //     if ($validator->fails()) {
    //         // Kiểm tra lỗi cụ thể liên quan đến license_plate
    //         if ($validator->errors()->has('license_plate')) {
    //             return response()->json(['message' => 'Xe đã tồn tại với biển số này.'], 422);
    //         }

    //         return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
    //     }

    //     // Tạo xe mới
    //     try {
    //         $car = Car::create($request->all());
    //         return response()->json(['message' => 'Car created successfully!', 'car' => $car], 201);
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => 'Failed to create car. Please try again.'], 500);
    //     }
    // }

    public function store(Request $request)
    {
        // Xác thực biển số xe
        $validator = Validator::make($request->all(), [
            'license_plate' => 'required|string|max:20|unique:car', // Kiểm tra biển số có bị trùng không
        ]);

        // Kiểm tra nếu có lỗi trong việc xác thực
        if ($validator->fails()) {
            // Kiểm tra lỗi cụ thể liên quan đến license_plate
            if ($validator->errors()->has('license_plate')) {
                return response()->json(['message' => 'A car with this license plate already exists.'], 422);
            }

            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        // Tạo xe mới
        try {
            $car = Car::create($request->all());
            return response()->json(['message' => 'Car created successfully!', 'car' => $car], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create car. Please try again.'], 500);
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        return response()->json($car);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Tìm xe theo ID
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        // Cập nhật xe mà không kiểm tra dữ liệu
        try {
            $car->update($request->all());
            return response()->json(['message' => 'Cập nhật thành công', 'car' => $car], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update car. Please try again.'], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }
        $car->feedback()->delete();
        $car->images()->delete();
        $car->delete();
        return response()->json(['message' => 'Car deleted successfully']);
    }
}
