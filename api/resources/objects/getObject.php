<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 6/22/16
 * Time: 3:06 PM
 */


function getObject($app_id,$objectId){

    $sql = "SELECT * FROM objects WHERE object_id=:id ";

    try {
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