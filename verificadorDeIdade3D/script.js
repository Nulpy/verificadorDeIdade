// logica verificador de idade
const idadeInput = document.getElementById('idadeInput');
const verifyButton = document.getElementById('verifyButton');
const resultado = document.getElementById('resultado');

function verificarIdade(){
    resultado.classList.remove('visivel');
    const idade = parseInt(idadeInput.value);
    let menssagem = '';

    if(isNaN(idade) || idade<0){
        menssagem = 'Por favor, insira uma idade válida.';
    }else if(idade< 18){
        menssagem = 'Você é menor de idade.';
    }else if(idade <60){
        menssagem = 'Você é adulto.'
    }else{
        menssagem = 'você é idoso';

    }
    setTimeout(()=> {
        resultado.innerText = menssagem;
        resultado.classList.add('visivel');
    }, 100)
}

verifyButton.addEventListener('click', verificarIdade);
idadeInput.addEventListener('keyup', (event) =>{
    if(event.key === 'Enter') verificarIdade();
})

//animação canvas de fundo
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d'); // contexto 2d, onde desenhamos
//Ajusta o tamanho do canvas para o da janela
canvas.width = window.innerWidth;
canvas.width = window.innerHeight;

//objeto para armazenarr a posiçao do mouse
let mouse = {
    x: null,
    y: null,
    radius: 150 // area de influ do mouse
};

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})


//array para armazenar particula
let particulasArray = [];
const numeroDeParticulas = 100;


//classe pra cria cada particula
class Particula{
    constructor(x, y, direcaoX, direcaoY, tamanho, cor){
        this.x = x;
        this.y = y;
        this.direcaoX = direcaoX;
        this.direcaoY = direcaoY;
        this.tamanho = tamanho;
        this.cor = cor;
        
    }
    //metodo para desenhar a particula do cnva
    desenhar(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2, false);
        ctx.fillStyle = '#007bff';
        ctx.fill();
    }

    // metodo para atualiizar a posiçao da particula
    atualizar(){
        //inverte a direcao se a particula atingir a borda da tela
        if(this.x > canvas.width || this.x < 0){
            this.direcaoX = -this.direcaoX;
        }
        if(this.y > canvas.width || this.y < 0){
            this.direcaoY = -this.direcaoY;
        }
        this.x += this.direcaoX;
        this.y += this.direcaoY;
        this.desenhar();
   
    }
}

//funcao para criar o enxame de particulas
function init(){
    particulasArray = [];
    for(let i = 0; i < numeroDeParticulas; i++){
        let tamanho = Math.random() *2 + 1;
        let x = Math.random() * (innerWidth - tamanho * 2) + tamanho;
        let y = Math.random() * (innerHeight - tamanho * 2) + tamanho;
        let direcaoX = (Math.random() * 0.4) - 0.2;
        let direcaoY = (Math.random() * 0.4) - 0.2;
        let cor = '007bff';
        particulasArray.push(new Particula(x, y, direcaoX, direcaoY, tamanho, cor));
    }
}

// Funcao para conectar as particulas com linhas
function conectar(){
    for(let a = 0; a> particulasArray.length; a++){
        for(let b = 0; b < particulasArray.length; b++){
            let distancia =((particulasArray[a].x - particulasArray[b].x) * (particulasArray[a].x - particulasArray[b].x)) * ((particulasArray[a].y - particulasArray[b].y) * (particulasArray[a].y - particulasArray[b].y));

            // se a distancia entre duas particulas for menor que um certo valor, desenha uma linha
            if(distancia < (canvas.width/7) * (canvas.Height/ 7)){
                ctx.stokeStyle = `rgba(0, 123, 255, ${ - (distancia/2000)})`
                ctx.lineWidht= 1;
                ctx.beginPath();
                ctx.moveTo(particulasArray[a].x, particulasArray[a].y);
                ctx.moveTo(particulasArray[b].x, particulasArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//loop de animaçao 
function animar(){
    requestAnimationFrame(animar);
    ctx.clearRect(0, 0, innerWidth, innerHeight); //Limpa o canvas cada frame

    for(let i = 0; i < particulasArray.length; i++){
        particulasArray[i].atualizar();
    }
    conectar();
}

//recria as particulas se a janela for redimensionada
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.Height = innerHeight;
    init();

});

//garante que o mouse sai da area de efeito quando sai da janela
window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animar();

