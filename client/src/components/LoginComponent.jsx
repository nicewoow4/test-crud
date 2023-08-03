import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getToken } from "../service/authan";
function LoginComponent() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const { username, password } = login;
  const valueLogin = (data) => (event) => {
    setLogin({ ...login, [data]: event.target.value });
  };

  const history = useNavigate();
  const Submitlogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/login`,
        { username, password }
      );
      Swal.fire({
        icon: "success",
        text: "Login success",
        confirmButtonColor: "#2D7F55",
      });
      console.log(response);
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      sessionStorage.setItem(
        "username",
        JSON.stringify(response.data.username)
      );
      history(`/home`);
      window.location.reload(false)
      // console.table({username,password})
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.response.data.error,
        confirmButtonColor: "#EF1717",
      });
    }
  };

  
  useEffect(()=>{
    getToken() && history(`/home`);
  })
  
  return (
    <div>
      <Container>
        <Row className=" d-flex justify-content-center">
          <Col md={12} lg={7} xs={12}>
            <div>
              <div className="mb-6 mt-5">
                <h3 style={{ textAlign: "center" }}>Login</h3>
                <div className="mb-3 ">
                  <Form onSubmit={Submitlogin}>
                    <Form.Group className="mb-3">
                      <label htmlFor="text" style={{ textAlign: "end" }}>
                        Username
                      </label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={valueLogin("username")}
                        style={{
                          backgroundColor: "whitesmoke",
                          color: "black",
                          borderRadius: "5px",
                          marginTop: "10px",
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <label htmlFor="password" style={{ textAlign: "end" }}>
                        Password
                      </label>
                      <br />
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={valueLogin("password")}
                        style={{
                          backgroundColor: "whitesmoke",
                          color: "black",
                          borderRadius: "5px",
                          marginTop: "10px",
                        }}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                      <Button
                        variant="success"
                        type="submit"
                        style={{ marginTop: "10px" }}
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginComponent;
