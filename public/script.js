const form = document.getElementById('auth-form');
const messageEl = document.getElementById('message');
const tabs = document.querySelectorAll('.tab');

const API_URL = 'http://localhost:3000/auth';
let mode = 'login';

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

    if (mode === 'signup') {
      form.reset();
    }
  } catch (error) {
    setMessage(error.message || 'Something went wrong.', 'error');
  }
});

setMode('login');
