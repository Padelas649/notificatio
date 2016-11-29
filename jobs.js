var CronJob = require('cron').CronJob;	

module.exports = 
{
  
  daily: function () 
  {
     const dail = new CronJob({
		cronTime: '* * * * * *',
		onTick: function() {
			console.log('Daily email cron job start');
			var pgp = require('pg-promise')(/*options*/)
			var db = pgp('postgres://'+config.me.user+':'+config.me.pass+'@'+config.me.host+':'+config.me.port+'/'+config.me.db);
		},
		onComplete: function() {
			
		},
		start: false, // Don't start job immediately
		timeZone: 'Europe/Athens'
	});
	  
	 dail.start(); 
     return true;
  },

 
};
	




