const YouTubePlayer = require('youtube-player');

$(document).ready(() => {
  // Load trailer
  let player = YouTubePlayer('trailer');

  player.loadVideoById($('#trailer').attr('data-youtubeID'));
  player.stopVideo();

  function stopAndHideVideo() {
    player.stopVideo().then(() => {
      $('.trailer-container').hide();
    });
  }

  player.on('stateChange', event => {
    if (event.data === 2 && /Mobi|Android/i.test(navigator.userAgent)) {
      stopAndHideVideo();
    }
  });

  // Play button
  $('.play-button').click(event => {
    player.playVideo().then(() => {
      $('.trailer-container').show();
    });
  });

  // Hide trailer when click outside
  $(document).click(event => {
    let target = $(event.target);

    if (!target.is('#trailer') && !target.is('.play-button') && !target.is('.triangle')) {
      stopAndHideVideo();
    }
  });
});
