import { Nav,Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch } from 'react-redux';
import { logout } from "../../redux/actions/user";

const links = [
    'orders','products','userslist','chats','analytics','logout'
]

const AdminLinks = () => {
  const dispatch = useDispatch();
  
  const handleLogout = () =>dispatch(logout())
  return (
    <Navbar bg='light' variant="light">
    <Nav className="flex-column">
        {
            links.map((link,ind)=>(
                    link === 'logout' ? 
                    <Nav.Link key={link + ind} className="text-capitalize" onClick={handleLogout}>{link}</Nav.Link>:
                    <LinkContainer to={`/admin/${link}`} key={link + ind}>
                    <Nav.Link className="text-capitalize">{link}</Nav.Link>
                    </LinkContainer>
            ))
        }
    </Nav>
    </Navbar>
  )
}

export default AdminLinks