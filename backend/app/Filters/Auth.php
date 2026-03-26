<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader) {
            return Services::response()
                ->setStatusCode(401)
                ->setJSON(['error' => 'Authorization header missing']);
        }

        // Extract token from "Bearer TOKEN"
        $token = null;
        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
        }

        if (!$token) {
            return Services::response()
                ->setStatusCode(401)
                ->setJSON(['error' => 'Token not provided']);
        }

        try {
            $decoded = JWT::decode($token, new Key('YOUR_SECRET_KEY', 'HS256'));
            // You can set user data globally
            $request->user = $decoded;
        } catch (\Exception $e) {
            return Services::response()
                ->setStatusCode(401)
                ->setJSON(['error' => 'Invalid token: ' . $e->getMessage()]);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Nothing needed here
    }
}