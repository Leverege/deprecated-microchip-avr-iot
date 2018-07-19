#!/bin/bash
CLOUD_REGION=us-central1

echo
echo Welcome to the AVR-IoT interactive quick setup
echo

# get device name, project name and device public key from user
echo
read -p 'Please enter device ID: ' DEVICE_ID
echo

# set the project and tell firebase to use it firebase
gcloud config set project $GOOGLE_CLOUD_PROJECT
firebase use $GOOGLE_CLOUD_PROJECT

# enable cloud functions, IoT core, and pub sub
gcloud services enable cloudfunctions.googleapis.com cloudiot.googleapis.com pubsub.googleapis.com

# create pubsub topic
gcloud pubsub topics create avr-iot

# create IoT core device registry
gcloud iot registries create AVR-IOT --region=$CLOUD_REGION --event-notification-config=topic=avr-iot

# add device to registry
gcloud iot devices create "d$DEVICE_ID" --region=$CLOUD_REGION --registry=AVR-IOT

#install npm dependencies
# TODO: check relative paths after clone in shell
echo Installing Cloud Function dependencies \(this may take a few minutes\)...
npm install --prefix ./functions/
echo Installing UI dependencies \(this may take a few minutes\)...
npm install --prefix ./ui/

# build UI
echo Creating a production build of the UI \(this may take a few minute\)...
npm run build --prefix ./ui

# retrieve UI config vars 
firebase setup:web > config.txt
node getFirebaseConfig.js config.txt

firebase deploy --only functions:recordMessage
firebase deploy --only database
firebase deploy --only hosting

echo Setup complete! Don\'t forget to add your device\'s public key in the registry: https://console.cloud.google.com/iot/registries