import React, { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { retrieveCustomers, createCustomer } from "../../slices/customer";

import List from "../../components/List/List";

const Home = () => {
  const [isActive, setIsActive] = useState(false);

  const [intials, setIntials] = useState({
    name: "",
    phone: "",
    dob: "",
  });

  const dispatch = useDispatch();

  const notify = (data) => toast(data);

  const EditData = async (data) => {
    setIsActive(true);
    setIntials(data);
  };

  const ResetValues = async () => {
    notify("Customer updated successfully");
    setIntials({
      name: "",
      phone: "",
      dob: "",
    });
    setIsActive(false);
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        <div className="col-md-4">
          {!isActive && (
            <Form
              set={ResetValues}
              isActiveMode={false}
              intialValues={intials}
            />
          )}
          {isActive && (
            <Form
              set={ResetValues}
              isActiveMode={true}
              intialValues={intials}
            />
          )}
        </div>
        <div className="col-md-8">
          <List EditData={EditData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
