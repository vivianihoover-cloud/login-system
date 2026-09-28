const form = document.getElementById('auth-form');
const messageEl = document.getElementById('message');
const tabs = document.querySelectorAll('.tab');

const authScreen = document.getElementById('auth-screen');
const loadingScreen = document.getElementById('loading-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const welcomeUsername = document.getElementById('welcome-username');
const currentTimeEl = document.getElementById('current-time');
const shoppingBtn = document.getElementById('shopping-btn');

const API_URL = 'http://localhost:3000/auth';
let mode = 'login';
let loggedInUser = '';

function setMessage(text, type = '') {
  messageEl.textContent = text;
  messageEl.className = 'message';
  if (type) messageEl.classList.add(type);
}

function setMode(nextMode) {
  mode = nextMode;
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.mode === nextMode);
  });

  const submitButton = form.querySelector('.submit-btn');
  submitButton.textContent = nextMode === 'login' ? 'Enter' : 'Create Account';
  setMessage('');
}

function showScreen(screenEl) {
  authScreen.classList.remove('active');
  loadingScreen.classList.remove('active');
  dashboardScreen.classList.remove('active');
  screenEl.classList.add('active');
}

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTimeEl.textContent = `${hours}:${minutes}:${seconds}`;
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => setMode(tab.dataset.mode));
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    setMessage('Please enter both username and password.', 'error');
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: mode,
        username,
        password
      })
    });

    const result = await response.json();

    if (!response.ok || result.status !== 'success') {
      throw new Error(result.message || 'Request failed.');
    }

    setMessage(result.message, 'success');

    if (mode === 'login') {
      // Show loading screen
      showScreen(loadingScreen);
      loggedInUser = username;

      // Wait 2 seconds then show dashboard
      setTimeout(() => {
        welcomeUsername.textContent = `Logged in as ${loggedInUser}`;
        updateTime();
        showScreen(dashboardScreen);
      }, 2000);
    } else if (mode === 'signup') {
      form.reset();
    }
  } catch (error) {
    setMessage(error.message || 'Something went wrong.', 'error');
  }
});

// Update time every second
setInterval(updateTime, 1000);
updateTime();

// Shopping button click handler
shoppingBtn.addEventListener('click', () => {
  console.log('Shopping button clicked');
  // Add your shopping functionality here
});

setMode('login');
