
import './App.css';
import {Route, Routes} from "react-router-dom";
import List from "./components/product/List";
import Add from "./components/product/Add";

function App() {
  return (
    <>
        <Routes>
            <Route path={"/"} element={<List />}>
                <Route path={"/add"} element={<Add />}/>
            </Route>
        </Routes>
    </>
  );
}

export default App;
