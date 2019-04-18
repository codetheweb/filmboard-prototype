const mapboxgl = require('mapbox-gl');

$(document).ready(() => {
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
                    .setHTML('<h3>135 Fisher Hall</h3><address><p>Michigan Technological University</p><p>1400 Townsend Drive</p><p>Houghton, Michigan 49931-1295</p></address>'))
                 .addTo(map);

  $('body').bind('light', () => {
    map.setStyle('mapbox://styles/mapbox/streets-v11');
  });

  $('body').bind('dark', () => {
    map.setStyle('mapbox://styles/mapbox/dark-v10');
  });
})
