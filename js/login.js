let usuario;

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (email.value.trim() === '' || password.value.trim() === '') {
        activaAlerta('Los campos no pueden estar vacios 🤡')

    } else {
        const sendData = {
            email: email.value,
            password: password.value
        }

        fetch('./backend/files/login.php', {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            //console.log(await response.json());
            const respuesta = await response.json();
            if(respuesta.MESSAGE === 'No se encontro usuario'){
                activaAlerta('Usuario no encontrado 🥴');
            } else if(respuesta.MESSAGE === 'Contraseña no coincide'){
                activaAlerta('La contraseña no coincide 🫣');
            } else if(respuesta.MESSAGE === 'Success'){
                usuario = respuesta.USUARIO['usuario'];
                window.location.replace(`../crud-sistema/home.html?usuario=${usuario}`);
            } else {
                console.log('Error desconocido 🤯');
            }
        }).catch((error) => {
            console.log('SUCEDIO UN ERROR =>', error);
        });
    }
});


const activaAlerta = mensaje => {
    const alerta = document.getElementsByClassName('alert');
    alerta[0].textContent = mensaje;
    alerta[0].classList.remove('hide');
    alerta[0].classList.add('show');
    setTimeout(() => {
        alerta[0].classList.remove('show');
        alerta[0].classList.add('hide');
    }, 3000);
}

