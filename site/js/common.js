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
});
