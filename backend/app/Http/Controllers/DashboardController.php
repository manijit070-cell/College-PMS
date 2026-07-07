<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Faculty;
use App\Models\ApprovalRequest;

class DashboardController extends Controller {
    public function stats(Request $request) {
        $user = $request->user();
        if ($user->hasRole('Administrator')) {
            return response()->json([
                'total_faculty' => Faculty::count(),
                'pending_requests' => ApprovalRequest::where('status', 'pending')->count()
            ]);
        }
        return response()->json(['message' => 'Unauthorized'], 403);
    }
}
