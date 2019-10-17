$(document).ready(function(){
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	var request, db;
	if(!window.indexedDB)
	{
		console.log("Seu navegador não suporta o recurso HTML5 IndexedDB");
	}
	else
	{
		request = window.indexedDB.open("SQLBrowser2", 1);
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
		var request = db.transaction(["visitantes"],"readwrite").objectStore("visitantes").get(codigo);
		request.onsuccess = function(event){
			$("#feedback").html("Nome : "+request.result.nome);
		};
	});
});