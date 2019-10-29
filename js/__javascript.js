$(document).ready(function(){
    var request, db;
    
    import {gravar} from "js/indexedDB"

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

    function concatena(a,b,c='-'){
        return concatenado =a + ' ' + c + ' ' + b;
    }
        
    $("#gravar").click(gravar());

    $("#consultar").click(e =>{
		var codigo = $("#InputCPF").val();
        $("#feedback").html("Nome Consultado:");
        $("#InputNome").val("");

        var request = db.transaction(["visitantes"],"readwrite").objectStore("visitantes").get(codigo);

        request.onsuccess = function(event){
            if (typeof request.result === "undefined") {
                $("#feedback").html("CPF não localizado");
                $("#feedback").removeClass("form__text--sucessfull")
                $("#feedback").addClass("form__text--unsucessfull")
            }
            else {
                let dadosVisitante = [request.result.cpf,request.result.nome];

                cpfnome =concatena(...dadosVisitante);
                
                $("#feedback").html("Visitante: " + cpfnome);
                $("#feedback").removeClass("form__text--unsucessfull")
                $("#feedback").addClass("form__text--sucessfull")
            }
		};
	});
});