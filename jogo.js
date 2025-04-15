const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const larguraTela = canvas.width;
const alturaTela = canvas.height;
let gameOver = false;
let pontuacao = 0;

class Entidade {
  constructor(x, y, largura, altura, cor) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.cor = cor;
  }

  desenhar() {
    ctx.fillStyle = this.cor;
    ctx.fillRect(this.x, this.y, this.largura, this.altura);
  }
}

class Personagem extends Entidade {
  constructor() {
    super(larguraTela / 2 - 25, alturaTela - 50, 50, 30, "cyan"); 
    this.vel = 7; 
  }

  desenhar() {
    ctx.fillStyle = this.cor;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.altura); 
    ctx.lineTo(this.x + this.largura / 2, this.y); 
    ctx.lineTo(this.x + this.largura, this.y + this.altura); 
    ctx.closePath();
    ctx.fill();
  }

  mover(direcao) {
    this.x += direcao * this.vel;
    this.x = Math.max(0, Math.min(this.x, larguraTela - this.largura));
  }

  atirar() {
    const tiro = new Tiro(this.x + this.largura / 2 - 2.5, this.y);
    tiros.push(tiro);
  }
}

class Inimigo extends Entidade {
  constructor() {
    const x = Math.random() * (larguraTela - 40);
    super(x, 0, 40, 40, "green");
    this.vel = Math.random() * 1 + 1; 
  }

  desenhar() {
    ctx.fillStyle = this.cor;
    ctx.beginPath();
    ctx.arc(this.x + this.largura / 2, this.y + this.altura / 2, this.largura / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  atualizar() {
    this.y += this.vel;
  }
}

class Tiro extends Entidade {
  constructor(x, y) {
    super(x, y, 5, 10, "white");
    this.vel = -8;
  }

  atualizar() {
    this.y += this.vel;
  }
}

const jogador = new Personagem();
const inimigos = [];
const tiros = [];
const teclas = {};

document.addEventListener("keydown", e => {
  teclas[e.code] = true;
  if (e.code === "Space" && !gameOver) jogador.atirar(); 
});
document.addEventListener("keyup", e => teclas[e.code] = false);

function colide(a, b) {
  return (
    a.x < b.x + b.largura &&
    a.x + a.largura > b.x &&
    a.y < b.y + b.altura &&
    a.y + a.altura > b.y
  );
}

function atualizar() {
  if (gameOver) return;

  if (teclas["ArrowLeft"]) jogador.mover(-1); 
  if (teclas["ArrowRight"]) jogador.mover(1); 

  for (let i = tiros.length - 1; i >= 0; i--) {
    tiros[i].atualizar();
    if (tiros[i].y < 0) tiros.splice(i, 1);
  }

  for (let i = inimigos.length - 1; i >= 0; i--) {
    inimigos[i].atualizar();

    if (colide(inimigos[i], jogador)) gameOver = true;
    if (inimigos[i].y + inimigos[i].altura >= alturaTela) gameOver = true;

    for (let j = tiros.length - 1; j >= 0; j--) {
      if (colide(inimigos[i], tiros[j])) {
        inimigos.splice(i, 1);
        tiros.splice(j, 1);
        pontuacao += 100; 
        break;
      }
    }
  }

  if (Math.random() < 0.02) {
    inimigos.push(new Inimigo());
  }
}

function desenhar() {
  ctx.clearRect(0, 0, larguraTela, alturaTela);

  jogador.desenhar();
  inimigos.forEach(i => i.desenhar());
  tiros.forEach(t => t.desenhar());

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Pontuação: ${pontuacao}`, 10, 30);

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "60px Arial";
    ctx.fillText("GAME OVER", larguraTela / 2 - 170, alturaTela / 2);
  }
}

function loop() {
  atualizar();
  desenhar();
  requestAnimationFrame(loop);
}

loop();