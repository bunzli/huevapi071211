
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);
app.listen(3000);

/// GAME RELATED.

var games = {};
var gcount = 1;

// Game handler
io.of('/api/game')
.on('connection', function (socket) {
	var app_id = null;
	socket.on('create',function(name, max) {
		if(!app_id) {
			console.log("Creating new app with max collabs = " + max);
			app_id = 'app_' + gcount++;
			games[app_id] = { 
				id: app_id, 
				socket: socket, 
				players: 0, 
				next_id : 1, 
				max: max 
			};
			socket.emit('create ok', app_id);
		} else socket.emit('create failed');
	});	
	socket.on('delete',function() {
		if(app_id) {
			console.log("Deleting app " + app_id);
			delete games[app_id];
			// TODO: Somehow notify players
			socket.emit('delete ok');
		} else socket.emit('delete failed');
	});
	socket.on('disconnect', function () {
		if(app_id) { 
			console.log("Deleting app " + app_id);
			delete games[app_id]; 
			// TODO: Somehow notify players
		}
	});
});

// Control handler.
io.of('/api/control')
.on('connection', function (socket) {
	var game = null;
	var player_id = 0;
	socket.on('join', function(key) {
		if(!game && key in games) {
			var temp_game = games[key];
			if(temp_game.players < temp_game.max) {
				game = temp_game;
				game.players++;
				player_id = game.next_id++;
				game.socket.emit('player join', player_id);
				socket.emit('join ok', player_id);
			} else socket.emit('join failed');
		} else socket.emit('join failed');
	});
	socket.on('leave',function() {
		if(game) {
			console.log("Player leaved " + game.id + ":" + player_id);
			game.socket.emit('player leave', player_id);
			game.players--;
			game = null;
			player_id = 0;
			socket.emit('leave ok');
		} else socket.emit('leave failed');
	});
	socket.on('disconnect', function () {
		if(game) {
			console.log("Player leaved " + game.id + ":" + player_id);
			game.socket.emit('player leave', player_id);
			game.players--; 
		}
	});
	socket.on('action',function(type, value) {
		if(game) game.socket.emit('player action', player_id, type, value);
		else socket.emit('push failed');
	});
});

console.log("JAAS server listening on port %d in %s mode", app.address().port, app.settings.env);
