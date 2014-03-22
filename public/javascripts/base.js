(function() {
  $('#menu-close').click(function(e) {
    e.preventDefault();
    return $('#sidebar-wrapper').toggleClass('active');
  });

  $('#menu-toggle').click(function(e) {
    e.preventDefault();
    return $('#sidebar-wrapper').toggleClass('active');
  });

  $('a[href*=#]:not([href=#])').click(function() {
    var target;
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname === this.hostname) {
      target = $(this.hash);
      if (!target.length) {
        target = $('[name=' + this.hash.slice(1) + ']');
      }
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

}).call(this);
