document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.querySelector(".game-board");
    const scoreDisplay = document.getElementById("score");
    const timeLeftDisplay = document.getElementById("time-left");
    const startButton = document.getElementById("start-game");
    const gameOverMessage = document.getElementById("game-over-message");
    const finalScoreDisplay = document.getElementById("final-score");
    const moleAppearSound = document.getElementById("mole-appear-sound");
    const moleHitSound = document.getElementById("mole-hit-sound");
  
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let moleTimeout;
    let gameActive = false;
  
  
    for (let i = 0; i < 9; i++) {
      const hole = document.createElement("div");
      hole.classList.add("hole");
      gameBoard.appendChild(hole);
    }
  
    const holes = document.querySelectorAll(".hole");
  
    function randomHole() {
      return holes[Math.floor(Math.random() * holes.length)];
    }
  
    function showMole() {
      if (!gameActive) return;
  
      const hole = randomHole();
      const mole = document.createElement("div");
      mole.classList.add("mole");
      hole.appendChild(mole);
  
      setTimeout(() => {
        mole.classList.add("active");
        moleAppearSound.play();
      }, 10);
  
      mole.addEventListener("click", () => {
        if (!gameActive) return;
        score++;
        scoreDisplay.textContent = score;
  
        mole.classList.remove("active");
        mole.classList.add("hit");
        moleHitSound.play();
  
        mole.addEventListener("animationend", () => mole.remove());
      });
  
      moleTimeout = setTimeout(() => {
        mole.classList.remove("active");
        setTimeout(() => mole.remove(), 200);
      }, 1000);
    }

    document.querySelectorAll('.mole').forEach((mole) => {
        mole.addEventListener('click', function () {
     
          mole.classList.add('hit'); 
      
          setTimeout(() => {
            mole.classList.remove('hit'); 
            mole.style.backgroundImage = 'url("31.jpeg")'; 
          }, 200); 
        });
      });

      
      
  
    function startGame() {
      score = 0;
      timeLeft = 30;
      scoreDisplay.textContent = score;
      timeLeftDisplay.textContent = timeLeft;
      gameActive = true;
      gameOverMessage.style.display = "none";
  
      gameInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          timeLeftDisplay.textContent = timeLeft;
          showMole();
        } else {
          endGame();
        }
      }, 1000);
    }
  
    
    function endGame() {
        clearInterval(gameInterval);
        clearTimeout(moleTimeout);
        gameActive = false;
      
        document.querySelectorAll(".mole").forEach((mole) => mole.remove());
      
       
        finalScoreDisplay.textContent = score;
        const gameOverMessage = document.getElementById("game-over-message");
        gameOverMessage.style.display = "flex"; 
      }
      
      document.getElementById("restart-game").addEventListener("click", () => {
        document.getElementById("game-over-message").style.display = "none"; 
        startGame(); 
      });
      
    
  
    startButton.addEventListener("click", startGame);
  });






  
  

