const devices = {};

const discover = async () => Object.keys(devices).map(originalId => devices[originalId]);

const commandPlay = (device, Sonos, events, createEvent) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.play((err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.AUDIO_PLAYING_STATE, device._id, {
        paused: false,
        playing: true,
        stopped: false,
      });
      resolve();
    }
  });
});

const commandPause = (device, Sonos, events, createEvent) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.pause((err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.AUDIO_PLAYING_STATE, device._id, {
        paused: true,
        playing: false,
        stopped: false,
      });
      resolve();
    }
  });
});

const commandStop = (device, Sonos, events, createEvent) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.stop((err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.AUDIO_PLAYING_STATE, device._id, {
        paused: false,
        playing: false,
        stopped: true,
      });
      resolve();
    }
  });
});

const commandPrevious = (device, Sonos, events, createEvent) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.previous((err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.PREVIOUS_AUDIO_TRACK, device._id, {
        previous: true,
      });
      resolve();
    }
  });
});

const commandNext = (device, Sonos, events, createEvent) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.next((err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.NEXT_AUDIO_TRACK, device._id, {
        next: true,
      });
      resolve();
    }
  });
});

const commandGetMuted = (device, Sonos, events, createEvent) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.getMuted((err, result) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.MUTED_AUDIO, device._id, {
        muted: result,
      });
      resolve();
    }
  });
});

const commandSetMuted = (device, Sonos, events, createEvent, props) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.setMuted(props.muted, (err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.MUTED_AUDIO, device._id, {
        muted: props.muted,
      });
      resolve();
    }
  });
});

const commandFlushQueue = (device, Sonos, events, createEvent) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.flush((err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.QUEUE_FLUSHED, device._id, {
        queueFlushed: true,
      });
      resolve();
    }
  });
});

const commandSetVolume = (device, Sonos, events, createEvent, props) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.setVolume(props.volume, (err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.VOLUME, device._id, {
        volume: props.volume,
      });
      resolve();
    }
  });
});

const commandSeek = (device, Sonos, events, createEvent, props) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.seek(props.position, (err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.SEEK, device._id, {
        position: props.position,
      });
      resolve();
    }
  });
});

const commandAddUrlToQueueNext = (device, Sonos, events, createEvent, props) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.queueNext(props.uri, (err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.ADDED_TO_QUEUE_NEXT, device._id, {
        queued: true,
        uri: props.uri,
      });
      resolve();
    }
  });
});

const commandAddUrlToQueueBottom = (device, Sonos, events, createEvent, props) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.queue(props.uri, (err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.ADDED_TO_QUEUE_BOTTOM, device._id, {
        queued: true,
        uri: props.uri,
      });
      resolve();
    }
  });
});

const commandAddSpotifyToQueueNext = (device, Sonos, events, createEvent, props) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.queueNext(props.uri, (err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.ADDED_TO_QUEUE_NEXT, device._id, {
        queued: true,
        uri: props.uri,
      });
      resolve();
    }
  });
});

const commandAddSpotifyToQueueBottom = (device, Sonos, events, createEvent, props) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.queue(props.uri, (err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.ADDED_TO_QUEUE_BOTTOM, device._id, {
        queued: true,
        uri: props.uri,
      });
      resolve();
    }
  });
});

const commandSetName = (device, Sonos, events, createEvent, props) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.setName(props.name, (err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.NAME, device._id, {
        name: props.name,
      });
      resolve();
    }
  });
});

const commandGetLEDState = (device, Sonos, events, createEvent, props) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.getLEDState((err, result) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.LED_STATE, device._id, {
        on: result === 'On',
      });
      resolve();
    }
  });
});

const commandSetLEDState = (device, Sonos, events, createEvent, props) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  let val = 'Off';
  if (props.on === true) {
    val = 'On';
  }
  sonosDevice.setLEDState(val, (err) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.LED_STATE, device._id, {
        on: props.on,
      });
      resolve();
    }
  });
});

