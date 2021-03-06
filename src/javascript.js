import concatena from './indexeddb.js'
import './img/favicon.ico'
import './img/android-chrome-192x192.png'
import './img/android-chrome-512x512.png'
import './css/sassoutput.css'

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
        console.log("Banco de dados aberto com sucesso-");
        db = event.target.result;
    }
    
    $("#gravar").click(function(){
        let nome = $("#InputNome").val();
        let cpf = $("#InputCPF").val();


        if ((cpf === null) | (cpf === "") | (cpf === " ")) {
            alert("Necessário informar CPF.");
            return;
        }
    
        if ((nome === null) | (nome === "") | (nome === " ")) {
            alert("Necessário informar nome.");
            return;
        }

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

    $("#consultar").click(e =>{
		var cpf = $("#InputCPF").val();

        if ((cpf === null) | (cpf === "") | (cpf === " ")) {
            alert("Necessário informar CPF.");
            return;
        }

        $("#feedback").html("Nome Consultado:");
        $("#InputNome").val("");

        var request = db.transaction(["visitantes"],"readwrite").objectStore("visitantes").get(cpf);

        request.onsuccess = function(event){
            if (typeof request.result === "undefined") {
                $("#feedback").html("CPF não localizado");
                $("#feedback").removeClass("form__text--sucessfull")
                $("#feedback").addClass("form__text--unsucessfull")
            }
            else {
                let dadosVisitante = [request.result.cpf,request.result.nome];

                var cpfnome =concatena(...dadosVisitante);
                
                $("#feedback").html("Visitante: " + cpfnome);
                $("#feedback").removeClass("form__text--unsucessfull")
                $("#feedback").addClass("form__text--sucessfull")
            }
		};
    });
});