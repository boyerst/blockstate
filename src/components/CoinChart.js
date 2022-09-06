import { useState, useEffect } from "react"
import { CurrencyState } from "../CurrencyContext"
import { makeStyles } from "@material-ui/core"
import { CoinHistoricData } from "../config/api"
import axios from "axios"
import { chartDays } from "../config/chartData";


const useStyles = makeStyles({});


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
  }, [currency, days])

  console.log("CoinHistoricData: ", CoinHistoricData)
  console.log("historicalData: ", historicalData)

  const classes = useStyles()

  
  return (
    <div className={classes.container}>
      CoinChart
    </div>
  )
}


export default CoinChart