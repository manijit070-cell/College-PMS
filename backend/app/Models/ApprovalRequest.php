<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ApprovalRequest extends Model {
    protected $fillable = ['user_id', 'model_type', 'model_id', 'action_type', 'new_data', 'status', 'comments', 'reviewed_by'];
    protected $casts = ['new_data' => 'array'];
    public function user() { return $this->belongsTo(User::class); }
    public function reviewer() { return $this->belongsTo(User::class, 'reviewed_by'); }
}
