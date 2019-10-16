function gravarVisitante() {
    var database;
    var request = indexedDB.open("BrowserSQL", 1);

    request.onerror = function (e) { 
        console.log('Não foi possível abrir o banco de dados. Erro: ' + e.target.error);
    }

    request.onupgradeneeded = function(e) {
        database = e.target.result;

        database.createObjectStore("Visitantes", { keyPath: "CPF" });
    }

    request.onsuccess =function(e) {
        database = e.target.result;
    }

    var transaction = database.transaction(["Visitantes"],"readwrite");
    transaction.onerror = function(e) {
          console.log('Não foi possível abrir transação com o banco de dados. Erro: ' + e.target.error);
    };  
    
    var store = transaction.objectStore("Visitantes");
    store.add({CPF: $('#InputCPF').val(), Nome : $('#InputNome').val()});
}