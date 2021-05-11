import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TableSinhVien(props) {
  // Dung useSelector de lay du lieu ve tu reducer
  let mangSinhVien = useSelector((state) => state.sinhVienReducer.mangSinhVien);
  // SetState cho search
  const [mangSinhVienNew,setMangSinhVienNew] = useState(mangSinhVien);
  // Chay setMangSinhVienNew sau khi mangSinhVien thay doi
  useEffect(()=>{
      setMangSinhVienNew(mangSinhVien)
  },[mangSinhVien])
  // SetState cho form
  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
    class: "",
  });

  // Dung useDispatch de dispatch du lieu len reducer
  const dispatch = useDispatch();

  // Ham hien thi giao dien table
  const renderTable = () => {
    return mangSinhVienNew.map((sinhVien, index) => {
      return (
        <tr key={index}>
          <td id="tdid">{sinhVien.id}</td>
          <td id="tdname">{sinhVien.name}</td>
          <td id="tdage">{sinhVien.age}</td>
          <td id="tdclass">{sinhVien.class}</td>
          <td>
            <button
              className="btn btn-danger mr-2"
              onClick={() => {
                deleteStudent(sinhVien.id);
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-info"
              data-toggle="modal"
              data-target="#modelId"
              onClick={() => {
                repairStudent();
              }}
            >
              Repair
            </button>
          </td>
        </tr>
      );
    });
  };

  // Set state khi thay doi

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Set state tuong ung voi name
    setForm({ ...form, [name]: value });
  };

  // Them sinh vien

  const addStudent = () => {
    // them doi tuong vao mangSinhVien
    mangSinhVien = [...mangSinhVien, form];
    console.log(form);
    // Dua du lieu len reducer
    dispatch({
      type: "ADD_SINH_VIEN",
      mangSinhVien: mangSinhVien,
    });
  };

  // Xoa sinh vien

  const deleteStudent = (id) => {
    let mangSinhVienDelete = mangSinhVien.filter((sinhVien) => {
      return sinhVien.id !== id;
    });
    // Dispatch du lieu len reducer
    dispatch({
      type: "DELETE_SINH_VIEN",
      mangSinhVien: mangSinhVienDelete,
    });
  };

  // Sua sinh vien

  const repairStudent = () => {
    document.getElementById("content").innerHTML = "Change Information";
    document.getElementById("btn").style.display = "none";
    document.getElementById("btnupdate").style.display = "block";
    document.getElementById("id").disabled = true;
    document.getElementById("name").value = document.getElementById("tdname").value;
    document.getElementById("id").value = document.getElementById("tdid").value;
    document.getElementById("age").value = document.getElementById("tdage").value;
    document.getElementById("class").value = document.getElementById("tdclass").value;
  };

  // Update

  const updateStudent = () => {
    // Tim vi tri sinh vien can update
    let index = mangSinhVienNew.findIndex((sinhVien) => {
      return sinhVien.id === document.getElementById("id").value;
    })
    dispatch({
      type : "UPDATE_SINH_VIEN",
      mangSinhVien : mangSinhVienNew[index]
    })
  };

  // Search

  const handleSearch = (e) => {
    let keyWord = e.target.value;
    setMangSinhVienNew(mangSinhVien.filter((sinhVien)=>{
      return sinhVien.name.includes(keyWord);
  }))
    // dispatch({
    //   type: "SEARCH_SINH_VIEN",
    //   keyWord: keyWord
    // });
  };

  return (
    <div className="container">
      <h1 align="center">Look up student</h1>
      <div>
        <input
          onChange={(e) => handleSearch(e)}
          type="text"
          className="form-control"
          placeholder="Search Name's Student"
          id="searchName"
        />
      </div>
      <br></br>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
      <div>
        {/* Button trigger modal */}
        <button
          style={{ fontSize: "15px" }}
          type="button"
          className="btn btn-primary btn-lg"
          data-toggle="modal"
          data-target="#modelId"
          onClick={() => {
            document.getElementById("btnupdate").style.display = "none";
            document.getElementById("btn").style.display = "block";
            document.getElementById("id").disabled = false;
          }}
        >
          Add Student
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="modelId"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 id="content" className="modal-title">
                  Add Student
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput">ID</label>
                    <input
                      id="id"
                      value={form.id}
                      name="id"
                      type="text"
                      className="form-control"
                      placeholder="Can you write ID"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Name</label>
                    <input
                      id="name"
                      value={form.name}
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Can you write Name"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput3">Age</label>
                    <input
                      id="age"
                      value={form.age}
                      name="age"
                      type="text"
                      className="form-control"
                      placeholder="Can you write Age"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput4">Class</label>
                    <input
                      id="class"
                      value={form.class}
                      name="class"
                      type="text"
                      className="form-control"
                      placeholder="Can you write Class"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  id="btn"
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    addStudent();
                  }}
                >
                  Add Student
                </button>
                <button
                  id="btnupdate"
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    updateStudent();
                  }}
                >
                  Update Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
