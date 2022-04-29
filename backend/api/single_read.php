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
$item->lan_id = isset($_GET['lan_id']) ? $_GET['lan_id'] : die();

$item->getSingleLand();
if($item->lan_naam != null){
    // create array
    $lan_arr = array(
        "lan_id" =>  $item->lan_id,
        "lan_naam" => $item->lan_naam,
        "lan_vlag" => $item->lan_vlag
    );

    http_response_code(200);
    echo json_encode($lan_arr);
}

else{
    http_response_code(404);
    echo json_encode("Land not found.");
}
?>