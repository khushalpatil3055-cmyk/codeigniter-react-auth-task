<?php
namespace App\Filters;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class AuthFilter implements FilterInterface {
    public function before(RequestInterface $request, $arguments = null) {
        helper('jwt');
        $header = $request->getHeaderLine('Authorization');
        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return response()->setJSON(['status' => false, 'message' => 'No token provided'])->setStatusCode(401);
        }
        $token = substr($header, 7);
        $decoded = decode_jwt($token);
        if (!$decoded) {
            return response()->setJSON(['status' => false, 'message' => 'Invalid or expired token'])->setStatusCode(401);
        }
        $request->uid = $decoded->uid;
    }
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}