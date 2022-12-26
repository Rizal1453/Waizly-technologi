import React, { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import AddList from "../components/AddList";
import { Globalbutton } from "../components/GlobalButton";
import { NavbarComponents } from "../components/NavbarComponents";
import Ceklis from "../components/images/ceklis.png";
import Delete from "../components/images/delete.png";
import Update from "../components/images/update.png";
import { API } from "../components/config/Api";
import EditList from "../components/EditList";
import { Info, Warning } from "../components/toast";



const Landing = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
 
  const [save, setSave] = useState({});

  const [change,setChange]=useState(false)

  const changeSize = () => {
    if (window.innerWidth <= 850) {
      setChange(true);
    } else {
      setChange(false);
    }
  };

  window.addEventListener("resize", changeSize);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEdit = () => setShowEdit(false);

  const handleCloseDelete = () => setShowDelete(false);

  const getData = async () => {
    try {
      const response = await API.get("/todos");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteById = async () => {
    try {
      const id = idDelete.id;
      await API.delete(`/delete/todo/${id}`);
      handleCloseDelete();
      getData();
       Info({ message: `Delete Success` });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCeklis = async (index,status)=>{
    if(status  === "false"){
      await API.put(`/update/todo/${index}`,{status:"true"})
      getData()
      
      Warning({ message: `task is Done!` });
   }else {
      await API.put(`/update/todo/${index}`,{status:"false"})
      getData()
      Info({ message: `task is Return!` });
    }
  }

  useEffect(() => {
    changeSize();
    getData();
  }, []);
  return (
    <div>
      <NavbarComponents />
      <Container>
        <div className="w-100 d-flex justify-content-center">
          <div
            className={
              change
                ? " mt-4 d-flex w-100 justify-content-between"
                : "d-flex w-75 mt-3 justify-content-between"
            }
          >
            <FloatingLabel
              controlId="floatingInput"
              label="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="mb-3 w-75 "
            >
              <Form.Control type="search" placeholder="name@example.com" />
            </FloatingLabel>
            <Globalbutton text="Add List" size="btndark" onClick={handleShow} />
          </div>
        </div>
        {data
          ?.filter((i) => {
            return search?.toLowerCase() === ""
              ? i
              : i.title.toLowerCase().includes(search);
          })
          ?.map((item, index) => (
            <div
              key={index}
              className={
                item.status === "false"
                  ? "  mt-2  d-flex  justify-content-center"
                  : "  mt-2 c d-flex  justify-content-center"
              }
            >
              <div
                className={
                  change
                    ? "w-100 bd d-flex justify-content-between "
                    : "d-flex w-75 mx-5 justify-content-between bd"
                }
              >
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <img
                    src={Ceklis}
                    alt=""
                    width="40px"
                    height="40px"
                    className=" my-3"
                    onClick={() => updateCeklis(item.id, item.status)}
                  />

                  <img
                    src={Update}
                    alt=""
                    width="40px"
                    height="40px"
                    className="ms-2 my-3"
                    onClick={() => {
                      setSave(item);

                      setShowEdit(true);
                    }}
                  />
                  <img
                    src={Delete}
                    alt=""
                    width="40px"
                    height="40px"
                    className=" my-3"
                    onClick={() => {
                      setIdDelete(item);
                      setShowDelete(true);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
      </Container>
      <AddList show={show} handleClose={handleClose} getData={getData} />
      <EditList
        showEdit={showEdit}
        handleCloseEdit={handleCloseEdit}
        getData={getData}
        save={save}
      />
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <div className="my-2 text-center">
          <h3> Are Sure For Delete? </h3>

          <div className="d-flex justify-content-center">
            <Button variant="secondary" onClick={handleCloseDelete}>
              No
            </Button>
            <Globalbutton text="yes " size="ms-2" onClick={deleteById} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Landing;
