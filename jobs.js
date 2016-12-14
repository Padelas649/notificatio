var cron = require('node-cron');
var config = require('./config');
var _ = require('lodash');
var parser = require('cron-parser');
var moment = require('moment');

module.exports = 
{
  
  db1: function () 
  {
     cron.schedule('*/1 * * * *', function(){
			var pgp = require('pg-promise')();
			let m1 = moment();
			var db = pgp('postgres://'+config.ets.user+':'+config.ets.pass+'@'+config.ets.host+':'+config.ets.port+'/'+config.ets.db);
			var thisData ;
			
			
			db.many("select a.job_instance_id ,  b.display_name , a.cron_expression from ets_app.ets_batch_activ_config a inner join ets_app.ets_batch_job_instance b on a.job_instance_id=b.id where a.type='CONTINUOUS' and a.status='DEPLOYED'  and now()::date>a.start_date  and now()::date<a.end_date  order by cron_expression")
				.then(function (data) {
					thisData = data.slice();
					
					var me = pgp('postgres://'+config.me.user+':'+config.me.pass+'@'+config.me.host+':'+config.me.port+'/'+config.me.db);
					_.forEach(thisData, function(object) {
					object.cron_expression = object.cron_expression.replace('?','');
					var cronTab  = parser.parseExpression(object.cron_expression);		
						
					me.none("INSERT INTO notifications  (name, jobId, emitsOn, seen) VALUES ($1, $2, $3,  false) ON CONFLICT (name) DO UPDATE SET emitsOn = $3 , seen=false", 
						[object.display_name, object.job_instance_id, cronTab.next()])
						.then(function () {
								
						})
						.catch(function (error) {
								console.log(error);
						});
					});
					let m2 = moment();
					console.log(config.ets.db+' DB Updated in:'+m2.diff(m1) +' milliseconds');
				})
				.catch(function (error) {
					console.log('ERROR:', error)
				});
			console.log(config.ets.db+" Started:");	
		
	});
	return true;	
 }, 

   db2: function () 
  {
     cron.schedule('*/1 * * * *', function(){
			var pgp = require('pg-promise')();
			let m1 = moment();
			var db = pgp('postgres://'+config.mbs.user+':'+config.mbs.pass+'@'+config.mbs.host+':'+config.mbs.port+'/'+config.mbs.db);
			var thisData ;
			
			
			db.many("select a.job_instance_id ,  b.display_name , a.cron_expression from mbs_app.mbs_batch_activ_config a inner join mbs_app.mbs_batch_job_instance b on a.job_instance_id=b.id where a.type='CONTINUOUS' and a.status='DEPLOYED'  and now()::date>a.start_date  and now()::date<a.end_date  order by cron_expression")
				.then(function (data) {
					thisData = data.slice();
					
					var me = pgp('postgres://'+config.me.user+':'+config.me.pass+'@'+config.me.host+':'+config.me.port+'/'+config.me.db);
					_.forEach(thisData, function(object) {
					object.cron_expression = object.cron_expression.replace('?','');
					var cronTab  = parser.parseExpression(object.cron_expression);		
						
					me.none("INSERT INTO notifications  (name, jobId, emitsOn, seen) VALUES ($1, $2, $3,  false) ON CONFLICT (name) DO UPDATE SET emitsOn = $3 , seen=false", 
						[object.display_name, object.job_instance_id, cronTab.next()])
						.then(function () {
								
						})
						.catch(function (error) {
								console.log(error);
						});
					});
					let m2 = moment();
					console.log(config.mbs.db+' DB Updated in:'+m2.diff(m1) +' milliseconds');
				})
				.catch(function (error) {
					console.log('ERROR:', error)
				});
			console.log(config.mbs.db+" Started:");	
		
	});
	return true;	
 },  
 
 db3: function () 
  {
     cron.schedule('*/1 * * * *', function(){
			let m1 = moment();	
			var pgp = require('pg-promise')();
		
			var db = pgp('postgres://'+config.tbf.user+':'+config.tbf.pass+'@'+config.tbf.host+':'+config.tbf.port+'/'+config.tbf.db);
			var thisData ;
			
			
			db.many("select a.job_instance_id ,  b.display_name , a.cron_expression from tbf_app.tbf_batch_activ_config a inner join tbf_app.tbf_batch_job_instance b on a.job_instance_id=b.id where a.type='CONTINUOUS' and a.status='DEPLOYED'  and now()::date>a.start_date  and now()::date<a.end_date  order by cron_expression")
				.then(function (data) {
					thisData = data.slice();
					
					var me = pgp('postgres://'+config.me.user+':'+config.me.pass+'@'+config.me.host+':'+config.me.port+'/'+config.me.db);
					_.forEach(thisData, function(object) {
					object.cron_expression = object.cron_expression.replace('?','');
					var cronTab  = parser.parseExpression(object.cron_expression);		
						
					me.none("INSERT INTO notifications  (name, jobId, emitsOn, seen) VALUES ($1, $2, $3,  false) ON CONFLICT (name) DO UPDATE SET emitsOn = $3 , seen=false", 
						[object.display_name, object.job_instance_id, cronTab.next()])
						.then(function () {
								
						})
						.catch(function (error) {
								console.log(error);
						});
					});
					let m2 = moment();
					console.log(config.tbf.db+' DB Updated in:'+m2.diff(m1) +' milliseconds');
				})
				.catch(function (error) {
					console.log('ERROR:', error)
				});
			console.log(config.tbf.db+" Started!");	
		
	});
	return true;	
 },
 
 
 
 
};
	




