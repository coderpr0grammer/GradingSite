import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './MenuBar.css';
import { Link } from 'react-router-dom';

function MenuBar() {
  return (
    <Navbar className="color-nav" collapseOnSelect expand="lg" variant="light" style={{padding: 20}}>
      <Container fluid>
        <Navbar.Brand><Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>GradingSite</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
          <Nav.Link style={{textAlign: 'left'}} href="/my-assignments"><span to="/my-assignments" style={{textDecoration: 'none', color: 'grey'}}>My assignments</span></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuBar;