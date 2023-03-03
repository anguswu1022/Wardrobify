import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ShoeList from "./ShoeList";
import ShoeForm from "./ShoeForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="shoes">
          <Route index element={<ShoeList />} />
          <Route path="new" element={<ShoeForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
