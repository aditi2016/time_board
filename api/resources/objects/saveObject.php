<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 6/22/16
 * Time: 3:06 PM
 */

function saveObject($app_id){

    $request = \Slim\Slim::getInstance()->request();
    $object = json_decode($request->getBody());


    $sql = "INSERT INTO `digieye`.`objects`
                  ( `object_id`, `name`, `photo`, `brand`, `address`, `mobile`, `email`, `type`, `location`, `description`)
              VALUES (:object_id, :name, :photo, :brand, :address, :mobile, :email, :type, :location, :description);";

    try {

        $db = getDB();
        $stmt = $db->prepare($sql);

        $stmt->bindParam("object_id", $object->object_id);
        $stmt->bindParam("name", $object->name);
        $stmt->bindParam("photo", $object->photo);
        $stmt->bindParam("brand", $object->brand);
        $stmt->bindParam("address", $object->address);
        $stmt->bindParam("mobile", $object->mobile);
        $stmt->bindParam("email", $object->email);
        $stmt->bindParam("type", $object->type);
        $stmt->bindParam("location", $object->location);
        $stmt->bindParam("description", $object->description);

        $stmt->execute();

        $id = $db->lastInsertId();

        $object->id = $id;

        if(!isset($object->object_id) || $object->object_id =="" ) {
            $object->object_id = "DigiEYE-".$app_id . "-" . $id;

            $sql = "Update `digieye`.`objects` set object_id = '".$object->object_id."' where id = " . $id;
            $stmt = $db->prepare($sql);
            $stmt->execute();
        }
            $db = null;

        echo '{"object": ' . json_encode($object) . '}';

    } catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":"' . $e->getMessage() . '"}}';
    }
}

?>
