<?php

namespace App\Http\Controllers\Api;
use App\Models\Contact;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use App\Mail\GuiEmail;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;


class MailController extends Controller
{
    public function mailContact(Request $request)
    {
        try {
            $arr = $request->post();
            $ht = trim(strip_tags($arr['ht']));
            $em = trim(strip_tags($arr['em']));
            $nd = trim(strip_tags($arr['nd']));
            $sdt = trim(strip_tags($arr['sdt']));
            $adminEmail = 'hoangannguyen10022002@gmail.com'; // Gửi thư đến ban quản trị

            Mail::mailer('smtp')->to($adminEmail)
                ->send(new GuiEmail($ht, $em, $nd, $sdt));
            Contact::create([
                'phone' => $sdt,
                'name_customer' => $ht,
                'content' => $nd,
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Đã gửi mail thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Đã xảy ra lỗi khi gửi mail',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
