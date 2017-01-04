<?php

function showAllChallanges(){

 $sql = "SELECT  user.name,  c.challenge_name, c.descrption_of_challenge, c.chall_id , UNIX_TIMESTAMP(c.complation_time)  AS tm
                      FROM user_info AS user                       
                      INNER JOIN challagens AS c

                        WHERE  user.challenge_name = c.challenge_name AND c.status = 'open'"; 

   try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $challagens_owneship = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        foreach ($challagens_owneship as $key => $serviceProvider) {
            
            $serviceProvider->tm = $serviceProvider->tm.'000';
        }
        echo '{"challagens_owneship": ' . json_encode($challagens_owneship) . '}';
    }   catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

   
