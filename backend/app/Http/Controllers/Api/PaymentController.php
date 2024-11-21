<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Api\BookingController;

class PaymentController extends Controller
{
    public function createPayment(Request $request, $booking_id)
    {
        // Cấu hình thông tin VNPay
        $booking = Booking::findOrFail($booking_id);
        $vnp_TmnCode = "DC7LGA87"; // Mã website
        $vnp_HashSecret = "Y7RR5WNKJTU24H4YKV15GL07W0WMKAN2"; // Secret key
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = route('payment.return');

        // Lấy dữ liệu từ request

        $vnp_TxnRef = $booking->booking_id; // Mã đơn hàng
        $vnp_OrderInfo = $request->input('order_desc', 'thanh toan hoa don');
        $vnp_OrderType = $request->input('order_type', 'billpayment');
        $vnp_Amount = $booking->total_cost * 100;
        $vnp_Locale = $request->input('language', 'vn');
        $vnp_BankCode = $request->input('bank_code', 'NCB');
        $vnp_IpAddr = $request->ip();
        $vnp_ExpireDate = $request->input('txtexpire');

        // Thông tin hóa đơn
        $fullName = trim($request->input('txt_billing_fullname', ''));
        $name = explode(' ', $fullName);
        $vnp_Bill_FirstName = array_shift($name);
        $vnp_Bill_LastName = implode(' ', $name);

        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => now()->format('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        ];

        if (!empty($vnp_BankCode)) {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }
        ksort($inputData);
        $query = "";
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }
        $hashdata = ltrim($hashdata, '&');
        $vnp_Url = $vnp_Url . "?" . $query;

        if (!empty($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }

        // Trả về URL thanh toán
        return response()->json([
            'code' => '00',
            'message' => 'Success',
            'data' => $vnp_Url
        ]);
    }
    public function process(Request $request)
    {
        // Kiểm tra thanh toán (giả lập, bạn có thể tích hợp cổng thanh toán thực tế)
        $vnp_TransactionStatus = $request->input('vnp_TransactionStatus');
        $vnp_TxnRef = $request->input('vnp_TxnRef'); // Mã đơn hàng
        $booking = Booking::with('user')->where('booking_id', $vnp_TxnRef)->first();
        $fullname = $booking->user->name;
        $vnp_amount = $request->input('vnp_Amount');

        // Kiểm tra trạng thái giao dịch
        if ($vnp_TransactionStatus === '00') {
            $booking = Booking::where('booking_id', $vnp_TxnRef)->first();

            if ($booking) {
                session(['booking' => $booking->booking_id]); // lưu vào session
                // Cập nhật trạng thái đơn hàng
                $booking->booking_status = 2;
                $booking->save();
            }
        } else {
            // toastr()->error('Thanh toán thất bại');
            return redirect()->route('checkout.failed'); // Chuyển hướng đến trang lỗi nếu cần
        }
        return redirect('http://localhost:3000/successfull');
    }
}
