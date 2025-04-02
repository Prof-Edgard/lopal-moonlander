//Moonlander. Um jogo de alunissagem.
//Edgard Lemos (https://github.com/Prof-Edgard)
//28/03/2025
//Versão 0.1.0

/** @type {HTMLCanvasElement} */

//Seção de Modelagem de dados
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

let x;
let velocidadeX;
let angulo;

if( Math.round(Math.random()) == 0){
    x = 100;
    velocidadeX = 2;
    angulo = -Math.PI/2; 
} else{
    x = 700;
    velocidadeX = -2;
    angulo = Math.PI/2;
}



let moduloLunar = {
    posicao: {
        x: x,
        y: 100
    },
    angulo: angulo,
    largura: 20,
    altura: 20,
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x: velocidadeX,
        y: 0
    },
    combustivel: 1000,
    rotacaoAntiHorario: false,
    rotacaoHorario: false
}

var stars = [];
for (var i = 0; i < 500; i++) {
    stars[i] = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.sqrt(Math.random() * 2),
      alpha: 1.0,
      decreasing: true,
      dRatio: Math.random()*0.05
    };
  }

//Seção de visualização
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
        consumoCombustivel();
    }
    
    contexto.restore();
}

function desenharChama(){
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //Determina o tamanho da chama
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 35 );
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

function mostrarAngulo(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let angulo = `Ângulo: ${(moduloLunar.angulo * 180 / Math.PI).toFixed(0)}°`;
    contexto.fillText(angulo, 400, 40);
}

function mostrarAltitude(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let angulo = `Altitude: ${(canvas.height - moduloLunar.posicao.y -
                                    0.5 * moduloLunar.altura).toFixed(0)}`;
    contexto.fillText(angulo, 400, 60);
}

function mostrarAngulo(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let angulo = `Ângulo: ${(moduloLunar.angulo * 180 / Math.PI).toFixed(0)}°`;
    contexto.fillText(angulo, 400, 40);
}


function mostrarVelocidadeHorizontal(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `Velocidade Horizontal: ${(10 * moduloLunar.velocidade.x).toFixed(2)}`;
    contexto.fillText(velocidade, 50, 40);
}

function mostrarVelocidadeVertical(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `Velocidade Vertical: ${(10 * moduloLunar.velocidade.y).toFixed(2)}`;
    contexto.fillText(velocidade, 50, 60);
}

function mostrarCombustivel(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let combustivel = `Combustível: ${(moduloLunar.combustivel / 10).toFixed(0)} %`;
    contexto.fillText(combustivel, 50, 80);
}


function drawStars() 
{
  contexto.save();
  contexto.fillStyle = "#000"
  contexto.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    contexto.beginPath();
    contexto.arc(star.x, star.y, star.radius, 0, 2*Math.PI);
    contexto.closePath();
    contexto.fillStyle = "rgba(255, 255, 255, " + star.alpha + ")";
    if (star.decreasing == true)
    {
      star.alpha -=star.dRatio;
      if (star.alpha < 0.1)
      { star.decreasing = false; }
    }
    else
    {
      star.alpha += star.dRatio;
      if (star.alpha > 0.95)
      { star.decreasing = true; }
    }
    contexto.fill();
  }
  contexto.restore();
}


function desenhar(){
    //limpar a tela
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    //Esta função atualiza a posição do módulo lunar em função da gravidade
    drawStars();
    atracaoGravitacional();
    desenharModuloLunar();
    mostrarAltitude();
    mostrarAngulo();
    mostrarVelocidadeHorizontal();
    mostrarVelocidadeVertical();
    mostrarCombustivel();
    
    //Esta função repete a execução da função desenhar a cada quadro
    if(moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura )){
        
        if( moduloLunar.velocidade.y >= 0.5 || 
            moduloLunar.velocidade.x >= 0.5 ||
            5 < moduloLunar.angulo ||
             moduloLunar.angulo < -5 
        )
        {
            return alert("Você morreu na queda!");
        }else{
            return alert("Você conseguiu pousar!");
        }
    }
    
    requestAnimationFrame(desenhar);
}


//Seção de controle


//Pressionando a seta para cima para ligar o motor
document.addEventListener("keydown", teclaPressionada);
function teclaPressionada(evento){
    if(evento.keyCode == 38 && moduloLunar.combustivel > 0){
        moduloLunar.motorLigado = true;
        
    } else if(evento.keyCode == 39){
        moduloLunar.rotacaoAntiHorario = true;
       
    } else if(evento.keyCode == 37){
        moduloLunar.rotacaoHorario = true;
    }
}
//Soltando a seta para cima para desligar o motor
document.addEventListener("keyup", teclaSolta);
function teclaSolta(evento){
    if(evento.keyCode == 38){
        moduloLunar.motorLigado = false;
    } else if(evento.keyCode == 39){
         moduloLunar.rotacaoAntiHorario = false;
        
    } else if(evento.keyCode == 37){
        moduloLunar.rotacaoHorario = false;
    }
}

function consumoCombustivel(){
    if(moduloLunar.combustivel > 0){
        moduloLunar.combustivel--;
    }else{
        moduloLunar.combustivel = 0;
        moduloLunar.motorLigado = false;
    }
}

let gravidade = 0.01;
function atracaoGravitacional(){
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    if(moduloLunar.rotacaoAntiHorario){
        moduloLunar.angulo += Math.PI/180;    
    } else if (moduloLunar.rotacaoHorario){
        moduloLunar.angulo -= Math.PI/180;
    }

    if(moduloLunar.motorLigado){
        moduloLunar.velocidade.y -= 0.0115 * Math.cos(moduloLunar.angulo);
        moduloLunar.velocidade.x += 0.0115 * Math.sin(moduloLunar.angulo);
    }
    moduloLunar.velocidade.y += gravidade;
   
    
}
desenhar();

