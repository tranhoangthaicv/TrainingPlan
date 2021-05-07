const stateDefault = {
  mangSinhVien: [
    { id: "1", name: "thai", age: "23", class: "12" },
    { id: "2", name: "thai1", age: "24", class: "12" },
    { id: "3", name: "thai2", age: "25", class: "12" },
  ],
};

export const SinhVienReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "THEM_SINH_VIEN": {
      state.mangSinhVien = [...action.mangSinhVien];
      return { ...state };
    }
    case "UPDATE_SINH_VIEN": {
      state.mangSinhVien = [...action.mangSinhVien];
      return { ...state };
    }
    case "DELETE_SINH_VIEN": {
      state.mangSinhVien = [...action.mangSinhVien];
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
