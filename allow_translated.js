function getLocalizedAudio(locale) {
  return this.querySelector(`audio[data-locale='${locale}']`);
}

function setLocalizedAudio(locale) {
  this.audioElement = this.getLocalizedAudio(locale);
  this.syncAudio();
}

function syncAudio() {
  if (!this.audioElement) {
    this.volume = 1;
    return;
  }

  this.volume = 0;
  this.audioElement.currentTime = this.currentTime;
  if (!this.paused && this.audioElement.paused && this.audioElement.duration > this.currentTime)
    this.audioElement.play();
}

export default function allowTranslatedAudio(videoElement) {
  videoElement.getLocalizedAudio = getLocalizedAudio.bind(videoElement);
  videoElement.setLocalizedAudio = setLocalizedAudio.bind(videoElement);
  videoElement.syncAudio = syncAudio.bind(videoElement);

  videoElement.addEventListener('play', (event) => {
    if (event.target.audioElement) event.target.audioElement.play();
  });

  videoElement.addEventListener('pause', (event) => {
    if (event.target.audioElement) event.target.audioElement.pause();
  });

  videoElement.addEventListener('ended', (event) => {
    if (!event.target.audioElement) return;
    event.target.audioElement.pause();
    event.target.audioElement.currentTime = 0;
  });

  videoElement.addEventListener('seeked', (event) => {
    event.target.syncAudio();
  });

  videoElement.addEventListener('waiting', (event) => {
    if (event.target.audioElement) event.target.audioElement.pause();
  });

  videoElement.addEventListener('playing', (event) => {
    if (event.target.audioElement) event.target.audioElement.play();
  });

  videoElement.addEventListener('volumechange', (event) => {
    if (event.target.audioElement) event.target.audioElement.muted = event.target.muted;
    if (!event.target.muted && event.target.audioElement) event.target.volume = 0;
  });
};
