import React from 'react'
import NotificationPane from './NotificationPane'
let socket = io.connect('http://localhost:649'); 

const App = React.createClass({

  getInitialState: function() {
   
   return { 
   notifications: [], 
   when: new Date(),
   status: 'Trying...' 
   }
  
  },
  
  componentDidMount() {
    var props = this.props;
	var self = this;
	 		 
    socket.on('news', function (notification) {		
        var newNotifications = self.state.notifications.slice()
        if (self._indexOf(newNotifications,notification.notification) == -1) {
		newNotifications.push(notification.notification);
		self.setState({ notifications: newNotifications});
		}
		else{
			//console.log("Everything is up to date.")
		}	
		self.setState({ when: new Date()});
		self.setState({ status: 'Connected'});
    });
	
	 socket.on('disconnect', function() {
		self.setState({ status: 'Trying...'});
	});
	
  },
  
  
  //check if the notification already exists.
  _indexOf(notifications,newNotification) {
	  for (var i = 0; i < notifications.length; i++) {
        if (notifications[i].id == newNotification.id) return i;
    }
    return -1; 
  },

  render() {
    return (
      <div className="container">
	  <NotificationPane when={this.state.when} status={this.state.status} data={{notifications: this.state.notifications}} />
	  </div>
    );
  }
});



export default App
