$('#menu-close').click (e) ->
  e.preventDefault()
  $('#sidebar-wrapper').toggleClass 'active'

$('#menu-toggle').click (e) ->
  e.preventDefault()
  $('#sidebar-wrapper').toggleClass 'active'

$('a[href*=#]:not([href=#])').click ->
  if location.pathname.replace(/^\//, '') is @pathname.replace(/^\//, '') or location.hostname is @hostname
    target = $(@hash)
    if not target.length then target = $('[name=' + @hash.slice(1) + ']')
    if target.length
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000)
      return false
