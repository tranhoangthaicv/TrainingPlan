const stateDefault = {
  mangSinhVien: []
};

export const SinhVienReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "ADD_SINH_VIEN": {
      state.mangSinhVien = [...state.mangSinhVien, action.sinhVien];
      return { ...state };
    }
    case "DELETE_SINH_VIEN": {
      state.mangSinhVien = state.mangSinhVien.filter((sinhVien) => {
        return sinhVien.id !== action.idDelete;
      });
      return { ...state };
    }
    case "UPDATE_SINH_VIEN": {
      const index = state.mangSinhVien.findIndex(
        (sv) => sv.id === action.sinhVien.id
      );
      console.log(index);
      if (index === action.sinhVien.id) {
        const sinhVien = state.mangSinhVien.find(
          (sv) => sv.id === action.sinhVien.id
        );
        sinhVien.name = action.sinhVien.name;
        sinhVien.age = action.sinhVien.age;
        sinhVien.class = action.sinhVien.class;
        const newArr = Object.assign([], state.mangSinhVien);
        return { ...state, mangSinhVien: newArr };
      }
    }
    default: {
      return { ...state };
    }
  }
};
