<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;;

class AuthController extends Controller
{
    // function registers(Request $request){
    //     $fields = $request->validate([
    //         'name' => 'required|string',
    //         'email' => 'nullable|string|unique:users,email',
    //         'mobile' => 'required|string',
    //         'registration_number' => 'required|string|max:255|unique:doctors',
    //         'speciality' => 'required|string|max:255',
    //         'education' => 'required|string|max:255',
    //         'type' => 'required|integer',
    //         'password' => 'required|string',
    //         'blocked'=>'required|integer'
    //     ]);

    //     $user = User::create([
    //         'name'=> $fields['name'],
    //         'email'=> $fields['email'],
    //         'mobile'=> $fields['mobile'],
    //         'registration_number' => $fields['registration_number'],
    //         'speciality' => $fields['speciality'],
    //         'education' => $fields['education'],
    //         'type'=> $fields['type'],
    //         'password'=> bcrypt($fields['password']),
    //         'blocked'=> $fields['blocked']

    //     ]);

    //     $token = $user->createToken('webapp')->plainTextToken;
    //     $response = [
    //         'user'=> $user,
    //         'token'=> $token
    //     ];
    //     \Log::info('Registration successful', $response);

    //     return response($response,201);




        
    // }

    public function registers(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'logo'=>'required|string',
            'clinic_name' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email', // Ensure email is unique if provided
            'mobile' => 'required|string|unique:users,mobile',
            'address' => 'required|string|max:255',
            'registration_number' => 'required|string|max:255',
            'speciality' => 'required|string|max:255',
            'education' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed', // Ensure password confirmation
            'profilepic' => 'nullable|string', // Nullable string for profile picture URL or file path
            'blocked' => 'boolean', // Boolean field
            'type' => 'integer', // Integer field for user type
        ]);

        // Create the user
        $user = User::create([
            'logo'=> $request->logo,
            'clinic_name'=> $request->clinic_name,

            'name' => $request->name,
            'email' => $request->email,
            'mobile' => $request->mobile,
            
            'address' => $request->address,

            
            'registration_number' => $request->registration_number,
            'speciality' => $request->speciality,
            'education' => $request->education,
            'password' => Hash::make($request->password), // Hashing the password
            'profilepic' => $request->profilepic, // Can be null if not provided
            'blocked' => $request->blocked ?? false, // Defaults to false if not provided
            'type' => $request->type ?? 0, // Defaults to 0 if not provided
        ]);

        // Return a success response with the created user
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }

      

    // public function login(Request $request)
    // {
    //     $fields = $request->validate([
    //         'email' => 'required|string',
    //         'password' => 'required|string'
    //     ]);
    
    //     // Check if email exists
    //     $user = User::where('email', $fields['email'])->first();
    
    //     // Check password
    //     if (!$user || !Hash::check($fields['password'], $user->password)) {
    //         return response()->json([
    //             'message' => 'Invalid credentials'
    //         ], 401);
    //     }
    
    //     // Check if user is blocked
    //     if ($user->blocked == 1) {
    //         return response()->json([
    //             'message' => 'User not allowed. Kindly contact admin.',
    //             'blocked'=> true
    //         ], 201);
    //     }
        

    //     $token = $user->createToken('webapp',[$user])->plainTextToken;
    //     $response = [
    //         'user' => $user,
    //         'token' => $token
    //     ];
    //     return response()->json($response, 201);
    // }






//     public function login(Request $request)
// {
//     // Validate the incoming request data
//     $fields = $request->validate([
//         'email' => 'required|string|email', // Ensure it's a valid email format
//         'password' => 'required|string'
//     ]);

//     // Check if email exists
//     $user = User::where('email', $fields['email'])->first();

//     // Log user existence check
//     \Log::info('User existence check:', ['email' => $fields['email'], 'exists' => $user ? true : false]);

//     // Check password
//     if (!$user || !Hash::check($fields['password'], $user->password)) {
//         \Log::info('Invalid credentials for user:', ['email' => $fields['email']]);
//         return response()->json([
//             'message' => 'Invalid credentials'
//         ], 401); // Unauthorized
//     }

