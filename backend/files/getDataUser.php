<?php
    include("../config/conexion.php");
    $con = conectar();
    $dataPost = file_get_contents('php://input');
    $body = json_decode($dataPost, true);
    
    $usuario = $body['usuario'];

    $queryUsuario = "SELECT * FROM usuarios WHERE usuario='$usuario'";
    $validaUsuario = mysqli_query($con, $queryUsuario);

    if($validaUsuario->num_rows > 0){
        $user = $validaUsuario->fetch_assoc();
        echo json_encode(['STATUS' => 'SUCCESS', 'USUARIO' => $user]);
    }else{
        echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => 'no se encontro el usuario']);
    }
?>