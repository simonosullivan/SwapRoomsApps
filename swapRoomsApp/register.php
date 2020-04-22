<?php
// Connect to DB
require 'connect.php';

// Takee in the contents sent this file
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);

    // Extracting data
    $email = mysqli_real_escape_string($con, trim($request->email));
    $password = mysqli_real_escape_string($con, trim($request->password));
    // $fname = mysqli_real_escape_string($con, trim($request->firstName));
    // $lname = mysqli_real_escape_string($con, trim($request->lastName));

    // salt and hash password
    $salted = "683794hjkfkkhsdkjajjl".$password."dkdjhid99eu9wjskj";
    $hashed = hash("md5", $salted);

    // Store in DB
    $sql = "INSERT INTO user (email, password) VALUES('{$email}','{$hashed}')";
        
    if(mysqli_query($con, $sql)){ 
        // send http code if successful
        http_response_code(201);
    }else{
        http_response_code(422);
    }
}

?>