export class Validator {
  // Tạo phương thức kiểm tra data bằng rỗng
  kiemTraRong = (value, idTb) => {
    if (value.trim() === "") {
      idTb.current.innerHTML = "Không để trống!";
      idTb.current.style.display = "block";
      return false;
    } else {
      // ẩn thẻ thông báo lỗi
      idTb.current.innerHTML = "";
      idTb.current.style.display = "none";
      return true;
    }
  };
  // Tạo phương thức kiểm tra chỉ cho nhập số

  kiemTraSo = (value, idTb) => {
    let pattern = /^[0-9]+$/;
    if (value.match(pattern)) {
      idTb.current.innerHTML = "";
      idTb.current.style.display = "none";
      return true;
    } 
    else {
      idTb.current.innerHTML = " Thuộc tính phải là số !";
      idTb.current.style.display = "block";
      return false;
    }
  };

  // Tạo phương thức kiểm tra chi cho văn bản
  kiemTraString = (value, idTb) => {
    let pattern = /^([a-zA-Z]|\s)*$/;
    if (value.match(pattern)) {
      idTb.current.innerHTML = "";
      idTb.current.style.display = "none";
      return true;
    } else {
      idTb.current.innerHTML = " Thuộc tính phải là văn bản !";
      idTb.current.style.display = "block";
      return false;
    }
  };

  // Tạo phương thức kiểm tra tồn tại
  kiemTraExist = (id, mang, idTb) => {
    const index = mang.findIndex((sv) => sv.id === id);
    if (index === -1) {
      idTb.current.innerHTML = "";
      idTb.current.style.display = "none";
      return true;
    } else {
      idTb.current.innerHTML = " ID đã tồn tại !";
      idTb.current.style.display = "block";
      return false;
    }
  };
}
