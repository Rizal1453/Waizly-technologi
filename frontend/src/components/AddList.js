import React, { useState } from "react";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import { API } from "./config/Api";
import { Globalbutton } from "./GlobalButton";
import { Error, Success } from "../components/toast";

const AddList = ({ show, handleClose, getData }) => {
  const [form, setForm] = useState();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/create/todo", form);
      getData();
      handleClose();
      Success({ message: `Add Task Success!` });
    } catch (error) {
      Error({ message: `Add Task Failed!` });
    }
  };
  return (
    <div>
      {" "}
      <Modal show={show} onHide={handleClose}>
        <h3 className="text-center c-pink">Add List</h3>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
            name="title"
            onChange={handleChange}
          >
            <Form.Control type="text" name="title" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Description"
              onChange={handleChange}
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <div className="my-2 w-100 d-flex justify-content-center">
            {" "}
            <Globalbutton
              text="submit"
              size="w-25"
              onClick={(e) => handleSubmit(e)}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddList;
