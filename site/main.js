const $ = require('jquery');
import 'tilt.js';
import YouTubePlayer from 'youtube-player';

$(document).ready(() => {
  // All pages
  $('.hamburger-menu').click(event => {
    $('html, body').toggleClass('nav-open');
  });

  $('.toggle-theme').click(event => {
    $('body').toggleClass('dark');

    if ($('body').hasClass('dark')) {
      $('nav > img').attr('src', 'assets/logo-white.svg');
    } else {
      $('nav > img').attr('src', 'assets/logo-black.svg');
    }
  });

  // index.html
  if ($('#trailer').length) {
    // Only add parallax if not on mobile
    if (!('ontouchstart' in window)) {
      $('.poster > img').tilt({
        glare: true,
        maxGlare: 0.5,
        scale: 1.1
      });

      $('.trailer').tilt({
        scale: 1.1
      });
    }

    // Load trailer
    let player = YouTubePlayer('trailer');

    player.loadVideoById('xjDjIWPwcPU');

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
  }
});
