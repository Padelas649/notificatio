var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var parser = require('cron-parser');

var data = require('./api');
var notifications = [];

//**************** worker ***********************************************
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
    
   //ta pernw ap th vash me date > now && seen_no. 	
	
   //
   
   
   //db -> .	
   var interval = setInterval(function(){

    for (var i = 0, len = notifications.length; i < len; i++) {
        var now = new Date();
        var currentNotificationDate = new Date(notifications[i].emitsOn);
        var diff = Math.abs(currentNotificationDate - now);
        var diffMinutes = Math.floor((diff/1000)/60);

        //if (diffMinutes === 0){
          socket.emit('news', { notification: notifications[i] });
          console.log('Notification Send! Id:' + notifications[i].id);
        //}
      }

}, 3000);

  socket.on('my other event', function (data) {
    console.log(data);
  });
});

//**************** server ***********************************************
