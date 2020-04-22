<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// Connect to DB
require 'connect.php';

$user = [];
$count = 0;

if(isset($_REQUEST['email']) ){ 
    
    // Extracting the data into vars
    $email = $_REQUEST['email'];
    //print_r($email);
    
    
    $foundUser = 0; // Booleans were causing me an issue
    // The SQL query
    $sql = "SELECT * FROM user WHERE email='$email' LIMIT 1";
    $sqli = "SELECT * FROM account WHERE email='$email' LIMIT 1";

    //print_r($sql);
    if($result = mysqli_query($con, $sql)){ // Takes all the contents from query and stores in result

    
        // Loop through result 
        while($record = mysqli_fetch_assoc($result)){
            // Storing the records in the allUsers array
            $user[$count]['userId'] = $record['userId'];
            $user[$count]['email'] = $record['email'];
            $user[$count]['fname'] = $record['fname'];
            $user[$count]['lname'] = $record['lname'];
            $user[$count]['preferEmail'] = $record['preferEmail'];
            // $user[$count]['titleRm'] = $record['titleRm'];
            // $user[$count]['descripRm'] = $record['descripRm'];
            // $user[$count]['addrRm'] = $record['addrRm'];

            // found user, log in
            $foundUser = 1;
            
            
        }//while
        echo json_encode($user);
        

        
    }// End of sql query

    
    

    if($foundUser == 0){
        echo json_encode(array("message"=> "Please finish setting up account"));      
    }
    
    
   
}



?>