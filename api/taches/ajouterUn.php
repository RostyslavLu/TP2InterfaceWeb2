<?php
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$data = json_decode(file_get_contents("php://input"), true);

$tache = $data['task'];
$description = $data['description'];
$importance = $data['niveaux'];



try {

    $connexion = mysqli_connect("localhost", "root", "", "to_do_list");

    if ($connexion == false) {
        // La connexion n'a pas fonctionnée
        die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
    }

    $requete = "INSERT INTO taches (tache, description, importance) VALUES ('$tache','$description','$importance')";
    $stmt = $connexion->prepare($requete);
    if ($stmt->execute()) {
        $id = $connexion->insert_id;

        $message = array("message" => $id);
        echo json_encode($message);

        $stmt->close();
        $connexion->close();
        exit();
    }
} catch (Exception $erreur) {
    http_response_code(500);
    $message = array("message" => $erreur->getMessage());

    echo json_encode($message);
}