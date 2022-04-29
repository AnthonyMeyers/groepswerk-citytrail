<?php
class Database {
    private $host = "185.115.218.166";
    private $database_name = "fs_stijn";
    private $username = "fs_stijn";
    private $password = "93ZMFPZx1usi";
    public $conn;
    public function getConnection(){
        $this->conn = null;
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Database could not be connected: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>