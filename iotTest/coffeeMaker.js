"use strict";
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')


// Use the Azure IoT device SDK for devices that connect to Azure IoT Central
var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

// Connection string (TODO: CHANGE HERE)
const connectionString = `HostName=iotc-8819648e-7150-461a-8a56-4c3d27d3dc3d.azure-devices.net;DeviceId=ae47fe70-a84e-474f-bf3d-c18b871b971c;SharedAccessKey=bMP3w3/X5umznu5JjxzIhFeqkvDd2u4BVy8z+iMrl74=`;

// Global variables
var client = clientFromConnectionString(connectionString);
var optimalTemperature = 96;
var cupState = true;
var brewingState = false;
var cupTimer = 20;
var brewingTimer = 0;
var maintenanceState = false;
var warrantyState = Math.random() < 0.5?0:1

// Show the information in console
var infoTemperature
var infoHumidity
var infoCup
var infoBrewing
var infoMaintenance

var app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {

    var body = {
      infoTemperature,
      infoHumidity,
      infoCup,
      infoBrewing,
      infoMaintenance,
    }
    res.status(200).send(body);
  });

app.post("/postname", (req,res)=>{
  console.log(req.body);
 res.status(200).send('from app.post')
})
var server = app.listen(8080, function () {
    console.log("app running on port.", server.address().port);
});

// Helper function to produce nice numbers (##.#)
function niceNumber(value)
{
    var number = (Math.round(value * 10.0)).toString();
    return number.substr(0, 2) + '.' + number.substr(2, 1);
}

// Send device simulated telemetry measurements
function sendTelemetry()
{
    // Simulate the telemetry values
    var temperature = optimalTemperature + (Math.random() * 4) - 2;
    var humidity = 20 + (Math.random() * 80);

    // Cup timer - every 20 seconds randomly decide if the cup is present or not
    cupTimer--;

    if (cupTimer == 0)
    {
        cupTimer = 20;
        cupState = Math.random() < 0.5?false:true;
    }

    // Brewing timer
    if (brewingTimer > 0)
    {
        brewingTimer--;

        // Finished brewing
        if (brewingTimer == 0)
        {
            brewingState = false;
        }
    }

    // Create the data JSON package
    var data = JSON.stringify(
    {
        waterTemperature: temperature,
        airHumidity: humidity,
    });

    // Create the message with the above defined data
    var message = new Message(data);

    // Set the state flags
    message.properties.add('stateCupDetected', cupState);
    message.properties.add('stateBrewing', brewingState);

    // Show the information in console
    infoTemperature = niceNumber(temperature);
    infoHumidity = niceNumber(humidity);
    infoCup = cupState ? 'Y' :'N';
    infoBrewing = brewingState ? 'Y':'N';
    infoMaintenance = maintenanceState ? 'Y':'N';

    console.log('Telemetry send: Temperature: ' + infoTemperature +
                ' Humidity: ' + infoHumidity + '%' +
                ' Cup Detected: ' + infoCup +
                ' Brewing: ' + infoBrewing +
                ' Maintenance Mode: ' + infoMaintenance);

    // Send the message
    client.sendEvent(message, function (errorMessage)
    {
        // Error
        if (errorMessage)
        {
            console.log('Failed to send message to Azure IoT Hub: ${err.toString()}');
        }
    });
}


// Send device properties
function sendDeviceProperties(deviceTwin)
{
    var properties =
    {
        propertyWarrantyExpired: warrantyState
    };

    console.log(' * Property - Warranty State: ' + warrantyState.toString());

    deviceTwin.properties.reported.update(properties, (errorMessage) =>
        console.log(` * Sent device properties ` + (errorMessage ? `Error: ${errorMessage.toString()}` : `(success)`)));
}

// Optimal temperature setting
var settings =
{
    'setTemperature': (newValue, callback) =>
    {
        setTimeout(() =>
        {
            optimalTemperature = newValue;
            callback(optimalTemperature, 'completed');
        }, 1000);
    }
};

// Handle settings changes that come from Azure IoT Central via the device twin.
function handleSettings(deviceTwin)
{
    deviceTwin.on('properties.desired', function (desiredChange)
    {
        // Iterate all settings looking for the defined one
        for (let setting in desiredChange)
        {
            // Setting we defined
            if (settings[setting])
            {
                // Console info
                console.log(` * Received setting: ${setting}: ${desiredChange[setting].value}`);

                // Update
                settings[setting](desiredChange[setting].value, (newValue, status, message) =>
                {
                    var patch =
                    {
                        [setting]:
                        {
                            value: newValue,
                            status: status,
                            desiredVersion: desiredChange.$version,
                            message: message
                        }
                    }
                    deviceTwin.properties.reported.update(patch, (err) => console.log(` * Sent setting update for ${setting} ` +
                    (err ? `error: ${err.toString()}` : `(success)`)));
                });
            }
        }
    });
}

// Maintenance mode command
function onCommandMaintenance(request, response)
{
    // Display console info
    console.log(' * Maintenance command received');

    // Console warning
    if (maintenanceState)
    {
        console.log(' - Warning: The device is already in the maintenance mode.');
    }

    // Set state
    maintenanceState = true;

    // Respond
    response.send(200, 'Success', function (errorMessage)
    {
        // Failure
        if (errorMessage)
        {
            console.error('[IoT hub Client] Failed sending a method response:\n' + errorMessage.message);
        }
    });
}

function onCommandStartBrewing(request, response)
{
    // Display console info
    console.log(' * Brewing command received');

    // Console warning
    if (brewingState == true)
    {
        console.log(' - Warning: The device is already brewing.');
    }

    if (cupState == false)
    {
        console.log(' - Warning: The cup has not been detected.');
    }

    if (maintenanceState == true)
    {
        console.log(' - Warning: The device is in maintenance state.');
    }

    // Set state - brew for 30 seconds
    if ((cupState == true) && (brewingState == false) && (maintenanceState == false))
    {
        brewingState = true;
        brewingTimer = 30;
    }

    // Respond
    response.send(200, 'Success', function (errorMessage)
    {
        // Failure
        if (errorMessage)
        {
            console.error('[IoT hub Client] Failed sending a method response:\n' + errorMessage.message);
        }
    });
}


// Handle device connection to Azure IoT Central
var connectCallback = (errorMessage) =>
{
    // Connection error
    if (errorMessage)
    {
        console.log(`Device could not connect to Azure IoT Central: ${errorMessage.toString()}`);
    }
    // Successfully connected
    else
    {
        // Notify the user
        console.log('Device successfully connected to Azure IoT Central');

        // Send telemetry measurements to Azure IoT Central every 1 second.
        setInterval(sendTelemetry, 1000);

        // Set up device command callbacks
        client.onDeviceMethod('cmdSetMaintenance', onCommandMaintenance);
        client.onDeviceMethod('cmdStartBrewing', onCommandStartBrewing);

        // Get device twin from Azure IoT Central
        client.getTwin((errorMessage, deviceTwin) =>
        {
            // Failed to retrieve device twin
            if (errorMessage)
            {
                console.log(`Error getting device twin: ${errorMessage.toString()}`);
            }
            // Success
            else
            {
                // Notify the user
                console.log('Device Twin successfully retrieved from Azure IoT Central');

                // Send device properties once on device startup
                sendDeviceProperties(deviceTwin);

                // Apply device settings and handle changes to device settings
                handleSettings(deviceTwin);
            }
        });
    }
};

// Start the device (connect it to Azure IoT Central)
client.open(connectCallback);
