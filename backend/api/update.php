<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../class/Land.php';

$database = new Database();
$db = $database->getConnection();

$item = new Land($db);

$data = json_decode(file_get_contents("php://input"));

$item->lan_id = $data->lan_id;

// employee values
$item->lan_naam = $data->lan_naam;
$item->lan_vlag = $data->lan_vlag;

if($item->updateLand()){
    echo json_encode("Land data updated.");
} else{
    echo json_encode("Data could not be updated");
}
?>