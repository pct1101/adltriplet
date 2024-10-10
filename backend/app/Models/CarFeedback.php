<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarFeedback extends Model
{
    use HasFactory;
    protected $table = "feedback";
    public $primaryKey = "feedback_id";
    public $filable = ["content","rating","feedback_date","user_id","car_id"];
}
