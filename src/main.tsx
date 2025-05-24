import { ReactNode, StrictMode } from "react";
import * as ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { StoreProvider } from './store/store.tsx';
import { BrowserRouter as Router } from "react-router-dom";
import { APIProvider } from '@vis.gl/react-google-maps';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Router>
      <StoreProvider>
        <APIProvider apiKey={'AIzaSyD3oRQlyJBaAnvNVhnjMsBPc8Z0RC6kDDA'}  language="uk" onLoad={() => console.log('Maps API has loaded.')}>
        <App/>
        </APIProvider>
      </StoreProvider>
    </Router>
  </StrictMode> as ReactNode
)
