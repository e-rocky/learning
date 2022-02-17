import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "../../Pages/Users";
import Redux from "../../Pages/Redux";
import { myStore } from "../../Utils/Store";
import { Provider } from "react-redux";
import "../../styles/App.css";

function App() {
  return (
    <Provider store={myStore}>
      <Router>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/redux" element={<Redux />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
