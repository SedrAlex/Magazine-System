import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Admin from "./Pages/Panel/Admin";
import Categories from "./Pages/Categories/Categories";
import Countries from "./Pages/Countries/Countries";
import Authors from "./Pages/Authors/Authors";
import Articles from "./Pages/Articels/Articles";
import Settings from "./Pages/Settings/Settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="categories" element={<Categories />} />
            <Route path="countries" element={<Countries />} />
            <Route path="authors" element={<Authors />} />
            <Route path="articles" element={<Articles />} />
            <Route path="settings" element={<Settings />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
