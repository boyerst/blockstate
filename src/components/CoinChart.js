import { useState, useEffect } from "react"
import { CurrencyState } from "../CurrencyContext"
import { makeStyles, CircularProgress } from "@material-ui/core"
import { CoinHistoricData } from "../config/api"
import axios from "axios"
import { chartDays } from "../config/chartData"
import TimeframeButton from "./TimeframeButton"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}))


const CoinChart = ( {coin} ) => {

  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)

  const { currency } = CurrencyState()

  const fetchCoinHistoricData = async () => {
    const { data } = await axios.get(CoinHistoricData(coin.id, days, currency))
    setHistoricalData(data.prices)    
  }

  useEffect(() => {
    fetchCoinHistoricData()    
  }, [currency, days])

  console.log("CoinHistoricData: ", CoinHistoricData)
  console.log("historicalData: ", historicalData)

  const classes = useStyles()


  return (
    <div className={classes.container}>
      {
        !historicalData ? (
          <CircularProgress
            style={{ color: "#0582CA" }}
            size={350}
            thickness={1}
          />
        ) : (
          <>
            <Line 
              data={{
                labels: historicalData.map((coin) => {  
                  let date = new Date(coin[0])
                  let time = date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`
                  return days === 1 ? time : date.toLocaleString()
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#0582CA",
                  }
                ]
              }}
              options={{
                elements: {
                  point: {
                    radius: 1
                  }
                }
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%"
              }}
            >
              {chartDays.map((day) => (
                <TimeframeButton
                  key={day.value}
                  onClick={() => {setDays(day.value)}}
                >
                  {day.label}  
                </TimeframeButton>    
              ))}
            </div>  
          </>
        )
      }
    </div>
  )
}


export default CoinChart