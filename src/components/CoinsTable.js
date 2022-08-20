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
  TextField
} from "@material-ui/core"
import axios from "axios"
import { AllCoinsMarketData } from "../config/api"
import { CurrencyState } from "../CurrencyContext"


const CoinsTable = () => {
  
  const [coins, setCoins] = useState([])

  const { currency } = CurrencyState()

  const fetchAllCoinsMarketData = async () => {
    const { data } = await axios.get(AllCoinsMarketData(currency))   
    setCoins(data)
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
      <TextField>
        
      </TextField>
      <TableContainer>
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
      </TableContainer>
    </Container>
  )
}


export default CoinsTable