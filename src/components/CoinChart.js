import { useState } from "react"
import { CurrencyState } from "../CurrencyContext"


const CoinChart = () => {

  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)

  const { currency, symbol } = CurrencyState()

  return (
    <div>
      CoinChart
    </div>
  )
}

export default CoinChart