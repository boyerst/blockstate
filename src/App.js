import "./App.css"
import { BrowserRouter, Route } from "react-router-dom"
import { makeStyles, createTheme, ThemeProvider, Paper } from "@material-ui/core"
import { useState } from "react"
import Header from "./components/Header"
import Home from "./pages/Home"
import Coin from "./pages/Coin"


// const useStyles = makeStyles(() => ({
//   App: {
//     minHeight: "100vh",
//   },
// }))




function App() {

  // const classes = useStyles()

  const [darkMode, setDarkMode] = useState(false)



  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });
  
  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }



  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Paper style={{ height: '100vh' }}>
          <div >
            <Header handleDarkMode={handleDarkMode}/>
            <Route path='/' component={Home} />
            <Route path='/coins/:id' component={Coin} />
          </div>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App