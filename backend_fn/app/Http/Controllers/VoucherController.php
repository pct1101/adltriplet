<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use App\Models\Voucher;

class VoucherController extends Controller
{
    // Tạo voucher mới
    public function store(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $request->validate([
            'voucher_code' => 'required|string|unique:voucher,voucher_code',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'expiration_date' => 'required|date|after:now',
            'usage_limit' => 'nullable|integer|min:1',
        ]);

        // Tạo voucher
        $voucher = Voucher::create([
            'voucher_code' => $request->voucher_code,
            'discount_percentage' => $request->discount_percentage,
            'expiration_date' => $request->expiration_date,
            'usage_limit' => $request->usage_limit,
        ]);

        return response()->json([
            'message' => 'Voucher created successfully.',
            'voucher' => $voucher,
        ], 201);
    }

    // Sửa voucher
    public function update(Request $request, $id)
    {
        try {
            $voucher = Voucher::find($id);
            if (!$voucher) {
                return response()->json(['message' => 'Voucher not found.'], 404);
            }
            // Xác thực dữ liệu đầu vào
            $validatedData = $request->validate([
                'voucher_code' => [
                    'nullable',
                    'string',
                    Rule::unique('voucher', 'voucher_code')->ignore($id, 'voucher_id'),
                ],
                'discount_percentage' => 'nullable|integer|min:1|max:100',
                'expiration_date' => 'nullable|date|after:now',
                'usage_limit' => 'nullable|integer|min:1',
            ]);

            // Cập nhật dữ liệu vào model
            $voucher->fill($validatedData);

            // Lưu thay đổi
            $voucher->save();

            // Trả về phản hồi thành công
            return response()->json([
                'message' => 'Voucher updated successfully.',
                'voucher' => $voucher,
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Bắt lỗi xác thực
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422); // 422: Unprocessable Entity
        } catch (\Exception $e) {
            // Bắt các lỗi khác (lỗi hệ thống, lỗi không xác định)
            return response()->json([
                'message' => 'An error occurred while updating the voucher.',
                'error' => $e->getMessage(),
            ], 500); // 500: Internal Server Error
        }
    }



    // Xóa voucher
    public function destroy($id)
    {
        $voucher = Voucher::find($id);

        if (!$voucher) {
            return response()->json(['message' => 'Voucher not found.'], 404);
        }

        $voucher->delete();

        return response()->json(['message' => 'Voucher deleted successfully.'], 200);
    }

    // Lấy danh sách voucher (để test danh sách)
    public function index()
    {
        $vouchers = Voucher::all();
        return response()->json($vouchers, 200);
    }
}