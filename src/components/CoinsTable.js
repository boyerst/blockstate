import { useState, useEffect } from "react"
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
  LinearProgress,
  makeStyles
} from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { AllCoinsMarketData } from "../config/api"
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
  }
}))




const CoinsTable = () => {
  
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const history = useHistory()
  const { currency, symbol } = CurrencyState()
  const classes = useStyles()

  const fetchAllCoinsMarketData = async () => {
    setLoading(true)
    const { data } = await axios.get(AllCoinsMarketData(currency))   
    setCoins(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchAllCoinsMarketData()    
  }, [currency])


  console.log("AllCoinsMarketData: ", coins)


  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    )
  }


  return (
    <Container style={{ textAlign: "center" }}>
      <Typography
        variant="h5"
        style={{ 
            margin: 18, 
            fontFamily: "Open Sans"
          }}
      >
        Today's Cryptocurrencies by Market Cap
      </Typography>
      <TextField
        label="Search for coins..."
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)}
      />
 
      <TableContainer>
        {
          loading ? (
            <LinearProgress style={{ backgroundColor: "#0582CA" }}/>
          ) : (
          <Table>
            <TableHead>
              <TableRow>
                {["Coin", "Price", "24h %", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      fontWeight: "700",
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
                          color: profit > 0 ? "rgb(14, 203, 129)"  : "red",
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
                        {numberWithCommas(row.market_cap.toString())}
                      </TableCell>
                    </TableRow>
                  )    
              })
            }
          
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Pagination 
        count={(handleSearch()?.length/10).toFixed(0)}
        onChange={(_, value) => {
          setPage(value)  
          window.scroll(0, 100)  
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