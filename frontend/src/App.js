import { useContext, useEffect, useState } from "react";
import "./App.css";
import Table from "./component/Table";
import Addform from "./component/Addform.js";
import Acc from "./Accomodation/Acc.js";
import Update from "./component/Update";
import Send from "./component/Send.js";
import { ToastContainer, toast } from "react-toastify";
import Register from "./component/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import AuthenticatedRoute from "./auth/AuthenticatedRoute.js";
import Otp from "./component/Otp";
import FullContext from "./Context/FullContext";

function App() {
  const store = useContext(FullContext);

  

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/allrows" element={<AuthenticatedRoute />}>
          <Route
            exact
            path="/allrows"
            element={
              <Table />
            }
          />
        </Route>

        <Route
          exact
          path="/email-verification"
          element={<AuthenticatedRoute />}
        >
          <Route exact path="/email-verification" element={<Otp />} />
        </Route>
      </Routes>
      {store.add === 1 ? <Addform /> : ""}

      {store.update === 1 ? (
        <Update
          // setUpdate={setUpdate}
        />
      ) : (
        ""
      )}
      <ToastContainer theme="colored" />

      {store.sendbutton === true ? <Send /> : ""}
    </div>
  );
}

export default App;
