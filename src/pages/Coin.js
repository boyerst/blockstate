import "../App.css"
import { useParams } from "react-router-dom"
import { useState } from 'react'
import { CurrencyState } from "../CurrencyContext"


const Coin = () => {

  const { id } = useParams()
  const [coin, setCoin] = useState()
  const { currency, symbol } = CurrencyState()

  return(
    <div>
      Coin 
    </div>       
  ) 
}

export default Coin