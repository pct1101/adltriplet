<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait ApiResponse
{
    public function successResponse($succsessMessage, $data, $statusCode = Response::HTTP_OK)
    {
        return response()->json(['success' => $succsessMessage, 'data' => $data], $statusCode);
    }

    public function errorResponse($errorMessage, $statusCode)
    {
        return response()->json(['error' => $errorMessage, 'error_code' => $statusCode], $statusCode);
    }
}
