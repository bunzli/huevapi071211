var left = document.getElementById('left');
var right = document.getElementById('right');

left.addEventListener('touchmove', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    //obj.style.left = touch.pageX + 'px';
    //obj.style.top = touch.pageY + 'px';
    $("#text").html(touch.pageX);
  }
}, false);

right.addEventListener('touchmove', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    //obj.style.left = touch.pageX + 'px';
    //obj.style.top = touch.pageY + 'px';
    $("#text_2").html(touch.pageX);
  }
}, false);

document.addEventListener('touchstart', function(e){ e.preventDefault(); });
