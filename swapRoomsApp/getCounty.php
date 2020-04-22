<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// Connect to DB
require 'connect.php';


if(isset($_REQUEST['email']) ){ 
    
    // Extracting the data into vars
    $email = $_REQUEST['email'];
    
    $county=[];
    $have_county = [];
   
    $foundUser = 0; // Booleans were causing me an issue
    // The SQL query
    $sql = "SELECT * FROM county WHERE email='$email' LIMIT 1";
    //print_r($sql);
    if($result = mysqli_query($con, $sql)){ // Takes all the contents from query and stores in result
        $count = 0;
        // Loop through result 
        while($record = mysqli_fetch_assoc($result)){
            // Storing the records in the allUsers array
            $county[$count]['email'] = $record['email'];
            $county[$count]['carlow'] = $record['carlow'];
            $county[$count]['dublin'] = $record['dublin'];
            $county[$count]['dublinCity'] = $record['dublinCity'];
            $county[$count]['wexford'] = $record['wexford'];
            $county[$count]['wicklow'] = $record['wicklow'];
            $county[$count]['louth'] = $record['louth'];
            $county[$count]['kildare'] = $record['kildare'];
            $county[$count]['meath'] = $record['meath'];
            $county[$count]['westmeath'] = $record['westmeath'];
            $county[$count]['kilkenny'] = $record['kilkenny'];
            $county[$count]['laois'] = $record['laois'];
            $county[$count]['offaly'] = $record['offaly'];
            $county[$count]['longford'] = $record['longford'];
            $county[$count]['clare'] = $record['clare'];
            $county[$count]['cork'] = $record['cork'];
            $county[$count]['corkCity'] = $record['corkCity'];
            $county[$count]['kerry'] = $record['kerry'];
            $county[$count]['limerick'] = $record['limerick'];
            $county[$count]['limerickCity'] = $record['limerickCity'];
            $county[$count]['tipperary'] = $record['tipperary'];
            $county[$count]['waterford'] = $record['waterford'];
            $county[$count]['galway'] = $record['galway'];
            $county[$count]['galwayCity'] = $record['galwayCity'];
            $county[$count]['leitrim'] = $record['leitrim'];
            $county[$count]['mayo'] = $record['mayo'];
            $county[$count]['roscommon'] = $record['roscommon'];
            $county[$count]['sligo'] = $record['sligo'];

            // found user, log in
            $foundUser = 1;
            $have_county['email'] = $county[$count]['email'];
            foreach($county as $coun){
                if($coun['carlow']){$have_county['county'] = 'Carlow';}
                if($coun['dublin']){$have_county['county'] = 'Dublin';}
                if($coun['dublinCity']){$have_county['county'] = 'Dublin City';}
                if($coun['wexford']){$have_county['county'] = 'Wexford';}
                if($coun['wicklow']){$have_county['county'] = 'Wicklow';}
                if($coun['louth']){$have_county['county'] = 'Louth';}
                if($coun['kildare']){$have_county['county'] = 'Kildare';}
                if($coun['meath']){$have_county['county'] = 'Meath';}
                if($coun['westmeath']){$have_county['county'] = 'Westmeath';}
                if($coun['kilkenny']){$have_county['county'] = 'Kilkenny';}
                if($coun['laois']){$have_county['county'] = 'Laois';}
                if($coun['offaly']){$have_county['county'] = 'Offaly';}
                if($coun['longford']){$have_county['county'] = 'Longford';}
                if($coun['clare']){$have_county['county'] = 'Clare';}
                if($coun['cork']){$have_county['county'] = 'Cork';}
                if($coun['corkCity']){$have_county['county'] = 'Cork City';}
                if($coun['kerry']){$have_county['county'] = 'Kerry';}
                if($coun['limerick']){$have_county['county'] = 'Limerick';}
                if($coun['limerickCity']){$have_county['county'] = 'Limerick City';}
                if($coun['tipperary']){$have_county['county'] = 'Tipperary';}
                if($coun['waterford']){$have_county['county'] = 'Waterford';}
                if($coun['galway']){$have_county['county'] = 'Galway';}
                if($coun['galwayCity']){$have_county['county'] = 'Galway City';}
                if($coun['leitrim']){$have_county['county'] = 'Leitrim';}
                if($coun['mayo']){$have_county['county'] = 'Mayo';}
                if($coun['roscommon']){$have_county['county'] = 'Roscommon';}
                if($coun['sligo']){$have_county['county'] = 'Sligo';}

            }


          
            echo json_encode($have_county);
        }//while

        
    }// End of sql query

    
}


?>