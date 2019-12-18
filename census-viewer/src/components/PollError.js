import React, { useState } from "react";
import { Alert } from "react-bootstrap";

export default function PollError(props) {
  const { err } = props;

  return (
    <Alert variant="danger">
      <Alert.Heading>Error polling API</Alert.Heading>
      <p>There was an error polling the API. That sucks!</p>
      <p>{err}</p>
    </Alert>
  );
}