import Sidebar from "./components/Sidebar/Sidebar.tsx";
import AppRouter from "./routes/AppRouter.tsx";
import './App.scss';
import { useStore } from "./store/store.tsx";
import { useEffect, useState } from "react";
import { loadData } from "./store/loadStoreData.ts";
import PageNotFound from "./pages/PageNotFound/PageNotFound.tsx";
import { Backdrop, CircularProgress } from "@mui/material";

function App() {
  const [{ dataLoaded, isLoading }, setState] = useStore();
  const [open, setOpen] = useState(true);

  async function loadStoreData() {
    try {
      const data = await loadData();
      setState(store => ({ ...store, dataLoaded: true, isLoading: false, ...data }));
    } catch {
      setState(store => ({ ...store, dataLoaded: false, isLoading: false }))
    } finally {
      setOpen(false);
      setState(store => ({ ...store, dataLoaded: true, isLoading: false }));
    }
  }

  useEffect(() => {
    loadStoreData();
  }, []);

  if (!isLoading && !dataLoaded) {
    return <div className="app">
      <PageNotFound/>
    </div>
  } else if (dataLoaded && !isLoading) {
    return <div className="app">
      <Sidebar loadStoreData={loadStoreData}/>
      <div className="app-main-container">
        <AppRouter/>
      </div>
    </div>
  } else {
    return <div className="app">
      <Sidebar loadStoreData={loadStoreData}/>
      <Backdrop
        sx={{ backgroundColor: 'transparent', color: '#262626', left: '336px' }}
        open={open}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
    </div>
  }
}

export default App;
