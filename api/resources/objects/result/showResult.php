<?php


function showResult(){



 $sql = "SELECT user.user_id, user.first_name, user.chall_id, c.organization_name , c.challenge_name, c.descrption_of_challenge, c.deadline, c.status
FROM user_info AS user,challagens AS c
WHERE c.status = 'closed' AND user.chall_id = c.chall_id"; 

   try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"result": ' . json_encode($result) . '}';
    }   catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}