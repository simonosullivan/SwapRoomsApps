<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');
// Connect to DB
require 'connect.php';

// Takee in the contents sent this file
$postdata = file_get_contents("php://input");
$status = null;


if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    // Extracting data
    $userId = $request->userId;
    $ans = $request->ans;
    $acceptor = $request->accepted;
    $offerId = $request->offerId;

    $sqli= "SELECT status FROM offers where offers.offerId = $offerId and offers.userId = $userId";

    if($result = mysqli_query($con, $sqli)){
        while($record = mysqli_fetch_assoc($result)){
            $status = $record['status'];
        }
    }


    if($status == 'open' && $ans == "accept"){
        $sql = "UPDATE offers SET status = 'pending', acceptor='$acceptor' WHERE offers.userId = $userId and offers.offerId = $offerId";

        if(mysqli_query($con, $sql)){ 
            // send http code if successful
            echo json_encode(array("message"=> "Offer pending"));
        }else{
            echo json_encode(array("message"=> "Failed "));
        }
    }
    else if($status == 'pending' && $ans == "accept"){
        $sql = "UPDATE offers SET status = 'closed' WHERE offers.userId = $userId and offers.offerId = $offerId";

        if(mysqli_query($con, $sql)){ 
            // send http code if successful
            echo json_encode(array("message"=> "Offer Accepted"));
        }else{
            echo json_encode(array("message"=> "Failed "));
        }
    }
    else if($status == 'pending' && $ans == "reject"){
        $sql = "UPDATE offers SET status = 'open', acceptor='' WHERE offers.userId = $userId and offers.offerId = $offerId";

        if(mysqli_query($con, $sql)){ 
            // send http code if successful
            echo json_encode(array("message"=> "Offer Rejected"));
        }else{
        echo json_encode(array("message"=> "Failed "));
        }
    }
    else if (($status == 'closed' && $ans == "reject") || ($status == 'closed' && $ans == "accept")){
        echo json_encode(array("message"=>"This offer is already closed."));
    }
    else{
        echo json_encode(array("message"=> "You are not the offer owner"));
    }
  

    
}

?>

