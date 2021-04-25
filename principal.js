console.log('Desenvolvido por Jonas, com ajuda de alguns tutoriais na internet');

//Chamada do sprites (imagens necessárias para criar os cenários, personagens e obstaculos em uma imagem só)
const sprites = new Image();
sprites.src = '_img/sprite.png';

//Seleciona o Canvas com QuerySelector > LER MAIS SOBRE
const canvas = document.querySelector('canvas')
//Transforma o canvas em um cenário 2D
const contexto = canvas.getContext('2d');

var cimaPressionado = true;

//Persongaem
const ninja = {
    sourceX: 0,
    sourceY: 0,
    largura: 95,
    altura: 110,
    x: 50,
    y: 250,
    larguraCanvas: 64,
    alturaCanvas: 64,
    gravidade: 0.01,
    velocidade: 0,
    //Personagem pulando
    atualiza(){
            ninja.velocidade = ninja.velocidade + ninja.gravidade;
            ninja.y = ninja.y - ninja.velocidade;
    },
    //O desenho terá a capacidade de desenhar ele mesmo na função abaixo
    desenha(){
        contexto.drawImage(
            sprites,
            //pega a localização da imagem (eixo x e y da imagem) dentro do sprite
            ninja.sourceX, ninja.sourceY,
            //largura e altura da imagem dentro do sprite
            ninja.largura, ninja.altura,
            //eixo onde a imagem será colocada dentro do CANVAS
            ninja.x, ninja.y,
            //dentro do canvas, qual será o tamanho da imagem
            ninja.larguraCanvas, ninja.alturaCanvas,
        );
    }
}
//CEU
const ceuFundo = {
    sourceX: 278,
    sourceY: 0,
    largura: 348,
    altura: 140,
    x: 0,
    y: canvas.height - 425,
    larguraCanvas: 300,
    alturaCanvas: 320,
    desenha(){
        contexto.drawImage(
            sprites,
            ceuFundo.sourceX, ceuFundo.sourceY,
            ceuFundo.largura, ceuFundo.altura,
            ceuFundo.x, ceuFundo.y,
            ceuFundo.largura, ceuFundo.alturaCanvas,
        );
        //replica
        contexto.drawImage(
            sprites,
            ceuFundo.sourceX, ceuFundo.sourceY,
            ceuFundo.largura, ceuFundo.altura,
            (ceuFundo.x + ceuFundo.largura), ceuFundo.y,
            ceuFundo.largura, ceuFundo.alturaCanvas,
        );
    }
}

//CHÃO
const chaoCidade = {
    sourceX: 0,
    sourceY: 207,
    largura: 348,
    altura: 94,
    x: 0,
    //pega altura do canvas com .height, empurra para baixo e subtrai o tamanho da imagem para ficar fixa.
    y: canvas.height - 105,
    larguraCanvas: 348,
    alturaCanvas: 131,
    desenha(){
        contexto.drawImage(
            sprites,
            chaoCidade.sourceX, chaoCidade.sourceY,
            chaoCidade.largura, chaoCidade.altura,
            chaoCidade.x, chaoCidade.y,
            //Recebe no tamanho do Canvas, o mesmo tamanho da imagem original
            chaoCidade.largura, chaoCidade.alturaCanvas,
        );

        //replica o chão para que ele aumente seu tamanho e cubra a tela do canvas inteira
        contexto.drawImage(
            sprites,
            chaoCidade.sourceX, chaoCidade.sourceY,
            chaoCidade.largura, chaoCidade.altura,
            //soma o eixo que está (0) + a largura do cenário e empurra ele pro lado.
            (chaoCidade.x + chaoCidade.largura), chaoCidade.y,
            chaoCidade.largura, chaoCidade.alturaCanvas,
        );        
    }
}

//Tela de inicio
const iniciarJogo = {
    sourceX: 0,
    sourceY: 335,
    largura: 279,
    altura: 260,
    x: (canvas.width / 2) - 174 / 2,
    y: 0,
    larguraCanvas: 220,
    alturaCanvas: 200,
    desenha(){
        contexto.drawImage(
            sprites,
            //pega a localização da imagem (eixo x e y da imagem) dentro do sprite
            iniciarJogo.sourceX, iniciarJogo.sourceY,
            //largura e altura da imagem dentro do sprite
            iniciarJogo.largura, iniciarJogo.altura,
            //eixo onde a imagem será colocada dentro do CANVAS
            iniciarJogo.x, iniciarJogo.y,
            //dentro do canvas, qual será o tamanho da imagem
            iniciarJogo.larguraCanvas, iniciarJogo.alturaCanvas,
        );
    }
}

// Telas
//agrupamento para melhor visualização
//telaAtiva vai funcionar para trocar as telas
//let é definido para quando o valor for sofrer alteração
let telaAtiva ={};
function mudancaTela(novaTela){
    telaAtiva = novaTela;
}
const telas ={
    inicio:{
        desenha(){            
            chaoCidade.desenha();
            ceuFundo.desenha();
            ninja.desenha();
            iniciarJogo.desenha();
        },
        //ao cliclar na tela, o usuário chama a tela do jogo.
        click(){
            mudancaTela(telas.jogo);
        },
        atualiza(){

        }

    }
};
// adiciona valor novo, porém método diferente, mas funciona como telas inicio:
telas.jogo = {
    desenha(){
        chaoCidade.desenha();
        ceuFundo.desenha();
        ninja.desenha();
        
    },
    atualiza(){
        ninja.atualiza();
    }
};
//Função definida para que o ResquestAnimationFrame posso chamar e desenhar o objeto no canvas
function desenharTela(){    
    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(desenharTela);
}

//adiciona evento para saber quando o usuário cliclou na tela e o jogo poder iniciar
window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
})

mudancaTela(telas.inicio);
desenharTela();
