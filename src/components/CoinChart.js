import { useState, useEffect } from "react"
import { CurrencyState } from "../CurrencyContext"
import { makeStyles, CircularProgress } from "@material-ui/core"
import { CoinHistoricData } from "../config/api"
import axios from "axios"
import { chartDays } from "../config/chartData";


const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}))


const CoinChart = ( {coin} ) => {

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
      {
        !historicalData ? (
          <CircularProgress />
        ) : (
          <>
          </>
        )
      }
    </div>
  )
}


export default CoinChart