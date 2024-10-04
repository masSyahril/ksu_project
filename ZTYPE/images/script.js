let scoreA = 0;
let scoreB = 0;
let activeTeam = ''; // Menyimpan tim yang sedang aktif
let words = ['apple', 'banana', 'cherry', 'orange', 'grape']; // Daftar kata untuk permainan
let currentWord = ''; // Kata yang sedang aktif
let timer; // Timer countdown
let timeLeft = 3; // Waktu tersisa per kata

// Pilih tim aktif
function setActiveTeam(team) {
    activeTeam = team;
    document.getElementById('message').textContent = `Tim ${team} aktif! Ketik kata untuk dapat skor.`;
    resetTimer();
    generateWord();
}

// Meningkatkan skor untuk tim yang aktif
function incrementScore() {
    if (activeTeam === 'A') {
        scoreA++;
        document.getElementById('scoreA').textContent = scoreA;
    } else if (activeTeam === 'B') {
        scoreB++;
        document.getElementById('scoreB').textContent = scoreB;
    }
}

// Reset skor kedua tim
function resetScores() {
    scoreA = 0;
    scoreB = 0;
    document.getElementById('scoreA').textContent = scoreA;
    document.getElementById('scoreB').textContent = scoreB;
    document.getElementById('userInput').value = '';
    document.getElementById('wordToType').textContent = '---';
    document.getElementById('message').textContent = 'Skor direset. Pilih tim untuk mulai.';
    document.getElementById('timer').textContent = 'Waktu Tersisa: 3';
    activeTeam = '';
    clearInterval(timer);
}

// Memeriksa input dari pemain
function checkInput() {
    let userInput = document.getElementById('userInput').value.toLowerCase();
    if (userInput === currentWord.toLowerCase()) {
        incrementScore();
        document.getElementById('message').textContent = 'Benar! Skor bertambah.';
        document.getElementById('userInput').value = '';
        resetTimer();
        generateWord(); // Buat kata baru
    }
}

// Menghasilkan kata acak untuk ditebak
function generateWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    document.getElementById('wordToType').textContent = currentWord;
}

// Fungsi untuk mengatur ulang timer ke 3 detik
function resetTimer() {
    timeLeft = 3; // Set ke 3 detik
    document.getElementById('timer').textContent = `Waktu Tersisa: ${timeLeft}`;
    clearInterval(timer); // Hentikan timer sebelumnya
    timer = setInterval(countdown, 1000); // Mulai timer baru
}

// Fungsi countdown
function countdown() {
    timeLeft--;
    document.getElementById('timer').textContent = `Waktu Tersisa: ${timeLeft}`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById('message').textContent = 'Waktu habis! Pilih tim untuk mulai lagi.';
        document.getElementById('userInput').value = '';
        document.getElementById('wordToType').textContent = '---';
        activeTeam = ''; // Reset tim aktif
    }
}
