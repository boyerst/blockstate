import { useState } from "react"
import axios from "axios"
import { AllCoinsMarketData } from "../config/api"
import { CurrencyState } from "../CurrencyContext"


const CoinsTable = () => {
  
  const [coins, setCoins] = useState([])

  const { currency } = CurrencyState()

  const fetchAllCoinsMarketData = async () => {
    const { data } = await axios.get(AllCoinsMarketData(currency))   
    setCoins(data)
  }

  console.log("AllCoinsMarketData: ", coins)


  return (
    <div>
      CoinsTable
    </div>
  )
}


export default CoinsTable