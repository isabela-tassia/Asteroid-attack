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
let isom; //indice som

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
  bombasTotal = document.getElementsByClassName("bomba");
  let tam = bombasTotal.length;
  for (let i = 0; i < tam; i++) {
    if (bombasTotal[i]) {
      let pi = bombasTotal[i].offsetTop;
      //console.log(pi);
      pi += 2; //posiçao do indice
      //console.log(pi);
      console.log(bombasTotal[i].style.top);
      bombasTotal[i].style.top = pi + "px";
      console.log(bombasTotal[i].style.top);
      if (pi > tamTelaH) {
        vidaPlaneta = -10;
        // criaExplosao(2, bombasTotal[i].offsetLeft, null);
        bombasTotal[i].remove();
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
      //colisaoTiroBomba(tiros[i]);
      if (pt < 0) {
        tiros[i].remove(); // todas os tiros q sairem da tela serão removidos
      }
    }
  }
}

function colisaoTiroBomba(tiro) {
  let tam = bombasTotal.Length;
  for (let i = 0; i < tam.length; i++) {
    if (bombasTotal[i]) {
      if (
        tiro.offsetTop <=
          bombasTotal[i].offsetTop + 40 /*cima tiro com baixo bomba*/ &&
        tiro.offsetTop + 6 >=
          bombasTotal[i].offsetTop /*baixo tiro com cima bomba*/ &&
        //verificação do y. 40 é a altura da bomba e 6 é o tamanho do tiroJog

        tiro.offsetLeft <=
          bombasTotal[i].offsetLeft + 24 /*24 é a largura da bomba*/ && // parte esquerda do tiro com direita da bomba
        tiro.offsetLeft + 6 >= bombasTotal[i].offsetLeft //Direita do tiro com a parte esquerda da bomba
      ) {
        // criaExplosao(
        //   1,
        //   bombasTotal[i].offsetLeft + 25,
        //   bombasTotal[i].offsetTop
        // );
        // bombasTotal[i].remove();
        // tiro.remove();
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
    // contBombas++;
    // if (contBombas % 200 == 0) {
    //   criaBomba();
    controlaBomba();
    // }

    controlaJogador();
    controleTiros();
  }
  frames = requestAnimationFrame(gameLoop);
}

// function criaExplosao(tipo, x, y) {
//   //tipo 1= ar. tipo 2 = terra
//   let explosao = document("div");
//   var img = document.createElement("img");
//   let som = document.createElement("audio");
//   //atributos para div
//   let att1 = document.createAttribute("class");
//   let att2 = document.createAttribute("style");
//   let att3 = document.createAttribute("id");
//   //atributos para audio
//   let att4 = document.createAttribute("src");
//   // atributos para audio
//   let att5 = document.createAttribute("class");
//   let att6 = document.createAttribute("id");

//   att3.value = "explosao" + ie;
//   if (tipo == 1) {
//     att1.value = "explosaoAr";
//     att2.value = "top" + y + "px;left" + x + "px;";
//     att4.value = ""; // inserir a imagem de explosão aqui
//   } else {
//     att1.value = "explosaoChao";
//     att2.value = "top:" + (tamTelaH - 57) + "px;left:" + (x - 17) + "px;";
//     att4.value = ""; //inserir a imagem de explosão aqui
//   }
//   att5.value = "./Imagens/Explosion.flac";
//   att6.value = "som" + isom; //indice som
//   explosao.setAttributeNode(att1);
//   explosao.setAttributeNode(att2);
//   explosao.setAttributeNode(att3);
//   img.setAttributeNode(att4);
//   som.setAttributeNode(att5);
//   som.setAttributeNode(att6);
//   document.body.appendChild(explosao);
//   document.getElementById("som" + isom).play();

//   ie++;
//   isom++;
// }

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

  // controles das bombas

  criaBomba(50);

  gameLoop();
}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);
