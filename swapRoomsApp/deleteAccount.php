<?php
// To allow access to other servers, to get around CORS Error
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// Connect to DB
require 'connect.php';


//$headers = apache_request_headers();

// Take in the contents sent this file
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata)){ 
    $request = json_decode($postdata);

    $userId = $request;

    // The SQL query
    $sql = "DELETE FROM user where userId = $userId";

    if(mysqli_query($con, $sql)){ 
        echo json_encode(array("message"=> "Deleted Account"));
    }// end of sql query

}

?>