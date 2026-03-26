<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// --------------------------------------------------------------------
// Route Definitions
// --------------------------------------------------------------------

// Default route for root "/"
$routes->get('/', function() {
    return "Welcome to CodeIgniter API!";
});

// --------------------------------------------------------------------
// API Routes
// --------------------------------------------------------------------
// CHANGE THIS LINE:
$routes->group('api', ['namespace' => 'App\Controllers\Api'], function($routes) {
    // Public routes
    $routes->post('register', 'AuthController::register');
    $routes->post('login', 'AuthController::login');
    
    // Protected routes - ADD THE FILTER HERE
    $routes->get('teachers', 'TeacherController::getTeachers', ['filter' => 'auth']); 
    $routes->get('users', 'TeacherController::getUsers', ['filter' => 'auth']); 
});