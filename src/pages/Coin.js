import "../App.css"
import { makeStyles, Typography, Box } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
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
    marginTop: 140, 
    paddingRight: 15,
    paddingLeft: 15
    // borderRight: "2px solid black"
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Open Sans"
  },
  description: {
    width: "100%",
    fontFamily: "Open Sans",
    padding: 55,
    // paddingBottom: 45,
    paddingTop: 15,
    textAlign: "justify"
  },
  marketData: {
    alignItems: "center",
    padding: 20,
    width: "90%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
      marginBottom: 40
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

  const profit = coin?.market_data.price_change_percentage_24h_in_currency[currency.toLowerCase()] > 0

  if (!coin) return <Skeleton variant="circle" />

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
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <Box className={classes.marketData} border={1} borderRadius="3%" borderColor="grey.400">
          <div>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" className={classes.heading}>
                Market Cap Rank
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h6">
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" className={classes.heading}>
                Market Cap
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h6">
                {symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()])}
              </Typography>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" className={classes.heading}>
                Current Price
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h6" style={{ fontFamily: "Open Sans", justifyContent: "space-between" }}>
                {symbol}{" "}
                {currency === "USD" && coin?.market_data.current_price[currency.toLowerCase()] > 1 ?
                  numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()]) 
                  : coin?.market_data.current_price[currency.toLowerCase()]
                } 
              </Typography>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" className={classes.heading}>
                24h Price Change
              </Typography>
              &nbsp; &nbsp;
              <Typography 
                variant="h6" 
                style={{ 
                  fontFamily: "Open Sans", 
                  justifyContent: "space-between", 
                  color: profit === true ? "rgb(14, 203, 129)"  : "red"
                }}
              >
                {coin?.market_data.price_change_percentage_24h_in_currency[currency.toLowerCase()].toFixed(2)} %
              </Typography>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" className={classes.heading}>
                7d Price Change
              </Typography>
              &nbsp; &nbsp;
              <Typography 
                variant="h6" 
                style={{ 
                  fontFamily: "Open Sans", 
                  justifyContent: "space-between", 
                  color: profit === true ? "rgb(14, 203, 129)"  : "red"
                }}
              >
                {coin?.market_data.price_change_percentage_7d_in_currency[currency.toLowerCase()].toFixed(2)} %
              </Typography>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" className={classes.heading}>
                24h Trading Volume
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h6" style={{ fontFamily: "Open Sans", justifyContent: "space-between" }}>
                {symbol}{" "}
                {numberWithCommas(coin?.market_data.total_volume[currency.toLowerCase()])}
              </Typography>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" className={classes.heading}>
                Circulating Supply
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h6">
                {numberWithCommas(coin?.market_data.circulating_supply.toFixed(0))}
              </Typography>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" className={classes.heading}>
                {coin?.market_data.max_supply ? "Max Supply" : "Total Supply"}
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h6">
                {
                  coin?.market_data.max_supply 
                  ? numberWithCommas(coin?.market_data.max_supply.toFixed(0)) 
                  : coin?.market_data.total_supply
                  ? numberWithCommas(coin?.market_data.total_supply.toFixed(0)) 
                  : "ꝏ "
                }
              </Typography>
            </span>
            { 
              Object.keys(coin.market_data.fully_diluted_valuation).length === 0 
              ? " "
              : <span style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" className={classes.heading}>
                    Fully Diluted Valuation
                  </Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h6">
                    {symbol}{" "}
                    {numberWithCommas(coin?.market_data.fully_diluted_valuation[currency.toLowerCase()])}
                  </Typography>
                </span>
            }
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" className={classes.heading}>
                ATH
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h6">
                {symbol}{" "}
                {currency === "USD" && coin?.market_data.ath[currency.toLowerCase()] > 1 ?
                  numberWithCommas(coin?.market_data.ath[currency.toLowerCase()]) 
                  : coin?.market_data.ath[currency.toLowerCase()]
                } on {formatDate(coin?.market_data.ath_date[currency.toLowerCase()])}
              </Typography>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between"}}>
              <Typography variant="h6" className={classes.heading}>
                ATL
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h6">
                {symbol}{" "}
                {currency === "USD" && coin?.market_data.atl[currency.toLowerCase()] > 1 ?
                  numberWithCommas(coin?.market_data.atl[currency.toLowerCase()]) 
                  : coin?.market_data.atl[currency.toLowerCase()]
                } on {formatDate(coin?.market_data.atl_date[currency.toLowerCase()])}
              </Typography>
            </span>
          </div>
        </Box>
      </div>
      <CoinChart coin={coin}/>
    </div>       
  ) 
}




export default Coin