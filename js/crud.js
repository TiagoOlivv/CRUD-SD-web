var nextkey = 0;        
var database = firebase.database();

database.ref('TrabSD').on('child_added', function (data) {
    add_data_table(data.val().TrabName, data.val().EndGithub, data.val().LingProg, data.val().AutorName,data.key);
    var lastkey = data.key;
    nextkey = parseInt(lastkey) + 1;
});

database.ref('TrabSD').on('child_changed', function (data) {
    update_data_table(data.val().TrabName, data.val().EndGithub, data.val().LingProg, data.val().AutorName,data.key)
});

database.ref('users').on('child_removed', function (data) {
    remove_data_table(data.key)
});

function add_data_table(trab, github, language, name, key) {
    $("#card-list").append('<div class="column is-3" id="' + key + '"><div class="card"></div><div class="card-content"><div class="media"><div class="media-content"><p class="title is-6">Nome do Trabalho-->  ' + trab + '</p><p class="title is-6">Github-->  ' + github + '</p><p class="title is-6">Linguagem de Programação-->  ' + language + '</p><p class="title is-6">Nome do Autor-->  ' + name + '</p><footer class="card-footer"><a href="#" data-key="' + key + '" class="card-footer-item btnEdit is-10">Editar</a><a href="#" class="card-footer-item btnRemove"  data-key="' + key + '">Remover</a></footer></div></div>');
}

function update_data_table(trab, github, language, name, key) {
    window.location.reload();
  ("#card-list #" + key).html('<div class="card"><div class="card-image"><figure class="image is-4by3"></div><div class="card-content"><div class="media"><div class="media-content"><p class="title is-4">Nome do Trabalho-->  ' + trab + '</p><p class="title is-4">Github-->  ' + github + '</p><p class="title is-4">Linguagem de Programação-->  ' + language + '</p><p class="title is-10">Nome do Autor-->  ' + name + '</p></div><footer class="card-footer"><a href="#" class="card-footer-item btnEdit"  data-key="' + key + '">Editar</a><a  data-key="' + key + '" href="#" class="card-footer-item btnRemove is-4">Remover</a></footer></div>');  
}

function remove_data_table(key) {
    $("#card-list #" + key).remove();
}

function new_data(trab, github, language, name, key) {
    database.ref('TrabSD/' + key).set({
        TrabName: trab,
        EndGithub: github,
        LingProg: language,
        AutorName: name        
    });
}

function update_data(trab, github, language, name, key) {
    database.ref('TrabSD/' + key).update({
        TrabName: trab,
        EndGithub: github,
        LingProg: language,
        AutorName: name   
    });
}

$("#btnAdd").click(function () {
    $("#txtTrabalho").val("");
    $("#txtGithub").val("");
    $("#txtLinguagem").val("");
    $("#txtAutor").val("");
    $("#txtType").val("N");
    $("#txtKey").val("0");
    $("#modal").addClass("is-active");
});


$("#btnSave").click(function () {
    if ($("#txtType").val() == 'N') {
        database.ref('TrabSD').once("value").then(function (snapshot) {
            if (snapshot.numChildren() == 0) {
                nextkey = 1;
            }
            new_data($("#txtTrabalho").val(), $("#txtGithub").val(),$("#txtLinguagem").val(), $("#txtAutor").val(), nextkey);
        });
    } else {
        update_data($("#txtTrabalho").val(), $("#txtGithub").val(), $("#txtLinguagem").val(),$("#txtAutor").val(), $("#txtKey").val());
    }
    $("#btnClose").click();
});

$(document).on("click", ".btnEdit", function (event) {
    event.preventDefault();
    key = $(this).attr("data-key");
    database.ref('TrabSD/' + key).once("value").then(function (snapshot) {
        $("#txtTrabalho").val(snapshot.val().TrabName);
        $("#txtGithub").val(snapshot.val().EndGithub);
        $("#txtLinguagem").val(snapshot.val().LingProg);
        $("#txtAutor").val(snapshot.val().AutorName);                
        $("#txtType").val("E");
        $("#txtKey").val(key);
    });
    $("#modal").addClass("is-active");
});

$(document).on("click", ".btnRemove", function (event) {
    event.preventDefault();
    key = $(this).attr("data-key");
    database.ref('TrabSD/' + key).remove();
    window.location.reload();
})

$("#btnClose,.btnClose").click(function () {
    $("#modal").removeClass("is-active");
});