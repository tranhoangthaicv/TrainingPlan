import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TableSinhVien(props) {
  // Dung useSelector de lay du lieu ve tu reducer
  const mangSinhVien = useSelector(
    (state) => state.sinhVienReducer.mangSinhVien
  );
  // Dung useDispatch de dispatch du lieu len reducer
  const dispatch = useDispatch();

  // Ham hien thi giao dien table
  const renderTable = () => {
    return mangSinhVien.map((sinhVien, index) => {
      return (
        <tr>
          <td>{sinhVien.id}</td>
          <td>{sinhVien.name}</td>
          <td>{sinhVien.age}</td>
          <td>{sinhVien.class}</td>
          <td>
            <button className="btn btn-danger mr-2">Delete</button>
            <button className="btn btn-info">Update</button>
          </td>
        </tr>
      );
    });
  };

  const addStudent = (student) => {
      
  };

  const deleteStudent = () => {};

  const updateStudent = () => {};

  return (
    <div className="container">
      <h1 align="center">Look up student</h1>
      <div>
        <h3 style={{ display: "inline" }}>Search</h3>
        <input
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
        <button style={{fontSize:'15px'}}
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
                <h5 className="modal-title">Add Student</h5>
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
                <h5>ID : </h5>
                <input></input>
                <h5>Name : </h5>
                <input></input>
                <h5>Age : </h5>
                <input></input>
                <h5>Class : </h5>
                <input></input>
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

      {/* <button className="btn btn-danger mr-5">Delete Student</button>
    <button className="btn btn-primary mr-5">Update Student</button> */}
    </div>
  );
}
