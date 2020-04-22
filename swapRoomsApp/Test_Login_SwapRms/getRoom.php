<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// Connect to DB
require 'connect.php';

$user = [];
$count = 0;
$rm = [];

if(isset($_REQUEST['id']) ){ 
    // Extracting the data into vars
    $userId = $_REQUEST['id'];
    //print_r($userId);
    
    
    $foundUser = 0; // Booleans were causing me an issue
    // The SQL query
    $sqli = "SELECT * FROM account WHERE userId='$userId' LIMIT 1";

    //print_r($sql);
    if($result = mysqli_query($con, $sqli)){ // Takes all the contents from query and stores in result

    
        // Loop through result 
        while($record = mysqli_fetch_assoc($result)){
            // Storing the records in the allUsers array
            $rm[$count]['rmId'] = $record['rmId'];
            $rm[$count]['userId'] = $record['userId'];
            $rm[$count]['titleRm'] = ucfirst($record['titleRm']);
            $rm[$count]['descripRm'] = ucfirst($record['descripRm']);
            $rm[$count]['addrRm'] = $record['addrRm'];
            $rm[$count]['county'] = ucfirst($record['county']);  //ucfirst() capitalises first letter in a string


            // found user, log in
            $foundUser = 1;
            
            
        }//while
        if($foundUser == 1){
            echo json_encode($rm);
        }
        

        
    }// End of sql query

    
    

    if($foundUser == 0){
        echo json_encode(array("message"=> "Please finish setting up account"));      
    }
    
    
   
}


?>