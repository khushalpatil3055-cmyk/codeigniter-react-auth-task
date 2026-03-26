<?php
namespace App\Database\Migrations;
use CodeIgniter\Database\Migration;

class CreateTeachersTable extends Migration {
    public function up() {
        $this->forge->addField([
            'id'              => ['type' => 'INT', 'auto_increment' => true],
            'user_id'         => ['type' => 'INT'],
            'university_name' => ['type' => 'VARCHAR', 'constraint' => 150],
            'gender'          => ['type' => 'ENUM', 'constraint' => ['male','female','other']],
            'year_joined'     => ['type' => 'YEAR'],
            'subject'         => ['type' => 'VARCHAR', 'constraint' => 100],
            'phone'           => ['type' => 'VARCHAR', 'constraint' => 20],
            'created_at'      => ['type' => 'DATETIME', 'null' => true],
            'updated_at'      => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('user_id', 'auth_user', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('teachers');
    }
    public function down() {
        $this->forge->dropTable('teachers');
    }
}