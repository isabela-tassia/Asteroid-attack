let diryJ, dirxJ, jog, velJ, pjx, pjy; //direção e posição x e y do jogador
let jogo;
let frames;
let tamTelaW, tamTelaH; // tamanho da tela
let velT;
let contBombas = 0;
let painelContBombas, velB, tmpCriaBomba; //tempo
let bombasTotal;
let vidaPlaneta;
let ie; //indice de explosao[
let isom = 0; //indice som

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

function teclaUp(event) {
  let tecla = event.code;
  if (tecla == "ArrowLeft" || tecla == "ArrowRight") {
    dirxJ = 0;
  } else if (tecla == "ArrowUp" || tecla == "ArrowDown") {
    //Cima
    diryJ = 0;
  }
  //   } else if(tecla == "Space") {

  //   }
}

function criaBomba() {
  setInterval(() => {
    if (jogo) {
      let y = 0;
      let x = Math.ceil(Math.random() * tamTelaW);
      let bomba = document.createElement("div");
      bomba.setAttribute("class", "bomba");
      bomba.setAttribute("style", "top:" + y + "px; left:" + x + "px;");
      document.body.appendChild(bomba);
      contBombas--;
    }
  }, 2000);
}

function controlaBomba() {
  let bombasTotal = document.getElementsByClassName("bomba");
  let tam = bombasTotal.length;
  for (let i = 0; i < tam; i++) {
    if (bombasTotal[i]) {
      let pi = bombasTotal[i].offsetTop;
      // console.log(pi);
      pi += 2; //posiçao do indice
      //console.log(pi);
      // console.log(bombasTotal[i].style.top);
      bombasTotal[i].style.top = pi + "px";
      if (pi > tamTelaH) {
        
        // criaExplosao(2, bombasTotal[i].offsetLeft, null);
        document.getElementById("barraPlaneta").value -= 0.1;
        let value = document.getElementById("barraPlaneta").value
        document.body.removeChild(bombasTotal[i]);
        if(value==0){
          jogo=false;
          alert('Perdeu!')
        }
      }
    }
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
  // console.log(t);
}

function controleTiros() {
  let tiros = document.getElementsByClassName("tiroJog");
  let tam = tiros.length;
  for (let i = 0; i < tam; i++) {
    if (tiros[i]) {
      let = pt = tiros[i].offsetTop; //posição tiro
      pt -= velT; //velocidade de tiro
      tiros[i].style.top = pt + "px";
      //colisaoTiroBomba(tiros[i]);
      // if (pt < 0) {
      //   tiros[i].remove(); // todas os tiros q sairem da tela serão removidos
      // }
    }
  }
}

function colisaoTiroBomba() {
  //
  let tiros = document.getElementsByClassName("tiroJog");
  let numeroTiros = tiros.length;
  let bombasTotal = document.getElementsByClassName("bomba");
  let tam = bombasTotal.length;
  if (tam !== 0 && numeroTiros !== 0) {
    for (let i = 0; i < tam; i++) {
      for (let j = 0; j < numeroTiros; j++) {
        if (
          tiros[j].offsetTop <=
            bombasTotal[i].offsetTop + 40 /*cima tiro com baixo bomba*/ &&
          tiros[j].offsetTop + 6 >= bombasTotal[i].offsetTop && //verificação do y. 40 é a altura da bomba e 6 é o tamanho do tiroJog
          /*baixo tiro com cima bomba*/ tiros[j].offsetLeft <=
            bombasTotal[i].offsetLeft + 24 /*24 é a largura da bomba*/ && // parte esquerda do tiro com direita da bomba
          tiros[j].offsetLeft + 6 >= bombasTotal[i].offsetLeft //Direita do tiro com a parte esquerda da bomba
        ) {
          console.log("colisão");
          
           criaExplosao(bombasTotal[i]);
           
         

          document.body.removeChild(tiros[j]);
          setTimeout( () => {
            document.body.removeChild(bombasTotal[i])}, 1000)
            
          return;
        }

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

// function gerenciaGame() {
//   barraPlaneta.style.width = vidaPlaneta + "px";
//   if (contBombas <= 0) {
//     jogo = false;
//   }
// }

function gameLoop() {
  if (jogo) {
    //Funções de controle
    // contBombas++;
    // if (contBombas % 200 == 0) {
    //   criaBomba();
    controlaBomba();
    // }

    controlaJogador();
    controleTiros();
    colisaoTiroBomba();
  }
  frames = requestAnimationFrame(gameLoop);
}

function criaExplosao(bomba) {
 bomba.style.backgroundImage="url('./Imagens/explosion2.png')"
  let soundExplosion = new Audio();
  soundExplosion.src='./Imagens/Explosion.flac'; 
  soundExplosion.volume = 0.2;
  soundExplosion.play();
  
 
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
  // console.log(jog);

  jog.style.top = pjy + "px";
  jog.style.left = pjx + "px";

  // controles das bombas

  criaBomba(50);
  barraPlaneta = document.getElementById("barraPlaneta");
  barraPlaneta.style.width = vidaPlaneta + "px";

  //telaMsg
  //telaMsg=document.getElementsById('telaMsg')

  gameLoop();
}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);
