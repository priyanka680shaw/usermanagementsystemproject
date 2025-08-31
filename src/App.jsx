import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import DispalUserData from "./pages/DisplaUserData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/user/:id" element={<UserDetail />} /> */}
        <Route path="/user/:id" element={<DispalUserData/>} />
      </Routes>
    </Router>
  );
}

export default App;








