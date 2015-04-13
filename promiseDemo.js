var events = require('events'),
	util = require('util');

function Promise() {

	events.EventEmitter.call(this);
}
util.inherits(Promise, events.EventEmitter);

Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler) {
	if(typeof fulfilledHandler === 'function'){
		this.once('success', fulfilledHandler);
	}
	if(typeof errorHandler === 'function'){
		this.once('error', errorHandler);
	}
	if(typeof progressHandler === 'function'){
		this.on('progress', progressHandler);
	}
	return this;
};

function Deferred() {
	this.state = "unfulfilled";
	this.promise = new Promise();
}

Deferred.prototype.resolve = function(o) {
	this.state = 'fulfilled';
	this.promise.emit('success', o);
};

Deferred.prototype.reject = function(o) {
	this.state = 'failed';
	this.promise.emit('error', o);
};
Deferred.prototype.progress = function(o) {
	this.promise.emit('progress', o);
};

var resPromisify = function(res) {
	var deferred = new Deferred();
	var result = '';
	res.on('data', function(chunk) {
		result += chunk;
		deferred.progress(chunk);
	});
	res.on('end', function() {
		deferred.resolve(result);
	});
	res.on('err', function(err) {
		deferred.reject(err);
	})
	return deferred.promise;
};

require('http').get('http://hongyan.cqupt.edu.cn/cdn/', function(res) {
	res.setEncoding('utf8');
	resPromisify(res).then(function(result) {
		console.log('搞定! length:', result.length);
	}, function(err) {
		console.log('err:', err);
	}, function() {
		console.log('in progress');
	});
});
