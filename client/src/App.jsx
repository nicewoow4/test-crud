import { useEffect, useState } from "react";
import "./App.css";
import Navbartop from "./components/Navbartop";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Insertdata from "./pages/Insertdata";
import Tabledata from "./components/Tabledata";
import axios from "axios";
import Swal from "sweetalert2";
import Login from "./pages/Login";
import { getToken } from "./service/authan";
function App(props) {
  const [alldata, setAlldata] = useState([]);

  //Insert From
  const [cdata, setCdata] = useState({
    ccode: "",
    cname: "",
    cemail: "",
    ctel: "",
  });

  //Get all data
  const getCustomers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/datacustomers`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setAlldata(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);

  //InsertCustomer
  const newCustomer = async (newdata) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/insertcustomer`,
        newdata,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      //setAlldata([...alldata, response.data]);
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonColor: "#2D7F55",
      });
      getCustomers();
      setCdata({
        ccode: "",
        cname: "",
        cemail: "",
        ctel: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Duplicate names.",
        confirmButtonColor: "#EF1717",
      });
      console.log(error);
    }
  };

  //Edit && EditCustomer
  const [editId, setEditId] = useState(null);

  const cancleUpdate = () => {
    setEditId(null);
    setCdata({
      ccode: "",
      cname: "",
      cemail: "",
      ctel: "",
    });
  };

  const EditCustomer = (id) => {
    setEditId(id);
    const data = alldata.find((item) => item.ccode === id);
    setCdata({
      ccode: data.ccode,
      cname: data.cname,
      cemail: data.cemail,
      ctel: data.ctel,
      id: data._id,
    });
    //console.log(data);
  };

  const UpdateCustomer = async (updatedata) => {
    console.log(updatedata);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_KEY}/updatecustomer`,
        updatedata,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonColor: "#2D7F55",
      });
      getCustomers();
      setEditId(null);
      setCdata({
        ccode: "",
        cname: "",
        cemail: "",
        ctel: "",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Error",
        confirmButtonColor: "#EF1717",
      });
      console.log(err);
    }
  };

  //DeleteCustomer
  const DeleteCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_KEY}/deletedatacustomer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonColor: "#2D7F55",
      });
      getCustomers();
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Error",
        confirmButtonColor: "#EF1717",
      });
      console.log(err);
    }
  };

  const multidelete = async (data) => {
    const ids = data;
    const resourceIdString = ids.join(",");
    //console.log(ids);
    console.log(resourceIdString);

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_KEY}/multidelete/${resourceIdString}`,
        {
          headers: {
            Authorization:`Bearer ${getToken()}`
          },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonColor: "#2D7F55",
      });
      getCustomers();
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Error",
        confirmButtonColor: "#EF1717",
      });
      console.log(err);
    }
  };

  //update status
  const multiChangestatuson = async (data) => {
    const id = data.join(",");
    console.log(id);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_KEY}/updatestatuson`,
        { id },
        {
          headers: {
            Authorization:`Bearer ${getToken()}`
          },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonColor: "#2D7F55",
      });
      window.location.reload(false);
      getCustomers();
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.response.data.error,
        confirmButtonColor: "#EF1717",
      });
      console.log(err);
    }
  };

  const multiChangestatusoff = async (data) => {
    const id = data.join(",");
    console.log(id);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_KEY}/updatestatusoff`,
        { id },
        {
          headers: {
            Authorization:`Bearer ${getToken()}`
          },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonColor: "#2D7F55",
      });
      window.location.reload(false);
      getCustomers();
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.response.data.error,
        confirmButtonColor: "#EF1717",
      });
      console.log(err);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbartop />
        <Routes>
          <Route
            path="/home"
            element={
              <Insertdata
                newCustomer={newCustomer}
                editId={editId}
                cancleUpdate={cancleUpdate}
                cdata={cdata}
                setCdata={setCdata}
                UpdateCustomer={UpdateCustomer}
              />
            }
          ></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>

      <Tabledata
        alldata={alldata}
        setAlldata={setAlldata}
        DeleteCustomer={DeleteCustomer}
        EditCustomer={EditCustomer}
        multidelete={multidelete}
        multiChangestatuson={multiChangestatuson}
        multiChangestatusoff={multiChangestatusoff}
      />
    </>
  );
}

export default App;
