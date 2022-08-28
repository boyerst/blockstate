import "../App.css"
import { makeStyles } from "@material-ui/core"
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { CurrencyState } from "../CurrencyContext"
import { CoinMarketData } from "../config/api"
import CoinChart from "../components/CoinChart"
import axios from "axios"



const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  }
}))


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

  const classes = useStyles()

  return(
    <div className={classes.container}>
   
      <div className={classes.sidebar}>
        {/*sidebar*/}
      </div>
      <CoinChart />
    </div>       
  ) 
}

export default Coin