var os = require('os');
var util = require('util');

var utils = require('./utils.js');
var cpus = os.cpus.length;

var Moninode = function() {
	this.interval = null;
	this.config = {};
}

util.inherits(Moninode, require('events').EventEmitter);

Moninode.prototype.start = function (config)
{
	var that = this;
	this.config = util._extend({ 
		interval: 60000, // default 1 minute
		load1: 2,// 200% load
		load5: 2,// 200% load
		load15: 2,// 200% load
		freemem: 10485760,// 10MB 
	}, config);

	this.interval = setInterval( function()
	{
		that._collect();
	},this.config.interval)
	
}

Moninode.prototype.stop = function ()
{
	if( this.interval)
	{
		clearInterval( this.interval);
		this.interval = null;
	}
}

Moninode.prototype._collect = function ()
{

	var data =
	{
		load1 : os.loadavg()[0],
		load5 : os.loadavg()[1],
		load15 : os.loadavg()[2],
		freemem: os.freemem(),
		rss: process.memoryUsage().rss,
		uptime:parseInt(process.uptime())
	};
	this._fireEvents( data);
}

Moninode.prototype._fireEvents = function( data)
{
	this.emit('log', data);
	if( this.config.load1 && this.config.load1 < data.load1/cpus)
	{
		this.emit('alarm', { type:'load1', data:data});return;
	}
	if( this.config.load2 && this.config.load2 < data.load2/cpus)
	{
		this.emit('alarm', { type:'load2', data:data});return;
	}
	if( this.config.load3 && this.config.load3 < data.load3/cpus)
	{
		this.emit('alarm', { type:'load3', data:data});return;
	}
	if( this.config.freemem && this.config.freemem > data.freemem)
	{
		this.emit('alarm', { type:'freemem', data:data});return;
	}
	if( this.config.rss && this.config.rss < data.rss)
	{
		this.emit('alarm', { type:'rss', data:data});return;
	}
}


module.exports= Moninode;