<?php
namespace App\Controllers\Api;
use App\Controllers\BaseController;
use App\Models\AuthUserModel;
use App\Models\TeacherModel;

class AuthController extends BaseController {

   public function register() {
    $db = \Config\Database::connect();
    $db->transStart(); // Start transaction

    try {
        $userModel = new AuthUserModel();
        $userId = $userModel->insert([
            'email'      => $this->request->getVar('email'),
            'first_name' => $this->request->getVar('first_name'),
            'last_name'  => $this->request->getVar('last_name'),
            'password'   => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
        ]);

        $teacherModel = new TeacherModel();
        $teacherModel->insert([
            'user_id'         => $userId,
            'university_name' => $this->request->getVar('university_name'),
            'gender'          => $this->request->getVar('gender'),
            'year_joined'     => $this->request->getVar('year_joined'),
            'subject'         => $this->request->getVar('subject'),
            'phone'           => $this->request->getVar('phone'),
        ]);

        $db->transComplete(); // Commit changes
        
        helper('jwt');
        $token = create_jwt($userId, $this->request->getVar('email'));
        return $this->response->setJSON(['status' => true, 'message' => 'Success', 'token' => $token]);

    } catch (\Exception $e) {
        $db->transRollback(); // Undo everything if an error occurs
        return $this->response->setJSON(['status' => false, 'error' => $e->getMessage()])->setStatusCode(500);
    }
}
    public function getUsers()
{
    $model = new \App\Models\AuthUserModel();
    
    // Fetch all users from the auth_user table
    $users = $model->findAll();

    return $this->response->setJSON([
        'status' => true,
        'data'   => $users // This matches the res.data.data in your React code
    ]);
}
    public function login() {
        helper('jwt');
        $userModel = new AuthUserModel();
        $user = $userModel->where('email', $this->request->getVar('email'))->first();

        if (!$user || !password_verify($this->request->getVar('password'), $user['password'])) {
            return $this->response->setJSON(['status' => false, 'message' => 'Invalid credentials'])->setStatusCode(401);
        }

        $token = create_jwt($user['id'], $user['email']);
        return $this->response->setJSON(['status' => true, 'message' => 'Login successful', 'token' => $token, 'user' => $user]);
    }
}