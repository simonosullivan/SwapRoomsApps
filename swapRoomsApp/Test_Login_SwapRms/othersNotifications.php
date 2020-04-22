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

if(isset($_REQUEST['acceptor']) ){ 

    // Extracting the data into vars
    $acceptor = $_REQUEST['acceptor'];
   
    $count = 0;
    $sql = "SELECT * from  offers WHERE offers.acceptor = '$acceptor'";
    if($result = mysqli_query($con, $sql)){
        while($record = mysqli_fetch_assoc($result)){
            $offers[$count]['offerId'] = $record['offerId'];
            $offers[$count]['userId'] = $record['userId'];
            $offers[$count]['status'] = $record['status'];
            $offers[$count]['acceptor'] = $record['acceptor'];
            $userId = $offers[$count]['userId'];

            $sqlUser = "SELECT email from user where user.userId = $userId";
            $sqlImages = "SELECT * from picspath where userId = '$userId' LIMIT 1";

            if($result2 =mysqli_query($con, $sqlUser)){
                //echo "in";
                while($record2 = mysqli_fetch_assoc($result2)){
                    $offers[$count]['email'] = $record2['email'];
                }
            }

            if($result3 =mysqli_query($con, $sqlImages)){
                //echo "in";
                while($record3 = mysqli_fetch_assoc($result3)){
                    $offers[$count]['pathToImages'] = $record3['pathToImages'];
                }
            }

            if($offers[$count]['status'] == 'open'){
                $offers[$count]['message'] = "Your offer is still open. It will move to Pending offers when someone has accepted your offer.";
            }else if($offers[$count]['status'] == 'pending'){
                $offers[$count]['message'] = "You now have to wait until the {$offers[$count]['email']} has seen your room and accepts the swap.";
            }
            else if($offers[$count]['status'] == 'closed'){
                $offers[$count]['message'] = "Deal Complete. You and {$offers[$count]['email']} have successfully swapped rooms. Enjoy :)";
            }
            
            $count++;
        }
        //print_r($offers);
    
        
        echo json_encode($offers, JSON_UNESCAPED_SLASHES);
    
    }else{
        echo json_encode(array("message"=> "failed query "));
    }
}

?>

