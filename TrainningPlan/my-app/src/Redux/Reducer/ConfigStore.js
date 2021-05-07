// Store tong cua ung dung
import {combineReducers,createStore} from 'redux';
import { SinhVienReducer } from "./SinhVienReducer";

const rootReducer = combineReducers({
    sinhVienReducer : SinhVienReducer
})

export const store = createStore(rootReducer);
