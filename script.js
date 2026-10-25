const gate = document.getElementById('gate');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const video = document.getElementById('bgVideo');
let isStarted = false;
let idleTimer = null;

function enterFullscreen() {
  const docEl = document.documentElement;
  if (!document.fullscreenElement) {
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch(() => {});
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen();
    } else if (docEl.mozRequestFullScreen) {
      docEl.mozRequestFullScreen();
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen();
    }
  }
}

function triggerVideo() {
  if (isStarted) return;
  isStarted = true;

  gate.style.display = 'none';
  document.body.style.backgroundColor = '#000000';
  video.style.display = 'block';

  enterFullscreen();

  video.muted = false;
  video.volume = 1.0;
  video.play().catch(() => {});

  resetIdleTimer();
}

btnYes.addEventListener('click', triggerVideo);
btnNo.addEventListener('click', triggerVideo);

video.addEventListener('ended', () => {
  video.currentTime = 0;
  video.play();
});

video.addEventListener('pause', () => {
  if (isStarted) {
    video.play();
  }
});

window.addEventListener('click', () => {
  if (isStarted) {
    enterFullscreen();
    video.play().catch(() => {});
  }
});

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
  }
  if (isStarted) {
    enterFullscreen();
    video.play().catch(() => {});
  }
});

function resetIdleTimer() {
  if (!isStarted) return;
  document.body.classList.remove('hide-cursor');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    document.body.classList.add('hide-cursor');
  }, 1500);
}

window.addEventListener('mousemove', resetIdleTimer);
window.addEventListener('mousedown', resetIdleTimer);
