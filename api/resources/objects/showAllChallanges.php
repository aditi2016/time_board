<?php

function showAllChallanges(){

 $sql = "SELECT user.user_id, user.first_name,  c.organization_name , c.challenge_name, c.descrption_of_challenge, c.deadline, c.status
FROM user_info AS user,challagens AS c
WHERE c.status = 'open' AND user.user_id = c.user_id"; 

   try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $challagens_owneship = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"challagens_owneship": ' . json_encode($challagens_owneship) . '}';
    }   catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}
   
