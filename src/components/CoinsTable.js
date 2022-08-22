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
      />
 
      <TableContainer>
        {
          loading ? (
            <LinearProgress />
          ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  )
}


export default CoinsTable