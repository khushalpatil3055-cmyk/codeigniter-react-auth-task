<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

define('JWT_SECRET', 'your_super_secret_key_change_this');

function create_jwt($userId, $email) {
    $payload = [
        'iss' => 'internship-app',
        'iat' => time(),
        'exp' => time() + 3600,
        'uid' => $userId,
        'email' => $email,
    ];
    return JWT::encode($payload, JWT_SECRET, 'HS256');
}

function decode_jwt($token) {
    try {
        return JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
    } catch (Exception $e) {
        return null;
    }
}