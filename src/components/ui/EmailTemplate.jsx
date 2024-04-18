import { Html } from "@react-email/html";
import { Button } from "@react-email/button";
import { Text } from "@react-email/components";

import React from "react";

const EmailTemplate = (props) => {
  const { url, name } = props;

  return (
    <Html lang="en">
      <Text>A new Ticket has been created by {name}.</Text>
      <Text>
        Click
        <Button href={url}> Here </Button> to see the ticket
      </Text>
    </Html>
  );
};

export default EmailTemplate;
