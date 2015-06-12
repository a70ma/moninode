Moninode
====

[![NPM](https://nodei.co/npm/moninode.png)](https://nodei.co/npm/moninode/)

![Build Status](https://api.travis-ci.org/a70ma/moninode.svg)

Monitor library written for client/server side needs in javascript.
**Monitorized values**: 
- os free memory
- load average ( 1, 5 and 15 minutes)
- RSS
- process uptime
- number of callbacks in the Node work queue, like setIntervals, timeouts, http requests etc

**Resources**:
- [Homepage](http://moninode.com)
- [Git](https://github.com/a70ma/moninode)
- [NPM](https://www.npmjs.com/package/moninode)

Setup
====

``` npm install moninode ```

Using moninode
====

Add it to your worker
----
```
var Moninode = require('moninode');
var moninode = new Moninode();

```

Start collecting OS status
----
```
m.start( options )
```

- options:
	- ```interval``` - data collecting interval in miliseconds, defaults to 60000
    - ```fremem``` - Minimum Free memory in bytes to trigger alarm
    - ```rss``` - Maximum RSS memory used by current process in bytes to trigger alarm
    - ```handles``` - Maximum number of callbacks waiting in the Node work queue, this value is taken from ```process._getActiveHandles()```

Stop collecting OS status
----
```
m.stop()
```

Events
----
- ```log```
	+ triggers everytime moninode collects OS status
	+ Example:
		```
			moninode.on("log", function( data)
			{
				console.log('[log]' + JSON.stringify(data));
			})
		///Outputs:
		/// [log]{"load1":0,"load5":0,"load15":0,"freemem":3772477440,"rss":12623872,"uptime":3}
		```
- ```alarm```
	+ triggers when any threshold is reach:
	+ Example:
		```
			moninode.on("alarm", function( data)
			{
				console.log('[alarm]' + JSON.stringify(data));
			})
		///Outputs:
		/// [alarm]{"type":"rss","data":{"load1":0,"load5":0,"load15":0,"freemem":3772289024,"rss":13770752,"uptime":6}}
		```

Example
----
```
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
```

Change Log
====
0.0.2
----
- added handles count, value collected with process._getActiveHandles()

0.0.1
----
- added events log, alarm
- start