let loggedUser = {};
const titulo = document.getElementById('userBlog');
const postContainer = document.getElementById('postUsuario')
const postCard = document.getElementById('cardPost').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () =>{
    loadUser();
    loadPost();
});

const loadPost = async () => {
    const posts = await fetch('./backend/files/loadPost.php')
    const items = await posts.json()
    dibujaPosts(items.POSTS)
    //console.log("POSTS => ", await posts.json());
    
}

const dibujaPosts = (post) => {
    postMessage.innerHTML = ''
    post.forEach((item) => {
        postCard.querySelector('.card-title').textContent = item.titulo
        postCard.querySelector('.card-subtitle').textContent = item.idUsuario
        postCard.querySelector('.card-text').textContent = item.mensaje
        postCard.querySelector('.fecha').textContent = item.fecha
        const clone = postCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    postContainer.appendChild(fragment)
}

const loadUser = () => {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const usuario = params.get('usuario');
    
    console.log('usuario => ', usuario );

    if(usuario){
        const sendData = {
            usuario
        }
        fetch('./backend/files/getDataUser.php', {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( async (response) => {
            const user = await response.json();
            loggedUser = user.USUARIO
            console.log(loggedUser)
            const inputIdUser = document.getElementById('idUsuario');
            inputIdUser.value = loggedUser.usuario;
            console.log(loggedUser.value)
            titulo.innerHTML = loggedUser.nombre + ' ' + loggedUser.apaterno + 'Blogs';
            console.log('Response => ',loggedUser);
        })
    }
    console.log('$$$ USUARIO', usuario);
}



