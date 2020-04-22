<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');
// Connect to DB
require 'connect.php';

// Takee in the contents sent this file
//$postdata = file_get_contents("php://input");
$offers = [];
$acceptor="";
$id = "";

if(isset($_REQUEST['id']) ){ 

    // Extracting the data into vars
    $userId = $_REQUEST['id'];
   
    $sql = "SELECT * from  offers WHERE offers.userId = $userId";
    

    if($result = mysqli_query($con, $sql)){
        $count = 0;
		

        while($record = mysqli_fetch_assoc($result)){
            $offers[$count]['offerId'] = $record['offerId'];
            $offers[$count]['userId'] = $record['userId'];
            $offers[$count]['status'] = $record['status'];
            $offers[$count]['acceptor'] = $record['acceptor'];
            
			if($offers[$count]['acceptor'] != ""){
				$acceptor = $offers[$count]['acceptor'];
				$sqlacc= "SELECT userId from user where email = '$acceptor' ";
				if($result1 = mysqli_query($con, $sqlacc)){
					while($record = mysqli_fetch_assoc($result1)){
						$offers[$count]['acceptorId'] = $record['userId'];
					}
				}
				$id = $offers[$count]['acceptorId'];
				$sqlImages= "SELECT * from picspath where userId = $id ";
				if($result2 = mysqli_query($con, $sqlImages)){
					while($record = mysqli_fetch_assoc($result2)){
						$offers[$count]['pathToImages'] = $record['pathToImages'];
					}
				}
			
			}

            if($offers[$count]['status'] == 'open'){
                $offers[$count]['message'] = "Your offer is still open. It will move to Pending offers when someone has accepted your offer.";
            }else if($offers[$count]['status'] == 'pending'){
                $offers[$count]['message'] = "Your offer was accepted by {$offers[$count]['acceptor']}. It is now pending and waiting for you acceptance. View the room you would be staying in ! ";
            }
            else if($offers[$count]['status'] == 'closed'){
                $offers[$count]['message'] = "Your offer to swap rooms was successfully processed. You will be swapping rooms with {$offers[$count]['acceptor']}. We hope you enjoy stay !";
            }

            
            
            $count++;
        }
    
        

        echo json_encode($offers, JSON_UNESCAPED_SLASHES);
    
    }else{
        echo json_encode(array("message"=> "failed query "));
    }
}

?>

