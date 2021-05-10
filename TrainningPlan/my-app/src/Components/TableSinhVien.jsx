import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SinhVien } from "../Modal/Modal";

export default function TableSinhVien(props) {
  // Dung useSelector de lay du lieu ve tu reducer
  let mangSinhVien = useSelector(
    (state) => state.sinhVienReducer.mangSinhVien
  );

  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
    class: "",
  });

  console.log(form);
  // Dung useDispatch de dispatch du lieu len reducer
  const dispatch = useDispatch();

  // Ham hien thi giao dien table
  const renderTable = () => {
    return mangSinhVien.map((sinhVien, index) => {
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
    setForm({...form,[name]: value});
  };


  // Them sinh vien
  const addStudent = () => {
    // them doi tuong vao mangSinhVien
    mangSinhVien=[...mangSinhVien,form];
    console.log(form);
    // Dua du lieu len reducer
    dispatch({
      type: "ADD_SINH_VIEN",
      mangSinhVien: mangSinhVien
    });
  }

  // Xoa sinh vien
  const deleteStudent = (id) => {
    let mangSinhVienM = mangSinhVien.filter((sinhVien)=>{
      return sinhVien.id !== id
    })
    console.log(mangSinhVienM);
    // Dispatch du lieu len reducer
    dispatch({
      type: "DELETE_SINH_VIEN",
      mangSinhVien: mangSinhVienM
    });
  };

  // Sua sinh vien

  const repairStudent = () => {
      // Sua UI
      document.getElementById("content").innerHTML = "Change Information";
      document.getElementById("btn").innerHTML = "Update Student";

  };

  const updateStudent = () => {
    // lấy data mà người dùng nhập vào
      let _id = document.getElementById("id").value;
      let _name = document.getElementById("name").value;
      let _age = document.getElementById("age").value;
      let _class = document.getElementById("class").value;
    // Tao lop doi tuong moi
      let newsinhVien = new SinhVien(_id,_name,_age,_class);
      var index = mangSinhVien.findIndex( (id) => {
          return id = newsinhVien.id;
      })
      console.log(index);  
    // tìm vị trí của nhân viên cần cập nhật trong danh sách nhân viên
    // cập nhật lại danhSachNhanVien
    dispatch({
      type: "UPDATE_SINH_VIEN",
      mangSinhVien: mangSinhVien
    });
  };

  // Search
  document.getElementById("search")
  .addEventListener("keyup",function(event){
      let keyWord = event.target.value;
      let mangSinhVien = mangSinhVien.filter((sinhVien) => {
          return sinhVien.name.includes(keyWord);
      })
  })

  return (
    <div className="container">
      <h1 align="center">Look up student</h1>
      <div>
        <h3  style={{ display: "inline" }}>Search</h3>
        <input id="search"
          style={{ display: "inline", width: "500px", marginLeft: "20px" }}
        ></input>
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
                <h5 id="content" className="modal-title">Add Student</h5>
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
                      id = "id"
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
                      id = "name"
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
                      id = "age"
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
                      id = "class"
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
                  id = "btn"
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    addStudent();
                  }}
                >
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
