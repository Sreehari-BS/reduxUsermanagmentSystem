import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const location = useLocation();
  
    // Check if the current route is AdminHomeScreen
    const isAdminHomeScreen = location.pathname === "/adminHome";

  return (
    <>
      {!isAdminHomeScreen && <Header />}
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
