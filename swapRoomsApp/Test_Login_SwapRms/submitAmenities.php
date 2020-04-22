<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// Connect to DB
require 'connect.php';

// Take in the contents sent this file
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata)){ 
    $request = json_decode($postdata);
    
    // Extracting the data into vars
    $fname = $request->formData->fname;
    $lname = $request->formData->lname;
    $email = $request->formData->email;
    $preferEmail = $request->formData->preferEmail;
    $titleRm = $request->formData->titleRm;
    $descripRm = $request->formData->descripRm;
    $addrRm = $request->formData->addrRm;
    $county = $request->formData->county;

    if($request->formData->wifiCheck == false){$wifi = '0';}
    else if($request->formData->wifiCheck == true){$wifi = '1';}
    else{$wifi = $request->formData->wifiCheck;}

    if($request->formData->cabletvCheck == false){$cableTv = '0';}
    else if($request->formData->cabletvCheck == true){$cableTv = '1';}
    else{$cableTv = $request->formData->cabletvCheck;}

    if($request->formData->ironCheck == false){$iron = '0';}
    else if($request->formData->ironCheck == true){$iron = '1';}
    else{$iron = $request->formData->ironCheck;}

    if($request->formData->tvCheck == false){$tv = '0';}
    else if($request->formData->tvCheck == true){$tv = '1';}
    else{$tv = $request->formData->tvCheck;}

    if($request->formData->essentialsCheck == false){$essentials = '0';}
    else if($request->formData->essentialsCheck == true){$essentials = '1';}
    else{$essentials = $request->formData->essentialsCheck;}

    if($request->formData->washMachineCheck == false){$washingMachine = '0';}
    else if($request->formData->washMachineCheck == true){$washingMachine = '1';}
    else{$washingMachine = $request->formData->washMachineCheck;}

    if($request->formData->heatCheck == false){$heating = '0';}
    else if($request->formData->heatCheck == true){$heating = '1';}
    else{$heating = $request->formData->heatCheck;}

    if($request->formData->laptopCheck == false){$laptopWorkspace = '0';}
    else if($request->formData->laptopCheck == true){$laptopWorkspace = '1';}
    else{$laptopWorkspace = $request->formData->laptopCheck;}

    if($request->formData->hotwaterCheck == false){$hotWater = '0';}
    else if($request->formData->hotwaterCheck == true){$hotWater = '1';}
    else{$hotWater = $request->formData->hotwaterCheck;}

    if($request->formData->freeparkCheck == false){$freeParking = '0';}
    else if($request->formData->freeparkCheck == true){$freeParking = '1';}
    else{$freeParking = $request->formData->freeparkCheck;}

    if($request->formData->kitchenCheck == false){$kitchen = '0';}
    else if($request->formData->kitchenCheck == true){$kitchen = '1';}
    else{$kitchen = $request->formData->kitchenCheck;}

    if($request->formData->stoveCheck == false){$stove = '0';}
    else if($request->formData->stoveCheck == true){$stove = '1';}
    else{$stove = $request->formData->stoveCheck;}

    if($request->formData->microwaveCheck == false){$microwave = '0';}
    else if($request->formData->microwaveCheck == true){$microwave = '1';}
    else{$microwave = $request->formData->microwaveCheck;}

    if($request->formData->cookingCheck == false){$cookingBasics = '0';}
    else if($request->formData->cookingCheck == true){$cookingBasics = '1';}
    else{$cookingBasics = $request->formData->cookingCheck;}

    if($request->formData->fridgeCheck == false){$refridgerator = '0';}
    else if($request->formData->fridgeCheck == true){$refridgerator = '1';}
    else{$refridgerator = $request->formData->fridgeCheck;}

    if($request->formData->dishesCheck == false){$dishesSilverware = '0';}
    else if($request->formData->dishesCheck == true){$dishesSilverware = '1';}
    else{$dishesSilverware = $request->formData->dishesCheck;}

    if($request->formData->lockCheck == false){$smartLock = '0';}
    else if($request->formData->lockCheck == true){$smartLock = '1';}
    else{$smartLock = $request->formData->lockCheck;}

    if($request->formData->shampooCheck == false){$shampoo = '0';}
    else if($request->formData->shampooCheck == true){$shampoo = '1';}
    else{$shampoo = $request->formData->shampooCheck;}

    if($request->formData->hairdryerCheck == false){$hairDryer = '0';}
    else if($request->formData->hairdryerCheck == true){$hairDryer = '1';}
    else{$hairDryer = $request->hairdryerCheck->shampooCheck;}

    if($request->formData->hangersCheck == false){$hangers = '0';}
    else if($request->formData->hangersCheck == true){$hangers = '1';}
    else{$hangers = $request->formData->hangersCheck;}

    if($request->formData->entireplaceCheck == false){$entirePlace = '0';}
    else if($request->formData->entireplaceCheck == true){$entirePlace = '1';}
    else{$entirePlace = $request->formData->entireplaceCheck;}

    if($request->formData->privateroomCheck == false){$privateRoom = '0';}
    else if($request->formData->privateroomCheck == true){$privateRoom = '1';}
    else{$privateRoom = $request->formData->privateroomCheck;}

    if($request->formData->sharedroomCheck == false){$sharedRoom = '0';}
    else if($request->formData->sharedroomCheck == true){$sharedRoom = '1';}
    else{$sharedRoom = $request->formData->sharedroomCheck;}

    if($request->formData->doublebedCheck == false){$doubleBed = '0';}
    else if($request->formData->doublebedCheck == true){$doubleBed = '1';}
    else{$doubleBed = $request->formData->doublebedCheck;}

    if($request->formData->singlebedCheck == false){$singleBed = '0';}
    else if($request->formData->singlebedCheck == true){$singleBed = '1';}
    else{$singleBed = $request->formData->singlebedCheck;}


    $userId = $request->userId;
    
    // $rmId = $request->rmId;
    $sqlUser = "";
    $sqlAccount = "";
    $sqlAmenities = "";

    // Store in DB
    $sqlUser = "UPDATE user 
    SET 
    fname = '$fname',
    lname = '$lname',
    preferEmail = '$preferEmail'
    WHERE user.userId = $userId";

    $sqlAccount = "INSERT INTO account (rmID, userId, titleRm, descripRm, addrRm, county)
    VALUES (NULL,'$userId','$titleRm','$descripRm','$addrRm','$county')";

    
    $cnt = 0; 
    if(mysqli_query($con, $sqlUser)){
        $cnt++;
    }

    if($result = mysqli_query($con, $sqlAccount)){
        $sql = "SELECT * FROM account WHERE userId=$userId LIMIT 1";
        $result = mysqli_query($con,$sql);
        $count = 0;
         // Loop through result 
        while($record = mysqli_fetch_assoc($result)){
            $rm[$count]['rmId'] = $record['rmId'];
        }//while
        $cnt++;
        $rmId = $rm[$count]['rmId'];
        $sqlAmenities = "INSERT INTO amenities(id,rmId, wifi, cableTv, iron, tv, essentials,washingMachine,heating,laptopWorkspace,hotWater,FreeParking,kitchen,stove,microwave,cookingBasics,refridgerator,dishesSilverware,smartLock,shampoo,hairDryer,hangers,entirePlace,privateRoom,sharedRoom,doubleBed,singleBed) Values(NULL,'$rmId','$wifi','$cableTv','$iron','$tv','$essentials','$washingMachine','$heating','$laptopWorkspace','$hotWater','$freeParking','$kitchen','$stove','$microwave','$cookingBasics','$refridgerator','$dishesSilverware','$smartLock','$shampoo','$hairDryer','$hangers','$entirePlace','$privateRoom','$sharedRoom','$doubleBed','$singleBed');";

        
    }

    

// $sqlAmenities ="INSERT INTO amenities (id, rmId, wifi, cableTv, iron, tv, essentials, washingMachine, heating, laptopWorkspace, 
// hotWater, FreeParking, kitchen, stove, microwave, cookingBasics, refridgerator, dishesSilverware, smartLock,
//  shampoo, hairDryer, hangers, entirePlace, privateRoom, sharedRoom, doubleBed, singleBed)
// VALUES (NULL, '$ans['']', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1')";

//print_r($sqlAmenities);
    if(mysqli_query($con, $sqlAmenities)){
        $cnt++;
    }

    
    
    if($cnt == 3){
        echo json_encode(array("message" => "Thank You for setting up your account"));
    }
    else{
        echo json_encode(array("message" => "Failed to set up account"));
    }

    


   
}


?>