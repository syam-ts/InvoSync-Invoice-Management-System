import { RouterProvider } from "react-router-dom";
import "./style/App.css";
import { router } from "./Route/Router.tsx";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
