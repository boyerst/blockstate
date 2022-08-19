import axios from "axios"
import { AllCoinsMarketData } from "../config/api"
import { CurrencyState } from "../CurrencyContext"


const CoinsTable = () => {
  
  const { currency } = CurrencyState()

  const fetchAllCoinsMarketData = async () => {
    const { data } = await axios.get(AllCoinsMarketData(currency))   
  }



  return (
    <div>
      CoinsTable
    </div>
  )
}


export default CoinsTable