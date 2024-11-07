<?php

namespace App\Http\Controllers\ApiAdmin;

use Exception;
use App\Http\Controllers\Controller;
use App\Http\Requests\CarRequest;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $cars = Car::all();
            return $this->successResponse("Lấy danh sách xe thành công", $cars, 200);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $car = Car::find($id);
            if (!$car) {
                return $this->errorResponse('Xe không tìm thấy', 404);
            }
            return $this->successResponse("Lấy thông tin xe với ID: $id thành công", $car, 200);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        try {
            $carRequest = new CarRequest($request->all());
            $validatedData = $carRequest->validate();
            $car = Car::create($validatedData);
            return $this->successResponse("Thêm xe mới thành công", $car, 201);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $car = Car::findOrFail($id);
            $carRequest = new CarRequest($request->all(), $id);
            $validatedData = $carRequest->validate();
            $car->update($validatedData);
            return $this->successResponse("Cập nhập thông tin xe với ID: $id thành công", $car, 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy xe với ID: $id", 404);
        } catch (ValidationException $e) {
            return $this->errorResponse($e->validator->errors()->all(), 400);
        } catch (\Throwable $th) {
            return $this->errorResponse($th->getMessage(), 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $car = Car::findOrFail($id);
            $car->feedback()->delete();
            $car->images()->delete();
            $car->delete();
            return $this->successResponse("Xóa thành công xe với ID: $id", null, 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse("Không tìm thấy xe với ID: $id", 404);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
