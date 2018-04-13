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
      ctx.font = "50px Avenir"
      ctx.fillStyle = "yellow"
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
      this.y -= 50;
  }
  
} // TERMINA FLAPPY

// DECLARACIONES
var board = new Board();
var flappy = new Flappy();
var intervalo;
var frames = 0;


// MAIN FUNCTION
function update(){
  frames++;
  console.log(frames);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();
    flappy.draw();
}
function start(){
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
  if(e.keyCode === 32 ){
    flappy.move();
  }
});


// 