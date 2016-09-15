var chai = require('chai');
var expect = chai.expect;

var driverName = 'sonos';
var driverType = 'speaker';
var driverInterface = 'http';

describe('driver structure', () => {
	describe('driver methods', () => {
		it('should be exposed as a class', () => {
			var driver = require('../index');
			expect(driver).to.be.a.class;
		});

		it('should have a constructor that accepts an instance of the driver settings class and an object containing a list of interfaces', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance instanceof driver).to.equal(true);
		});

		it('should have a getName method that returns the name of the driver', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.getName).to.be.a.function;
			expect(driverInstance.getName()).to.equal(driverName);
		});

		it('should have a getType method that returns the type of the driver', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.getType).to.be.a.function;
			expect(driverInstance.getType()).to.equal(driverType);
		});

		it('should have a getInterface method that returns the interface required by the driver', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.getInterface).to.be.a.function;
			expect(driverInstance.getInterface()).to.equal(driverInterface);
		});

		it('should have a setEventEmitter method that accepts an event emitter', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.setEventEmitter).to.be.a.function;
		});

		it('should have an initDevices method that accepts an array of devices to be initialised if required', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.initDevices).to.be.a.function;
		});

		it('should have a getAuthenticationProcess method that returns the authorisation process for the driver as an array', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.getAuthenticationProcess).to.be.a.function;
			expect(driverInstance.getAuthenticationProcess()).to.be.an.array;
		});

		it('should have a discover method that promises to find and return all active devices', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.discover).to.be.a.function;
		});
	});

	describe('capability methods', () => {

		it('should have an \'capability_getCurrentTrack\' method that promises to get the current track from the specified sonos speaker', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_getCurrentTrack).to.be.a.function;
		});

		it('should have an \'capability_flushQueue\' method that promises to flush the queue of the speaker', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_flushQueue).to.be.a.function;
		});

		it('should have an \'capability_getLEDState\' method that promises to get the boolean state of the led indicator on the speaker', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_getLEDState).to.be.a.function;
		});
		
		it('should have an \'capability_getMuted\' method that promises to get the muted state of the speaker', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_getMuted).to.be.a.function;
		});
		
		it('should have an \'capability_next\' method that promises to go to the next track', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_next).to.be.a.function;
		});
		
		it('should have an \'capability_pause\' method that promises to pause the currently playing track', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_pause).to.be.a.function;
		});
		
		it('should have an \'capability_play\' method that promises to play a track', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_play).to.be.a.function;
		});

		
		it('should have an \'capability_previous\' method that promises to go to the previous track', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_previous).to.be.a.function;
		});
		
		it('should have an \'capability_addToQueueNext\' method that promises to add a track to the front of the queue', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_addToQueueNext).to.be.a.function;
		});
		
		it('should have an \'capability_seek\' method that promises to seek to a position in the current track', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_seek).to.be.a.function;
		});
		
		it('should have an \'capability_setLEDState\' method that promises to set the state of the LED indicator on the speaker', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_setLEDState).to.be.a.function;
		});
		
		it('should have an \'capability_setMuted\' method that promises to set the muted state of the speaker', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_setMuted).to.be.a.function;
		});
		
		it('should have an \'capability_setName\' method that promises to set the name of the speaker', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_setName).to.be.a.function;
		});

		it('should have an \'capability_setVolume\' method that promises to set the volume of the speaker', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_setVolume).to.be.a.function;
		});
		
		it('should have an \'capability_stop\' method that promises to stop the currently playing track', () => {
			var driverSettings = new class DriverSettings {
				get() {
					return Promise.resolve({});
				}
				set(settings) {
					return Promise.resolve();
				}
			}

			var interfaces = {
				http: {}
			};

			var driver = require('../index');
			var driverInstance = new driver(driverSettings, interfaces);
			expect(driverInstance.capability_stop).to.be.a.function;
		});
	});
});