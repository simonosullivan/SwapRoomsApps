<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// db credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'swap_roomsdb');

// Connect with DB
function connect(){
    $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if(mysqli_connect_errno($connect)){
        die("Failed to connect : ". mysqli_connect_error());
    }

    mysqli_set_charset($connect, "utf8");

    return $connect;
}

$con = connect();


?>