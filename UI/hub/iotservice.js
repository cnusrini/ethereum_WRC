

import client from 'azure-iot-device-mqtt'
import Message from 'azure-iot-device'

const connectionString = `HostName=iotc-8819648e-7150-461a-8a56-4c3d27d3dc3d.azure-devices.net;DeviceId=ae47fe70-a84e-474f-bf3d-c18b871b971c;SharedAccessKey=bMP3w3/X5umznu5JjxzIhFeqkvDd2u4BVy8z+iMrl74=`;
const clientFromConnectionString = client.clientFromConnectionString;
// Global variables
const clientConnection = clientFromConnectionString(connectionString);
const connectCallback = (errorMessage) =>{
const connStatus = false
  if (errorMessage)
  {
      console.log(`Device could not connect to Azure IoT Central: ${errorMessage.toString()}`);
      return connStatus = true;
  }
  // Successfully connected
  else
  {
      // Notify the user
      console.log('Device successfully connected to Azure IoT Central');
      return connStatus = false

  }

}
const status = clientConnection.open(connectCallback)

export {status}
