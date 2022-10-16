import "../App.css"
import { makeStyles, AppBar, Container, Toolbar, Typography, Select, MenuItem, Switch, Grid } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { CurrencyState } from "../CurrencyContext"
import { GlobalMarketData } from "../config/api"
import { numberWithCommas } from "../utils/utils"
import axios from "axios"
import Logo from '../logo.png'


const useStyles = makeStyles((theme) => ({
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
    width: 100,
    borderBottom: "1px solid #0582CA",
    "&:hover": {
      borderBottom: "2px solid #0582CA"
    }
  },
  switchBase: {
    color: "#0582CA",
    "&.Mui-checked": {
      color: "#0582CA"
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#87888A",
    }
  },
  globalBar: {
    borderBottom: "1px solid grey"
  }
}))




const Header = (props, disabled) => {

  const [globalMarket, setGlobalMarket] = useState([])
  const [globalLoading, setGlobalLoading] = useState(true)

  const classes = useStyles()

  const history = useHistory()

  const { currency, setCurrency } = CurrencyState()


  const fetchGlobalData = async () => {
    setGlobalLoading(true)
    const { data: { data } } = await axios.get(GlobalMarketData())       
    setGlobalMarket(data)
    setGlobalLoading(false)
  }

  useEffect(() => {
    fetchGlobalData()
  }, [])


  console.log("GlobalMarket (Header): ", globalMarket)


  return(
    <AppBar color="transparent" position="static" elevation={20} >
      <Container maxWidth="xl" className={classes.globalBar}>
        <Toolbar variant="dense">
         {
            globalLoading ? (
              <Skeleton variant="rect" width={400} height={20} />
              ) : (
              <Grid container justifyContent="flex-start" spacing={7}>
                <Grid item>Coins: {numberWithCommas(globalMarket.active_cryptocurrencies)}</Grid>
                <Grid item>Market Cap: {numberWithCommas(globalMarket.total_market_cap.usd)}</Grid>
                <Grid item>24h Vol: {numberWithCommas(globalMarket.total_volume.usd)}</Grid>
                <Grid item>
                  Dominance: 
                  BTC: {globalMarket.market_cap_percentage.btc.toFixed(2)} %
                  ETH: {globalMarket.market_cap_percentage.eth.toFixed(2)} %
                </Grid>
              </Grid>
            )
          }
        </Toolbar>
      </Container>
      <Container maxWidth="xl">
        <Toolbar>
          <img src={Logo} height="60" width="80" alt="" style={{marginRight: -19}}/>
          <Typography 
            className={classes.title}
            onClick={() => history.push("/")}
            variant="h4"
          >
            BlockState
{/*            <Typography
              variant="subtitle2"
            >
              The State of The Blockchain
            </Typography>*/}
          </Typography>
          <Select 
            className={classes.select}
            variant="filled"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"BTC"}>BTC</MenuItem>
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


 