<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../class/Land.php';
$database = new Database();
$db = $database->getConnection();
$items = new Land($db);
$stmt = $items->getLand();
$itemCount = $stmt->rowCount();

//echo json_encode($itemCount);
if($itemCount > 0){

    $landArr = array();
    $landArr["body"] = array();
    $landArr["itemCount"] = $itemCount;
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $e = array(
            "lan_id" => $lan_id,
            "lan_naam" => $lan_naam,
            "lan_vlag" => $lan_vlag
        );
        array_push($landArr["body"], $e);
    }
    echo json_encode($landArr);
}
else{
    http_response_code(404);
    echo json_encode(
        array("message" => "No record found.")
    );
}
?>