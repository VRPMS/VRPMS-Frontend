import Sidebar from "./components/Sidebar/Sidebar.tsx";
import AppRouter from "./routes/AppRouter.tsx";
import './App.scss';
import { useStore } from "./store/store.tsx";
import { useEffect } from "react";

function App() {
  const [dataLoaded] = useStore();

  useEffect(() => {

  }, []);

  return <div className="app">
    <Sidebar/>
    {dataLoaded
      ? <div className="app-main-container">
        <AppRouter/>
      </div>
      : "spinner"}
  </div>
}

export default App;
