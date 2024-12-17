<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    protected $table = 'voucher';
    protected $primaryKey = 'voucher_id';

    protected $fillable = [
        'voucher_code',
        'discount_percentage',
        'expiration_date',
        'usage_limit',
    ];
}