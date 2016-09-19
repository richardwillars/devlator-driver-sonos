'use strict';

var sonos = require('sonos');
var sonosInstance = require('sonos').Sonos;

/*
LEFT TO IMPLEMENMT
addToQueueBottom
getZoneInfo
getZoneAttrs
getTopology
getMusicLibrary
getCurrentState
getDeviceDescription
*/

class SonosDriver {
	constructor(driverSettingsObj, interfaces) {
		var self = this;
		this.interface = interfaces[this.getInterface()];
	}

	getName() {
		return 'sonos';
	}

	getType() {
		return 'speaker';
	}

	getInterface() {
		return 'http';
	}

	setEventEmitter(eventEmitter) {
		this.eventEmitter = eventEmitter;
		//when something happens with this speaker you can emit an event to let the thinglator platform know:
		//it should only emit events which are valid types (see documentation on speakers for more info)
		//this.eventEmitter.emit('eventType','driverId','deviceId','value')

		//E.g:
		//this.eventEmitter.emit('playing','sonos','defghi','abc123');
	}

	initDevices(devices) {

	}

	getAuthenticationProcess() {
		return [];
	}

	discover() {
		return new Promise(function(resolve) {
			var search = sonos.search()
			var devices = [];

			search.on('DeviceAvailable', function(deviceObj, model) {
				deviceObj.getZoneAttrs(function(err, attrs) {
					if (err) {
						var e = new Error('Failed to retrieve zone attributes');
						e.type = 'Driver';
						throw e;
					}
					deviceObj.getZoneInfo(function(err, info) {
						if (err) {
							var e = new Error('Failed to retrieve zone information');
							e.type = 'Driver';
							throw e;
						}
						var device = {
							deviceId: info.SerialNumber,
							name: attrs.CurrentZoneName,
							address: info.IPAddress,
							capabilities: {
								getCurrentTrack: true,
								getDeviceDescription: false,
								flushQueue: true,
								getCurrentState: false,
								getLEDState: true,
								getMusicLibrary: false,
								getMuted: true,
								getTopology: false,
								getVolume: false,
								getZoneAttrs: false,
								getZoneInfo: false,
								next: true,
								pause: true,
								play: true,
								previous: true,
								addToQueueBottom: false,
								addToQueueNext: true,
								seek: true,
								setLEDState: true,
								setMuted: true,
								setName: true,
								setPlayMode: false,
								setVolume: true,
								stop: true
							}
						};
						devices.push(device);

					});
				});
			});

			//Stop searching and destroy after some time
			setTimeout(function() {
				search.destroy();
				resolve(devices);
			}, 8000);
		});
	}

	capability_getCurrentTrack(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.currentTrack(function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				resolve({
					artist: result.artist,
					track: result.title,
					album: result.album,
					length: result.duration,
					currentPosition: result.position,
					artUrl: result.albumArtURL
				});
			});
		});
	}

	capability_getLEDState(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.getLEDState(function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				resolve({
					on: result.on
				});
			});
		});
	}

	capability_setLEDState(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			var val = "Off";
			if (props.on === true) {
				val = "On";
			}
			sonosDevice.setLEDState(val, function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				resolve({
					on: props.on
				});
			});
		});
	}

	capability_setName(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.setName(props.name, function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				resolve({
					name: props.name
				});
			});
		});
	}

	capability_play(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.play(function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				if (result) {
					resolve({
						playing: true
					});
				}
			});
		});
	}

	capability_pause(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.pause(function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				if (result) {
					resolve({
						paused: true
					});
				}
			});
		});
	}

	capability_stop(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.stop(function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				if (result) {
					resolve({
						stopped: true
					});
				}
			});
		});
	}

	capability_previous(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.previous(function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				if (result) {
					resolve({
						previous: true
					});
				}
			});
		});
	}

	capability_next(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.next(function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				if (result) {
					resolve({
						next: true
					});
				}
			});
		});
	}

	capability_getMuted(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.getMuted(function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				resolve({
					muted: result
				});
			});
		});
	}

	capability_setMuted(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.setMuted(props.muted, function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				resolve({
					muted: props.muted
				});
			});
		});
	}

	capability_flushQueue(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			if (err) {
				err.type = 'Driver';
				throw err;
			}
			sonosDevice.flush(function(err, result) {
				resolve({
					queueFlushed: true
				});
			});
		});
	}

	capability_setVolume(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.setVolume(props.volume, function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				resolve({
					volume: props.volume
				});
			});
		});
	}

	capability_seek(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.seek(props.position, function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				resolve({
					position: props.position
				});
			});
		});
	}

	capability_addToQueueNext(device, props) {
		return new Promise(function(resolve) {
			var sonosDevice = new sonosInstance(device.specs.address, 1400);
			sonosDevice.queueNext(props.uri, function(err, result) {
				if (err) {
					err.type = 'Driver';
					throw err;
				}
				resolve({
					queued: true
				});
			});
		});
	}
}

module.exports = SonosDriver;