const commandGetCurrentTrack = (device, Sonos, events, createEvent, props) => new Promise((resolve, reject) => {
  const sonosDevice = new Sonos(device.specs.address, 1400);
  sonosDevice.currentTrack((err, result) => {
    if (err) {
      err.type = 'Driver';
      reject(err);
    } else {
      createEvent(events.CURRENT_AUDIO_TRACK, device._id, {
        artist: result.artist,
        track: result.title,
        album: result.album,
        length: result.duration,
        currentPosition: result.position,
        duration: result.duration,
        artUrl: result.albumArtURL,
        uri: result.uri,
      });
      resolve();
    }
  });
});

module.exports = async (getSettings, updateSettings, commsInterface, sonos, events, createEvent) => {
  const sonosInstance = sonos.Sonos;
  const search = sonos.search();

  search.on('DeviceAvailable', (deviceObj, model) => {
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
          originalId: info.SerialNumber,
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
            addUrlToQueueNext: true,
            addUrlToQueueBottom: true,
            addSpotifyToQueueNext: true,
            addSpotifyToQueueBottom: true,
            seek: true,
            setLEDState: true,
            setMuted: true,
            setName: true,
            setVolume: true,
            stop: true,
          },
          events: {
            [events.CURRENT_AUDIO_TRACK]: true,
            [events.QUEUE_FLUSHED]: true,
            [events.LED_STATE]: true,
            [events.MUTED_AUDIO]: true,
            [events.VOLUME]: true,
            [events.NEXT_AUDIO_TRACK]: true,
            [events.AUDIO_PLAYING_STATE]: true,
            [events.PREVIOUS_AUDIO_TRACK]: true,
            [events.ADDED_TO_QUEUE_BOTTOM]: true,
            [events.ADDED_TO_QUEUE_NEXT]: true,
            [events.SEEK]: true,
            [events.NAME]: true,
          },
        };
        devices[device.originalId] = device;
      });
    });
  });

  return {
    initDevices: async () => Promise.resolve,
    authentication_getSteps: () => [],
    discover: async () => discover(),
    command_play: async device => commandPlay(device, sonosInstance, events, createEvent),
    command_pause: async device => commandPause(device, sonosInstance, events, createEvent),
    command_stop: async device => commandStop(device, sonosInstance, events, createEvent),
    command_previous: async device => commandPrevious(device, sonosInstance, events, createEvent),
    command_next: async device => commandNext(device, sonosInstance, events, createEvent),
    command_getMuted: async device => commandGetMuted(device, sonosInstance, events, createEvent),
    command_setMuted: async (device, props) => commandSetMuted(device, sonosInstance, events, createEvent, props),
    command_flushQueue: async device => commandFlushQueue(device, sonosInstance, events, createEvent),
    command_setVolume: async (device, props) => commandSetVolume(device, sonosInstance, events, createEvent, props),
    command_seek: async (device, props) => commandSeek(device, sonosInstance, events, createEvent, props),
    command_addUrlToQueueNext: async (device, props) => commandAddUrlToQueueNext(device, sonosInstance, events, createEvent, props),
    command_addUrlToQueueBottom: async (device, props) => commandAddUrlToQueueBottom(device, sonosInstance, events, createEvent, props),
    command_addSpotifyToQueueNext: async (device, props) => commandAddSpotifyToQueueNext(device, sonosInstance, events, createEvent, props),
    command_addSpotifyToQueueBottom: async (device, props) => commandAddSpotifyToQueueBottom(device, sonosInstance, events, createEvent, props),
    command_setName: async (device, props) => commandSetName(device, sonosInstance, events, createEvent, props),
    command_getLEDState: async device => commandGetLEDState(device, sonosInstance, events, createEvent),
    command_setLEDState: async (device, props) => commandSetLEDState(device, sonosInstance, events, createEvent, props),
    command_getCurrentTrack: async device => commandGetCurrentTrack(device, sonosInstance, events, createEvent),
  };
};
