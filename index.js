const sonos = require("sonos");
const driver = require("./driver");

module.exports = {
  initialise: (settings, updateSettings, commsInterface, events, createEvent) =>
    driver(
      settings,
      updateSettings,
      commsInterface,
      sonos,
      events,
      createEvent
    ),
  driverType: "speaker",
  interface: "http",
  driverId: "thinglator-driver-sonos"
};
