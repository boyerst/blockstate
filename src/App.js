import React, { useState } from "react"
import "./App.css"
import { BrowserRouter, Route } from "react-router-dom"
import { createTheme, ThemeProvider, Paper } from "@material-ui/core"
import Header from "./components/Header"
import Home from "./pages/Home"
import Coin from "./pages/Coin"




function App() {

  const [darkMode, setDarkMode] = useState(true)

  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      background: {
        paper: (darkMode ? "#000000" : "#FBFCFC")
      },
    },
  });


  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }




  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Paper style={{ minHeight: "120vh" }}>
          <div>
            <Header handleDarkMode={handleDarkMode}/>
            <Route path="/" component={Home} exact />
            <Route path="/coins/:id" component={Coin} />
          </div>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App
