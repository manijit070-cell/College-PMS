const fs = require('fs');
const path = require('path');

const backendPath = path.join(__dirname, 'backend');

function ensureDirSync(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function writeFileSync(filePath, content) {
    ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
}

// 1. Migrations
const migrations = {
    '2026_01_01_000002_create_faculty_table.php': `
<?php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('faculty', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('department_id')->constrained()->onDelete('cascade');
            $table->string('employee_id')->unique();
            $table->string('designation');
            $table->date('joining_date')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('faculty'); }
};`,
    '2026_01_01_000003_create_publications_table.php': `
<?php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('faculty_id')->constrained('faculty')->onDelete('cascade');
            $table->string('title');
            $table->string('journal_name');
            $table->string('year');
            $table->string('issn')->nullable();
            $table->string('link')->nullable();
            $table->string('status')->default('approved'); // pending, approved, rejected
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('publications'); }
};`,
    '2026_01_01_000004_create_approval_requests_table.php': `
<?php
use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('approval_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('model_type');
            $table->unsignedBigInteger('model_id')->nullable();
            $table->string('action_type'); // create, update, delete
            $table->json('new_data');
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->text('comments')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('approval_requests'); }
};`
};

for (const [filename, content] of Object.entries(migrations)) {
    writeFileSync(path.join(backendPath, 'database/migrations', filename), content);
}

// 2. Models
const models = {
    'Department.php': `
<?php
namespace App\\Models;
use Illuminate\\Database\\Eloquent\\Model;
class Department extends Model {
    protected $fillable = ['name', 'code'];
    public function faculty() { return $this->hasMany(Faculty::class); }
}`,
    'Faculty.php': `
<?php
namespace App\\Models;
use Illuminate\\Database\\Eloquent\\Model;
class Faculty extends Model {
    protected $table = 'faculty';
    protected $fillable = ['user_id', 'department_id', 'employee_id', 'designation', 'joining_date'];
    public function user() { return $this->belongsTo(User::class); }
    public function department() { return $this->belongsTo(Department::class); }
    public function publications() { return $this->hasMany(Publication::class); }
}`,
    'Publication.php': `
<?php
namespace App\\Models;
use Illuminate\\Database\\Eloquent\\Model;
class Publication extends Model {
    protected $fillable = ['faculty_id', 'title', 'journal_name', 'year', 'issn', 'link', 'status'];
    public function faculty() { return $this->belongsTo(Faculty::class); }
}`,
    'ApprovalRequest.php': `
<?php
namespace App\\Models;
use Illuminate\\Database\\Eloquent\\Model;
class ApprovalRequest extends Model {
    protected $fillable = ['user_id', 'model_type', 'model_id', 'action_type', 'new_data', 'status', 'comments', 'reviewed_by'];
    protected $casts = ['new_data' => 'array'];
    public function user() { return $this->belongsTo(User::class); }
    public function reviewer() { return $this->belongsTo(User::class, 'reviewed_by'); }
}`
};

for (const [filename, content] of Object.entries(models)) {
    writeFileSync(path.join(backendPath, 'app/Models', filename), content);
}

// 3. Controllers
const controllers = {
    'AuthController.php': `
<?php
namespace App\\Http\\Controllers;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Auth;
use App\\Models\\User;

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
}`,
    'DashboardController.php': `
<?php
namespace App\\Http\\Controllers;
use Illuminate\\Http\\Request;
use App\\Models\\Faculty;
use App\\Models\\ApprovalRequest;

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
}`
};

for (const [filename, content] of Object.entries(controllers)) {
    writeFileSync(path.join(backendPath, 'app/Http/Controllers', filename), content);
}

// 4. API Routes
const apiRoutes = `
<?php
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\AuthController;
use App\\Http\\Controllers\\DashboardController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
});
`;
writeFileSync(path.join(backendPath, 'routes/api.php'), apiRoutes);

console.log('Backend files generated successfully!');
