var animation_time = 1500;
var animation_wait = 0;
var animation_lock = false;
var open_easing    = 'easeOutBack';
var close_easing   = 'easeOutBack';
var img = 1;
var new_image;

function open_left() {
  $('#left').animate({
    left: '-=255'
  }, animation_time, open_easing, function() {
    animation_lock = false;
  });
}

function close_left() {
  $('#left').animate({
    left: '+=255'
  }, animation_time, close_easing, function() {
      setTimeout('open_left();', animation_wait);
    });
}

function open_right() {
  $('#right').animate({
    left:  '+=255'
  }, animation_time, open_easing);
}

function close_right() {
  $('#right').animate({
    left:  '-=255'
  }, animation_time, close_easing, function() {
    setTimeout('open_right();', animation_wait);
  });
}

function changeImage(element, image_src) {
  // :( IE 6 fix, as this doesn't work:
  // $(element).attr('src', image_src);
  var el = $(element);
  // new_image global to prevent flickering
  new_image = new Image();
  new_image.src = image_src;
  new_image.id = 'show';
  el.replaceWith(new_image);
}

function change_to(element, image_src) {
  if(animation_lock == true) {
    return;
  }
  animation_lock = true;

  var func = function() { changeImage(element, image_src); }
  setTimeout(func, animation_time);
  close_left();
  close_right();
}
