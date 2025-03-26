/** @type {HTMLCanvasElement} */

let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

// contexto.beginPath();
// contexto.rect(0,0, 100, 100);
// contexto.fillStyle = "white";
// contexto.fill();
// contexto.strokeStyle = "black";
// contexto.stroke();

// contexto.beginPath();
// contexto.moveTo(100, 100);
// contexto.lineTo(200, 100);
// contexto.lineTo(100, 200);
// contexto.lineTo(100, 100);
// contexto.fillStyle = "black";
// contexto.fill();

let moduloLunar = {
    posicao: {
        x: 100,
        y: 100
    },
    angulo: 0,
    largura: 20,
    altura: 20,
    cor: "black",
    motorLigado: false,
    velocidade: {
        x: 0,
        y: 0
    }
}

function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5,
         moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();

    if(moduloLunar.motorLigado){
        desenharChama();
    }
    
    contexto.restore();
}

function desenharChama(){
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //Determina o tamanho da chama
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 10 );
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}




let x = 100;

function desenhar(){
    //limpar a tela
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    contexto.save() //salvando contexto atual
    //vai (muda o contexto) para o centro da tela 
    contexto.translate(canvas.width / 2, canvas.height / 2 );
    contexto.beginPath();
    //contexto.arc(x, 100, 25, 0, 2 * Math.PI);
    contexto.rotate(Math.PI/4);
    contexto.rect(x, 100, 25, 10);
    contexto.fillStyle = "black";
    contexto.fill();
    contexto.restore(); //restaura o contexto anterior

    x = x + 1;
    atracaoGravitacional();
    desenharModuloLunar();
    requestAnimationFrame(desenhar);
    
}

//Pressionando a seta para cima para ligar o motor
document.addEventListener("keydown", teclaPressionada);
function teclaPressionada(evento){
   if(evento.keyCode == 38){
        moduloLunar.motorLigado = true;
    }
}
//Soltando a seta para cima para desligar o motor
document.addEventListener("keyup", teclaSolta);
function teclaSolta(evento){
    if(evento.keyCode == 38){
        moduloLunar.motorLigado = false;
    }
}

let gravidade = 0.1;
function atracaoGravitacional(){
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    if(moduloLunar.motorLigado){
        moduloLunar.velocidade.y -= 0.2;
    }
    moduloLunar.velocidade.y += gravidade;
}
desenhar();

