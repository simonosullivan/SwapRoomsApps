<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// Connect to DB
require 'connect.php';


if(isset($_REQUEST['id']) ){ 
    
    // Extracting the data into vars
    $userId = $_REQUEST['id'];
    
    $offerDetails=[];
    $openOffers = [];
    $allDetailsUser =[];
    $foundUser=0;
    
   
    $foundUser = 0; // Booleans were causing me an issue
    // The SQL query
    $sql = "SELECT * FROM offers WHERE userId!=$userId";
    $sql_roomDetails = "SELECT * FROM account WHERE userId !='$userId'";
    $sql_images = "SELECT * FROM picspath WHERE userId !='$userId'";

    $users = [];

    if($result = mysqli_query($con, $sql_images)){
        $count = 0;

        while($record = mysqli_fetch_assoc($result)){
            $images[$count]['userId'] = $record['userId'];
            $images[$count]['profPic'] = $record['profPic'];
            $images[$count]['pathToImages'] = $record['pathToImages'];
            $count++;
        }
        //print_r($images);
    }

    if($result = mysqli_query($con, $sql_roomDetails)){
        $count = 0;
        // Loop through result 
        while($record = mysqli_fetch_assoc($result)){
            // Storing the records in the allUsers array
            $users[$count]['rmId'] = $record['rmId'];
            $users[$count]['userId'] = $record['userId'];
            $users[$count]['titleRm'] = $record['titleRm'];
            $users[$count]['descripRm'] = $record['descripRm'];
            $users[$count]['addrRm'] = $record['addrRm'];
            $users[$count]['county'] = $record['county'];
            $count++;
        }//while
        
    }// end of sql_roomDetails query
    

    if($result = mysqli_query($con, $sql)){ // Takes all the contents from query and stores in result
        
        $count = 0;
        $cnt=0;
        
        // Loop through result 
        while($record = mysqli_fetch_assoc($result)){
            // Storing the records in the allUsers array
            $offerDetails[$count]['offerId'] = $record['offerId'];
            $offerDetails[$count]['userId'] = $record['userId'];
            $offerDetails[$count]['option1'] = $record['option1'];
            $offerDetails[$count]['option2'] = $record['option2'];
            $offerDetails[$count]['option3'] = $record['option3'];
            $offerDetails[$count]['start'] = $record['startDate'];
            $offerDetails[$count]['end'] = $record['endDate'];
            $offerDetails[$count]['status'] = $record['status'];

            //print_r($offerDetails);
            $loop = 0;
            $i;
            $j ;
           // print_r($users);
            for($i=0; $i <= count($users); $i++){
                //print_r($users[$loop]['userId']); echo " == "; print_r($offerDetails[$count]['userId']);
                if($users[$loop]['userId'] == $offerDetails[$count]['userId']){
                    //echo("\n in if \n");
                    
                    for($j=0; $j <= count($images); $j++){
                        //print_r($offerDetails[$count]['userId']); echo " == "; print_r($images[$j]['userId']);
                        if($offerDetails[$count]['userId'] == $images[$j]['userId']){
                            //echo "in";
                            $allDetailsUser[$count]['rmId'] = $users[$loop]['rmId'];
                            $allDetailsUser[$count]['userId'] = $users[$loop]['userId'];
                            // $allDetailsUser[$count]['fname'] = $users[$loop]['fname'];
                            // $allDetailsUser[$count]['lname'] = $users[$loop]['lname'];
                            // $allDetailsUser[$count]['preferEmail'] = $users[$loop]['preferEmail'];
                            $allDetailsUser[$count]['titleRm'] = $users[$loop]['titleRm'];
                            $allDetailsUser[$count]['descripRm'] = $users[$loop]['descripRm'];
                            $allDetailsUser[$count]['addrRm'] = $users[$loop]['addrRm'];
                            $allDetailsUser[$count]['county'] = $users[$loop]['county'];
                            $allDetailsUser[$count]['offerId'] = $offerDetails[$count]['offerId'];
                            $allDetailsUser[$count]['option1'] = $offerDetails[$count]['option1'];
                            $allDetailsUser[$count]['option2'] = $offerDetails[$count]['option2'];
                            $allDetailsUser[$count]['option3'] = $offerDetails[$count]['option3'];
                            $allDetailsUser[$count]['start'] = $offerDetails[$count]['start'];
                            $allDetailsUser[$count]['end'] = $offerDetails[$count]['end'];
                            $allDetailsUser[$count]['status'] = $offerDetails[$count]['status'];
                            $allDetailsUser[$count]['foundUser']= 1;
                            $allDetailsUser[$count]['profPic'] = $images[$j]['profPic'];
                            $allDetailsUser[$count]['pathToImages'] = $images[$j]['pathToImages'];
                            //print_r($allDetailsUser[$count]['pathToImages']);
                            
                            
                            //print_r($allDetailsUser[$count]);
                            break;
                        }
                    }

                break;
                    
                }
                $loop++;
            }

            
            if($allDetailsUser[$count]['status']=='open' && $allDetailsUser[$count]['foundUser']== 1){
                $openOffers[$cnt]['offerId'] = $allDetailsUser[$count]['offerId'];
                $openOffers[$cnt]['rmId'] = $allDetailsUser[$count]['rmId'];
                $openOffers[$cnt]['userId'] = $allDetailsUser[$count]['userId'];
                // $openOffers[$cnt]['fname'] = $allDetailsUser[$count]['fname'];
                // $openOffers[$cnt]['lname'] = $allDetailsUser[$count]['lname'];
                // $openOffers[$cnt]['preferEmail'] = $allDetailsUser[$count]['preferEmail'];
                $openOffers[$cnt]['titleRm'] = $allDetailsUser[$count]['titleRm'];
                $openOffers[$cnt]['descripRm'] = $allDetailsUser[$count]['descripRm'];
                $openOffers[$cnt]['addrRm'] = $allDetailsUser[$count]['addrRm'];
                $openOffers[$cnt]['county'] = ucfirst($allDetailsUser[$count]['county']);
                $openOffers[$cnt]['option1'] = $allDetailsUser[$count]['option1'];
                $openOffers[$cnt]['option2'] = $allDetailsUser[$count]['option2'];
                $openOffers[$cnt]['option3'] = $allDetailsUser[$count]['option3'];
                $openOffers[$cnt]['start'] = $allDetailsUser[$count]['start'];
                $openOffers[$cnt]['end'] = $allDetailsUser[$count]['end'];
                $openOffers[$cnt]['profPic'] = $allDetailsUser[$count]['profPic'];
                $openOffers[$cnt]['pathToImages'] = $allDetailsUser[$count]['pathToImages'];

                 

                $cnt++;
                
            }
            // found user, log in
            //$foundUser = 1;
           
            $count++;
            
        }//while

        
        
        
    }// End of sql query


    echo json_encode($openOffers, JSON_UNESCAPED_SLASHES);    

}

    


?>