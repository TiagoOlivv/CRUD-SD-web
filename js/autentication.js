var authEmailPassButton = document.getElementById('authEmailPassButton');
var logOutButton = document.getElementById('logOutButton');
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');
var displayName = document.getElementById('displayName');

createUserButton.addEventListener('click', function () {
    firebase
    .auth()
    .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function () {
        alert('Cadastro concluido ' + emailInput.value);
        window.location.href = "index.html"
    })
    .catch(function (error) {
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao cadastrar, verifique o erro no console.')
        window.location.href = "index.html"
    });
});

authEmailPassButton.addEventListener('click', function () {
    firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function (result) {
        console.log(result);
        displayName.innerText = 'Bem vindo, ' + emailInput.value;
        alert('Autenticado ' + emailInput.value);
        window.location.href = "home.html"
    })
    .catch(function (error) {
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao autenticar, verifique o erro no console.')
        window.location.href = "index.html"
    });
});

logOutButton.addEventListener('click', function () {
    firebase
    .auth()
    .signOut()
    .then(function () {
        displayName.innerText = 'Você não está autenticado';
        alert('Você se deslogou');
    }, function (error) {
        console.error(error);
    });
});