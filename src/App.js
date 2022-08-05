import { BrowserRouter, Route } from "react-router-dom"
import { makeStyles, createTheme, ThemeProvider, Switch, Paper } from "@material-ui/core"
import { useState } from 'react';
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




  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Paper style={{ height: '100vh' }}>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
          <div >
            <Header />
            <Route path='/' component={Home} />
            <Route path='/coins/:id' component={Coin} />
          </div>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App
