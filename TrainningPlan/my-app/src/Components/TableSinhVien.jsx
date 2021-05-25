import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Validator } from "./Validation";
// import Icon from '@material-ui/core/Icon';

export default function TableSinhVien(props) {
  // Hàm lấy data từ reducer
  let mangSinhVien = useSelector((state) => state.sinhVienReducer.mangSinhVien);

  // Use Ref
  const contentRef = useRef();
  const btnUpdateRef = useRef();
  const btnAddRef = useRef();
  const inputIdRef = useRef();
  const inputNameRef = useRef();
  const inputAgeRef = useRef();
  const inputClassRef = useRef();
  const idTb = useRef();
  const nameTb = useRef();
  const ageTb = useRef();
  const classTbao = useRef();

  // Hàm setState
  const [mangSinhVienNew, setMangSinhVienNew] = useState(mangSinhVien);

  // Hàm dispatch action
  const dispatch = useDispatch();

  // setState lại giao diện sau khi mangSinhVien , dispatch thay đổi
  useEffect(() => {
    setMangSinhVienNew(mangSinhVien);
  }, [mangSinhVien]);

  // setState cho Form
  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
    class: "",
  });

  // Hàm hiển thị giao diện
  const renderTable = () => {
    return mangSinhVienNew.map((sinhVien, index) => {
      return (
        <tr key={index}>
          <td>{sinhVien.id}</td>
          <td>{sinhVien.name}</td>
          <td>{sinhVien.age}</td>
          <td>{sinhVien.class}</td>
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
                contentRef.current.innerHTML = "Change Information";
                // btnUpdateRef.current.classList.add("d-block");
                document.getElementById("btnAdd").style.display = "none";
                // btnAddRef.current.classList.add("d-none");
                document.getElementById("btnUpdate").style.display = "block";
                inputIdRef.current.disabled = true;
                repairStudent(index);
              }}
            >
              Repair
            </button>
          </td>
        </tr>
      );
    });
  };

  // Hàm lấy data người nhập từ Form bằng set lại state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Validation
  let validatorSinhVien = new Validator();
  // Kiểm tra sinh viên đã tồn tại trong mảng
  const addStudent = () => {
    // Validation
    let isValid =
      validatorSinhVien.kiemTraRong(form.id, idTb) &&
      validatorSinhVien.kiemTraExist(form.id, mangSinhVienNew, idTb);
    isValid &=
      validatorSinhVien.kiemTraRong(form.name, nameTb) &&
      validatorSinhVien.kiemTraString(form.name, nameTb);
    isValid &=
      validatorSinhVien.kiemTraRong(form.age, ageTb) &&
      validatorSinhVien.kiemTraSo(form.age, ageTb);
    isValid &= validatorSinhVien.kiemTraRong(form.class, classTbao);

    if (isValid) {
      alert("Thêm thành công");
      dispatch({
        type: "ADD_SINH_VIEN",
        sinhVien: form,
      });
    }
  };

  // Hàm xóa sinh viên
  const deleteStudent = (id) => {
    dispatch({
      type: "DELETE_SINH_VIEN",
      idDelete: id,
    });
  };

  // Hàm sửa lại UI khi sửa lại Form nhập
  const repairStudent = (index) => {
    console.log(index);
    setForm(mangSinhVienNew[index]);
  };

  // Hàm Update gửi dữ liệu cần thay đổi lên Reducer

  const updateStudent = () => {
    let isValid =
      validatorSinhVien.kiemTraRong(form.name, nameTb) &&
      validatorSinhVien.kiemTraString(form.name, nameTb);
    isValid &=
      validatorSinhVien.kiemTraRong(form.age, ageTb) &&
      validatorSinhVien.kiemTraSo(form.age, ageTb);
    isValid &= validatorSinhVien.kiemTraRong(form.class, classTbao);

    if (isValid) {
        alert("Update thành công");
        dispatch({
          type: "UPDATE_SINH_VIEN",
          sinhVien: form
        });
    }
  };

  // Search
  const handleSearch = (e) => {
    let keyWord = e.target.value;
    console.log(keyWord);
    let keyWordLowerCase = e.target.value.toLowerCase();
    console.log(keyWordLowerCase);
    let keywordUpperCase = e.target.value.toUpperCase();
    console.log(keywordUpperCase);
    setMangSinhVienNew(
      mangSinhVien.filter((sinhVien) => {
        return (
          sinhVien.name.includes(keyWord) ||
          sinhVien.name.includes(keywordUpperCase) ||
          sinhVien.name.includes(keyWordLowerCase)
        );
      })
    );
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
        {/* <span class="material-icons-outlined">search</span> */}
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
        <button
          style={{ fontSize: "15px" }}
          type="button"
          className="btn btn-primary btn-lg"
          data-toggle="modal"
          data-target="#modelId"
          onClick={() => {
            contentRef.current.innerHTML = "Add Student";
            inputIdRef.current.disabled = false;
            // btnUpdateRef.current.classList.add("d-none");
            document.getElementById("btnAdd").style.display = "block";
            document.getElementById("btnUpdate").style.display = "none";
            setForm({
              id: "",
              name: "",
              age: "",
              class: "",
            });
          }}
        >
          Add Student
        </button>

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
                <h5 ref={contentRef} className="modal-title">
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
                <form role="form" id="formSV">
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput">ID</label>
                    <input
                      ref={inputIdRef}
                      value={form.id}
                      name="id"
                      type="text"
                      className="form-control"
                      placeholder="Can you write ID"
                      onChange={(e) => handleChange(e)}
                    />
                    <h5
                      className="text-danger"
                      ref={idTb}
                      style={{ fontSize: 18, display: "none" }}
                    ></h5>
                  </div>
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Name</label>
                    <input
                      ref={inputNameRef}
                      value={form.name}
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Can you write Name"
                      onChange={(e) => handleChange(e)}
                    />
                    <h5
                      className="text-danger"
                      ref={nameTb}
                      style={{ fontSize: 18, display: "none" }}
                    ></h5>
                  </div>
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput3">Age</label>
                    <input
                      ref={inputAgeRef}
                      value={form.age}
                      name="age"
                      type="text"
                      className="form-control"
                      placeholder="Can you write Age"
                      onChange={(e) => handleChange(e)}
                    />
                    <h5
                      className="text-danger"
                      ref={ageTb}
                      style={{ fontSize: 18, display: "none" }}
                    ></h5>
                  </div>
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput4">Class</label>
                    <input
                      ref={inputClassRef}
                      value={form.class}
                      name="class"
                      type="text"
                      className="form-control"
                      placeholder="Can you write Class"
                      onChange={(e) => handleChange(e)}
                    />
                    <h5
                      className="text-danger"
                      ref={classTbao}
                      style={{ fontSize: 18, display: "none" }}
                    ></h5>
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
                  // ref={btnAddRef}
                  id="btnAdd"
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    addStudent();
                  }}
                >
                  Add Student
                </button>
                <button
                  id="btnUpdate"
                  // ref={btnUpdateRef}
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
