import "./App.css"
import { BrowserRouter, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"

function App() {

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route path='/' component={Home} />
    
      </div>
    </BrowserRouter>
  );
}

export default App;
