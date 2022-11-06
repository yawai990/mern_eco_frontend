import React from 'react';
import { Row,Col } from 'react-bootstrap';
import { AdminLinks,AdminChatRom } from '../../components';

const AdminChat = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <Row>
        <AdminChatRom />
        </Row>
      </Col>
    </Row>
  )
}

export default AdminChat