<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// Connect to DB
require '../connect.php';

$userId = $_REQUEST['userId'];
$email = $_REQUEST['email'];



$target_dir = "upload/$email/";
$profPic = "upload/$email/profPic/";

if (!file_exists($target_dir)) {
    mkdir($target_dir, 0755, true);

    if (!file_exists($profPic)) {
        mkdir($profPic, 0755, true);
    }
}


$filename = '';
$_FILES['fileUpload']['name'][0] = "profPic.png";
$filename = $_FILES['fileUpload']['name'][0];
$target_file = $profPic . $_FILES['fileUpload']['name'][0];
move_uploaded_file($_FILES['fileUpload']['tmp_name'][0], $target_file);

for($i=0; $i<count($_FILES['fileUpload']['name']); $i++){
    $_FILES['fileUpload']['name'][$i] = "rm{$i}.png";
    $filename = $_FILES['fileUpload']['name'][$i];
    $target_file = $target_dir . $filename;
    move_uploaded_file($_FILES['fileUpload']['tmp_name'][$i], $target_file);
}


// Store in DB
$sql = "INSERT INTO picspath (
    userId,
    profPic,
    pathToImages
    ) 
    VALUES(
    '{$userId}',
    '{$profPic}',
    '{$target_dir}'
    )";


if(mysqli_query($con, $sql)){ 
    // send http code if successful
    echo json_encode(array("message" => "Path set up in DB, uploaded images"));
}else{
    echo json_encode(array("message" => "Path already set up for this user, updated images"));
}


?>