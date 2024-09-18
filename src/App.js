//Routing
import {
  BrowserRouter as Router,
} from "react-router-dom";

import AppLayout from "./components/app-layout/AppLayout";

import './style/app.scss';

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
