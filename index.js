/* eslint-disable no-param-reassign */
const sonos = require('sonos');
const SonosInstance = require('sonos').Sonos;


class SonosDriver {
    constructor() {
        this.driverSettings = {};
        this.commsInterface = null;
    }

    init(driverSettingsObj, commsInterface, eventEmitter) {
        this.driverSettingsObj = driverSettingsObj;

        this.eventEmitter = eventEmitter;
        this.commsInterface = commsInterface;
        return this.driverSettingsObj.get().then((settings) => {
            this.driverSettings = settings;
        });
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

    getEventEmitter() {
        return this.eventEmitter;
    }

    initDevices() {

    }

    getAuthenticationProcess() {
        return [];
    }

    discover() {
        return new Promise((resolve) => {
            const search = sonos.search();
            const devices = [];

            search.on('DeviceAvailable', (deviceObj) => {
                deviceObj.getZoneAttrs((err, attrs) => {
                    if (err) {
                        const e = new Error('Failed to retrieve zone attributes');
                        e.type = 'Driver';
                        throw e;
                    }
                    deviceObj.getZoneInfo((err2, info) => {
                        if (err2) {
                            const e = new Error('Failed to retrieve zone information');
                            e.type = 'Driver';
                            throw e;
                        }
                        const device = {
                            deviceId: info.SerialNumber,
                            name: attrs.CurrentZoneName,
                            address: info.IPAddress,
                            commands: {
                                getCurrentTrack: true,
                                flushQueue: true,
                                getLEDState: true,
                                getMuted: true,
                                next: true,
                                pause: true,
                                play: true,
                                previous: true,
                                addToQueueNext: true,
                                seek: true,
                                setLEDState: true,
                                setMuted: true,
                                setName: true,
                                setVolume: true,
                                stop: true
                            },
                            events: {
                                currentAudioTrack: true,
                                queueFlushed: true,
                                ledState: true,
                                mutedAudio: true,
                                volume: true,
                                nextAudioTrack: true,
                                audioPlayingState: true,
                                previousAudioTrack: true,
                                addedToQueueNext: true,
                                seek: true,
                                name: true
                            }
                        };
                        devices.push(device);
                    });
                });
            });

            // Stop searching and destroy after some time
            setTimeout(() => {
                search.destroy();
                resolve(devices);
            }, 8000);
        });
    }

    command_getCurrentTrack(device) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.currentTrack((err, result) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                this.eventEmitter.emit('currentAudioTrack', 'sonos', device._id, {
                    artist: result.artist,
                    track: result.title,
                    album: result.album,
                    length: result.duration,
                    currentPosition: result.position,
                    artUrl: result.albumArtURL
                });
                resolve();
            });
        });
    }

    command_getLEDState(device) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.getLEDState((err, result) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                this.eventEmitter.emit('ledState', 'sonos', device._id, {
                    on: result.on
                });
                resolve();
            });
        });
    }

    command_setLEDState(device, props) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            let val = 'Off';
            if (props.on === true) {
                val = 'On';
            }
            sonosDevice.setLEDState(val, (err) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                this.eventEmitter.emit('ledState', 'sonos', device._id, {
                    on: props.on
                });
                resolve();
            });
        });
    }

    command_setName(device, props) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.setName(props.name, (err) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                this.eventEmitter.emit('name', 'sonos', device._id, {
                    name: props.name
                });
                resolve();
            });
        });
    }

    command_play(device) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.play((err, result) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                if (result) {
                    this.eventEmitter.emit('audioPlayingState', 'sonos', device._id, {
                        paused: false,
                        playing: true,
                        stopped: false
                    });
                    resolve();
                }
            });
        });
    }

    command_pause(device) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.pause((err, result) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                if (result) {
                    this.eventEmitter.emit('audioPlayingState', 'sonos', device._id, {
                        paused: true,
                        playing: false,
                        stopped: false
                    });
                    resolve();
                }
            });
        });
    }

    command_stop(device) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.stop((err, result) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                if (result) {
                    this.eventEmitter.emit('audioPlayingState', 'sonos', device._id, {
                        paused: false,
                        playing: false,
                        stopped: true
                    });
                    resolve();
                }
            });
        });
    }

    command_previous(device) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.previous((err, result) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                if (result) {
                    this.eventEmitter.emit('previousAudioTrack', 'sonos', device._id, {
                        previous: true
                    });
                    resolve();
                }
            });
        });
    }

    command_next(device) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.next((err, result) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                if (result) {
                    this.eventEmitter.emit('nextAudioTrack', 'sonos', device._id, {
                        next: true
                    });
                    resolve();
                }
            });
        });
    }

    command_getMuted(device) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.getMuted((err, result) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                this.eventEmitter.emit('mutedAudio', 'sonos', device._id, {
                    muted: result
                });
                resolve();
            });
        });
    }

    command_setMuted(device, props) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.setMuted(props.muted, (err) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                this.eventEmitter.emit('mutedAudio', 'sonos', device._id, {
                    muted: props.muted
                });
                resolve();
            });
        });
    }

    command_flushQueue(device) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);

            sonosDevice.flush((err) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                this.eventEmitter.emit('queueFlushed', 'sonos', device._id, {
                    queueFlushed: true
                });
                resolve();
            });
        });
    }

    command_setVolume(device, props) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.setVolume(props.volume, (err) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                this.eventEmitter.emit('volume', 'sonos', device._id, {
                    volume: props.volume
                });
                resolve();
            });
        });
    }

    command_seek(device, props) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.seek(props.position, (err) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                this.eventEmitter.emit('seek', 'sonos', device._id, {
                    position: props.position
                });
                resolve();
            });
        });
    }

    command_addToQueueNext(device, props) { // eslint-disable-line camelcase
        return new Promise((resolve) => {
            const sonosDevice = new SonosInstance(device.specs.address, 1400);
            sonosDevice.queueNext(props.uri, (err) => {
                if (err) {
                    err.type = 'Driver';
                    throw err;
                }
                this.eventEmitter.emit('addedToQueueNext', 'sonos', device._id, {
                    queued: true
                });
                resolve();
            });
        });
    }
}

module.exports = SonosDriver;
