import React from 'react'


const App = React.createClass({

  getInitialState: function() {
   return { notifications: '' };
  },

  componentDidMount() {

    var socket = io.connect('http://localhost:649');
    socket.on('news', function (notification) {
      console.log(notification);


    });
  },

  render() {
    return (
      <div>123</div>
    );
  }
});


export default App
