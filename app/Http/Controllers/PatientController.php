<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

use App\Http\Controllers\Controller;

class PatientController extends Controller
{
    // Get all patients
    public function index()
    {
        $patients = Patient::all();
        return response()->json($patients, 200);
        
    }

    // Store a new patient
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:patients,email',
            'phone' => 'required',
            'address' => 'required',
            'dob' => 'required|date',
            // 'gender' => 'required'
        ]);

        $patient = Patient::create($request->all());

        return response()->json($patient, 201);
    }

    // Get a single patient
    // public function show(Patient $patient)
    // {
    //     return response()->json($patient, 200);
    // }

    // Update a patient
    public function update(Request $request, Patient $patient)
    {
        $request->validate([
            'name' => 'sometimes|required',
            'email' => 'sometimes|required|email|unique:patients,email,' . $patient->id,
            'phone' => 'sometimes|required',
            'address' => 'sometimes|required',
            'dob' => 'sometimes|required|date',
            // 'gender' => 'sometimes|required'
        ]);

        $patient->update($request->all());

        return response()->json($patient, 200);
    }

    // Delete a patient
    public function destroy(Patient $patient)
    {
        $patient->delete();
        return response()->json(null, 204);
    }

    public function getSuggestions(Request $request)
    {
        $name = $request->query('name');

        // Assuming you have a Patient model
        $patients = Patient::where('name', 'LIKE', "%{$name}%")
            ->get(['id', 'name', 'age', 'address', 'email', 'phone', 'dob']); // Adjust the fields as necessary

        return response()->json($patients);
    }


    public function show($id)
    {
        // Fetch patient by ID or throw a 404 error if not found
        $patient = Patient::findOrFail($id);
        
        // Return the patient data as JSON response
        return response()->json($patient);
    }
}
