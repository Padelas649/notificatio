var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var parser = require('cron-parser');

var moment = require('moment');

var data = require('./api');
var config = require('./config');
var notifications = [];
var jobs = require('./jobs');
var jobs_http = require ('./jobs_http')




jobs_http.http1();
//jobs.db1(); 
//jobs.db2();
//jobs.db3();

//interval - call api -> db 
for (var i = 0, len = data.length; i < len; i++) {
  try {
    data[i].repetitionScheme = data[i].repetitionScheme.replace('?','');
    var cronTab  = parser.parseExpression(data[i].repetitionScheme);

    notifications.push({
       id: data[i].id,
       emitsOn: cronTab.next(),
       seen: false,
	   name: data[i].name
    });
  } catch (err) {
    console.log('Error: ' + err.message);
  }
}

//**************** worker ***********************************************



//**************** server ***********************************************
server.listen(649);
app.use('/', express.static('public'));

io.on('connection', function (socket) {
  
  
   //db -> .	
   var interval = setInterval(function(){
	var pgp = require('pg-promise')();
	let m1 = moment();
	var me = pgp('postgres://'+config.me.user+':'+config.me.pass+'@'+config.me.host+':'+config.me.port+'/'+config.me.db);	
	var thisData ;
	
	
	//ta pernw ap th vash me date > now && seen_no. 	
   me.many("SELECT * FROM notifications ORDER BY id ASC")	
	.then(function (data) {	
		console.log(data)
		var i = setInterval(function(){
			for (var i = 0, len = data.length; i < len; i++) {
				var now = new Date();
				var currentNotificationDate = new Date(data[i].emitsOn);
				var diff = Math.abs(currentNotificationDate - now);
				var diffMinutes = Math.floor((diff/1000)/60);

				if (diffMinutes === 0){
					socket.emit('news', { notification: data[i] });
					console.log('Notification Send! Id:' + data[i].id);
				}
			}
		
		}, 5000);
		socket.emit('checking',{});
		
	})
	.catch(function (error) {
		console.log('ERROR:', error)
	});

	console.log('**********************************************');	
	
}, 10000); 
	/*
	socket.on('checking', function (data) {
		console.log("Client Connected.");
	});
	*/
});

//**************** server ***********************************************
