<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




require __DIR__ . '/api/auth.php';
require __DIR__ . '/api/booking.php';
require __DIR__ . '/api/car.php';
require __DIR__ . '/api/carimage.php';
require __DIR__ . '/api/carbrand.php';
require __DIR__ . '/api/feedback.php';
require __DIR__ . '/api/favorite.php';
require __DIR__ . '/api/vnpay.php';
require __DIR__ . '/api/driverlicense.php';
require __DIR__ . '/api/voucher.php';
require __DIR__ . '/api/mail.php';
require __DIR__ . '/api/forgotpassword.php';



require __DIR__ . '/api_admin/user.php';
require __DIR__ . '/api_admin/car.php';
require __DIR__ . '/api_admin/carbrand.php';
require __DIR__ . '/api_admin/banner.php';
require __DIR__ . '/api_admin/booking.php';
require __DIR__ . '/api_admin/feedback.php';
require __DIR__ . '/api_admin/favorite.php';
require __DIR__ . '/api_admin/driverlicense.php';
require __DIR__ . '/api_admin/voucher.php';
require __DIR__ . '/api_admin/carupdate.php';