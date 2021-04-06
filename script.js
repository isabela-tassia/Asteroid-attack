let diryJ, dirxJ, jog, velJ, pjx, pjy; //direção e posição x e y do jogador
let jogo;
let frames;
let tamTelaW, tamTelaH; // tamanho da tela
let velT;

function teclaDw(event) {
  let tecla = event.code; // olhar o race car
  if (tecla == "ArrowLeft") {
    //esquerda
    dirxJ = -1;
  } else if (tecla == "ArrowUp") {
    //Cima
    diryJ = -1;
  } else if (tecla == "ArrowRight") {
    //Direita
    dirxJ = 1;
  } else if (tecla == "Space") {
    //espaço - tiro
    atira(pjx + 17, pjy);
  } else if (tecla == "ArrowDown") {
    //Baixo
    diryJ = 1;
  }
}

function teclaUp() {
  let tecla = event.keyCode;
  if (tecla == 37 || tecla == 39) {
    //esquerda
    dirxJ = 0;
  } else if (tecla == 38 || tecla == 40) {
    //Cima
    diryJ = 0;
  }
}

function atira(x, y) {
  let t = document.createElement("div");
  let att1 = document.createAttribute("class");
  let att2 = document.createAttribute("style");
  att1.value = "tiroJog";
  att2.value = "top:" + y + "px; left:" + x + "px";
  t.setAttributeNode(att1);
  t.setAttributeNode(att2);
  document.body.appendChild(t);
  console.log(t);
}

function controleTiros() {
  let tiros = document.getElementsByClassName("tiroJog");
  let tam = tiros.length;
  for (let i = 0; i < tam; i++) {
    if (tiros[i]) {
      let = pt = tiros[i].offsetTop; //posição tiro
      pt -= velT; //velocidade de tiro
      tiros[i].style.top = pt + "px";
      if (pt < 0) {
        tiros[i].remove(); // todas os tiros q sairem da tela serão removidos
      }
    }
  }
}

function controlaJogador() {
  pjy += diryJ * velJ;
  pjx += dirxJ * velJ;
  jog.style.top = pjy + "px";
  jog.style.left = pjx + "px";
}

function gameLoop() {
  if (jogo) {
    //Funções de controle

    controlaJogador();
    controleTiros();
  }
  frames = requestAnimationFrame(gameLoop);
}

function inicia() {
  jogo = true; //false;
  // ini Tela
  tamTelaH = window.innerHeight;
  tamTelaW = window.innerWidth;

  // ini jogador
  dirxJ = diryJ = 0;
  pjx = tamTelaW / 2;
  pjy = tamTelaH / 2;
  velJ = velT = 5;
  jog = document.getElementById("naveJog");
  console.log(jog);
  jog.style.top = pjy + "px";
  jog.style.left = pjx + "px";
  gameLoop();
}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);
