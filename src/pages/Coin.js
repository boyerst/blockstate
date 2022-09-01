import "../App.css"
import { makeStyles, Typography } from "@material-ui/core"
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { CurrencyState } from "../CurrencyContext"
import { CoinMarketData } from "../config/api"
import CoinChart from "../components/CoinChart"
import axios from "axios"
import ReactHtmlParser from 'react-html-parser'




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
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25, 
    borderRight: "2px solid black"
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Open Sans"
  },
  description: {
    width: "100%",
    fontFamily: "Open Sans",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify"
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
        <img 
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div>
          <span>
            <Typography variant="h5" className={classes.heading} style={{ fontFamily: "Open Sans" }}>
              Rank: 
            </Typography>
            <Typography>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span>
            <Typography variant="h5" className={classes.heading} style={{ fontFamily: "Open Sans" }}>
              Current Price: 
            </Typography>
            <Typography>
              {coin?.market_data.current_price.usd}
            </Typography>
          </span>
          <span>
            <Typography variant="h5" className={classes.heading} style={{ fontFamily: "Open Sans" }}>
              Market Cap: 
            </Typography>
            <Typography>
              {coin?.market_data.market_cap.usd}
            </Typography>
          </span>
        </div>
      </div>
      <CoinChart />
    </div>       
  ) 
}




export default Coin