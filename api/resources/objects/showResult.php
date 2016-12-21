<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 6/22/16
 * Time: 3:06 PM
 */

function saveObject($id){

    $request = \Slim\Slim::getInstance()->request();
    $object = json_decode($request->getBody());


   $sql = "SELECT user.'user_id', user.'first_name', user.'org_id', c.'challenge_name', c.'descrption_of_challenge', c.'deadline', c.'status'
FROM user_info AS 'user', 'challagens' AS c
WHERE c.'status' = 'close'"; 
    {
        $db = getDB();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("id", $objectId);

        $stmt->execute();
        $object = $stmt->fetchAll(PDO::FETCH_OBJ);


        $db = null;

        echo '{"objects": ' . json_encode($object) . '}';



    } catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}