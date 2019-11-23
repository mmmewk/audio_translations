# audio_translations
Allow html5 Video tags to play different audio for different locales

# html
```
<video id='my-video' src='video-source.mp4'>
  <audio data-locale='es-mx' src='spanish-audio.mp3'>
  </audio>
</video>
```

# js
```
import allowTranslatedAudio from 'audio_translations';
video = document.querySelector('#my-video');
allowTranslatedAudio(video);

video.setLocalizedAudio('es-mx');
```
