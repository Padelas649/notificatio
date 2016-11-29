import React from 'react'

const NotificationPane = React.createClass({
   
  componentDidMount() {
	
  },

  render() {
    
	return (
    <div>
	   <h1>Notificatio[s] <small>Last Update:{this.props.when.toLocaleTimeString()} - Network Status: {this.props.status}</small></h1> 
	   <ul className="collection">
                {        
					this.props.data.notifications.map((notification,i) => {
                            return <li className="collection-item" key={i}>
                            <span className="title"><i>{notification.id}</i></span>
                            <p>                            
							<strong>{notification.name} + {notification.emitsOn} </strong>
                            </p>
                            </li>
					})	
				}   
       </ul>
    </div>
	);
  }
});


export default NotificationPane
