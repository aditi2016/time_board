<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 3/6/16
 * Time: 9:00 PM
 */
function checkMobile(){

    $request = \Slim\Slim::getInstance()->request();

    $sql = "SELECT name, id FROM user_info WHERE mobile = :mobile";
    
    try {
        $db = getDB();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("mobile", $users->mobile);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        if(count($users) == 1)
            echo '{"users": "true"}';
        else
            echo '{"users": "false"}';

    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}
