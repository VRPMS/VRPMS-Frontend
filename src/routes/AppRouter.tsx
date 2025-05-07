import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./routes.tsx";

function AppRouter() {
  return (
    <Routes>
      <>
        {AppRoutes.map(({ path, Component }, index) => {
          return <Route path={path} element={Component} key={`route-${index}`}/>
        })}
      </>
    </Routes>
  )
}

export default AppRouter