import React from "react";
import InsertFrom from "../components/InsertFrom";
import { getToken } from "../service/authan";
function Insertdata({newCustomer,editId,cancleUpdate,cdata,setCdata,UpdateCustomer,
}) {
  return (
    <div>
      {!getToken() ? (
        alert("Please login !")
      ) : (
        <InsertFrom
          newCustomer={newCustomer}
          editId={editId}
          cancleUpdate={cancleUpdate}
          cdata={cdata}
          setCdata={setCdata}
          UpdateCustomer={UpdateCustomer}
        />
      )}
    </div>
  );
}

export default Insertdata;
