import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbartop.css"
import { getToken } from "../service/authan";
function Navbartop() {
  
  //const token = sessionStorage.token
  //console.log(token)

  const history = useNavigate();
  const logout= () =>{
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    history(`/`);
    window.location.reload(false)
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between shadow" >
        <Container>
          
            <div>
              <Navbar.Brand><Link to={"/home"}>C U S T O M E R</Link></Navbar.Brand>
            </div>

            <div>
              <Nav>
                <Nav.Link>
                  {!getToken() ?  <Link to={"/"}>Login</Link> :  <a onClick={logout}>Logout</a>}
                
                  </Nav.Link>
              </Nav>
            </div>
         
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbartop;
