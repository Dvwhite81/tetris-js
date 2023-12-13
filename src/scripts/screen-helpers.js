const countdown = () => {
  const flashContainer = document.querySelector('#flashes');
  flashContainer.style.display = 'flex';
  flashContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  const clock = document.querySelector('#flash-content');
  let secondsRemaining = 3;
  clock.textContent = secondsRemaining;
  clock.style.fontSize = '60vh';
  clock.style.margin = 'auto';
  clock.classList.add('animation');

  const clockInterval = setInterval(() => {
    secondsRemaining--;
    clock.textContent = secondsRemaining;
    if (!secondsRemaining) stopAnimation();
  }, 1000);

  const stopAnimation = () => {
    clock.classList.remove('animation');
    clock.textContent = '';
    clearInterval(clockInterval);
    flashContainer.style.display = 'none';
  };
};

const tetrisFlash = () => {
  const flashContainer = document.querySelector('#flashes');
  flashContainer.style.display = 'flex';
  flashContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  const content = document.querySelector('#flash-content');
  content.style.fontSize = '4rem';
  content.style.margin = '25% auto';
  content.textContent = 'TETRIS!!';

  setTimeout(() => {
    content.textContent = '';
    flashContainer.style.display = 'none';
  }, 1000);
};

export { countdown, tetrisFlash };
