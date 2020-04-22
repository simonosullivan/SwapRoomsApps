<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// Connect to DB
require 'connect.php';


if(isset($_REQUEST['id']) ){ 
    
    // Extracting the data into vars
    $rmId = $_REQUEST['id'];
    
    $amenities=[];
    $have_amenities=[];
    $foundUser = 0; // Booleans were causing me an issue
    // The SQL query
    $sql = "SELECT * FROM amenities WHERE rmId='$rmId' LIMIT 1";

    if($result = mysqli_query($con, $sql)){ // Takes all the contents from query and stores in result
        $count = 0;
        // Loop through result 
        while($record = mysqli_fetch_assoc($result)){
            // Storing the records in the allUsers array
            $amenities[$count]['id'] = $record['id'];
            $amenities[$count]['rmId'] = $record['rmId'];
            $amenities[$count]['wifi'] = $record['wifi'];
            $amenities[$count]['cableTv'] = $record['cableTv'];
            $amenities[$count]['iron'] = $record['iron'];
            $amenities[$count]['tv'] = $record['tv'];
            $amenities[$count]['essentials'] = $record['essentials'];
            $amenities[$count]['washingMachine'] = $record['washingMachine'];
            $amenities[$count]['heating'] = $record['heating'];
            $amenities[$count]['laptopWorkspace'] = $record['laptopWorkspace'];
            $amenities[$count]['hotWater'] = $record['hotWater'];
            $amenities[$count]['freeParking'] = $record['FreeParking'];
            $amenities[$count]['kitchen'] = $record['kitchen'];
            $amenities[$count]['stove'] = $record['stove'];
            $amenities[$count]['microwave'] = $record['microwave'];
            $amenities[$count]['cookingBasics'] = $record['cookingBasics'];
            $amenities[$count]['refridgerator'] = $record['refridgerator'];
            $amenities[$count]['dishesSilverware'] = $record['dishesSilverware'];
            $amenities[$count]['smartLock'] = $record['smartLock'];
            $amenities[$count]['shampoo'] = $record['shampoo'];
            $amenities[$count]['hairDryer'] = $record['hairDryer'];
            $amenities[$count]['hangers'] = $record['hangers'];
            $amenities[$count]['entirePlace'] = $record['entirePlace'];
            $amenities[$count]['privateRoom'] = $record['privateRoom'];
            $amenities[$count]['sharedRoom'] = $record['sharedRoom'];
            $amenities[$count]['doubleBed'] = $record['doubleBed'];
            $amenities[$count]['singleBed'] = $record['singleBed'];

           
            echo json_encode($amenities);
        }//while

        
    }// End of sql query

    
}


?>