<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 6/4/16
 * Time: 1:31 PM
 */

function insertUser(){

    $request = \Slim\Slim::getInstance()->request();

    $user_info = json_decode($request->getBody());

    $sql = "INSERT INTO user_info (name, email, mobile, password, gps_location, organization_id)
                  VALUES (:name, :email, :password, :mobile, :location, 2 )";
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("name", $user_info->name);
        $stmt->bindParam("mobile", $user_info->mobile);
      
        $stmt->bindParam("email", $user_info->email);
        $stmt->bindParam("password", $user_info->password);
      
        $stmt->bindParam("location", $user_info->location);

        $stmt->execute();

        $user_info->id = $db->lastInsertId();
        $db = null;

        echo '{"user": ' . json_encode($user_info) . '}';

    } catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":"' . $e->getMessage() . '"}}';
    }
}