import React from 'react';
import {Link} from 'react-router-dom'
import {Container,Nav,Navbar,
  NavDropdown,Badge,
  Form,DropdownButton,InputGroup,
  Dropdown,Button} from 'react-bootstrap';
  import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <LinkContainer to='/'>
      <Navbar.Brand href="/">BEST ONLINE SHOP</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">

        <Nav className="me-auto">

        <InputGroup>

        <DropdownButton id="dropdown-basic-button" title="ALL">
      <Dropdown.Item>Electronics</Dropdown.Item>
      <Dropdown.Item>Cars</Dropdown.Item>
      <Dropdown.Item>Books</Dropdown.Item>
        </DropdownButton>

          <Form.Control type='text' placeholder='Search in Shop....' />
          <Button variant='warning'>
            <i className="bi bi-search"></i>
          </Button>
          </InputGroup>
          </Nav>

          <Nav>

            <LinkContainer to='/admin/orders'>
              <Nav.Link>
                Admin
                <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
              </Nav.Link>
            </LinkContainer>

          <NavDropdown title="Yawai" id="collasible-nav-dropdown">
            <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My Orders</NavDropdown.Item>

            <NavDropdown.Item eventKey='/user' as={Link} to="/user">
              My Profile
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item>
              Log Out
            </NavDropdown.Item>

          </NavDropdown>

          <LinkContainer to='/login'>
              <Nav.Link>
                Login
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to='/register'>
              <Nav.Link>
                Register
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to='/cart'>
              <Nav.Link>
              <Badge pill bg='danger'>2</Badge>
                  <i class="bi bi-cart4"></i>
                  <span className="ms-1">CART</span>
              </Nav.Link>
            </LinkContainer>

        </Nav>
       
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header