#thinglator-driver-sonos

Allows the Thinglator platform to control Sonos speakers on your local network.

## Requirements

* node.js
* Thinglator - https://github.com/richardwillars/thinglator
* Ethernet or WiFi (to talk to the Sonos speakers on your local network)

## Installation for usage

Navigate to the root of your Thinglator installation and run:

> yarn add thinglator-driver-sonos

> yarn dev

# Installation for development

Navigate to the root of the thinglator-driver-sonos project and run:

> yarn install

> yarn link

Navigate to the root of your Thinglator installation and run:

> yarn add thinglator-driver-sonos

Go to the thinglator project and run:

> yarn link thinglator-driver-sonos

This will point thinglator/node_modules/thinglator-driver-sonos to the directory where you just installed thinglator-driver-sonos. This makes it easier for development and testing of the module.

> yarn dev

## Test

> yarn test
> or
> yarn test:watch
