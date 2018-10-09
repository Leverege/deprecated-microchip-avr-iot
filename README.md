<p align="center">
    <a href="https://www.microchip.com/">
        <img src="https://storage.googleapis.com/avr-iot-media/microchip_round_logo.png" alt="Microchip logo" width=72 height=72 />
    </a>
    <a href="https://cloud.google.com/">
        <img src="https://storage.googleapis.com/avr-iot-media/cloud-logo.png" alt="GCP Logo" width=91 height=72 />
    </a>
    <a href="https://www.leverege.com">
        <img src="https://storage.googleapis.com/avr-iot-media/lvg-logo.png" alt="Leverege logo" width=72 height=72 />
    </a>
    <h2 align="center">AVR-IoT Quick Start</h2>
    <p align="center">
        A rapid deployment tool for getting your AVR-IoT data on the cloud. Powered by Leverege.
        <br>
        <a href="https://www.leverege.com/contact-us"><strong>Talk to an Expert »</strong></a>
        <br>
        <br>
    </p>
</p>

(Links will open in this window. Shift+click, command+click, or middle mouse click to open in new window or tab.)

## Table of Contents
1. [Set up your GCP and Firebase Projects](#set-up-your-gcp-and-firebase-projects)
2. [Clone this repo in Cloud shell](#clone-this-repo-in-cloud-shell)
3. [Run the Quickstart Script](#run-the-quickstart-script)
4. [Add your devices public key to your IoT Core Registry](#add-your-device-public-key-to-your-iot-core-registry)
5. [Update your AVR-IoT device firmware](#update-your-avr-iot-device-firmware)

##

This repository contains resources for quickly connecting your [AVR-IoT device](https://avr-iot.com/) to your own Google Project and deploying a live UI to Firebase.

Following this guide, you will clone this repo into your Google Cloud project, and run a script that:
* enables [Cloud Functions](https://cloud.google.com/functions/docs/), [Cloud IoT Core](https://cloud.google.com/iot-core/), and [Pub/Sub](https://cloud.google.com/pubsub/), 
* creates an `avr-iot` Pub/Sub topic,
* creates an IoT registry (default name: `AVR-IOT`, configurable in the script),
* adds your device's UID to the registry,
* builds and deploys a Cloud Function to route Pub/Sub messages to your [Firebase project](https://firebase.google.com/), and
* builds and deploys a UI to firebase.

After running the quick
script, you'll need to add your device's secure pubkey to the device's entry in your IoT core registry and update the firmware on your device using Atmel START and Atmel Studio. 

## Set up your GCP and Firebase Projects

The quickstart requires that you have a Firebase project connected to a GCP project will billing enabled.

### GCP Project

1. Create (or select an existing) GCP project.    

    <a href="https://console.cloud.google.com/cloud-resource-manager" target="_blank">GO TO THE MANAGE RESOURCES PAGE</a>

2. Enable billing for the project.

    <a href="https://cloud.google.com/billing/docs/how-to/modify-project" target="_blank">LEARN HOW TO ENABLE BILLING</a>

### Firebase Project

1. Launch the Firebase Console.

    <a href="https://console.firebase.google.com/u/0/" target="_blank">GO TO FIREBASE CONSOLE</a>

2. Select 'Add project'.

    <img src="https://storage.googleapis.com/avr-iot-media/fb-add.png" height="100">

3. In the Project Name field, select the GCP project you created or selected above.

    <img src="https://storage.googleapis.com/avr-iot-media/fb-connect.png" height="100">

4. Click 'Add Firebase'.

## Clone this repo in Cloud shell

1. Open Cloud Shell from your project.

    <img src="https://storage.googleapis.com/avr-iot-media/cloudshell.png" height="80">

2. In the shell, run 

```bash
git clone https://github.com/Leverege/microchip-avr-iot.git && cd microchip-avr-iot && bash setup.sh
```

   to clone this repo, enter the newly created directory, and run the quickstart script.

## Run the Quickstart Script

1. At the prompt, enter your AVR-IoT device's UID. Your device's UID is the last portion of the url you see after launching CLICK-ME.HTM from the device. 

    <img src="https://storage.googleapis.com/avr-iot-media/device_uid.png" height="30">

2. If you would like to customize your IOT Core registry name, you may do so at the IoT core registry name prompt.

    IoT core registry names must start with a letter, use only letters, numbers, hyphens, and the following characters:

        + . % _ ~

3. The setup script will run for several minutes.
    The setup script will:
    * Enable Cloud Functions, IoT, and Pub Sub
    * Create an IoT Core registry called AVR-IOT and register your device
    * Install, build, and deploy Cloud Functions and the UI

## Add your device public key to your IoT Core Registry

1. Make sure your device is connected to your computer via USB.

2. Open your IoT Core registry management page, and select the AVR-IOT registry.

    <a href="https://console.cloud.google.com/iot/registries" target="_blank">OPEN IOT CORE REGISTRY MANAGEMENT</a>

3. Click on your device's UID in the list.

    Because registry entries must begin with a letter **your device UID will be prefixed with a 'd'**. To search for your device by uid, you must enter 'd<your_device_id>' in the search box.

4. Click the **Add public key** button.

    <img src="https://storage.googleapis.com/avr-iot-media/iotcore-addpub.png" height="70">

5. Select 'Upload' under the input method, and ES256 (**not** ES256_X509) as the public key format. Then click the **Browse** button.

    <img src="https://storage.googleapis.com/avr-iot-media/iotcore-addauthkey.png" height="150">

6. In the upload window, navigate to the CURIOSITY drive, then select PUBKEY.TXT and click add to upload it. 
    
    <img src="https://storage.googleapis.com/avr-iot-media/iotcore-click-add.png" height="150">
    
## Update your AVR-IoT device firmware

1. Navigate to the <a href="http://start.atmel.com/" target="_blank">Atmel START Rapid Development Tool</a>. Please note that this software is Windows only. 

2. Click the **Browse Example** button. 
    
    <img src="https://storage.googleapis.com/avr-iot-media/Microchip%20Assets/Atmel-START-browse.png" height="150">
    
3. Search for **ATMEGA4808** and select **AVR IoT WG Sensor Node**.

    <img src="https://storage.googleapis.com/avr-iot-media/Microchip%20Assets/START-search.png" height="150">
    
4. Click on **Open Example**.
    
    <img src="https://storage.googleapis.com/avr-iot-media/Microchip%20Assets/START-open-example.png" height="75">
    
5. Scroll down to the Cloud Configuration section, and enter your GCP Project ID and Registry ID. Under the WLAN Configuration section, enter in your WiFi credentials. Note: the network **mus** be 2.4Ghz as the device cannot connect to 5.0 Ghz networks. 

    <img src="https://storage.googleapis.com/avr-iot-media/Microchip%20Assets/START-cloudconfig.png" height="225">
    
6. Switch to the **Export Project** tab and click on **Download Pack**.

    <img src="https://storage.googleapis.com/avr-iot-media/Microchip%20Assets/START-export-dl.png" height="300">

7. Open the .atzip file in Atmel Studio and select **Build Solution** under the Build menu bar (or hit F7). Atmel Studio will generate a .hex file in the folder where you saved your project. 
   
   <img src="https://storage.googleapis.com/avr-iot-media/Microchip%20Assets/Atmel-build-solution.png" height="225">

   By default, it will be located in ..\Atmel_Studio\7.0\\<YourProjectName\>\\<YourProjectName\>\Debug 

8. Drag and drop the .hex project file into your CURIOSITY drive.

## View your live data!

And that's it! If you've edited your device with the Atmel START rapid development tool, you should see live data flowing to your new Firebase app at \<your-project-id\>.firebaseapp.com/device/\<your-device-uid\>. 

## Building a solution at scale? 
<p align="center"> 
       Whether you're a Fortune 500 company or startup, transforming your current business or creating entirely new businesses, it takes a team with deep experience across verticals and use cases to turn your IoT prototype into an IoT product.
</p>

<p align="center"> 
        Want to build something bigger? We can help you scale your projects into solutions. [Talk to an IoT expert.](https://www.leverege.com/contact-us) 
</p>

