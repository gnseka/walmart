import NavBar from "./NavBar/NavBar";
import Main from "./Main/Main";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function App() {
  const [selectedCatergory, setselectedCatergory] = useState("");

  return (
    <div className="App">
      <NavBar setselectedCatergory={setselectedCatergory}></NavBar>
      <Main selectedCatergory={selectedCatergory}></Main>
    </div>
  );
}

export default App;
