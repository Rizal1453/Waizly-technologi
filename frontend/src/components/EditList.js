import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Modal } from "react-bootstrap";
import { API } from "./config/Api";
import { Globalbutton } from "./GlobalButton";
import { Success, Error } from "./toast";

const EditList = ({ showEdit, handleCloseEdit, getData, save }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const id = save.id;
      await API.put(`/update/todo/${id}`, form);
      console.log(form, "pas dipencet");
      getData();
      handleCloseEdit();
      Success({ message: `Edit Task Success!` });
    } catch (error) {
      Error({ message: `Edit Task Failed!` });
    }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (save) {
      setForm({
        ...form,
        title: save?.title,
        description: save.description,
      });
    }
  }, [save]);
  return (
    <div>
      {" "}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <h3 className="text-center c-pink">Edit</h3>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
            name="title"
          >
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={form.title}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
              as="textarea"
              name="description"
              value={form.description}
              placeholder="Description"
              onChange={handleChange}
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <div className="my-2 w-100 d-flex justify-content-center">
            {" "}
            <Globalbutton
              text="Edit"
              size="w-25"
              onClick={(e) => handleUpdate(e)}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditList;
