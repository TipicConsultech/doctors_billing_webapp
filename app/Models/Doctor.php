<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    // If your table name is different, uncomment and set the table name.
    // protected $table = 'doctors';

    // Define the fillable attributes to allow mass assignment
    protected $fillable = [
        'doctor_name',
        'registration_number',
        'speciality',
        'education',
        'contact',
        'email',
        'password', // Make sure the password is hashed
    ];

    // Optionally, hide the password from arrays and JSON responses
    protected $hidden = ['password'];
}
