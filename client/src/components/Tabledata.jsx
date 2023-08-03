import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Card,
  Form,
  Button,
  Pagination,
} from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import "./Tabledata.css";
import { getToken } from "../service/authan";

function Tabledata({
  alldata,
  setAlldata,
  DeleteCustomer,
  EditCustomer,
  multidelete,
  multiChangestatuson,
  multiChangestatusoff,
}) {
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event) => {
    setCurrentPage(Number(event.target.text));
  };
  const itemsPerPage = 5;
  const totalPages = Math.ceil(alldata.length / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;
  const paginatedData = alldata.slice(offset, offset + itemsPerPage);

  //multi delete && status
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelect = (itemId, itemstatus) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDelete = () => {
    multidelete(selectedItems);
  };

  const handleStatusOn = () => {
    multiChangestatuson(selectedItems);
  };

  const handleStatusOff = () => {
    multiChangestatusoff(selectedItems);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Container>
        <Card>
          <Card.Header as="h5">Customers Data</Card.Header>
          <Card.Body>
            <Form>
              {!getToken() ? (
                ""
              ) : (
                <>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Button variant="outline-danger" onClick={handleDelete}>
                        Delete
                      </Button>
                      &nbsp;
                    </div>
                    <div>
                      <Button
                        variant="outline-success"
                        onClick={handleStatusOn}
                      >
                        status : on
                      </Button>
                      &nbsp;
                      <Button
                        variant="outline-danger"
                        onClick={handleStatusOff}
                      >
                        status : off
                      </Button>
                    </div>
                  </div>
                </>
              )}

              <hr />
              <Table striped>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedItems.length === alldata.length}
                        onChange={(e) =>
                          setSelectedItems(
                            e.target.checked
                              ? alldata.map((item) => item.ccode)
                              : []
                          )
                        }
                      />
                    </th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Tel</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {!getToken() ? (
                  ""
                ) : (
                  <tbody>
                    {paginatedData.map((item) => (
                      <tr key={item.ccode}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.ccode)}
                            onChange={() => toggleSelect(item.ccode)}
                          />
                        </td>
                        <td>{item.ccode}</td>
                        <td>{item.cname}</td>
                        <td>{item.cemail}</td>
                        <td>{item.ctel}</td>
                        <td>
                          <Form.Check
                            type="switch"
                            id="toggle-switch"
                            defaultChecked={item.statusdata}
                            disabled
                          />
                        </td>
                        <td>
                          <Button
                            onClick={() => EditCustomer(item.ccode)}
                            variant="warning"
                          >
                            <FiEdit3 style={{ color: "white" }} />
                          </Button>
                        </td>
                        <td>
                          <Button
                            onClick={() => DeleteCustomer(item.ccode)}
                            variant="danger"
                          >
                            <RiDeleteBin6Line />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </Table>
            </Form>

            <div className="paginationcustom">
              {!getToken() ? (
                ""
              ) : (
                <Pagination>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={handlePageChange}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
      <br />
      <br />
    </div>
  );
}

export default Tabledata;
