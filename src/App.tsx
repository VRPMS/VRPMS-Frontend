import Sidebar from "./components/Sidebar/Sidebar.tsx";
import AppRouter from "./routes/AppRouter.tsx";
import './App.scss';

function App() {
  return <div className="app">
    <Sidebar/>
    <div className="app-main-container">
      <AppRouter/>
    </div>
  </div>
}

export default App;
