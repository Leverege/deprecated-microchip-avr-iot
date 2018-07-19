import React from 'react';
import illustration from '../../images/avr-iot-microchip-illustration.png';
import './Overview.less';

export default function Overview( props ) {
  return (
    <section className="overview">
      <section className="overview-body">
        <h3 className="overview-heading">Simplicity</h3>
        <div className="overview-content">
          <div className="overview-text">
            <p>The AVR microcontroller architecture has been widely recognized as one of the most effective choices for embedded control design. Makers and developers worldwide learned to appreciate its power and simplicity through the <a href="https://arduino.cc" target="_blank" className="overview-link">Arduino platform</a><a href="https://www.arduino.cc/en/Guide/Introduction" target="_blank" className="overview-link">(Learn more about Arduino).</a></p>
            <p>Using the power of the <a href="https://microchip.com/start" target="_blank" className="overview-link">AVR START</a> tool, a free, professional, <i>rapid development tool (code generator)</i>, you can now add Google Cloud connectivity to new and existing projects with a click of your mouse.</p>
            <p>No RTOS required, no complex framework knowledge, no fees. With an intuitive (collaborative multitasking)  scheme you can publish your sensor node data and have the powerful Google Cloud analytics tools process it for you. <a href="https://cloud.google.com/products/big-data/" target="_blank" className="overview-link">(Learn more about Google Analytics tools)</a></p>
          </div>
          <div className="overview-image">
            <img src={illustration} />
            {/* <div className="twgt-module" data-twgt-module="b439c4e7-2333-4323-824a-f399a9dcd3e6"/> */}
          </div>
        </div> 
        <h3 className="overview-heading">Security without Compromises</h3>
        <div className="overview-content">
          <div className="overview-image">
            <img src=" https://www.microchip.com/_images/ics/medium-ATECC608A-SOIC-8.png"/>
          </div>
          <div className="overview-text">
              <p>By leveraging the power the ATECC608A Secure Element we make no compromises on the design security. Keep your private keys private, offload complex Eliptic Curve cryptography for maximum power efficiently and simply enable your microcontroller of choice to communicate securely with the <a href="https://cloud.google.com/" target="_blank" className="overview-link">Google Cloud.</a></p>
              <p>For your ultimate convenience we offer pre-configured secure element (ATECC608A) ready for use with the Google Cloud out of the box.</p> 
          </div>
        </div>
        <h3 className="overview-heading">Connectivity</h3>
        <div className="overview-content">
          <div className="overview-text">
            <p>The <a href="https://www.microchip.com/design-centers/wireless-connectivity/embedded-wi-fi/wi-fi-controller" target="_blank" className="overview-link">Microchip WiFi Network Controllers </a>offer a complete solution for wireless connectivity. These smart modules support the complete TCP/IP stack and can authenticate your servers connection to the Google Cloud <a href="#" target="_blank" className="overview-link">automatically.</a></p>
            <p>Google IoT Core Cloud uses the popular MQTT publish subscribe mechanism, but employs a clever security mechanism based on the JSON Web Token (or JWT) to make the authentication/login process efficient even on the smallest 8-bit microcontroller architectures.</p>
            <p>You won’t need to become an expert of networking protocols or risk compromising your application security, AVR START will connect your application to the Google Cloud IoT Core securely and automatically <a href="https://www.microchip.com/wwwproducts/en/ATWINC1500" target="_blank" className="overview-link">(Learn more about the WINC1510 Network Controller)</a>.</p>
          </div>
          <div className="overview-image">
            <img src="https://www.microchip.com/_images/ics/medium-ATWINC1500-MODULE-28.png"/>
          </div>
        </div>
      </section>
    </section>      
  )
}
