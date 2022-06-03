import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveCustomers, removeCustomer } from "../../slices/customer";
import { ToastContainer, toast } from "react-toastify";

import "./List.css";

const List = ({ EditData }) => {
  const [customerData, setCustomerData] = useState([]);

  const customerDocs = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  const notify = (data) => toast(data);

  // intial call
  useEffect(() => {
    const data = async () => {
      dispatch(retrieveCustomers())
        .unwrap()
        .then((data) => {
          setCustomerData(data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    data();
  }, []);

  // to track state change
  useEffect(() => {
    setCustomerData(customerDocs);
  }, [customerDocs]);

  // to remove customer
  const RemoveCustomer = (cid) => {
    dispatch(removeCustomer(cid))
      .unwrap()
      .then((data) => {
        notify("Customer removed successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div class="container">
        <br />
        <table class="table  table-class" id="table-id">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Dob</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customerData &&
              customerData.data &&
              customerData.data.map((item) => {
                return (
                  <tr key={item.cid}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.dob}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          EditData(item);
                        }}
                      >
                        Edit{" "}
                      </button>
                      <button
                        onClick={() => {
                          RemoveCustomer(item.cid);
                        }}
                        className="btn btn-danger m-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div class="pagination-container">
          <nav>
            <ul class="pagination"></ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default List;
