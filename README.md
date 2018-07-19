# AVR-IoT Quick Start

This repository contains the tutorials and files needed to connect your AVR-IoT device to your own Google Project and deploy a site to Firebase. Once you've completed the tutorial, you'll be all set to view your live data.

Before getting started, you'll need to **create a GCP project and enable billing**, and **create a Firebase project and link it to your GCP project**.

## 1. Create a GCP Project

1. Create (or select an existing) GCP project

    [GO TO THE MANAGE RESOURCES PAGE](https://console.cloud.google.com/cloud-resource-manager)

2. Enable billing for the project

    [LEARN HOW TO ENABLE BILLING](https://cloud.google.com/billing/docs/how-to/modify-project)

3. Make note of your project ID

    Your project ID is not necessarily the same as your project name. It is typically your project name in all lowercase, with dashes instead of spaces. So a project named "Demo Project" might become "demo-project."

<img src="https://storage.googleapis.com/avr-iot-media/project-id.png" width="500">

## 2. Create a Firebase Project

1. Launch the Firebase Console

    [GO TO FIREBASE CONSOLE](https://console.firebase.google.com/u/0/)

2. Select 'Add project'

<img src="https://storage.googleapis.com/avr-iot-media/fb-add.png" height="100">

3. In the Project Name field, select the GCP project you created or selected above

<img src="https://storage.googleapis.com/avr-iot-media/fb-connect.png" height="100">

4. Click 'Add Firebase'

## 3. Run the Quickstart Script

That's it for prerequisites! Click the button below to clone this repo into your project, and follow the Cloud Shell tutorials to complete your deployment. 

[![Open this project in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.png)](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/Leverege/microchip-avr-iot&tutorial=tutorial.md)

**If you have already completed part of this process and need to resume:**
You can restart the tutorial by running:

```bash
teachme tutorial.md
```

in the Cloud Shell.
