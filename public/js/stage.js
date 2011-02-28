// function preload(arrayOfImages) {
//     $(arrayOfImages).each(function(){
//         $('<img/>')[0].src = this;
//     });
// }
// 
// preload([
//     'images/show1.png',
//     'images/show2.png'
// ]);


var animation_time = 1500;
var animation_wait = 0;
var animation_lock = false;
var open_easing    = 'easeOutBack';
var close_easing   = 'easeOutBack';
var img = 1;

function open_left() {
  $('#left').animate({
    width: 30
  }, animation_time, open_easing, function() {
    animation_lock = false;
  });
}

function close_left() {
  $('#left').animate({
    width: 304
  }, animation_time, close_easing, function() {
      setTimeout('open_left();', animation_wait);
    });
}

function open_right() {
  $('#right').animate({
    width: 30,
    left:  '+=255'
  }, animation_time, open_easing);
}

function close_right() {
  $('#right').animate({
    width: 285,
    left:  '-=255'
  }, animation_time, close_easing, function() {
    setTimeout('open_right();', animation_wait);
  });
}

function changeImage(element, image_src) {
  $(element).attr('src', image_src);
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