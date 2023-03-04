import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ShoeList from "./ShoeList";
import ShoeForm from "./ShoeForm";
import HatForm from "./HatForm";
import HatList from "./HatList";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="hats">
          <Route index element={<HatList />} />
          <Route path="new" element={<HatForm />} />
        </Route>
        <Route path="shoes">
          <Route index element={<ShoeList />} />
          <Route path="new" element={<ShoeForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
