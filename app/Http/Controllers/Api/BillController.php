<?php
namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Description;
use Illuminate\Http\Request;

class BillController extends Controller
{
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'patient_name' => 'required|string|max:255',
    //         'patient_address' => 'required|string',
    //         'patient_email' => 'nullable|email',
    //         'patient_contact' => 'required|string',
    //         'patient_dob' => 'nullable|date',
    //         'doctor_name' => 'required|string|max:255',
    //         'registration_number' => 'required|string',
    //         'visit_date' => 'required|date',
    //         'descriptions' => 'required|array',
    //         'descriptions.*.description' => 'required|string',
    //         'descriptions.*.quantity' => 'required|integer',
    //         'descriptions.*.price' => 'required|numeric',
    //         'descriptions.*.gst' => 'required|numeric',
    //         'descriptions.*.total' => 'required|numeric',
    //     ]);

    //     // Create the bill
    //     $bill = Bill::create($request->only([
    //         'patient_name',
    //         'patient_address',
    //         'patient_email',
    //         'patient_contact',
    //         'patient_dob',
    //         'doctor_name',
    //         'registration_number',
    //         'visit_date',
    //     ]));

    //     // Create descriptions associated with the bill
    //     foreach ($request->descriptions as $descriptionData) {
    //         $bill->descriptions()->create($descriptionData);
    //     }

    //     return response()->json(['message' => 'Bill created successfully', 'bill' => $bill], 201);
    // }



    

    
    
   
        public function store(Request $request)
        {
            // Validate the request
            $request->validate([
                'patient_name' => 'required|string',
                'address' => 'required|string',
                'email' => 'required|email',
                'contact' => 'required|string',
                'dob' => 'required|date',
                'doctor_name' => 'required|string',
                'registration_number' => 'required|string',
                'visit_date' => 'required|date',
            ]);
    
            // Create a new Bill record
            $bill = Bill::create([
                'patient_name' => $request->patient_name,
                'patient_address' => $request->address,
                'patient_email' => $request->email,
                'patient_contact' => $request->contact,
                'patient_dob' => $request->dob,
                'doctor_name' => $request->doctor_name,
                'registration_number' => $request->registration_number,
                'visit_date' => $request->visit_date,
            ]);
    
            return response()->json(['id' => $bill->id], 201);
        }
    }
    
    

