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

  const [darkMode, setDarkMode] = useState(true)

  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      // background: {
      //   paper: "#000000"
      // }
    },
  });

  // const theme = createTheme({
  //   palette: {
  //     type: prefersDarkMode ? 'dark' : 'light',
  //     grey: {
  //       800: "#000000", // overrides failed
  //       900: "#121212" // overrides success
  //     },
      // background: {
      //   paper: "#000000"
      // }
  //   }
  // });
  






  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  }



  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Paper style={{ minHeight: '100vh' }}>
          <div >
            <Header handleDarkMode={handleDarkMode}/>
            <Route path='/' component={Home} exact/>
            <Route path='/coins/:id' component={Coin} />
          </div>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App