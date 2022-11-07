import React, { useState, useEffect } from "react"
import "../App.css"
import {
  makeStyles, AppBar, Container, Toolbar, Typography, Select, MenuItem, Switch, Grid, Icon
} from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { CurrencyState } from "../CurrencyContext"
import { GlobalMarketData } from "../config/api"
import { numberWithCommas } from "../utils/utils"
import Logo from "../assets/logo.png"
import Bitcoin from "../assets/bitcoin-icon.png"
import Usd from "../assets/usd-icon.png"



const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#0582CA",
    fontFamily: "Fredoka",
    fontWeight: 600,
    cursor: "pointer"
  },
  select: {
    margin: 10,
    paddingBottom: 15,
    paddingLeft: 5,
    maxHeight: 35,
    width: 57,
    borderRadius: "10%",
    "&:hover": {
      backgroundColor: "#87888A"
    }
  },
  switchBase: {
    color: "#0582CA",
    "&.Mui-checked": {
      color: "#0582CA"
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#87888A"
    }
  },
  globalBar: {
    borderBottom: "1px solid grey",
    fontSize: 14
  },
  metric: {
    fontWeight: 700
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -12
  },
  image: {
    height: 23,
    width: 23
  }
}))




function Header(props) {

  const classes = useStyles()
  const history = useHistory()
  const { currency, setCurrency } = CurrencyState()

  const [globalMarket, setGlobalMarket] = useState([])
  const [globalLoading, setGlobalLoading] = useState(true)



  const fetchGlobalData = async () => {
    setGlobalLoading(true)
    const { data: { data } } = await axios.get(GlobalMarketData())
    setGlobalMarket(data)
    setGlobalLoading(false)
  }


  useEffect(() => {
    fetchGlobalData()
  }, [])

  const marketCapProfit = globalMarket.market_cap_change_percentage_24h_usd > 0

  console.log("GlobalMarket (Header): ", globalMarket)


  return (
    <AppBar color="transparent" position="static" elevation={20}>
      <Container maxWidth="xl" className={classes.globalBar}>
        <Toolbar variant="dense">
          {
            globalLoading ? (
              <Skeleton variant="rect" width={400} height={20} />
            ) : (
              <Grid container justifyContent="flex-start" spacing={5}>
                <Grid item>
                  <span className={classes.metric}>
                    Coins: &nbsp;
                  </span>
                  {numberWithCommas(globalMarket.active_cryptocurrencies)}
                </Grid>
                <Grid item>
                  <span className={classes.metric}>
                    Market Cap: &nbsp;
                  </span>
                  ${numberWithCommas(globalMarket.total_market_cap.usd)}
                  <span style={{ paddingLeft: 10, color: marketCapProfit > 0 ? "rgb(14, 203, 129)" : "red" }}>
                    {marketCapProfit ? "↑ " : "↓ "}
                    {globalMarket.market_cap_change_percentage_24h_usd.toFixed(2)} %
                  </span>
                </Grid>
                <Grid item>
                  <span className={classes.metric}>
                    24h Vol: &nbsp;
                  </span>
                  ${numberWithCommas(globalMarket.total_volume.usd)}
                </Grid>
                <Grid item>
                  <span className={classes.metric}>
                    Dominance: &nbsp;
                  </span>
                  (BTC) {globalMarket.market_cap_percentage.btc.toFixed(2)} %
                  &nbsp;
                  (ETH) {globalMarket.market_cap_percentage.eth.toFixed(2)} %
                </Grid>
              </Grid>
            )
          }
        </Toolbar>
      </Container>
      <Container maxWidth="xl">
        <Toolbar>
          <img src={Logo} height="60" width="80" alt="" style={{ marginRight: -19 }} />
          <Typography
            className={classes.title}
            onClick={() => history.push("/")}
            variant="h4"
          >
            BlockState
          </Typography>
          <Select
            className={classes.select}
            disableUnderline
            variant="filled"
            borderRadius="80%"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value="USD">
              <Icon className={classes.icon}>
                <img className={classes.image} src={Usd} alt="" />
              </Icon>
            </MenuItem>
            <MenuItem value="BTC">
              <Icon className={classes.icon}>
                <img className={classes.image} src={Bitcoin} alt="" />
              </Icon>
            </MenuItem>
          </Select>
          <Switch
            classes={{
              switchBase: classes.switchBase,
            }}
            checked={props.darkMode}
            onChange={() => props.handleDarkMode()}
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}


export default Header
