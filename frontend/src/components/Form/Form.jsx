import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { MyTextField } from "../../Utils/MyTextField";
import "./Form.css";
import { ToastContainer, toast } from "react-toastify";

import { createCustomer, updateCustomer } from "../../slices/customer";

const Form = ({ set, isActiveMode, intialValues }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const notify = (data) => toast(data);

  const validate = yup.object({
    name: yup.string().required(),
    phone: yup.string().required("required"),
    dob: yup.string().required(),
  });

  const handleCreate = async (data, onSubmitProps) => {
    try {
      setIsError("");
      setSuccess("");
      setIsLoading(true);
      dispatch(createCustomer(data))
        .unwrap()
        .then((data) => {
          onSubmitProps.resetForm();
          setIsLoading(false);
          notify("Customer Added Successfully");
          setSuccess("Customer Added Successfully");
        })
        .catch((e) => {
          setIsLoading(false);
          setIsError(e.message);
          console.log("create error", e);
        });
    } catch (e) {
      setIsLoading(false);
      //   setIsError(e.message);
      console.log(e);
    }
  };

  const handleUpdate = async (data, { resetForm }) => {
    try {
      setSuccess("");
      setIsError("");
      setIsLoading(true);

      dispatch(updateCustomer({ cid: data.cid, input: data }))
        .unwrap()
        .then((data) => {
          setIsLoading(false);
          setSuccess("Customer Updated Successfully");
          resetForm();
          set();
        })
        .catch((e) => {
          setIsLoading(false);
          setIsError(e.message);
          console.log("create error", e);
        });
    } catch (e) {
      setIsLoading(false);
      //   setIsError(e.message);
      console.log(e);
    }
  };

  return (
    <div className="MainLoginPageWrapper m-0 p-0">
      <ToastContainer />
      <div className="row justify-content-between m-0 p-0">
        <div className="col-md-12 signinPageWraper  p-1 ">
          <Formik
            initialValues={intialValues}
            validationSchema={validate}
            onSubmit={isActiveMode ? handleUpdate : handleCreate}
            enableReinitialize={true}
          >
            {({
              values,
              handleSubmit,
              isValid,
              handleChange,
              handleBlur,
              isValidating,
              isSubmitting,
              setValues,
            }) => {
              return (
                <div className="container col-md-12">
                  <div className="mb-3">
                    {!isActiveMode && (
                      <h3 className="mt-2 text-muted">Add Customer</h3>
                    )}

                    {isActiveMode && (
                      <h3 className="mt-2 text-muted">Edit Customer</h3>
                    )}
                    {isError && (
                      <span className="text-left error-messageTop">
                        {isError}
                      </span>
                    )}

                    {success && (
                      <span className="text-left success-messageTop">
                        {success}
                      </span>
                    )}
                  </div>

                  <MyTextField
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Name..."
                  />
                  <MyTextField
                    label="Phone"
                    name="phone"
                    type="text"
                    placeholder="Phone..."
                  />
                  <MyTextField
                    label="Dob"
                    name="dob"
                    type="text"
                    placeholder="Dob..."
                  />

                  {!isLoading && !isActiveMode && (
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="btn 
                         btn-primary "
                    >
                      Add Customer
                    </button>
                  )}

                  {!isLoading && isActiveMode && (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn btn-success 
         btn-block"
                    >
                      Edit Customer
                    </button>
                  )}

                  {isLoading && (
                    <RotatingLines
                      width="60"
                      strokeWidth="4"
                      strokeColor="black"
                      animationDuration="3"
                    />
                  )}
                </div>
              );
            }}
          </Formik>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Form;
