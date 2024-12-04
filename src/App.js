import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./layouts/header";
import PageNotFound from "./layouts/invalidPage";
import SignIn from "./pages/public/SignIn";
import SignUp from "./pages/public/SignUp";
import { ThemeProvider } from "./theme/ThemeContex";
function App() {

  return (
<ThemeProvider>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

        <Route path="/all-tasks" element={<Header />} />
        <Route path="/pending-tasks" element={<Header />} />
        <Route path="/completed-tasks" element={<Header />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
</ThemeProvider>
  );
}

export default App;
