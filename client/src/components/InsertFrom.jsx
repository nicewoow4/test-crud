import React, { useState } from "react";
import { Button, Form, Container, Card, Row, Col } from "react-bootstrap";
import "./InsertFrom.css";
import Swal from "sweetalert2";

function InsertFrom({
  newCustomer,
  editId,
  cancleUpdate,
  cdata,
  setCdata,
  UpdateCustomer,
}) {
  const { ccode, cname, cemail, ctel, id } = cdata;

  const customerdata = (data) => (e) => {
    setCdata({ ...cdata, [data]: e.target.value });
  };

  // Validation From
  const [errorccode, setErrorccode] = useState("");
  const [errorcname, setErrorcname] = useState("");
  const [errorcemail, setErrorcemail] = useState("");
  const [errorctel, setErrorctel] = useState("");

  const [ccodecolor, setCcodecolor] = useState("");
  const [cnamecolor, setCnamecolor] = useState("");
  const [cemailcolor, setCemailcolor] = useState("");
  const [ctelcolor, setCtelcolor] = useState("");

  const submitValue = (e) => {
    console.log(ccode);
    e.preventDefault();

    //validation ccode
    if (ccode) {
      setErrorccode("");
      setCcodecolor("green");
    } else {
      setErrorccode("Please enter customer code !");
      setCcodecolor("red");
    }

    //validation cname
    if (cname) {
      setErrorcname("");
      setCnamecolor("green");
    } else {
      setErrorcname("Please enter customer name !");
      setCnamecolor("red");
    }
    // newCustomer(cdata);

    //validation cemail
    if (cemail.includes("@")) {
      setErrorcemail("");
      setCemailcolor("green");
    } else {
      setErrorcemail("Invalid email format !");
      setCemailcolor("red");
    }

    //validation ctel
    if (ctel.length === 10) {
      setErrorctel("");
      setCtelcolor("green");
    } else {
      setErrorctel("Please enter 10-digit telephone number !");
      setCtelcolor("red");
    }

    newCustomer(cdata);
  };

  const updateValue = (e) => {
    e.preventDefault();
    const updatedata = {
      id: id,
      ccode: ccode,
      cname: cname,
      cemail: cemail,
      ctel: ctel,
    };
    UpdateCustomer(updatedata);
  };

  return (
    <div>
      <Container>
        <div style={{ margin: "50px", textAlign: "center" }}>
          <h3>ข้อมูลลูกค้า</h3>
        </div>
        <Card>
          <Card.Header as="h5">เพิ่มข้อมูลลูกค้า</Card.Header>
          <Card.Body>
            <Form onSubmit={editId ? updateValue : submitValue}>
              <Row>
                <Col sm={12} md={6} lg={3}>
                  <label htmlFor="">Customer Code</label>
                  <Form.Control
                    type="text"
                    name="code"
                    value={ccode}
                    onChange={customerdata("ccode")}
                    style={{ borderColor: ccodecolor }}
                  />
                  <small style={{ color: ccodecolor }}>{errorccode}</small>
                </Col>
                <Col sm={12} md={6} lg={3}>
                  <label htmlFor="">Customer Name</label>
                  <Form.Control
                    type="text"
                    name="cname"
                    value={cname}
                    onChange={customerdata("cname")}
                    style={{ borderColor: cnamecolor }}
                  />
                  <small style={{ color: cnamecolor }}>
                    {errorcname}
                  </small>
                </Col>
                <Col sm={12} md={6} lg={3}>
                  <label htmlFor="">Customer Email</label>
                  <Form.Control
                    type="text"
                    name="cemail"
                    value={cemail}
                    onChange={customerdata("cemail")}
                    style={{ borderColor: cemailcolor }}
                  />
                  <small style={{ color: cemailcolor }}>
                    {errorcemail}
                  </small>
                </Col>
                <Col sm={12} md={6} lg={3}>
                  <label htmlFor="">Customer Tel</label>
                  <Form.Control
                    type="text"
                    name="ctel"
                    value={ctel}
                    onChange={customerdata("ctel")}
                    style={{ borderColor: ctelcolor }}
                  />
                  <small style={{ color: ctelcolor }}>{errorctel}</small>
                </Col>
                {editId ? (
                  <Col sm={12} md={6} lg={3}>
                    <Form.Control
                      type="hidden"
                      name="id"
                      value={id}
                      onChange={customerdata("id")}
                    />
                  </Col>
                ) : undefined}
              </Row>
              <br />
              <div>
                {editId ? (
                  <div>
                    <Button variant="warning" on type="submit">
                      Update
                    </Button>
                    &nbsp;
                    <Button variant="danger" onClick={() => cancleUpdate()}>
                      Cancle
                    </Button>
                  </div>
                ) : (
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default InsertFrom;
