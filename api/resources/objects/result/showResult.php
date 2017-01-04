<?php


function showResult(){



 $sql = "SELECT name
, MAX(challenge_done) as num FROM user_info "; 

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

