import { useState } from "react"
import { CurrencyState } from "../CurrencyContext"
import { CoinHistoricData } from "../config/api"
import axios from "axios"


const CoinChart = () => {

  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)

  const { currency, symbol } = CurrencyState()

  const fetchCoinHistoricData = async () => {
    const { data } = await axios.get(CoinHistoricData(coin.id, days, currency))
    setHistoricalData(data.prices)    
  }

  console.log("CoinHistoricData: ", CoinHistoricData)


  return (
    <div>
      CoinChart
    </div>
  )
}


export default CoinChart