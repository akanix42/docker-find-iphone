import { findmyphone as findIphone } from 'find-my-iphone';
findIphone.apple_id = process.env.ICLOUD_USERNAME;
findIphone.password = process.env.ICLOUD_PASSWORD;

export default function findDevice(deviceName) {
  return new Promise((resolve, reject) => {
    findIphone.getDevices(function (error, devices) {
      if (error) {
        console.error(error);
        reject(error);
      }

      const device = devices.find(device => compareLowerCaseAlphaNumeric(device.name, deviceName));
      if (device) {
        console.log('device', device.id);
        resolve(device.id);
      }
      reject('Device not found');
    });
  });

  function compareLowerCaseAlphaNumeric(a, b) {
    return onlyLowerCaseAlphaNumericOrSpace(a) === onlyLowerCaseAlphaNumericOrSpace(b);
  }

  function onlyLowerCaseAlphaNumericOrSpace(val) {
    return val.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  }
}
