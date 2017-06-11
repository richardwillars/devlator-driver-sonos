const chai = require('chai');
const driverTests = require('thinglator/utils/testDriver');

const expect = chai.expect; // eslint-disable-line no-unused-vars

const driverName = 'sonos';
const driverType = 'speaker';
const driverInterface = 'http';

const Driver = require('../index');

driverTests(driverName, Driver, driverType, driverInterface, expect);
