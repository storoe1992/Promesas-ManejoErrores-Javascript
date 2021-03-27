document.getElementById('githubform').addEventListener('submit', function(evt){
    evt.preventDefault();
    let userName = document.getElementById('nombre').value;
    let pageNumber = document.getElementById('pagina').value;
    let repoByPage = document.getElementById('repoPagina').value;

    
    resetPage();

    Promise.all([getUser(userName),getRepo(userName,pageNumber,repoByPage)])
    .then(response => {
        let user = response[0]
        if(user.message === "Not Found")
            throw "Not Found";

        setupUserData(user);
        setupUseRepositorioes(response[1]);
        $('#resultados').show();
    })
    .catch(err => {
        resetPage();
        alert("El usuario no existe")
    });
})
const request = async (context)=>{
    let url = `https://api.github.com/users${context}`;
    let response = await fetch(url);
    return await response.json();
}

const getUser = async (user) => {
    return request(`/${user}`);
}

const getRepo = async (user,pagina,cantidadRepos) => {
    return request(`/${user}/repos?page=${pagina}&per_page=${cantidadRepos}`);
}

const setupUserData = (user) => {
        document.getElementById('userimg').src=user.avatar_url;
        document.getElementById('nombreusuario').innerHTML = `Nombre de usuario: ${user.name}`;
        document.getElementById('cantrepositorioes').innerHTML = `Cantidad de repositorios: ${user.public_repos}`;
        document.getElementById('location').innerHTML = `Localidad: ${user.location}`;
        document.getElementById('usertype').innerHTML = `Tipo de usuario: ${user.type}`;
}

const setupUseRepositorioes =  (repositories) => {
    repositories.forEach(element => {
        $('#repositorys').append(`<li><a href="https://github.com/${element.full_name}">${element.name}</a></li>`)
    });
}

const resetPage = () => {
    $('#repositorys').empty();
    $('#resultados').hide();
}

$(document).ready(()=> resetPage());

