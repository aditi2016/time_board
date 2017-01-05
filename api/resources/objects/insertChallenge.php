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
    //var_dump($input->root->name);die();
    $sql = "INSERT INTO user_info( name, email, mobile,  challenge_name) 
                        VALUES (:name,:email,:contact_no,:challenge_name)";

    $challagenSql = "INSERT INTO challagens( challenge_name, complation_time, creation_time,  descrption_of_challenge) 
                        VALUES (:challenge,:complation_time,:creation_time,:descrption_of_challenge)";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("name", $input->root->name);
        $stmt->bindParam("email", $input->root->email);
        $stmt->bindParam("contact_no", $input->root->mobile);
        $stmt->bindParam("challenge_name", $input->root->challenge_name);
        $stmt2 = $db->prepare($challagenSql);

        $stmt2->bindParam("challenge", $input->root->challenge_name);
        $stmt2->bindParam("complation_time", date('Y-m-d H:i:s', strtotime($input->root->complation_time)));
        $stmt2->bindParam("creation_time", date('Y-m-d H:i:s'));
        $stmt2->bindParam("descrption_of_challenge", $input->root->descrption_of_challenge);
        $stmt->execute();
       
        $input->root->user_id = $db->lastInsertId();
        $stmt2->execute();
        $input->root->challange_id = $db->lastInsertId();
        echo '{"instance": ' . json_encode($input) . '}';

        $db = null;
        
    } catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}