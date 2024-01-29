import React from 'react';
import logo from './logo.svg';
import 'bulma/css/bulma.min.css'; // Import Bulma CSS
import './App.css';
import SiteRoute from './routing/SiteRoute';
import { SiteProvider } from './contexts/SiteProvider';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <SiteProvider>
      <div className="App">
        <SiteRoute />
      </div>     
    </SiteProvider>
  );
}

export default App;
