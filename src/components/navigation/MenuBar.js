import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './MenuBar.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Logo from '../../assets/logo.png';


function MenuBar() {
  return (
    <Navbar className="color-nav" collapseOnSelect expand="lg" variant="light" style={{padding: 20}}>
      <Container fluid>
        <Navbar.Brand><Link to="/" style={{textDecoration: 'none', color: 'white'}}><img src={Logo} width="50"/>&nbsp;GradingSite</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link style={{textAlign: 'right'}} href="/my-assignments"><span to="/my-assignments" style={{textDecoration: 'none', color: 'white'}}>My Assignments</span></Nav.Link>
          <Nav.Link style={{textAlign: 'right'}} href="/discover"><span to="/discover" style={{textDecoration: 'none', color: 'white'}}>Discover</span></Nav.Link>
          <button class="sign-in-button"> Sign in </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuBar;