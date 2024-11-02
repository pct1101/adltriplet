<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class carbrand extends Model
{
    use HasFactory;
    protected $table = 'carbrand';
    public $primaryKey = 'brand_id';

    protected $fillable = ['brand_name', 'brand_description'];

}
