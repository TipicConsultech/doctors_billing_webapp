<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inquiry;
use Illuminate\Support\Facades\Auth;


class InquiryController extends Controller
{ 

//     public function saveContact(Request $request)
// {
//     // Validate the incoming request data
//     $validatedData = $request->validate([
//         'name' => 'required|string|max:255',
//         'email' => 'required|string|email|max:255',
//         'mobile' => 'required|string|max:13',
//         'queries' => 'required|string|max:255',
//     ]);
 
//     try {
//         // Create a new Inquiry instance and save the validated data
//          // Define form_type here
        
//         Inquiry::create([
//             'name' => $validatedData['name'],
//             'email' => $validatedData['email'],
//             'contact_number' => $validatedData['mobile'],
//             'message' => $validatedData['queries'],
//             'form_type' => 0,
//         ]);

//         // Return a success response
//         return response()->json(['message' => 'Contact information saved successfully'], 200);
//     } catch (\Exception $e) {
//         // Handle any exceptions that occur
//         return response()->json(['error' => 'Failed to save contact information', 'details' => $e->getMessage()], 500);
//     }
// }
public function getEnquiryById($id)
{
    try {
        // Find the Inquiry by ID
        $inquiry = Inquiry::find($id);

        // Check if inquiry exists
        if (!$inquiry) {
            return response()->json(['error' => 'Inquiry not found'], 404);
        }

        // Return the inquiry data as a response
        return response()->json(['Enquiry' => $inquiry], 200);
    } catch (\Exception $e) {
        // Handle any exceptions that occur
        return response()->json(['error' => 'Failed to retrieve inquiry', 'details' => $e->getMessage()], 500);
    }
}


public function saveMultiEnquiry(Request $request)
{
    // Validate the incoming request data
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255',
        'mobile' => 'required|string|max:13',
        'queries' => 'required|string|max:255',
        'type'=>'required|string'
    ]);
 
    try {
        // Create a new Inquiry instance and save the validated data
        // Define form_type here
        $status='0';
        Inquiry::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'contact_number' => $validatedData['mobile'],
            'message' => $validatedData['queries'],
            'type' => $validatedData['type'],
            'status'=>$status
        ]);

        // Return a success response
        return response()->json(['message' => 'Spare Parts information saved successfully'], 200);
    } catch (\Exception $e) {
        // Handle any exceptions that occur
        return response()->json(['error' => 'Failed to save contact information', 'details' => $e->getMessage()], 500);
    }
}  

public function updateSparePart(Request $request, $id)
{
    // Validate the incoming request data
    $validatedData = $request->validate([
        'status' => 'required|string|max:255',
    ]);

    try {
        // Find the inquiry by ID
        $inquiry = Inquiry::findOrFail($id);

        // Update the fields
        $inquiry->update([
            'status' => $validatedData['status'],
            'remark' => $validatedData['remark'] ?? null, // Set to null if not provided
            'updated_by' => auth()->user()->id, // Get the current authenticated user ID
        ]);

        // Return a success response
        return response()->json(['message' => 'Spare Part information updated successfully'], 200);
    } catch (\Exception $e) {
        // Handle any exceptions that occur
        return response()->json(['error' => 'Failed to update spare part information', 'details' => $e->getMessage()], 500);
    }
}



    /**
     * Fetch all contact inquiries from the database.
     */
    public function ContactUS()
{
    // Fetch records where form_type is 0
    $contactUsRecords = Inquiry::where('type', 0)->get();
    
    // Return the data as a JSON response
    return response()->json($contactUsRecords);
}


    public function BuySparePart()
    {
        // Fetch all records from the contact_us table
        $Enquiries = Inquiry::where('type', 1)->get();
        
        // Return the data as a JSON response
        return response()->json($Enquiries);
    }

    public function SellSparePart()
    {
        // Fetch all records from the contact_us table
        $Enquiries = Inquiry::where('type', 2)->get();
        
        // Return the data as a JSON response
        return response()->json($Enquiries);
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
        $record = Inquiry::find($id);

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