//     // Check if user is blocked
//     if ($user->blocked) { // No need to compare with 1; it's a boolean
//         \Log::info('Blocked user attempted to log in:', ['email' => $fields['email']]);
//         return response()->json([
//             'message' => 'User not allowed. Kindly contact admin.',
//             'blocked' => true
//         ], 403); // Forbidden
//     }

//     // Create a token for the user
//     $token = $user->createToken('webapp')->plainTextToken;

//     // Prepare response
//     $response = [
//         'user' => [
//             'id' => $user->id,
//             'name' => $user->name,
//             'email' => $user->email,
//             'mobile' => $user->mobile,
//             'speciality' => $user->speciality,
//             'education' => $user->education,
//             'registration_number' =>$user->registration_number,
//         ],
//         'token' => $token
//     ];

//     \Log::info('User logged in successfully:', ['email' => $fields['email']]);

//     return response()->json($response, 200); // OK
// }

// ##############################################################################



public function login(Request $request)
{
    // Validate the incoming request data
    $fields = $request->validate([
        'email' => 'required|string|email', // Ensure it's a valid email format
        'password' => 'required|string'
    ]);

    // Check if email exists
    $user = User::where('email', $fields['email'])->first();

    // Log user existence check
    \Log::info('User existence check:', ['email' => $fields['email'], 'exists' => $user ? true : false]);

    // Check password
    if (!$user || !Hash::check($fields['password'], $user->password)) {
        \Log::info('Invalid credentials for user:', ['email' => $fields['email']]);
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401); // Unauthorized
    }

    // Check if user is blocked
    if ($user->blocked) { // No need to compare with 1; it's a boolean
        \Log::info('Blocked user attempted to log in:', ['email' => $fields['email']]);
        return response()->json([
            'message' => 'User not allowed. Kindly contact admin.',
            'blocked' => true
        ], 403); // Forbidden
    }

    // Create a token for the user
    $token = $user->createToken('webapp')->plainTextToken;

    // Prepare response
    $response = [
        'doctorId' => $user->id, // Change to return doctorId instead of user
        'user' => [
            'name' => $user->name,
            'email' => $user->email,
            'mobile' => $user->mobile,
            'speciality' => $user->speciality,
            'education' => $user->education,
            'registration_number' => $user->registration_number,
        ],
        'token' => $token
    ];

    \Log::info('User logged in successfully:', ['email' => $fields['email']]);

    return response()->json($response, 200); // OK
}

// ####################################################################
// public function login(Request $request)
// {
//     $credentials = $request->only('email', 'password');

//     if (Auth::attempt($credentials)) {
//         $user = Auth::user();
//         $token = $user->createToken('YourAppName')->accessToken;

//         return response()->json([
//             'token' => $token,
//             'doctorId' => $user->id, // Assuming the user's ID is the doctor ID
//         ]);
//     }

//     return response()->json(['error' => 'Unauthorized'], 401);
// }


// public function login(Request $request)
// {
//     $credentials = $request->only('email', 'password');

//     if (Auth::attempt($credentials)) {
//         $doctor = Auth::user();
//         $token = $doctor->createToken('YourAppName')->accessToken;

//         return response()->json([
//             'token' => $token,
//             'doctor_id' => $doctor->id,
//             'name' => $doctor->name,
//             'registration_number' => $doctor->registration_number,
//         ]);
//     }

