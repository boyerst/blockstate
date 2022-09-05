import { useState, useEffect } from "react"
import { CurrencyState } from "../CurrencyContext"
import { CoinHistoricData } from "../config/api"
import axios from "axios"


const CoinChart = (coin) => {

  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)

  const { currency } = CurrencyState()

  const fetchCoinHistoricData = async () => {
    const { data } = await axios.get(CoinHistoricData(coin.id, days, currency))
    setHistoricalData(data.prices)    
  }

  useEffect(() => {
    fetchCoinHistoricData()    
  }, [])

  console.log("CoinHistoricData: ", CoinHistoricData)
  console.log("historicalData: ", historicalData)


  return (
    <div>
      CoinChart
    </div>
  )
}


export default CoinChart