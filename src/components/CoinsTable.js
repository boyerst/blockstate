import React, { useState, useEffect } from "react"
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TextField,
  makeStyles,
  Grid
} from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import Skeleton from "@material-ui/lab/Skeleton"
import SearchIcon from '@material-ui/icons/Search'
import axios from "axios"
import { useHistory } from "react-router-dom"
import { AllCoinsMarketData, GlobalMarketData } from "../config/api"
import { CurrencyState } from "../CurrencyContext"
import { numberWithCommas } from "../utils/utils"





const useStyles = makeStyles(() => ({
  row: {
    fontFamily: "Open Sans",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0582CA2B"
    }
  },
  data: {
    fontSize: "16px"
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "#0582CA"
    }
  },
  skeleton: {
    height: 90,
    marginBottom: 6
  },
  search: {
    "& label.Mui-focused": {
      color: "#0582CA",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0582CA",
    },
  }
}))




function CoinsTable() {

  const [coins, setCoins] = useState([])
  const [globalMarket, setGlobalMarket] = useState([])
  const [loading, setLoading] = useState(false)
  const [globalLoading, setGlobalLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const { currency, symbol } = CurrencyState()
  const history = useHistory()
  const classes = useStyles()
  const skelements = Array(30).fill('h2')

  const fetchAllCoinsMarketData = async () => {
    setLoading(true)
    const { data } = await axios.get(AllCoinsMarketData(currency))
    setCoins(data)
    setLoading(false)
  }

  const fetchGlobalData = async () => {
    setGlobalLoading(true)
    const { data: { data } } = await axios.get(GlobalMarketData())
    setGlobalMarket(data)
    setGlobalLoading(false)
  }


  useEffect(() => {
    fetchAllCoinsMarketData()
    fetchGlobalData()
  }, [currency])


  console.log("AllCoinsMarketData: ", currency, coins)
  console.log("GlobalMarketData: ", globalMarket)


  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    )
  }

  const marketCapProfit = globalMarket.market_cap_change_percentage_24h_usd > 0

  return (

    <Container>
      <div style={{ width: "100%", margin: 30, marginBottom: 70 }}>
        <Grid container alignItems="flex-end">
          <Grid item>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Open Sans",
                fontWeight: 700,
                marginBottom: 20
              }}
            >
              Today's Cryptocurrencies by Market Cap
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: "Open Sans",
                fontWeight: 500
              }}
            >
              {
                globalLoading ? (
                  <Skeleton variant="rect" width={400} height={30} />
                ) : (
                  <span>
                    Today's Global Market Cap Is {symbol}{" "}
                    {numberWithCommas(globalMarket.total_market_cap.usd.toFixed(0))}
                    {globalMarket.total_market_cap > "999999999" ? " B" : " M"},
                    &nbsp;
                    a
                    <span
                      style={{
                        color: marketCapProfit > 0 ? "rgb(14, 203, 129)" : "red",
                        padding: 8
                      }}
                    >
                      {marketCapProfit ? "↑ " : "↓ "}
                      {globalMarket.market_cap_change_percentage_24h_usd.toFixed(2)} %
                    </span>
                    {marketCapProfit > 0 ? "increase" : "decrease"}
                    &nbsp;
                    in 24h
                  </span>
                )
              }
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <SearchIcon style={{ marginTop: 15, marginRight: 5 }} />
            <TextField
              className={classes.search}
              id="input-with-icon-grid"
              label="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
      <TableContainer>
        {
          loading ? (
            skelements.map((skelement) => (
              <Typography component="div" key={skelement} variant={skelement}>
                <Skeleton animation="wave" className={classes.skeleton} />
              </Typography>))
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {["Coin", "Price", "24h %", "24h Volume", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        fontWeight: 700,
                        fontFamily: "Open Sans",
                        fontSize: 16
                      }}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}

                </TableRow>
              </TableHead>
              <TableBody>
                {
                  handleSearch()
                    .slice((page - 1) * 30, (page - 1) * 30 + 30)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0
                      return (
                        <TableRow
                          key={row.name}
                          onClick={() => history.push(`/coins/${row.id}`)}
                          className={classes.row}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: 15,
                                flex: 10
                              }}
                            >
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="50"
                                style={{ marginBottom: 10 }}
                              />
                              <div
                                style={{ display: "flex", flexDirection: "column" }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span
                                  style={{
                                    color: "darkgrey"
                                  }}
                                >
                                  {row.name}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell
                            className={classes.data}
                            align="right"
                          >
                            {symbol}{" "}
                            {currency === "USD" ? numberWithCommas(row.current_price.toFixed(2))
                              : row.id === "bitcoin" ? row.current_price.toFixed(0)
                                : row.current_price.toFixed(8)}
                          </TableCell>
                          <TableCell
                            className={classes.data}
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 400,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            className={classes.data}
                            align="right"
                          >
                            {symbol}{" "}
                            {numberWithCommas(row.total_volume.toString())}
                          </TableCell>
                          <TableCell
                            className={classes.data}
                            align="right"
                          >
                            {symbol}{" "}
                            {numberWithCommas(row.market_cap.toString())}
                          </TableCell>
                        </TableRow>
                      )
                    })
                }
              </TableBody>
            </Table>
          )
        }
      </TableContainer>
      <Pagination
        count={(handleSearch()?.length || 0 / 30).toFixed(0)}
        onChange={(_, value) => {
          setPage(value)
          window.scroll(0, 370)
        }}
        style={{
          paddingTop: 40,
          paddingBottom: 180,
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
        classes={{ ul: classes.pagination }}
      />
    </Container>
  )
}


export default CoinsTable