//     return response()->json(['error' => 'Unauthorized'], 401);
// }







    function mobileLogin(Request $request){
        $fields = $request->validate([
            'mobile' => 'required|string',
            'password' => 'required|string'
        ]);

        //Check if mobile no exists
        $user = User::where('mobile',$fields['mobile'])->first();

        //Check password
        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response->json([
                'message'=>'Please provide valid credentials'
            ],401);
        }

        if($user->blocked == 1){
            return response([
                'message'=>'Kindly contact admin'
            ],401);
        }

        $token = $user->createToken('mobileLoginToken')->plainTextToken;
        $response = [
            'user'=> $user,
            'token'=> $token
        ];
        return response($response,201);
    }




    function logout(Request $request){
        auth()->user()->tokens()->delete();
        return ['message'=>'Logged out'];
    }

   



    

    function changePassword(Request $request){
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
            'new_password' => 'required|string',
        ]);

        //Check if email exists
        $user = User::where('email',$fields['email'])->first();

        //Check password
        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response([
                'message'=>'Please provide valid credentials'
            ],401);
        }else{
            $user->password =  bcrypt($fields['new_password']);
            $user->save();
            auth()->user()->tokens()->delete();
        }

        $token = $user->createToken('webapp')->plainTextToken;
        $response = [
            'Message'=> 'Password Changed Successfully,Login with new Password',
            'status'=> 1
            // 'user'=> $user,
            // 'token'=> $token
        ];
        return response($response,200);
    }

    public function allUsers(Request $request)
    {
        if($request->customers == 'true'){
            return User::where('type',10)->paginate(50);
        }
        return User::where('type','<',10)->paginate(50);
    }
    public function update(Request $request)
    {
        $obj = User::find($request->id);
        $obj->update($request->all());
        return $obj;
    }

    function registerUser(Request $request){
        $fields = $request->validate([
            'name' => 'required|string',
            'mobile' => 'required|string|unique:users,mobile',
            'type' => 'required',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name'=> $fields['name'],
            'email'=> $fields['email'],
            'mobile'=> $fields['mobile'],
            'type'=> $fields['type'],
            'password'=> bcrypt($fields['password'])
        ]);
        return response($user,201);
    }



     // Doctor Registration
    //  namespace App\Http\Controllers;

    //  use App\Models\Doctor;
    //  use Illuminate\Http\Request;
    //  use Illuminate\Support\Facades\Hash;
    //  use Illuminate\Support\Facades\Validator;
    //  use Illuminate\Support\Facades\Log; // Add this line
     
    // //  class AuthController extends Controller
    // //  {
    //      public function register(Request $request)
    //      {
    //          $validator = Validator::make($request->all(), [
    //              'doctor_name' => 'required|string',
    //              'registration_number' => 'required|string|unique:doctors',
    //              'speciality' => 'required|string',
    //              'education' => 'required|string',
    //              'contact' => 'required|string',
    //              'email' => 'required|string|email|unique:doctors',
    //              'password' => 'required|string|confirmed|min:6',
    //          ]);
     
    //          if ($validator->fails()) {
    //              return response()->json($validator->errors(), 400);
    //          }
     
    //          try {
    //              $doctor = Doctor::create([
    //                  'doctor_name' => $request->doctor_name,
    //                  'registration_number' => $request->registration_number,
    //                  'speciality' => $request->speciality,
    //                  'education' => $request->education,
    //                  'contact' => $request->contact,
    //                  'email' => $request->email,
    //                  'password' => Hash::make($request->password), // Hashing the password
    //              ]);
     
    //              return response()->json(['message' => 'Doctor registered successfully', 'doctor' => $doctor], 201);
    //          } catch (\Exception $e) {
    //              Log::error('Registration error: ' . $e->getMessage());
    //              return response()->json(['error' => 'An error occurred while registering the doctor.'], 500);
    //          }
    //      }
    // //  }
     







    // // Doctor Login
    // public function login(Request $request)
    // {
    //     $credentials = $request->validate([
    //         'email' => 'required|string|email',
    //         'password' => 'required|string',
    //     ]);
    
    //     // Check if user exists
    //     $user = User::where('email', $credentials['email'])->first();
    //     if (!$user) {
    //         return response()->json(['message' => 'User not found'], 404);
    //     }
    
    //     // Check credentials
    //     if (!Auth::attempt($credentials)) {
    //         return response()->json(['message' => 'Invalid credentials'], 401);
    //     }
    
    //     // Get authenticated user
    //     $doctor = Auth::user();
    
    //     // Create a token for the user
    //     $token = $doctor->createToken('doctor_token')->plainTextToken;
    
    //     return response()->json([
    //         'message' => 'Login successful',
    //         'doctor' => $doctor,
    //         'token' => $token,
    //     ], 200);
    // }



    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

}

