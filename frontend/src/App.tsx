import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { PageLayout } from "./components/Layout";
import { OneCountryPage } from "./pages/OneCountryPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={PageLayout}>
          <Route path="/" Component={HomePage} />
          <Route path="*" Component={() => <Navigate to="/" />} />
          <Route path="/country/:id" Component={OneCountryPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
