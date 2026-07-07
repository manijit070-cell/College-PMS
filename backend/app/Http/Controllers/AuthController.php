<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller {
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;
            // Note: In a real app we'd load roles. For demo we assume roles are seeded.
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => clone $user->load('roles')
            ]);
        }
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    
    public function me(Request $request) {
        return clone $request->user()->load('roles');
    }
    
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
