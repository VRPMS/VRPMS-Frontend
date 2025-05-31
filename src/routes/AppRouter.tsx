import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./routes.tsx";
import { Slide, ToastContainer } from "react-toastify";

function AppRouter() {
  return (
    <>
      <Routes>
        <>
          {AppRoutes.map(({ path, Component }, index) => {
            return <Route path={path} element={Component} key={`route-${index}`}/>
          })}
        </>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}/>
    </>
  )
}

export default AppRouter