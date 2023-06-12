import { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import CreateAccount from "./views/Accounts/LogIn";

const Root = () => {
  return (
    <Fragment>
      <CreateAccount />
      <ToastContainer
        position="bottom-left"
        toastClassName="custom-toast"
        theme="dark"
      />
    </Fragment>
  );
};

export default Root;
