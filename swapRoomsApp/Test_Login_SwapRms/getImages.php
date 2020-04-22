<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// Connect to DB
require 'connect.php';

$images = [];
if(isset($_REQUEST['id']) ){ 
    
    // Extracting the data into vars
    $userId = $_REQUEST['id'];

    // The SQL query
    $sql_images = "SELECT * FROM picspath WHERE userId = $userId";


    if($result = mysqli_query($con, $sql_images)){
        while($record = mysqli_fetch_assoc($result)){
            $images['userId'] = $record['userId'];
            $images['profPic'] = $record['profPic'];
            $images['pathToImages'] = $record['pathToImages'];
        }
        //print_r($images);
    }


        


    echo json_encode($images, JSON_UNESCAPED_SLASHES);    

}

    


?>