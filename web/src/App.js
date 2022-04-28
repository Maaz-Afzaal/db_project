import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import DbTest from "./components/DbTest";
import "./App.scss"
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard/:id" element={<Dashboard/>}/>
          <Route path="/dbtest" element={<DbTest/>}/>
        </Routes>
    </Router>  
    </div>
  );
}

export default App;
