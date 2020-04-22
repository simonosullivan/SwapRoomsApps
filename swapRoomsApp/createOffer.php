<?php
// Connect to DB
require 'connect.php';

// Takee in the contents sent this file
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);

    
    // Extracting data
    $offerId = mysqli_real_escape_string($con, trim($request->offerId));
    $userId = mysqli_real_escape_string($con, trim($request->userId));
    $option1 = mysqli_real_escape_string($con, trim($request->option1));
    $option2 = mysqli_real_escape_string($con, trim($request->option2));
    $option3 = mysqli_real_escape_string($con, trim($request->option3));
    $start = mysqli_real_escape_string($con, trim($request->start));
    $end = mysqli_real_escape_string($con, trim($request->end));
   
    if($offerId != null){
        // has an offerId
        $sql = "UPDATE offers SET option1 = '$option1', option2 = '$option2', option3 = '$option3',
         startDate = '$start', endDate = '$end' WHERE offerId = $offerId ";
    }else{
        $offerId = null;
        // new offer
        $sql="INSERT INTO offers 
        (userId, option1, option2, option3, startDate, endDate, status, acceptor) 
        VALUES('{$userId}', '{$option1}', '{$option2}', '{$option3}', '{$start}', '{$end}', 'open', '')";
    }

    if(mysqli_query($con, $sql)){ 
        // send http code if successful
        echo json_encode(array("message"=> "Offer created or updated"));
    }else{
        echo json_encode(array("message"=> "Failed to create or update offer"));
    }
}

?>