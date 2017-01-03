var cron = require('node-cron');
var _ = require('lodash');
var parser = require('cron-parser');
var axios = require('axios');
var config = require('./config');
var get_todate = require('./get_todate')


module.exports = 
{


	http1: function ()
	{	
		cron.schedule('*/1 * * * *', function(){
				todate=get_todate.todate();			
				axios.get('http:///dryad-billing/processes/billing/list?status=RUNNING&activeOn='+todate+'T02%3A00')
  				  .then(function(response){
    				console.log(response.data); 
    				console.log(response.status); 
  											});  

		
		});
	return true;		

  				

  	}












};