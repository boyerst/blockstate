import "../App.css"
import { makeStyles, Typography, LinearProgress } from "@material-ui/core"
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { CurrencyState } from "../CurrencyContext"
import { CoinMarketData } from "../config/api"
import CoinChart from "../components/CoinChart"
import axios from "axios"
import ReactHtmlParser from "react-html-parser"
import { numberWithCommas, formatDate } from "../utils/utils"





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
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
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

  if (!coin) return <LinearProgress style={{ backgroundColor: "#0582CA" }}/>

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
        <div className={classes.marketData}>
          <span style ={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank: 
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Open Sans" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style ={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price: 
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Open Sans" }}>
              {symbol}{" "}
              {currency === "USD" && coin?.market_data.current_price[currency.toLowerCase()] > 1 ?
                numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()]) 
                : coin?.market_data.current_price[currency.toLowerCase()]
              } 
            </Typography>
          </span>
          <span style ={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap: 
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Open Sans" }}>
              {symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style ={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Circulating / { coin?.market_data.max_supply ? "Max Supply" : "Total Supply"}:
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Open Sans" }}>
              {numberWithCommas(coin?.market_data.circulating_supply.toFixed(2))} / { numberWithCommas(coin?.market_data.max_supply || coin?.market_data.total_supply.toFixed(2)) }
            </Typography>
          </span>
          <span style ={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              ATH:
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Open Sans" }}>
              {symbol}{" "}
              {currency === "USD" && coin?.market_data.ath[currency.toLowerCase()] > 1 ?
                numberWithCommas(coin?.market_data.ath[currency.toLowerCase()]) 
                : coin?.market_data.ath[currency.toLowerCase()]
              } on {formatDate(coin?.market_data.ath_date[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style ={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              ATL:
            </Typography>
            <Typography variant="h5" style={{ fontFamily: "Open Sans" }}>
              {symbol}{" "}
              {currency === "USD" && coin?.market_data.atl[currency.toLowerCase()] > 1 ?
                numberWithCommas(coin?.market_data.atl[currency.toLowerCase()]) 
                : coin?.market_data.atl[currency.toLowerCase()]
              } on {formatDate(coin?.market_data.atl_date[currency.toLowerCase()])}
            </Typography>
          
          </span>
        </div>
      </div>
      <CoinChart />
    </div>       
  ) 
}




export default Coin