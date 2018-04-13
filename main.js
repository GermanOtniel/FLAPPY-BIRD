var canvas = document.getElementById("mainGame");
var ctx = canvas.getContext("2d")



//AQUI VAN LAS CLASES
function Board(){
    //ATRIBUTOS
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "http://ellisonleao.github.io/clumsy-bird/data/img/bg.png"
    this.score = 0;
    this.music = new Audio();
    this.music.src = "http://66.90.93.122/ost/star-wars-x-wing-vs.-tie-fighter-1997/vpggxytv/06%20The%20Imperial%20March.mp3";

    //METODOS
    
    this.img.onload = function(){
        this.draw();
    }.bind(this);

    this.move = function(){
      this.x--;
      if (this.x < -canvas.width) this.x = 0;
    }


    this.draw = function(){
      this.move();
      ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
      ctx.drawImage(this.img,this.x + canvas.width ,this.y,this.width,this.height);
      

    };
    this.drawScore = function(){
      ctx.font = "50px Avenir"
      ctx.fillStyle = "black"
      ctx.fillText(this.score,this.width / 2,this.y + 50);
    }
  
} //END OF BOARD

// START CLASS FLAPPY

function Flappy (){
  this.x = 150;
  this.y = 150;
  this.width = 50;
  this.height = 50;
  this.img = new Image();
  this.img.src = "https://lh3.googleusercontent.com/k6c5BYhnp-C9e3tROiI9twKZp6bYKLPtR06V4jZ8KnsrkpDTMAF4duTtTTh0eq4uIPSiYfzw-_68ELOn_71c7g=s400"
  this.img.onload = function(){
    this.draw();
  }.bind(this);
  this.draw = function(){
    this.y += 2;
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
  }
  this.move = function(){
      this.y -= 25;
  }
  
} // TERMINA FLAPPY

// PIPES = TUBITOS

function Pipe (y, height){
  this.x = canvas.width - 200;
  this.y = y;
  this.width = 50;
  this.height = height;

  this.draw = function(){
    this.x--;
    ctx.fillStyle = "green"
    ctx.fillRect(this.x,this.y,this.width,this.height)
  }

}








// DECLARACIONES
var board = new Board();
var flappy = new Flappy();
var pipes = [];
var intervalo;
var frames = 0;

// AUX FUNCTIONS

function generatePipes (){

  if(!(frames % 300 === 0))return;
  var ventanita = 100;
  var randomHeight = Math.floor(Math.random() * 200 ) + 50;
  var pipe = new Pipe(0,randomHeight);
  var pipe2 = new Pipe(randomHeight + ventanita, canvas.height - (randomHeight + ventanita));
  pipes.push(pipe);
  pipes.push(pipe2);
}

function drawPipes(){
  pipes.forEach(function(pipe){
    pipe.draw();
  })
}



// MAIN FUNCTION
function update(){
  generatePipes();
  frames++;
  console.log(frames);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();
    flappy.draw();
    drawPipes();
    board.drawScore();

}
function start(){
  board.music.play();
  //que no se dupliquen los intervalos-osea que le tablero no vaya mas rapido
  if( intervalo > 0 ) return;
  //extras que necesitemos inicializar
  intervalo = setInterval(function(){
    update();
  }, 1000 / 60 );
}
function stop(){
  clearInterval(intervalo);
  intervalo = 0;
  board.music.pause();
  }

// LISTENERS (OBSERVADORES)

//comienza el juego
document.getElementById("startButton")
.addEventListener("click", start);
//pausa el juego
document.getElementById("pauseGame")
.addEventListener("click", stop);
// se mueva el flappy
addEventListener("keydown", function(e){
  if(e.keyCode === 192 ){
    flappy.move();
  }
});


// <a href="https://aff5fa4925746bf9c161-fb36f18ca122a30f6899af8eef8fa39b.ssl.cf5.rackcdn.com/documents/Super_Mario_Bros._medley.mp3.zip" play-track-data="3,download:Exclusive download: Super Mario Bros. medley,3,download" download="download" class="button download ng-scope">Download the song</a>