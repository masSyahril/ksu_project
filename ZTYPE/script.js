        // Setup canvas and context
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth * 0.8; // 80% of screen width
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Initial resize on load

        let words = ['sword', 'shield', 'enemy', 'battle', 'hero'];
        let activeWords = [];
        let typedWords = [];
        let lanes = [0, 1, 2, 3, 4]; // 5 lanes
        let laneHeight = canvas.height / lanes.length; // Equal lane height
        let wordSpeed = 5; // Slower speed
        let gameActive = false;
        let lastSpawnTime = 0; // Keep track of last word spawn time
        const characterImages = {};
        const characterCount = 5;
        const backgroundImage = new Image();
        backgroundImage.src = 'background.jpg'; // Load background image
        const characterSize = canvas.height / 5; // Calculate character size 

        // Load character images
        for (let i = 1; i <= characterCount; i++) {
            const img = new Image();
            img.src = `character${i}.png`;
            characterImages[`character${i}`] = img;
        }

        // Initialize words with a fixed delay of 4 seconds
        function spawnWords() {
            const now = Date.now();
            if (now - lastSpawnTime > 4000) { // 4-second interval
                let availableLane = lanes[Math.floor(Math.random() * lanes.length)];
                let wordObj = {
                    word: words[Math.floor(Math.random() * words.length)],
                    typed: '',
                    x: canvas.width,
                    y: availableLane * laneHeight + laneHeight / 2 // Set Y based on lane
                };
                activeWords.push(wordObj);
                lastSpawnTime = now; // Update the last spawn time
            }
        }

        function drawCharacter(lane) {
  const img = characterImages[`character${lane + 1}`];
  if (img) {
    const x = 0; // Fixed position at the start of the canvas
    const y = lane * laneHeight + laneHeight / 2; // Centered vertically in the lane
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // White background with 50% opacity
    ctx.fillRect(x, y - characterSize / 2, characterSize, characterSize); // Draw character box
    ctx.drawImage(img, x, y - characterSize / 2, characterSize, characterSize); // Draw character image on top
  }
}

        function drawWords() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Draw background image

            activeWords.forEach((wordObj) => {
                const { word, typed, x, y } = wordObj;

                // Draw the word
                for (let i = 0; i < word.length; i++) {
                    ctx.fillStyle = i < typed.length ? 'green' : 'white'; // Change color based on typing
                    ctx.font = '50px Arial';
                    ctx.fillText(word[i], x + i * 40, y); // Adjust x position for each letter
                }

                // Move word left
                wordObj.x -= wordSpeed; 

                // Check for collision with characters
                if (wordObj.x < 60 && Math.floor(y / laneHeight) === Math.floor((canvas.height - laneHeight) / laneHeight)) {
                    alert('Game Over! You missed a word.');
                    resetGame();
                }

                // If the word goes off the canvas
                if (wordObj.x < -200) {
                    alert('Game Over! You missed a word.');
                    resetGame(); //bukan reset game
                } // perlu di arue agar satu character merasa pusing dan tidak bsia bermain 

            });

            // Draw all characters at their respective lanes
            lanes.forEach(lane => drawCharacter(lane));
        }

        function gameLoop() {
            if (gameActive) {
                spawnWords(); // Spawn words at 4-second intervals
                drawWords(); // Draw the words on the canvas
                requestAnimationFrame(gameLoop);
            }
        }

        function startGame() {
            document.getElementById('menu').style.display = 'none'; // Hide menu
            gameActive = true; // Set game to active
            gameLoop(); // Start the game loop
        }

        function resetGame() {
            gameActive = false; // Set game to inactive
            document.getElementById('menu').style.display = 'block'; // Show menu again
            activeWords = []; // Clear active words
        }

        function closeGame() {
            alert("Thank you for playing! Please close the tab manually.");
        }

        // Event listeners for buttons
        document.getElementById('startButton').addEventListener('click', startGame);
        document.getElementById('closeButton').addEventListener('click', closeGame);

        // Keyboard input for typing
        window.addEventListener('keydown', (e) => {
            if (gameActive && activeWords.length > 0) {
                let firstWord = activeWords[0]; // Always focus on the first word
                if (e.key === firstWord.word[firstWord.typed.length]) {
                    firstWord.typed += e.key; // Add correct letter
                    if (firstWord.typed === firstWord.word) {
                        activeWords.shift(); // Remove the word from the list after it's fully typed
                    }
                }
            }
        });
