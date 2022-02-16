import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "../../Pages/Users";
import Redux from "../../Pages/Redux";
import "../../styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/redux" element={<Redux />} />
      </Routes>
    </Router>
  );
}

export default App;
