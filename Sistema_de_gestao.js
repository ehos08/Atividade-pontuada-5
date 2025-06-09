/* Sistema de gestão de estoque
 * Funcionalidades pedidas:
 * 1. Cadastrar produto
 * 2. Listar produtos
 * 3. Atualizar estoque
 * 4. Relatórios de estoque
 * 5. Sair do programa
 */

// banco de dados de produtos (simulado com uma lista de objetos)
let estoque = [];

// função principal que inicia o sistema
function main() {
    console.log("=== SISTEMA DE GESTÃO DE ESTOQUE ===");
    
    while (true) {
        console.log("\nOpções disponíveis:");
        console.log("1. Cadastrar produto");
        console.log("2. Listar produtos");
        console.log("3. Atualizar estoque");
        console.log("4. Relatório de estoque");
        console.log("5. Sair");
        
        const opcao = prompt("Digite o número da opção desejada: ");
        
        switch (opcao) {
            case "1":
                cadastrarProduto();
                break;
            case "2":
                listarProdutos();
                break;
            case "3":
                atualizarEstoque();
                break;
            case "4":
                gerarRelatorio();
                break;
            case "5":
                console.log("Saindo do sistema...");
                return;
            default:
                console.log("Opção inválida. Por favor, escolha uma opção de 1 a 5.");
        }
    }
}

// função para cadastrar um novo produto dentro do estoque
function cadastrarProduto() {
    console.log("\n=== CADASTRAR NOVO PRODUTO ===");
    
    const nome = prompt("Digite o nome do produto: ");
    
    // verifica se o produto já existe
    const produtoExistente = estoque.find(produto => produto.nome.toLowerCase() === nome.toLowerCase());
    
    if (produtoExistente) {
        console.log(`Produto "${nome}" já existe no estoque.`);
        const resposta = prompt("Deseja adicionar mais unidades? (s/n): ").toLowerCase();
        
        if (resposta === 's') {
            const quantidade = parseInt(prompt(`Quantas unidades de "${nome}" deseja adicionar? `));
            
            if (!isNaN(quantidade) && quantidade > 0) {
                produtoExistente.quantidade += quantidade;
                console.log(`Adicionadas ${quantidade} unidades ao produto "${nome}".`);
            } else {
                console.log("Quantidade inválida. Operação cancelada.");
            }
        }
        return;
    }
    
    const quantidade = parseInt(prompt(`Digite a quantidade de "${nome}" em estoque: `));
    const preco = parseFloat(prompt(`Digite o preço unitário de "${nome}": `));
    
    if (isNaN(quantidade) || quantidade <= 0 || isNaN(preco) || preco <= 0) {
        console.log("Dados inválidos. O produto não foi cadastrado.");
        return;
    }
    const novoProduto = {
        nome: nome,
        quantidade: quantidade,
        preco: preco
    };
    estoque.push(novoProduto);
    console.log(`Produto "${nome}" cadastrado com sucesso!`);
}
// lista os produtos cadastrados no estoque
function listarProdutos() {
    console.log("\n=== LISTA DE PRODUTOS ===");
    
    if (estoque.length === 0) {
        console.log("Nenhum produto cadastrado no estoque.");
        return;
    }
    estoque.forEach((produto, index) => {
        console.log(`${index + 1}. ${produto.nome} - ${produto.quantidade} unidades - R$ ${produto.preco.toFixed(2)} cada`);
    });
}
 // atualiza o estoque ou um produto específico
function atualizarEstoque() {
    console.log("\n=== ATUALIZAR ESTOQUE ===");
    
    if (estoque.length === 0) {
        console.log("Nenhum produto cadastrado para atualizar.");
        return;
    }
    listarProdutos();

    const nomeProduto = prompt("Digite o nome do produto que deseja atualizar: ");
    const produto = estoque.find(produto => produto.nome.toLowerCase() === nomeProduto.toLowerCase());
    
    if (!produto) {
        console.log(`Produto "${nomeProduto}" não encontrado no estoque.`);
        return;
    }
    console.log(`Produto selecionado: ${produto.nome} (${produto.quantidade} unidades)`);
    console.log("1. Adicionar unidades");
    console.log("2. Remover unidades");
    console.log("3. Cancelar");
    
    const opcao = prompt("Escolha uma opção: ");
    
    switch (opcao) {
        case "1":
            const qtdAdicionar = parseInt(prompt(`Quantas unidades de "${produto.nome}" deseja adicionar? `));
            
            if (!isNaN(qtdAdicionar) && qtdAdicionar > 0) {
                produto.quantidade += qtdAdicionar;
                console.log(`Estoque atualizado: ${produto.quantidade} unidades.`);
            } else {
                console.log("Quantidade inválida. Operação cancelada.");
            }
            break;
            
        case "2":
            const qtdRemover = parseInt(prompt(`Quantas unidades de "${produto.nome}" deseja remover? `));
            
            if (!isNaN(qtdRemover) && qtdRemover > 0) {
                if (qtdRemover <= produto.quantidade) {
                    produto.quantidade -= qtdRemover;
                    console.log(`Estoque atualizado: ${produto.quantidade} unidades.`);
                    if (produto.quantidade === 0) {
                        console.log("ATENÇÃO: O estoque deste produto chegou a zero!");
                    }
                } else {
                    console.log(`Não há estoque suficiente. Apenas ${produto.quantidade} unidades disponíveis.`);
                }
            } else {
                console.log("Quantidade inválida. Operação cancelada.");
            }
            break;
            
        case "3":
            console.log("Operação cancelada.");
            break;
            
        default:
            console.log("Opção inválida.");
    }
} 

//gera um relatório do estoque
function gerarRelatorio() {
    console.log("\n=== RELATÓRIO DE ESTOQUE ===");
    
    if (estoque.length === 0) {
        console.log("Nenhum produto cadastrado no estoque.");
        return;
    }
    
    // relatório de produtos
    console.log("\nProdutos em estoque:");
    estoque.forEach(produto => {
        console.log(`- ${produto.nome}: ${produto.quantidade} unidades (R$ ${produto.preco.toFixed(2)} cada)`);
    });
    
    // estatísticas de relatório
    const totalProdutos = estoque.length;
    const totalUnidades = estoque.reduce((total, produto) => total + produto.quantidade, 0);
    const valorTotal = estoque.reduce((total, produto) => total + (produto.quantidade * produto.preco), 0);
    
    console.log("\nResumo do estoque:");
    console.log(`- Total de produtos diferentes: ${totalProdutos}`);
    console.log(`- Total de unidades em estoque: ${totalUnidades}`);
    console.log(`- Valor total do estoque: R$ ${valorTotal.toFixed(2)}`);
    
    // produtos com estoque baixo (menos de 5 unidades)
    const produtosBaixoEstoque = estoque.filter(produto => produto.quantidade < 5);
    
    if (produtosBaixoEstoque.length > 0) {
        console.log("\nATENÇÃO: Produtos com estoque baixo (menos de 5 unidades):");
        produtosBaixoEstoque.forEach(produto => {
            console.log(`- ${produto.nome}: ${produto.quantidade} unidades`);
        });
    }
}
const prompt = require('prompt-sync')();

// dá início ao programa
main();