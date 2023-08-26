import Nav from 'react-bootstrap/Nav';
import { Link} from "react-router-dom";
import '../style/Navbar.css'
function Navbar() {
  return (
    <Nav justify variant="tabs" defaultActiveKey="/home" className="custom-nav">
    <Nav.Item>
      <Nav.Link as={Link} to="/" className="custom-link">
        Home
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={Link} to="/watchList" className="custom-link">
        WatchList
      </Nav.Link>
    </Nav.Item>
  </Nav>
  );
}

export default Navbar;