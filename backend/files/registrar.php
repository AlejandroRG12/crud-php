<?php
    include("../config/conexion.php");

    $con=conectar();

    $nombre = $_POST['nombre'];
    $apaterno = $_POST['apaterno'];
    $amaterno = $_POST['amaterno'];
    $usuario = $_POST['email'];
    $password = $_POST['password'];

    //verificar que le usaurio exista
    $queyVerifica = "SELECT * FROM usuarios WHERE usuario='$usuario'";
    $validaCorreo = mysqli_query($con, $queyVerifica);
    if($validaCorreo->num_rows == 0){
        //usuario no existe
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        $queryInsert = "INSERT INTO usuarios VALUES(null, '$nombre', '$apaterno', '$amaterno', '$usuario', '$passwordHash')";
        $result = mysqli_query($con, $queryInsert);
        if($result){
            header("Location: ../../index.html");
        } else {
            header("location: ../../registrar.html?error=true");
        }
    }else{
        //usuario si existe
        header("location: ../../registrar.html?existe=true");
    }
?>