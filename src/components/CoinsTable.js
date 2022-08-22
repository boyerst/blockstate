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
  LinearProgress
} from "@material-ui/core"
import axios from "axios"
import { AllCoinsMarketData } from "../config/api"
import { CurrencyState } from "../CurrencyContext"


const CoinsTable = () => {
  
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const { currency } = CurrencyState()

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
        style={{ margin: 18, fontFamily: "Open Sans" }}
      >
        Cryptocurrencies by Market Cap
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
                {["Coin", "Price", "24H Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      fontWeight: "700",
                      fontFamily: "Open Sans"
                    }}
                    key={head}
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}

              </TableRow>
            </TableHead>
            <TableBody>
            {
              handleSearch().map((row) => {
                return (
                  <TableRow
                    key={row.name}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      styles={{
                        display: "flex",
                        gap: 15
                      }}
                    >
                      <img 
                        src={row?.image}
                        alt={row.name}
                        height="50"
                      />
                    </TableCell>
                  </TableRow>
                )    
              })
            }
          
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  )
}


export default CoinsTable