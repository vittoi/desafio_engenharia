
//Vitor Pacheco de Carvalho
//Universidade Federal de São Carlos
//Ciência da Computação
//Semestre 8
//Previsão de formação junho/2023

const pacotes = {
    "Pacote 1" : "288355555123888",
    "Pacote 2" : "335333555584333",
    "Pacote 3" : "223343555124001",
    "Pacote 4" : "002111555874555",
    "Pacote 5" : "111188555654777",
    "Pacote 6" : "111333555123333",
    "Pacote 7" : "432055555123888",
    "Pacote 8" : "079333555584333",
    "Pacote 9" : "155333555124001",
    "Pacote 10": "333188555584333",
    "Pacote 11": "555288555123001",
    "Pacote 12": "111388555123555",
    "Pacote 13": "288000555367333",
    "Pacote 14": "066311555874001",
    "Pacote 15": "110333555123555",
    "Pacote 16": "333488555584333",
    "Pacote 17": "455448555123001",
    "Pacote 18": "022388555123555",
    "Pacote 19": "432044555845333",
    "Pacote 20": "034311555874001",
}

const regioes = [{
    "Centro-oeste": {},
    "Nordeste":{},
    "Norte":{},
    "Sudeste":{},
    "Sul":{},
},
{
    "Centro-oeste": {},
    "Nordeste":{},
    "Norte":{},
    "Sudeste":{},
    "Sul":{},
}
]
const produtos = {
    "Joias": 0,
    "Livros" : 0,
    "Eletronicos" : 0,
    "Bebidas" : 0,
    "Brinquedos" : 0,
}
const produtosByCod = {
        "001": "Joias",
        "111": "Livros",
        "333": "Eletronicos",
        "555": "Bebidas",
        "888": "Brinquedos",
}
const vendedores ={};
const invalidos = {}
const pacotesProps ={}

function organizaDados(){
    Object.keys(pacotes).forEach(pacoteName =>{
        let pacote = pacotes[pacoteName];
        pacotesProps[pacoteName] = {
            Rorigem: "",
            Rdestino: "",
            codigoProduto: -1,
            vendedor: -1,
        }

        let origens = regioes[0]
        let destinos = regioes[1]

        for(let i =0; i< 15; i+=3){
            let trinca = pacote.slice(i, i+3);
            let trincaPercent = -1;
            let pacoteAux;

            if(trinca >=1)
                trincaPercent = parseInt(trinca/100);
            else
                trinca = -1
            
            
            if(i===0){//organiza as origens dos codigos

                switch(trincaPercent){
                    case 2:
                        pacoteAux = origens["Centro-oeste"]
                        pacoteAux[pacoteName] = true
                        pacotesProps[pacoteName].Rorigem = "Centro-oeste";
                    continue;
                    case 3:
                        pacoteAux = origens["Nordeste"]
                        pacoteAux[pacoteName] = true//pacoteAux.pacotes.length? pacoteAux.pacotes.push(pacoteName): pacoteAux.pacotes = [pacoteName]
                        pacotesProps[pacoteName].Rorigem = "Nordeste";
                        
                    continue;
                    case 4:
                        pacoteAux = origens["Norte"]
                        pacoteAux[pacoteName] = true
                        pacotesProps[pacoteName].Rorigem = "Norte";
                        
                    continue;
                    case 0:
                        pacoteAux = origens["Sudeste"]
                        pacoteAux[pacoteName] = true
                        pacotesProps[pacoteName].Rorigem = "Sudeste";
                        
                    continue;
                    case 1:
                        pacoteAux = origens["Sul"]
                        pacoteAux[pacoteName] = true
                        pacotesProps[pacoteName].Rorigem = "Sul";
                        
                    continue;
                    default:
                        invalidos[pacoteName] = true;
                        delete pacotesProps[pacoteName]
                        return
                }
                
            }
            else if(i === 3){//organiza os destinos dos codigos
                
                switch(trincaPercent){
                    
                    case 2:
                        pacoteAux = destinos["Centro-oeste"]
                        pacoteAux[pacoteName] = true
                        pacotesProps[pacoteName].Rdestino = "Centro-oeste";
                    continue;
                    case 3:
                        pacoteAux = destinos["Nordeste"]
                        pacoteAux[pacoteName] = true
                        pacotesProps[pacoteName].Rdestino = "Nordeste";
                        
                    continue;
                    case 4:
                        pacoteAux = destinos["Norte"]
                        pacoteAux[pacoteName] = true
                        pacotesProps[pacoteName].Rdestino = "Norte";
                        
                    continue;
                    case 0:
                        pacoteAux = destinos["Sudeste"]
                        pacoteAux[pacoteName] = true
                        pacotesProps[pacoteName].Rdestino = "Sudeste";
                        
                    continue;
                    case 1:
                        pacoteAux = destinos["Sul"]
                        pacoteAux[pacoteName] = true
                        pacotesProps[pacoteName].Rdestino = "Sul";
                        
                    continue;
                    default:
                        invalidos[pacoteName] = true;
                        delete pacotesProps[pacoteName]
                        return
                }
                
                
            }else if(i === 6){//verifica se o codigo da loggi está correto
                if(trinca != 555){//codigo da loggi
                    invalidos[pacoteName] = true;
                    delete pacotesProps[pacoteName]
                    return
                }
            }else if(i === 9){
                if(trinca === "367"){//cpnj inativo
                    invalidos[pacoteName] = true;
                    delete pacotesProps[pacoteName]
                    return
                }
                pacotesProps[pacoteName].vendedor = trinca;
                
                vendedores[trinca] = vendedores[trinca]>0?vendedores[trinca]+=1 : 1;
            }else if(i === 12){
                let naoProd = (trinca != "001" && trinca != "111" && trinca != "333" && trinca != "555" && trinca != "888")? true : false//true se o produto nao está dentro dos possiveis
                
                if((trinca === "001" && pacotesProps[pacoteName].Rorigem === "Centro-oeste") || naoProd){//joias
                    invalidos[pacoteName] = true;
                    delete pacotesProps[pacoteName];
                    return
                }
                
                pacotesProps[pacoteName].codigoProduto = trinca;
                produtos[produtosByCod[trinca]]++;
            }
        }
    });
    relatorio()
    //console.log(pacotesProps)
}

