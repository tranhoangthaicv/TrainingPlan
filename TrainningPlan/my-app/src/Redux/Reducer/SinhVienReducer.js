const stateDefault = {
  mangSinhVien: [],
};

export const SinhVienReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "ADD_SINH_VIEN": {
      state.mangSinhVien = action.mangSinhVien;
      return { ...state };
    }
    case "DELETE_SINH_VIEN": {
      state.mangSinhVien = action.mangSinhVien;
      return { ...state };
    }
    case "UPDATE_SINH_VIEN": {
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
