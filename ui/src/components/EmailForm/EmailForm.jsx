import React from 'react';
import Input from 'muicss/lib/react/input';
import Form from 'muicss/lib/react/form';
import Button from '../Button/Button';

import './EmailForm.less';

export default function EmailForm(props) {
  return (
    <Form id="email-form" action="https://formspree.io/avr-iot@microchip.com" method="POST">
      <Input floatingLabel={true} label="Name" type="text" name="name" required={true}/>
      <Input floatingLabel={true} label="Email" type="email" name="_replyto" required={true} />
      <Button className="welcome-right-button" text="Register" type="button" />
    </Form>
  )
}