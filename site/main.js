const $ = require('jquery');
const tilt = require('tilt.js');
import YouTubePlayer from 'youtube-player';
const mapboxgl = require('mapbox-gl');

$(document).ready(() => {
  // All pages
  $('.hamburger-menu').click(event => {
    $('body').toggleClass('nav-open');
  });

  $('.toggle-theme').click(event => {
    $('body').toggleClass('dark');

    if ($('body').hasClass('dark')) {
      $('body').trigger('dark');
    } else {
      $('body').trigger('light');
    }
  });

  // index
  if ($('#trailer').length) {
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

    // Tilt for upcoming movies
    $('.upcoming img').tilt({
      glare: true,
      maxGlare: 5,
      scale: 1.05
    });
  }

  // location
  if (window.location.toString().indexOf('location')) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY29kZXRoZXdlYiIsImEiOiJjanUxeDEyNXYwM3BvNGVsczBoNTd1MDA4In0.a4M3igHC1wJe3xsgdD4v6w';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-88.546, 47.1179], // starting position [lng, lat]
      zoom: 16 // starting zoom
    });

    let mk = document.createElement('div');
    mk.className = 'marker';

    const marker = new mapboxgl.Marker(mk)
                   .setLngLat([-88.546, 47.1179])
                   .setPopup(new mapboxgl.Popup({offset: 25})
                      .setHTML('<h3>135 Fisher Hall</h3>'))
                   .addTo(map);

    $('body').bind('light', () => {
      map.setStyle('mapbox://styles/mapbox/streets-v11');
    });

    $('body').bind('dark', () => {
      map.setStyle('mapbox://styles/mapbox/dark-v10');
    });
  }
});
