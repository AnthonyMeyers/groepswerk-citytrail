<?php
class Land{
    // Connection
    private $conn;
    // Table
    private $db_table = "gw2_land";
    // Columns
    public $lan_id;
    public $lan_naam;
    public $lan_vlag;
    // Db connection
    public function __construct($db){
        $this->conn = $db;
    }
    // GET ALL
    public function getLand(){
        $sqlQuery = "SELECT lan_id, lan_naam, lan_vlag FROM " . $this->db_table . "";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }
    // CREATE
    public function createLand(){
        $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        lan_naam = :lan_naam, 
                        lan_vlag = :lan_vlag";

        $stmt = $this->conn->prepare($sqlQuery);

        // sanitize
        $this->lan_naam=htmlspecialchars(strip_tags($this->lan_naam));
        $this->lan_vlag=htmlspecialchars(strip_tags($this->lan_vlag));

        // bind data
        $stmt->bindParam(":lan_naam", $this->lan_naam);
        $stmt->bindParam(":lan_vlag", $this->lan_vlag);

        if($stmt->execute()){
            return true;
        }
        return false;
    }
    // READ single
    public function getSingleLand(){
        $sqlQuery = "SELECT
                        lan_id, 
                        lan_naam, 
                        lan_vlag
                      FROM
                        ". $this->db_table ."
                    WHERE 
                       lan_id = ?
                    LIMIT 0,1";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->bindParam(1, $this->lan_id);
        $stmt->execute();
        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->lan_naam = $dataRow['lan_naam'];
        $this->lan_vlag = $dataRow['lan_vlag'];
    }
    // UPDATE
    public function updateLand(){
        $sqlQuery = "UPDATE
                        ". $this->db_table ."
                    SET
                        lan_naam = :lan_naam, 
                        lan_vlag = :lan_vlag
                    WHERE 
                        lan_id = :lan_id";

        $stmt = $this->conn->prepare($sqlQuery);

        $this->lan_naam=htmlspecialchars(strip_tags($this->lan_naam));
        $this->lan_vlag=htmlspecialchars(strip_tags($this->lan_vlag));
        $this->lan_id=htmlspecialchars(strip_tags($this->lan_id));

        // bind data
        $stmt->bindParam(":lan_naam", $this->lan_naam);
        $stmt->bindParam(":lan_vlag", $this->lan_vlag);
        $stmt->bindParam(":lan_id", $this->lan_id);

        if($stmt->execute()){
            return true;
        }
        return false;
    }
    // DELETE
    function deleteLand(){
        $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE lan_id = ?";
        $stmt = $this->conn->prepare($sqlQuery);

        $this->lan_id=htmlspecialchars(strip_tags($this->lan_id));

        $stmt->bindParam(1, $this->lan_id);

        if($stmt->execute()){
            return true;
        }
        return false;
    }
}
?>