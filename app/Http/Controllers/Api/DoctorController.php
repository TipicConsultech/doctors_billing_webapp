<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{
    public function register(Request $request)
    {
        // Log the incoming request data
        \Log::info('Incoming registration request', $request->all());

        // Validate the request
        $validator = Validator::make($request->all(), [
            'doctor_name' => 'required|string|max:255',
            'registration_number' => 'required|string|max:255|unique:doctors',
            'speciality' => 'required|string|max:255',
            'education' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:doctors',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $doctor = Doctor::create([
                'doctor_name' => $request->doctor_name,
                'registration_number' => $request->registration_number,
                'speciality' => $request->speciality,
                'education' => $request->education,
                'contact' => $request->contact,
                'email' => $request->email,
                'password' => bcrypt($request->password), // Hash the password
            ]);

            return response()->json(['message' => 'Doctor registered successfully', 'doctor' => $doctor], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create doctor', 'message' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        // Log the incoming request data
        \Log::info('Incoming login request', $request->all());

        // Validate the request input
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt to log the user in
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Retrieve the authenticated user
            $doctor = Auth::user();
            return response()->json(['message' => 'Login successful', 'doctor' => $doctor], 200);
        }

        return response()->json(['message' => 'Invalid credentials cjhbjhbhcd'], 401);
    }
}
