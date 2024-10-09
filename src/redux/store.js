import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ticketReducer from "./ticketslice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import tagReducer from "./tagSlice";
import departmentReducer from "./departmentSlice";
import placeReducer from "./placeSlice";
import passwordReducer from "./passwordSlice";
import unitReducer from "./unitSlice";
import vegetableReducer from "./vegetableSlice";
import varietyReducer from "./varietySlice";
import stockReducer from "./stockSlice";
import propertyReducer from "./propertySlice";
import priceHistoryReducer from "./priceHistorySlice";
import orderReducer from "./orderSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    users: userReducer,
    category: categoryReducer,
    tags: tagReducer,
    department: departmentReducer,
    place: placeReducer,
    passwordChange: passwordReducer,
    unit: unitReducer,
    vegetable: vegetableReducer,
    variety: varietyReducer,
    stock: stockReducer,
    property: propertyReducer,
    priceHistory: priceHistoryReducer,
    order: orderReducer,
  },
});
