function gravar (){
    let nome = $("#InputNome").val();
    let cpf = $("#InputCPF").val();

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
}

export {gravar}
export default gravar