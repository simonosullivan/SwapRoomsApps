<?php
// To allow access to other servers, to get around CORS Error
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// Connect to DB
require 'connect.php';


$token = null;
$headers = apache_request_headers();
// Take in the contents sent this file
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata)){ 
    $request = json_decode($postdata);

    // Extracting the data into vars
    $email = $request->email;
    $password = $request->password;

    // salt and hash password
    $salted = "683794hjkfkkhsdkjajjl".$password."dkdjhid99eu9wjskj";
    $hashed = hash('md5', $salted);

    $allUsers=[];
    $foundUser = 0; // Booleans were causing me an issue
    // The SQL query
    $sql = "SELECT * FROM user";

    if($result = mysqli_query($con, $sql)){ // Takes all the contents from query and stores in result
        $count = 0;
        // Loop through result 
        while($record = mysqli_fetch_assoc($result)){
            // Storing the records in the allUsers array
            $allUsers[$count]['userId']= $record['userId'];
            $allUsers[$count]['email'] = $record['email'];
            $allUsers[$count]['password'] = $record['password'];

            // Check if username and hashed password match with existing user  // hashed needs to go in
            if($email == $allUsers[$count]['email'] && $hashed == $allUsers[$count]['password']){
                // found user, log in
                $foundUser = 1;
                $userId = $allUsers[$count]['userId'];
                echo json_encode(   // send back succesful message and token to allow user to access locked pages
                    array(
                        "message"=> "Successful login",
                        "token" => "hhdkdkdk",
                        "userId"=> $userId,
                        "email" => $email

                    ));
                    
                break ;
            }

            $count++;
        } 
        
        if($foundUser == 0){
            echo json_encode(array("message"=> "Login failed"));      
        }
    }// end of sql query

}

?>