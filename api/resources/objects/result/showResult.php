<?php


function showResult(){



 $sql = "SELECT a.name, count(b.id) as num  from user_info as a join challenges as b join challenges_ownship as c 
            where b.status = 'closed' and b.id = c.challenge_id and c.user_id = a.id group by c.user_id";

   try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($result as $key => $value) {
            $all[$value['name']] = $value['num'];
        }
        $db = null;
        
        $max_value = max($all);
        $result = array_filter( $all, function($x)  use ($max_value) { return $x === $max_value; } );
        echo '{"result": ' . json_encode($result) . '}';
    }   catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}

