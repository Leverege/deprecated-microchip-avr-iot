# AVR-IoT Quick Start

This repository contains the tutorials and files needed to connect your AVR-IoT device to your own Google Project and deploy a site to Firebase. Once you've completed the tutorial, you'll be all set to view your live data.

Before getting started, you'll need to **create a GCP project and enable billing**, and **create a Firebase project and link it to your GCP project**.

## 1. Create a GCP Project

1. Create (or select an existing) GCP project.

    (Note: Links will open in this window. Shift+click, command+click, or middle mouse click to open in new window or tab.)

    <a href="https://console.cloud.google.com/cloud-resource-manager" target="_blank">GO TO THE MANAGE RESOURCES PAGE</a>

2. Enable billing for the project.

    <a href="https://cloud.google.com/billing/docs/how-to/modify-project" target="_blank">LEARN HOW TO ENABLE BILLING</a>

## 2. Create a Firebase Project

1. Launch the Firebase Console.

    <a href="https://console.firebase.google.com/u/0/" target="_blank">GO TO FIREBASE CONSOLE</a>

2. Select 'Add project'.

    <img src="https://storage.googleapis.com/avr-iot-media/fb-add.png" height="100">

3. In the Project Name field, select the GCP project you created or selected above.

    <img src="https://storage.googleapis.com/avr-iot-media/fb-connect.png" height="100">

4. Click 'Add Firebase'.

## 3. Clone this repo in Cloud shell

1. Open Cloud Shell from your project.

    <img src="https://storage.googleapis.com/avr-iot-media/cloudshell.png" height="80">

2. In the shell, run 

```bash
git clone https://github.com/Leverege/microchip-avr-iot.git
```

3. cd into the microchip-avr-iot directory.
```bash
cd microchip-avr-iot
```

## 4. Run the Quickstart Script

1. In the Cloud Shell, run 

```bash
sh setup.sh
```

2. At the prompt, enter your AVR-IoT device's ID. You can find this by scanning the QR code on your device. 

3. The setup script will run for several minutes.
    The setup script will:
    * Enable Cloud Functions, IoT, and Pub Sub
    * Create an IoT Core registry called AVR-IOT and register your device
    * Install, build, and deploy Cloud Functions and the UI

## 5. Add your devices public key to your IoT Core Registry

1. Make sure your device is connected to your computer via USB.

2. Open your IoT Core registry management page, and select the AVR-IOT registry.

    <a href="https://console.cloud.google.com/iot/registries" target="_blank">OPEN IOT CORE REGISTRY MANAGEMENT</a>

3. Click on your device's ID in the list.

    Because registry entries must begin with a letter **your device ID will be prefixed with a 'd'**. To search for your device by id, you must enter 'd<your_device_id>' in the search box.

4. Click the **Add public key** button.

    <img src="https://storage.googleapis.com/avr-iot-media/iotcore-addpub.png" height="70">

5. Select 'Upload' under the input method, and ES256 (**not** ES256_X509) as the public key format. Then click the **Browse** button.

    <img src="https://storage.googleapis.com/avr-iot-media/iotcore-addauthkey.png" height="150">

6. In the upload window, navigate to the CURIOSITY drive, then select PUBKEY.TXT and click add to upload it. 
    
    <img src="https://storage.googleapis.com/avr-iot-media/iotcore-click-add.png" height="150">

## View your live data!

And that's it! Check out your new Firebase app at \<your-project-id\>.firebaseapp.com/device/\<your-device-id\> to view the live data coming from your device. 
