<?php
namespace App\Controllers\Api;
use App\Controllers\BaseController;
use App\Models\AuthUserModel;
use App\Models\TeacherModel;

class TeacherController extends BaseController {

    public function getUsers() {
        $userModel = new AuthUserModel();
        $users = $userModel->findAll();
        // Remove passwords
        foreach ($users as &$u) unset($u['password']);
        return $this->response->setJSON(['status' => true, 'data' => $users]);
    }

    public function getTeachers() {
        $db = \Config\Database::connect();
        $teachers = $db->table('teachers t')
            ->select('t.*, u.email, u.first_name, u.last_name')
            ->join('auth_user u', 'u.id = t.user_id')
            ->get()->getResultArray();
        return $this->response->setJSON(['status' => true, 'data' => $teachers]);
    }
}