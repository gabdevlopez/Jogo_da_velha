let velha = document.querySelectorAll(".quad");

let troca = true;
let end = false;

let reseta = [] 


//o objeto a seguir representa o jogo da velha, sendo cada vetor uma linha e 
//cada elemento do vetor um quadrado 

let divs = {
    div1: [0, 1, 2],
    div2: [0, 1, 2],
    div3: [0, 1, 2]
}

velha.forEach((e) =>{
    e.addEventListener('click', clicou);
})


function clicou(e){

    if(end){
        return;
    }

    let pointer = e.target; 

    if(pointer.children[0] == undefined){
        if(troca){
            pointer.append(criaImagem("./SVG/x.svg", "x"));
            troca = false; //false = Bola
        } 
        else if(!troca){
            pointer.append(criaImagem("./SVG/bola.svg", "bola"))
            troca = true; //true = X
        }
        
        let aux2 = pointer.id;
        let aux3 = pointer.children[0].className;

        reseta.push(pointer.id);
            
        insereElemen(aux2, aux3);

        vencedorHorizontal(divs.div1, aux3); 
        vencedorHorizontal(divs.div2, aux3); 
        vencedorHorizontal(divs.div3, aux3);
        vencedorDiagVert(divs.div1, divs.div2, divs.div3, aux3); 

        if(end){
            return;
        }
        else if(reseta.length == 9){
            setTimeout(() =>{
                alert("Deu velha!")
                end = true;
            }, 500)
        }
    }
}


//cria uma tag img para adicionar uma imagem, atribui uma classe (x ou bola) e retorna a imagem criada


function criaImagem(imagem, classe){
    let img = document.createElement("IMG");
    img.src = imagem;
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.margin = "25px";
    img.classList.add(classe);

    return img
}


//insere o nome da classe dentro de um dos vetores criados no objeto da linha 6.
//os parametros são, respectivamente, o id e o nome da classe.
//o id é usado para identificar em qual posição do vetor o nome da classe irá ficar.

function insereElemen(aux2, aux3){

    if(aux2 == 0 || aux2 == 1 || aux2 == 2){
        divs.div1[aux2] = aux3
    }
    else if(aux2 == 3 || aux2 == 4 || aux2 == 5){
        divs.div2[aux2-3] = aux3 
    }
    else if(aux2 == 6 || aux2 == 7 || aux2 == 8){
        divs.div3[aux2-6] = aux3 
    }
}

//verifica se alguem venceu na vertical ou na diagonal
function vencedorDiagVert(div, div2, div3, aux3){

    for(let i = 0; i < 3; i++){
        if(div[i] == aux3 && div2[i] == aux3 && div3[i] == aux3){
            tempo(aux3)
        }
    }
    if((div[0] == aux3 && div2[1] == aux3 && div3[2] == aux3) || 
        (div[2] == aux3 && div2[1] == aux3 && div3[0] == aux3)){
            tempo(aux3)
    }
}


//verifica se alguem venceu na horizontal
function vencedorHorizontal(div, aux3){
    if(div[0] == aux3 && div[1] == aux3 && div[2] == aux3){
        tempo(aux3)
    }
}

//dispara um alert com meio segundo de atraso informando qual jogador ganhou
function tempo(a){
    end = true;
    setTimeout(() => {
        alert("jogador "+ a +" ganhou");
    }, 500);
}


//quando clicar o botao no html for clicado, essa função será chamada.
function resetaJogo(){  

    
    for(let i = 0; i < reseta.length; i++){
        velha[reseta[i]].removeChild(velha[reseta[i]].children[0]);
    }
    
    limpaArray(divs.div1)
    limpaArray(divs.div2)
    limpaArray(divs.div3)

    reseta.splice(0, reseta.length);
    end = false;
    troca = true;

}

function limpaArray(array){
    for(let i = 0; i < 3; i++){
        array[i] = i;
    }
}