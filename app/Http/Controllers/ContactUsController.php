<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ContactUsController extends Controller
{


    public function ScrapVehicleData()
    {
        // Fetch all records from the contact_us table
        $ScrapVehicleData = ContactUs::all();

        // Return the data as a JSON response
        return response()->json($ScrapVehicleData);
    }
    
    /**
     * Store the form input in the database.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'mobile' => 'required|string|max:20',
            'location' => 'required|string|max:255',
            'vehicle_category' => 'required|string',
            'vehicle_manufacturer'=>'required|string',
            'vehicle_registration_number' => 'required|string|max:255',

            "vehicle_description" => 'required|string|max:255',
            "vehicle_manufacturer"=> 'required|string|max:255',
            "registration_source" => 'required|string|max:255',
            "scrap_purpose"=> 'required|string|max:255',
        ]);

        // Create a new ContactUs instance and save the validated data
        $status= '0';
        ContactUs::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'mobile' => $request->input('mobile'),
            'location' => $request->input('location'),
            'vehicle_category' => $request->input('vehicle_category'),
            'vehicle_manufacturer' => $request->input('vehicle_manufacturer'),
            'vehicle_registration_number' => $request->input('vehicle_registration_number'),
            'vehicle_description' => $request->input('vehicle_description'),
            'vehicle_manufacturer' => $request->input('vehicle_manufacturer'),
            'registration_source' => $request->input('registration_source'),
            'scrap_purpose' => $request->input('scrap_purpose'),

            'status'=>$status
        ]);

        // Return a success response
        return response()->json(['message' => 'Contact information saved successfully'], 200);
    }


    public function getEnquiryById($id)
{
    try {
        // Find the Inquiry by ID
        $ContactUs = ContactUs::find($id);

        // Check if inquiry exists
        if (!$ContactUs) {
            return response()->json(['error' => 'Enquiry not found'], 404);
        }

        // Return the inquiry data as a responses
        return response()->json(['Enquiry'=>$ContactUs], 200);
    } catch (\Exception $e) {
        // Handle any exceptions that occur
        return response()->json(['error' => 'Failed to retrieve inquiry', 'details' => $e->getMessage()], 500);
    }
}




    public function updateStatus(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'status' => 'required|string|max:255', // Adjust validation rules as needed
        ]);

        // Get the authenticated user's name
        $updatedBy = Auth::user()->name;

        // Find the record by its ID
        $record = ContactUs::find($id);

        if ($record) {
            // Update the fields
            $record->status = $request->input('status');
            $record->updated_by = $updatedBy;

            // Save the record
            $record->save();

            return response()->json([
                'message' => 'Record updated successfully.',
             
            ]);
        } else {
            return response()->json(['message' => 'Record not found.'], 404);
        }
    }
}





