import axios from "axios"
import { AllCoinsMarketData } from "../config/api"


const CoinsTable = () => {
  
  const fetchAllCoinsMarketData = async () => {
    const { data } = await axios.get(AllCoinsMarketData())   
  }


  return (
    <div>
      CoinsTable
    </div>
  )
}


export default CoinsTable