import React from 'react'
import NotificationPane from './NotificationPane'

const App = React.createClass({

  getInitialState: function() {
   
   return { notifications: [] }
  

  },

  componentDidMount() {
    var socket = io.connect('http://localhost:649'); 
    var props = this.props;
    var notifications = this.state.notifications;
	var self = this;
       
    socket.on('news', function (notification) {
			
		if (notifications.indexOf(notification.notification) === -1) {
        notifications.push(notification.notification);
		}   
		else {
        //console.log("This item already exists");
		}
		
		
		self.setState(notification);
    }); 
  },

  render() {
    return (
      <div className="col s6"><NotificationPane data={{notifications: this.state.notifications}}/></div>
    );
  }
});


export default App
