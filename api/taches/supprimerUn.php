<?php
mysqli_report(MYSQLI_REPORT_ERROR);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

try {

    $connexion = mysqli_connect("localhost", "root", "", "to_do_list");
    if (mysqli_connect_errno()) {
        throw new Exception("Impossible de se connecter à la DB");
    }

    $data = file_get_contents("php://input");
    $data = json_decode($data, true);
    $id = $data["id"];
    
    $requete = "DELETE FROM taches WHERE id='$id'";
    $stmt = $connexion->prepare($requete);
    
    if ($stmt->execute()) {
        $message = "Requête exécutée avec succès";

        $stmt->close();

        if ($connexion) {
            $connexion->close();
        }


        $reponse = array("message" => $message);
        header("Content-type: application/json;");
        http_response_code(200);
        echo json_encode($reponse);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Impossible de récupérer les données"]);
    }

} catch (Exception $e) {

    http_response_code(500);
    echo json_encode(["erreur" => $e->getMessage()]);
    throw new Exception($e->getMessage());

}