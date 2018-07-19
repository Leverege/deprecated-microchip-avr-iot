# Quick setup for AVR-IoT

## Prerequisites
Before getting started with the console, you'll need to **create a GCP project and enable billing**, and **create a Firebase project and link it to your GCP project**.

### 1. Create a GCP Project

1. Create (or select an existing) GCP project

    [GO TO THE MANAGE RESOURCES PAGE](https://console.cloud.google.com/cloud-resource-manager)

2. Enable billing for the project

    [LEARN HOW TO ENABLE BILLING](https://cloud.google.com/billing/docs/how-to/modify-project)

3. Make note of your project ID

    Your project ID is not necessarily the same as your project name. It is typically your project name in all lowercase, with dashes instead of spaces. So a project named "Demo Project" might become "demo-project."

    <img src="https://storage.googleapis.com/avr-iot-media/project-id.png">

### 2. Create a Firebase Project

1. Launch the Firebase Console

    [GO TO FIREBASE CONSOLE](https://console.firebase.google.com/u/0/)

2. Select Add project

3. In the Project Name field, select the GCP project you created or selected above

4. Click 'Add Firebase'

## Run the setup script

In the Cloud Console, run:

```bash
sh setup.sh
```

## At the prompt, enter your AVR-IoT device's ID 

You can find this by scanning the QR code on your device. 

### The setup script will run for several minutes

The setup script will:
* Enable Cloud Functions, IoT, and Pub Sub
* Create an IoT Core registry called AVR-IOT and register your device
* Install, build, and deploy Cloud Functions and the UI

### Once the setup script completes, click the Continue button below 

After everything is deployed it's time to add your AVR-IoT device's public key to its entry in your IoT Core registry.

## Add the devices public key to the registry

Your AVR-IoT device has built-in hardware security. This means you'll need to add its public key to its entry in the IoT Core registry before you'll be able to decode the information coming from the device. 

### Navigate to your device in the IoT Core registry 

1. Make sure your device is connected to your computer via USB

2. Open your IoT Core registry management page, and select the AVR-IOT registry.

    [OPEN IOT CORE REGISTRY MANAGEMENT](https://console.cloud.google.com/iot/registries)

3. Click on your device's ID in the list 

Because registry entries must beging with a letter **your device ID will be prefixed with a 'd'**. To search for you device by id, you must enter 'd<your_device_id>' in the search box.

### Add your public key

4. Click the **Add public key** button

<img src="https://storage.googleapis.com/avr-iot-media/iotcore-addpub.png" height="70">

5. Select 'Upload' under the input method, and ES256 (**not** ES256_X509) as the public key format. Then click the **Browse** button.

<img src="https://storage.googleapis.com/avr-iot-media/iotcore-addauthkey.png" height="150">

6. In the upload window, navigate to the CURIOSITY drive, then select PUBKEY.TXT and upload it. 

## View your live data!

And that's it! Check out your new Firebase app to view the live data coming from your device. 
