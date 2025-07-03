import { useState } from "react";
import { ConfigProvider, theme } from "antd";
import MainLayout from "./components/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomeTab from "./components/HomeTab";
import SubjectsTab from "./components/SubjectsTab";
import UploadTab from "./components/UploadTab";
import AuthProvider from "./components/AuthProvider";

const App = () => {
  const defaultDarkMode = true;
  const currentDarkMode =
    (localStorage.getItem("darkMode") || defaultDarkMode).toString() == "true";
  const [darkMode, setDarkMode] = useState(currentDarkMode);
  const lightTheme = {
    algorithm: theme.defaultAlgorithm,
  };
  const darkTheme = {
    algorithm: theme.darkAlgorithm,
    token: { colorBgLayout: "#0D0D0D"},
    
  };

  return (
    <ConfigProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              element={
                <MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />
              }
            >
              <Route path="/" element={<HomeTab />} />
              <Route path="/subjects" element={<SubjectsTab />} />
              <Route path="/upload" element={<UploadTab />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
};
export default App;
