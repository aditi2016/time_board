<?php

function showAllChallanges(){

 $sql = "SELECT user.name,c.name, c.description , UNIX_TIMESTAMP(c.deadline)  AS tm
        FROM user_info AS user, challenges AS c , challenges_ownship as a
        WHERE  a.user_id = user.id AND c.status = 'open'"; 

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

   
