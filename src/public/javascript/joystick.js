

var left = document.getElementById('left');
var right = document.getElementById('right');
var up = document.getElementById('up');
var down = document.getElementById('down');

var action_a = document.getElementById('action-a');

action_a.addEventListener('touchstart', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    socket.emit('action', 'button_A', 1);
  }
}, false);

left.addEventListener('touchstart', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    socket.emit('action', 'move_left', 1);
  }
}, false);

left.addEventListener('touchmove', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    socket.emit('action', 'move_left', 1);
  }
}, false);

right.addEventListener('touchstart', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    socket.emit('action', 'move_right', 1);
  }
}, false);

right.addEventListener('touchmove', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    socket.emit('action', 'move_right', 1);
  }
}, false);

up.addEventListener('touchstart', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    socket.emit('action', 'move_up', 1);
  }
}, false);

up.addEventListener('touchmove', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    socket.emit('action', 'move_up', 1);
  }
}, false);

down.addEventListener('touchstart', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    socket.emit('action', 'move_down', 1);
  }
}, false);

down.addEventListener('touchmove', function(event) {
  // If there's exactly one finger inside this element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element where the finger is
    socket.emit('action', 'move_down', 1);
  }
}, false);


document.addEventListener('touchstart', function(e){ e.preventDefault(); });

var socket = io.connect('/api/control');
	socket.on('connect', function () {
		socket.emit('join', document.location.hash.substr(1));
		socket.on('join ok', function (player_id) {
			
		});
		socket.on('join failed', function () {
			alert('cuek!');
		});
	});
