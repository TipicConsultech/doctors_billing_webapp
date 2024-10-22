<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DescriptionController extends Controller
{
    public function store(Request $request) {
        $validatedData = $request->validate([
            '*.bill_id' => 'required|exists:bills,id', // Check that bill_id exists in bills table
            '*.description' => 'required|string',
            '*.quantity' => 'required|integer',
            '*.price' => 'required|numeric',
            '*.gst' => 'required|numeric',
        ]);
    
        foreach ($validatedData as $descriptionData) {
            Description::create($descriptionData);
        }
    
        return response()->json(['message' => 'Descriptions added successfully'], 201);
    }
    
}
