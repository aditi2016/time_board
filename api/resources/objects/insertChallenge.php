<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 8/18/16
 * Time: 5:24 PM
 */

function insertChallenge(){

    $request = \Slim\Slim::getInstance()->request();
    $instance = json_decode($request->getBody());

    $sql = "INSERT INTO user_info( name, email, mobile,  challenge_name) 
                        VALUES (:name,:email,:contact_no,:challenge_name,)";

    $challagenSql = "INSERT INTO challagens( challenge_name, complation_time, creation_time,  descrption_of_challenge) 
                        VALUES (:challenge,:complation_time,:creation_time,:descrption_of_challenge)";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("name", $instance->name);
        $stmt->bindParam("email", $instance->email);
        $stmt->bindParam("mobile", $instance->mobile);
        $stmt->bindParam("challenge_name", $instance->challenge_name);
        $stmt2 = $db->prepare($challagenSql);

        $stmt2->bindParam("challenge", $instance->challenge_name);
        $stmt2->bindParam("complation_time", $instance->complation_time);
        $stmt2->bindParam("creation_time", $instance->creation_time);
        $stmt2->bindParam("descrption_of_challenge", $instance->descrption_of_challenge);
        $stmt->execute();
       
        $instance->user_id = $db->lastInsertId();
        $stmt2->execute();
        $instance->challange_id = $db->lastInsertId();
        echo '{"instance": ' . json_encode($instance) . '}';

        $db = null;
        
    } catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}