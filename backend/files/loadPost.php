<?php
    include("../config/conexion.php");
    $con = conectar();

    $querySelect = "SELECT * FROM post";
    $posts = mysqli_query($con, $querySelect);

    $postArray = [];

    if($posts->num_rows > 0){
        while($post = mysqli_fetch_array($posts)){
            $postArray[] = $post;
        }
        echo json_encode(['STATUS' => 'SUCCESS', 'POSTS' => $postArray]);
    } else {
        echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => 'No se encontraron posts']);
    }
?>