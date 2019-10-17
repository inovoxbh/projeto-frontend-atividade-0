$(document).ready(function(){
    var db;
    var request;
    var store;
    
    request= indexedDB.open("BrowserSQL", 1);

    request.onerror = function (e) { 
        console.log('Não foi possível abrir o banco de dados. Erro: ' + e.target.error);
    }

    request.onupgradeneeded = function(e) {
        db = e.target.result;
        store =db.createObjectStore("Visitantes", { keyPath: "CPF" });
    }

    request.onsuccess =function(e) {
        db = e.target.result;
        console.log('deu certo');
    }

    $("#gravar").click(function(){
        var cpf = $("#InputCPF").val();
        var nome = $("#InputNome").val();
    
        var transaction = db.transaction(["Visitantes"],"readwrite");
    
        transaction.onerror = function(e) {
              console.log('Não foi possível abrir transação com o banco de dados. Erro: ' + e.target.error);
        };  
    
        transaction.oncomplete = function(e) {
            console.log("Sucesso :)");
        };
        
        var store = transaction.objectStore("Visitantes");
        store.add({CPF: cpf, Nome : nome});
    })
});
