import "./App.css"
import { BrowserRouter, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Coin from "./pages/Coin"

function App() {

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route path='/' component={Home} />
        <Route path='/coins/:id' component={Coin} />
      </div>
    </BrowserRouter>
  );
}

export default App;
