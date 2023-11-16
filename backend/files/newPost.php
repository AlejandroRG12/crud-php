<?php
    include('../config/conexion.php');
    $con = conectar();
    
    $idUsuario= $_POST['idUsuario'];
    $titulo = $_POST['titulo'];
    $mensaje = $_POST['mensaje'];
    $reaccion = 0;
    $fecha = date('Y-m-d'); // Almacenar la fecha actual en la variable $fecha


    
    $queryInsert ="INSERT INTO post VALUES(null, '$idUsuario', '$titulo', '$mensaje', '$fecha', '$reaccion')";
    $insert = mysqli_query($con, $queryInsert);
    if($insert){
        echo json_encode(['STATUS' => 'SUCCESS', 'MESSAGE' => 'Se registro tu nuevo post']);
        header("Location: ../../home.html?usuario=".$idUsuario);
    } else {
        echo json_encode(['STATUS' => 'ERROR', 'MESSAGE' => 'ERROR al momento de registrar tu nuevo post']);
        header("Location: ../../home.html?error=true");
    }
?>