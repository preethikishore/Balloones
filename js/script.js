let colors = ['yellow','red','blue','violet','green'];
let widthWindow = window.innerWidth ;
let heightWindow = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');
let startButton = document.querySelector('.start-button');
function createBalloon()
{
   
 let div = document.createElement('div');
 let rand = Math.floor(Math.random() * colors.length);
 div.className = 'balloon balloon-'+colors[rand];
 div.dataset.number = currentBalloon;
 currentBalloon++;
 
 rand = Math.floor( Math.random() * (widthWindow - 100));
 div.style.left = rand+'px';
 body.appendChild(div);
 animateBalloon(div);
}
function animateBalloon(elem)
{
    let pos = 0;
    let random = Math.floor(Math.random() * 6 - 3);
    let interval = setInterval(frame,10 - Math.floor(num/10)+random)
   function frame(){
       if(pos >= (heightWindow + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null) )
       {

           clearInterval(interval);
           gameOver = true;
       }
       else
       {
           pos++;
           elem.style.top = heightWindow - pos +'px';
       }
   }
}

function deleteBalloon(elem)
{
  

    elem.remove();
    num++;
    updateScore();
    playBall();
   
    
}
function updateScore()
{
 for(let i = 0; i<scores.length;i++)
 {
     scores[i].textContent = num;
 }
}
document.addEventListener('click',function(event)
{
    if(event.target.classList.contains('balloon'))
    {
        deleteBalloon(event.target);
    }
  
});
function startGame(){
    restartGame();
  let loop =  setInterval(function(){
        if(!gameOver && num !== total)
        {
            createBalloon();
        }else if(num !== total)
        {
          clearInterval(loop);
          totalShadow.style.display = 'flex';
          document.querySelector('.bg-music').pause();
          totalShadow.querySelector('.lose').style.display = 'block';
        }else
        {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block'; 
        }
    },800);
}

function restartGame()
{
    let removingBalloon = document.querySelectorAll('.balloon');
    for(let i = 0; i< removingBalloon.length;i++)
    {
        removingBalloon[i].remove();
    }
   gameOver = false;
   num = 0;
   updateScore();
}
document.querySelector('.restart').addEventListener('click',function(){
  totalShadow.style.display = 'none';
  totalShadow.querySelector('.win').display = 'none';
  totalShadow.querySelector('.lose').display = 'none';
  startGame();

});
document.querySelector('.cancel').addEventListener('click',function(){
    totalShadow.style.display = 'none';
  
  });
  function playBall()
  {
      let audio = document.createElement('audio');
      audio.src = 'sounds/pop.mp3';
      audio.play();
  }

  function playBackground()
  {
      let audio = document.createElement('audio');
      audio.src = 'sounds/bg.mp3';
      audio.play();
  }
  
  startButton.addEventListener('click', function()
  {
    startGame();
     document.querySelector('.bg-music').play();
     document.querySelector('.start-game-window').style.display = 'none';
  });

