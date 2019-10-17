$(document).ready(function(){
	var request, db;

    request = indexedDB.open("SQLBrowser2", 1);

    request.onerror = function(event){
        console.log("Erro ao abrir o banco de dados", event);
    }

    request.onupgradeneeded = function(event){
        console.log("Atualizando");
        db = event.target.result;
        var objectStore = db.createObjectStore("visitantes", { keyPath : 'cpf'});
    };

    request.onsuccess = function(event){
        console.log("Banco de dados aberto com sucesso");
        db = event.target.result;
    }
        
	$("#gravar").click(function(){
		var nome = $("#InputNome").val();
		var cpf = $("#InputCPF").val();

        var transaction = db.transaction(["visitantes"],"readwrite");

        transaction.oncomplete = function(event) {
			console.log("Sucesso :)");
			$("#feedback").html("Adicionado com Sucesso");
		};

        transaction.onerror = function(event) {
			console.log("Erro :(");
			$("#feedback").html("Erro ao Adicionar");
		};

        var objectStore = transaction.objectStore("visitantes");
		objectStore.add({cpf: cpf, nome: nome});
	});
	
	$("#consultar").click(function(){
		var codigo = $("#InputCPF").val();
        $("#feedback").html("Nome Consultado:");
        $("#InputNome").val("");

        var request = db.transaction(["visitantes"],"readwrite").objectStore("visitantes").get(codigo);

        request.onsuccess = function(event){
            $("#feedback").html("Nome Consultado: "+request.result.nome);
		};
	});
});