import React from 'react';
import { Modal } from 'react-bootstrap';

export default function AddSupervisorModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a Supervisor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={4}>
              Name
            </Col>
            <Col md={8}>
              <input type="text"/>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};