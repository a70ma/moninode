var Moninode = require('moninode');

var m = new Moninode();
m.start({ rss: 13369344, interval : 3000});


m.on("log", function( data)
{
	console.log('[log]' + JSON.stringify(data));
})
m.on("alarm", function( data)
{
	console.log('[alarm]' + JSON.stringify(data));
})

setTimeout(function(){
	m.stop();
},10000)