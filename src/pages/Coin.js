import "../App.css"
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { CurrencyState } from "../CurrencyContext"
import { CoinMarketData } from "../config/api"
import axios from "axios"


const Coin = () => {

  const { id } = useParams()
  const [coin, setCoin] = useState()
  const { currency, symbol } = CurrencyState()

  const fetchCoinMarketData =  async () => {
    const { data } = await axios.get(CoinMarketData(id))
    setCoin(data)    
  }

  console.log("CoinMarketData: ", coin)

  useEffect(() => {
    fetchCoinMarketData()
  }, [])

  return(
    <div>
      {coin.id}
    </div>       
  ) 
}

export default Coin