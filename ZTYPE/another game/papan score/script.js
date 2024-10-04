let words = ['apple', 'banana', 'cherry', 'orange', 'grape', 'mango', 'strawberry'];
let score = 0;
let lives = 3;
let activeWords = []; // Array untuk menampung kata-kata aktif
let speed = 10; // Kecepatan pergerakan kata
let wordInterval;
let wordDelay = 3000; // Jeda waktu antar kata dalam milidetik (misal 3 detik)

// Fungsi untuk menambah kata baru ke game
function spawnWord() {
    let word = words[Math.floor(Math.random() * words.length)];
    let wordElement = document.createElement('div');
    wordElement.classList.add('word');
    wordElement.textContent = word;
    wordElement.style.top = Math.floor(Math.random() * 80) + '%'; // Posisi vertikal acak
    wordElement.style.left = '100%'; // Muncul dari kanan
    document.getElementById('gameArea').appendChild(wordElement);

    let newWord = {
        element: wordElement,
        text: word,
        xPos: 100 // Posisi horizontal dalam persen
    };
    
    activeWords.push(newWord); // Tambahkan kata baru ke dalam array kata aktif
}

// Fungsi untuk memindahkan semua kata secara perlahan ke kiri
function moveWords() {
    activeWords.forEach((wordObj, index) => {
        wordObj.xPos -= speed / 10; // Kecepatan pergerakan
        wordObj.element.style.left = wordObj.xPos + '%';

        // Jika kata mencapai ujung kiri (0%)
        if (wordObj.xPos <= 0) {
            document.getElementById('gameArea').removeChild(wordObj.element);
            activeWords.splice(index, 1); // Hapus kata dari array
            loseLife(); // Pemain kehilangan nyawa jika kata mencapai ujung
        }
    });
}

// Fungsi untuk memeriksa input pengguna
function checkInput() {
    let userInput = document.getElementById('userInput').value.toLowerCase();
    
    activeWords.forEach((wordObj, index) => {
        if (userInput === wordObj.text) {
            document.getElementById('gameArea').removeChild(wordObj.element);
            activeWords.splice(index, 1); // Hapus kata dari array setelah diketik dengan benar
            score += 10;
            document.getElementById('score').textContent = score;
            document.getElementById('message').textContent = `Benar! +10 poin.`;
            document.getElementById('userInput').value = ''; // Reset input
        }
    });
}

// Fungsi untuk kehilangan nyawa
function loseLife() {
    lives--;
    document.getElementById('lives').textContent = lives;

    if (lives <= 0) {
        endGame();
    }
}

// Fungsi untuk mengakhiri permainan
function endGame() {
    clearInterval(gameInterval);
    clearInterval(wordInterval);
    document.getElementById('message').textContent = 'Game Over! Skor Anda: ' + score;
    activeWords.forEach((wordObj) => {
        document.getElementById('gameArea').removeChild(wordObj.element);
    });
    activeWords = []; // Bersihkan array kata aktif
    document.getElementById('userInput').disabled = true; // Nonaktifkan input
}

// Fungsi untuk mulai interval kata muncul setiap beberapa detik
function startWordInterval() {
    wordInterval = setInterval(() => {
        spawnWord(); // Tambah kata baru setiap beberapa detik
    }, wordDelay); // Kata muncul setiap "wordDelay" milidetik (contoh: 3000ms = 3 detik)
}

// Mulai permainan
function startGame() {
    gameInterval = setInterval(() => {
        moveWords(); // Pindahkan semua kata yang sedang aktif
    }, 100); // Interval 100ms untuk pergerakan yang halus

    startWordInterval(); // Mulai interval kata
}

startGame();
