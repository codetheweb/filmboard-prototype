const $ = require('jquery');
import 'tilt.js';
import YouTubePlayer from 'youtube-player';

$(document).ready(() => {
  $('.poster > img').tilt({
    glare: true,
    maxGlare: 0.5,
    scale: 1.1
  });

  $('.trailer').tilt({
    scale: 1.1
  });

  let player = YouTubePlayer('trailer');

  player.loadVideoById('xjDjIWPwcPU');

  $('.play-button').click(event => {
    player.playVideo().then(() => {
      $('.trailer-container').show();
    });
  }).blur(() => {
    $(this).hide();
  });

  $(document).click(event => {
    let target = $(event.target);

    if (!target.is('#trailer') && !target.is('.play-button') && !target.is('.triangle')) {
      player.stopVideo().then(() => {
        $('.trailer-container').hide();
      })
    }
  });

  $('.toggle-theme').click(event => {
    $('body').toggleClass('dark');

    if ($('body').hasClass('dark')) {
      $('nav > img').attr('src', 'assets/logo-white.svg');
    } else {
      $('nav > img').attr('src', 'assets/logo-black.svg');
    }
  })
});
