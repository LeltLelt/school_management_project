<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Login data validate
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Email or password incorrect'
            ], 401);
        }


        $user = Auth::user();

        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json([
            'message' => 'Login successful',

            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'organization_id' => $user->organization_id,
                'role_id' => $user->role_id,
            ],

            'token' => $token
        ]);
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();


        return response()->json([
            'message' => 'Logout successful'
        ]);
    }


public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',

            'email' => 'required|email|unique:users,email',

            'password' => 'required|min:6|confirmed',

            'organization_id' => 'required|exists:organizations,id',
        ]);


        // Signup user ကို student role ပေးမယ်
        $studentRole = Role::where(
            'name',
            'Student'
        )->first();


        if (!$studentRole) {
            return response()->json([
                'message' => 'Student role not found.'
            ], 500);
        }


        $user = User::create([
            'name' => $request->name,

            'email' => $request->email,

            'password' => Hash::make(
                $request->password
            ),

            'organization_id' => $request->organization_id,

            'role_id' => $studentRole->id,
        ]);


        return response()->json([
            'message' => 'Signup successful',

            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'organization_id' => $user->organization_id,
                'role_id' => $user->role_id,
                'role' => $studentRole->name,
            ],
        ], 201);
    }
}
