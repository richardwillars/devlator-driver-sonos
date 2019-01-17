/* eslint-disable no-param-reassign */
const devices = {};

const discover = async () =>
  Object.keys(devices).map(originalId => devices[originalId]);

const commandPlay = async (device, Sonos, events, createEvent) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.play();
    createEvent(events.AUDIO_PLAYING_STATE, device.deviceId, {
      paused: false,
      playing: true,
      stopped: false
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandPause = async (device, Sonos, events, createEvent) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.pause();
    createEvent(events.AUDIO_PLAYING_STATE, device.deviceId, {
      paused: true,
      playing: false,
      stopped: false
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandStop = async (device, Sonos, events, createEvent) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.stop();
    createEvent(events.AUDIO_PLAYING_STATE, device.deviceId, {
      paused: false,
      playing: false,
      stopped: true
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandPrevious = async (device, Sonos, events, createEvent) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.previous();
    createEvent(events.PREVIOUS_AUDIO_TRACK, device.deviceId, {
      previous: true
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandNext = async (device, Sonos, events, createEvent) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.next();
    createEvent(events.NEXT_AUDIO_TRACK, device.deviceId, {
      next: true
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandGetMuted = async (device, Sonos, events, createEvent) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    const muted = await sonosDevice.getMuted();
    createEvent(events.MUTED_AUDIO, device.deviceId, {
      muted
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandSetMuted = async (device, Sonos, events, createEvent, props) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.setMuted(props.muted);
    createEvent(events.MUTED_AUDIO, device.deviceId, {
      muted: props.muted
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandFlushQueue = async (device, Sonos, events, createEvent) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.flush();
    createEvent(events.QUEUE_FLUSHED, device.deviceId, {
      queueFlushed: true
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandSetVolume = async (device, Sonos, events, createEvent, props) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.setVolume(props.volume);
    createEvent(events.VOLUME, device.deviceId, {
      volume: props.volume
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandSeek = async (device, Sonos, events, createEvent, props) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.seek(props.position);
    createEvent(events.SEEK, device.deviceId, {
      position: props.position
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandAddUrlToQueueNext = async (
  device,
  Sonos,
  events,
  createEvent,
  props
) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.queue(props.uri, 1);
    createEvent(events.ADDED_TO_QUEUE_NEXT, device.deviceId, {
      queued: true,
      uri: props.uri
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandAddUrlToQueueBottom = async (
  device,
  Sonos,
  events,
  createEvent,
  props
) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.queue(props.uri);
    createEvent(events.ADDED_TO_QUEUE_BOTTOM, device.deviceId, {
      queued: true,
      uri: props.uri
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandPlayUrl = async (device, Sonos, events, createEvent, props) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.flush();
    await sonosDevice.queue(props.uri, 1);
    await sonosDevice.play();
    createEvent(events.ADDED_TO_QUEUE_NEXT, device.deviceId, {
      queued: true,
      uri: props.uri
    });
    createEvent(events.AUDIO_PLAYING_STATE, device.deviceId, {
      paused: false,
      playing: true,
      stopped: false
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandPlaySpotify = async (
  device,
  Sonos,
  events,
  createEvent,
  props,
  region
) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  sonosDevice.setSpotifyRegion(region);
  try {
    await sonosDevice.flush();
    await sonosDevice.queue(props.uri, 1);
    await sonosDevice.play();
    createEvent(events.ADDED_TO_QUEUE_NEXT, device.deviceId, {
      queued: true,
      uri: props.uri
    });
    createEvent(events.AUDIO_PLAYING_STATE, device.deviceId, {
      paused: false,
      playing: true,
      stopped: false
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandAddSpotifyToQueueNext = async (
  device,
  Sonos,
  events,
  createEvent,
  props,
  region
) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  sonosDevice.setSpotifyRegion(region);
  try {
    await sonosDevice.queue(props.uri, 1);
    createEvent(events.ADDED_TO_QUEUE_NEXT, device.deviceId, {
      queued: true,
      uri: props.uri
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandAddSpotifyToQueueBottom = async (
  device,
  Sonos,
  events,
  createEvent,
  props,
  region
) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  sonosDevice.setSpotifyRegion(region);
  try {
    await sonosDevice.queue(props.uri);
    createEvent(events.ADDED_TO_QUEUE_BOTTOM, device.deviceId, {
      queued: true,
      uri: props.uri
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandSetName = async (device, Sonos, events, createEvent, props) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    await sonosDevice.setName(props.name);
    createEvent(events.NAME, device.deviceId, {
      name: props.name
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandGetLEDState = async (device, Sonos, events, createEvent) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    const led = await sonosDevice.getLEDState();
    createEvent(events.LED_STATE, device.deviceId, {
      on: led === "On"
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandSetLEDState = async (
  device,
  Sonos,
  events,
  createEvent,
  props
) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    let val = "Off";
    if (props.on === true) {
      val = "On";
    }
    await sonosDevice.setLEDState(val);
    createEvent(events.LED_STATE, device.deviceId, {
      on: props.on
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const commandGetCurrentTrack = async (device, Sonos, events, createEvent) => {
  const sonosDevice = new Sonos(device.additionalInfo.address, 1400);
  try {
    const result = await sonosDevice.currentTrack();
    createEvent(events.CURRENT_AUDIO_TRACK, device.deviceId, {
      artist: result.artist,
      track: result.title,
      album: result.album,
      length: result.duration,
      currentPosition: result.position,
      duration: result.duration,
      artUrl: result.albumArtURL,
      uri: result.uri
    });
  } catch (err) {
    err.type = "Driver";
    throw err;
  }
};

const getAuthenticationProcess = () => [
  {
    type: "RequestData",
    message: "For spotify usage, which region are you in? EU or US", // eslint-disable-line max-len
    button: {
      url: "",
      label: "Region"
    },
    dataLabel: "Region"
  }
];

const authenticationStep0 = async (props, updateSettings) => {
  const newSettings = {
    region: props.data
  };
  try {
    await updateSettings(newSettings);

    return {
      success: true,
      message: "Authenticated"
    };
  } catch (err) {
    return {
      success: false,
      message: err.error || err.message
    };
  }
};

const removeDevice = deviceId => {
  delete devices[deviceId];
};

module.exports = async (
  getSettings,
  updateSettings,
  commsInterface,
  sonos,
  events,
  createEvent
) => {
  const settings = await getSettings();
  sonos.DeviceDiscovery(device => {
    let attrs;
    return device
      .getZoneAttrs()
      .then(attrsObj => {
        attrs = attrsObj;
        return device.getZoneInfo();
      })
      .then(info => {
        const deviceObj = {
          originalId: info.SerialNumber,
          name: attrs.CurrentZoneName,
          additionalInfo: {
            address: info.IPAddress
          },
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
            playSpotify: true,
            playUrl: true,
            seek: true,
            setLEDState: true,
            setMuted: true,
            setName: true,
            setVolume: true,
            stop: true
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
            [events.NAME]: true
          }
        };
        devices[device.originalId] = deviceObj;
      })
      .catch(err => {
        console.error(err);
      });
  });

  const sonosInstance = sonos.Sonos;
  const region = sonos.SpotifyRegion[settings.region];

  return {
    initDevices: async () => Promise.resolve,
    authentication_getSteps: getAuthenticationProcess,
    authentication_step0: props => authenticationStep0(props, updateSettings),
    discover: async () => discover(),
    command_play: async device =>
      commandPlay(device, sonosInstance, events, createEvent),
    command_pause: async device =>
      commandPause(device, sonosInstance, events, createEvent),
    command_stop: async device =>
      commandStop(device, sonosInstance, events, createEvent),
    command_previous: async device =>
      commandPrevious(device, sonosInstance, events, createEvent),
    command_next: async device =>
      commandNext(device, sonosInstance, events, createEvent),
    command_getMuted: async device =>
      commandGetMuted(device, sonosInstance, events, createEvent),
    command_setMuted: async (device, props) =>
      commandSetMuted(device, sonosInstance, events, createEvent, props),
    command_flushQueue: async device =>
      commandFlushQueue(device, sonosInstance, events, createEvent),
    command_setVolume: async (device, props) =>
      commandSetVolume(device, sonosInstance, events, createEvent, props),
    command_seek: async (device, props) =>
      commandSeek(device, sonosInstance, events, createEvent, props),
    command_addUrlToQueueNext: async (device, props) =>
      commandAddUrlToQueueNext(
        device,
        sonosInstance,
        events,
        createEvent,
        props
      ),
    command_addUrlToQueueBottom: async (device, props) =>
      commandAddUrlToQueueBottom(
        device,
        sonosInstance,
        events,
        createEvent,
        props
      ),
    command_addSpotifyToQueueNext: async (device, props) =>
      commandAddSpotifyToQueueNext(
        device,
        sonosInstance,
        events,
        createEvent,
        props,
        region
      ),
    command_addSpotifyToQueueBottom: async (device, props) =>
      commandAddSpotifyToQueueBottom(
        device,
        sonosInstance,
        events,
        createEvent,
        props,
        region
      ),
    command_playUrl: async (device, props) =>
      commandPlayUrl(device, sonosInstance, events, createEvent, props, region),
    command_playSpotify: async (device, props) =>
      commandPlaySpotify(
        device,
        sonosInstance,
        events,
        createEvent,
        props,
        region
      ),
    command_setName: async (device, props) =>
      commandSetName(device, sonosInstance, events, createEvent, props),
    command_getLEDState: async device =>
      commandGetLEDState(device, sonosInstance, events, createEvent),
    command_setLEDState: async (device, props) =>
      commandSetLEDState(device, sonosInstance, events, createEvent, props),
    command_getCurrentTrack: async device =>
      commandGetCurrentTrack(device, sonosInstance, events, createEvent),
    removeDevice: async deviceId => removeDevice(deviceId)
  };
};
