

# CodeIgniter 4 & ReactJS - Full Stack Teacher Portal

[cite_start]This project is a Full Stack application developed as an interview task[cite: 1]. [cite_start]It features a CodeIgniter 4 REST API and a ReactJS frontend to manage user registration and teacher data with a focus on relational integrity and security[cite: 2, 3, 16].

## 🚀 Key Features
* [cite_start]**Dual-Table Registration:** A single POST API handles simultaneous insertion into `auth_user` and `teachers` tables while maintaining a 1-1 relationship[cite: 15].
* [cite_start]**JWT Authentication:** Implements token-based authentication to secure all required data-fetching APIs[cite: 4].
* [cite_start]**Relational Data:** Showcases a 1-1 relationship where `auth_user` stores credentials and `teachers` stores profile details using a `user_id` foreign key[cite: 6, 7].
* [cite_start]**React Datatables:** Features separate pages for viewing Auth Users and Teacher profiles using ReactJS[cite: 16].

## 🛠️ Tech Stack
* [cite_start]**Backend:** CodeIgniter 4 (PHP 8.x) [cite: 2]
* [cite_start]**Frontend:** ReactJS with Axios [cite: 16]
* [cite_start]**Database:** MySQL (compatible with PgSql) [cite: 5]
* [cite_start]**Auth:** JSON Web Tokens (JWT) [cite: 4]

## 📋 Prerequisites
* [cite_start]XAMPP or Laragon (Apache & MySQL) [cite: 20]
* [cite_start]Node.js & npm [cite: 20]
* [cite_start]Composer [cite: 20]

## ⚙️ Setup Instructions 

### 1. Database Setup
1. Open **phpMyAdmin**.
2. Create a new database named `teacher_db`.
3. [cite_start]Import the SQL export file located at `/db/database.sql` into your new database[cite: 19].

### 2. Backend Configuration
1. Navigate to the `backend` folder.
2. [cite_start]Rename `env` to `.env` and update your local database credentials[cite: 20]:
   ```env
   database.default.hostname = localhost
   database.default.database = teacher_db
   database.default.username = root
   database.default.password = 
   database.default.DBDriver = MySQLi
   ```
3. Run `composer install` to install dependencies.
4. Start the backend server: `php spark serve`.

### 3. Frontend Configuration
1. Navigate to the `frontend` folder.
2. [cite_start]Run `npm install` to install React dependencies[cite: 20].
3. [cite_start]Start the application: `npm start`[cite: 20].

## 🛣️ API Endpoints
* [cite_start]`POST /api/register` - Public (Handles both tables) [cite: 15]
* [cite_start]`POST /api/login` - Public (Returns JWT) [cite: 3]
* [cite_start]`GET /api/users` - Protected (Requires Token) [cite: 4, 16]
* [cite_start]`GET /api/teachers` - Protected (Requires Token) [cite: 4, 16]

---
*Developed by [Khushal Patil] for the Full Stack Developer Intern Task.*
```

