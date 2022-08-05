import "./App.css"
import { BrowserRouter, Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core"
import Header from "./components/Header"
import Home from "./pages/Home"
import Coin from "./pages/Coin"


const useStyles = makeStyles(() => ({
  App: {
    minHeight: "100vh",
  },
}))


function App() {

  const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path='/' component={Home} />
        <Route path='/coins/:id' component={Coin} />
      </div>
    </BrowserRouter>
  );
}

export default App