function relatorio(){
    //1
    console.log("1 - Quantidade de pacotes por destino:")
    for(let regiao in regioes[1]){
        console.log("  ",regiao,": ", Object.keys(regioes[1][regiao]).length)
    }
    //2
    console.log("\n2 - Pacotes e a validade do seu código:")
    for(let pacote in pacotesProps){
        console.log("  ",pacote, "Válido")
    }
    for(let pacote in invalidos){
        console.log("  ",pacote, "Inválido")
    }
    //3
    console.log("\n3 - Pacotes com origem Sul e com conteúdo Brinquedo")
    for(let pacote in regioes[0]["Sul"]){
        if(pacotesProps[pacote] && pacotesProps[pacote].codigoProduto === "888")
            console.log("  ",pacote)
    }
    //4
    console.log("\n4 - Pacotes por Região de Destino")
    for(let regiao in regioes[1]){
        console.log("  ",regiao, ": ")
        Object.keys(regioes[1][regiao]).forEach( pacote =>{
            console.log("    ",pacote)
        });
    }
    
    //5
    console.log("\n6 - Quantidade de pacotes enviados por cada vendedor")
    for(let vendedorCod in vendedores){
        console.log("   Vendedor", vendedorCod, ": ",vendedores[vendedorCod] )
    }

    //6
    console.log("\n6 - Quantidade de pacotes para cada destino e quantidade de pacotes para cada tipo")
    for(let regiao in regioes[1]){
        console.log("  ",regiao,": ", Object.keys(regioes[1][regiao]).length)
    }
    for(let produto in produtos){
        console.log("  ",produto,": ", produtos[produto])
    }

    //7
    console.log("\n7 - Pacotes despachados para região Norte e Centro-Oeste")
    for(let pacote in pacotesProps){
        if(pacotesProps[pacote].Rdestino === "Norte" || pacotesProps[pacote].Rdestino === "Centro-oeste")
            console.log("  ", pacote);
    }

    //8
    console.log("\n8 - Ordem dos Pacotes despachados para região Norte descarregando no Centro-oeste primeiro")
    let list = [];
    for(let pacote in pacotesProps){
        if(pacotesProps[pacote].Rdestino === "Centro-oeste"){
            list.unshift(pacote)
        }else if(pacotesProps[pacote].Rdestino === "Norte"){
            list.push(pacote)
        }  
    }
    list.forEach(pacote =>{
        console.log("  ", pacote)
        }
    )

    //9
    console.log("\n9 - Ordem dos Pacotes despachados para região Norte descarregando Jóias com destino Centro-oeste, outros pacotes com destino Centro-oeste, Jóias com destino Norte e outros pacotes com destino Norte estritamente nesta ordem")
    list = [];
    listAux = []
    for(let pacote in pacotesProps){
        if(pacotesProps[pacote].Rdestino === "Centro-oeste"){
            if(produtosByCod[pacotesProps[pacote].codigoProduto] === "Joias")
                listAux.unshift(pacote)
            else
                listAux.push(pacote)
        }else if(pacotesProps[pacote].Rdestino === "Norte"){
            if(produtosByCod[pacotesProps[pacote].codigoProduto] === "Joias")
                list.unshift(pacote)
            else
                list.push(pacote)
        }  
    }
    list = list.concat(listAux);
    list.forEach(pacote =>{
        console.log("  ", pacote)
        }
    )

    //10
    console.log("\n10 - Pacotes Inválidos:")
    for(let pacote in invalidos){
        console.log("  ",pacote)
    }
}

(async() => {
    organizaDados();
    process.exit();
})();