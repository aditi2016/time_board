<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 8/18/16
 * Time: 5:24 PM
 */

function insertChallenge(){

    $request = \Slim\Slim::getInstance()->request();
    //$instance = json_decode($request->getBody());
    $input = json_decode(file_get_contents("php://input"));
    //var_dump($input->root);die();
    $sql = "INSERT INTO challenges( name, deadline, creation_time,  description) 
                        VALUES (:name,:deadline,:creation_time,:description)";
    $ownshipSql = "INSERT INTO challenges_ownship (user_id, challenge_id) 
                        VALUES (:user_id, :challenge_id)";                    
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("name", $input->root->name);
        $stmt->bindParam("deadline", date('Y-m-d H:i:s', strtotime($input->root->deadline)));
        $stmt->bindParam("creation_time", date('Y-m-d H:i:s'));
        $stmt->bindParam("description", $input->root->description);
        $stmt->execute();
        $input->root->challenge_id = $db->lastInsertId();
        $stmt2 = $db->prepare($ownshipSql);
        $stmt2->bindParam("user_id", $input->root->user_id);
        $stmt2->bindParam("challenge_id", $input->root->challenge_id);
        $stmt2->execute();
        $input->root->ownship_id = $db->lastInsertId();
        echo '{"instance": ' . json_encode($input) . '}';

        $db = null;
        
    } catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}