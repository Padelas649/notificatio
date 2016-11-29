import React from 'react'

const NotificationPane = React.createClass({
   
  componentDidMount() {
	
  },
  
  onNotificationClick(event) {
	  event.preventDefault();
	  if (typeof this.props.onChange === 'function') {
            this.props.onChange(event.target.id);
      }	
  },
  
  render() {
    
	return (
    <div>
	   <h1>Notificatio[s] <small>Last Update:{this.props.when.toLocaleTimeString()} - Network Status: {this.props.status}</small></h1> 
	   <ul className="list-group">
                { 
                    
					this.props.data.notifications.map((notification,i) => {
                            return <li className="list-group-item list-group-item-warning" key={i}>
                            
							<div className="row">
							
							<div className="col-md-6">
							<p>Name:<strong>{notification.name}  {notification.emitsOn} </strong> 
							- Id: <strong>{notification.id}</strong>
                            </p>
							</div>
							
							<div className="col-md-6">
							<div className="pull-right">
							<a className="btn btn-default" id={notification.id} onClick={this.onNotificationClick} role="">Mark as completed</a>
							</div>
							</div>
							
							</div>
							</li>
					})	
				}   
       </ul>
    </div>
	);
  }
});


export default NotificationPane
