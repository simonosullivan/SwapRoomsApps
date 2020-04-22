<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// Connect to DB
require 'connect.php';


if(isset($_REQUEST['id']) ){ 
    
    // Extracting the data into vars
    $offerId = $_REQUEST['id'];

    // The SQL query
    $sql = "SELECT * FROM offers WHERE offerId=$offerId";
    $myOffer = [];

    if($result = mysqli_query($con, $sql)){

        while($record = mysqli_fetch_assoc($result)){
            $myOffer['option1'] = $record['option1'];
            $myOffer['option2'] = $record['option2'];
            $myOffer['option3'] = $record['option3'];
            $myOffer['startDate'] = $record['startDate'];
            $myOffer['endDate'] = $record['endDate'];
        }
    }

    echo json_encode($myOffer);    

}

    


?>