import React, { useState, useEffect } from "react"
import { makeStyles, CircularProgress } from "@material-ui/core"
import { ToggleButton } from "@material-ui/lab"
import axios from "axios"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js'
import { CurrencyState } from "../CurrencyContext"
import { chartDays } from "../config/chartData"
import { CoinHistoricData } from "../config/api"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)


const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 130,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
  selectButton: {
    border: "1px solid #0582CA",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
    fontFamily: "Open Sans",
    fontWeight: 500,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0582CA",
      color: "black",
    },
    width: "22%",
    margin: 5
  },
  selected: {
    "&&": {
      backgroundColor: "#0582CA",
      color: "black",
      fontWeight: 700
    }
  }
}))


function CoinChart({ coin }) {

  const classes = useStyles()
  const { currency } = CurrencyState()

  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)
  const [selected, setSelected] = useState(false)


  const fetchCoinHistoricData = async () => {
    const { data } = await axios.get(CoinHistoricData(coin.id, days, currency))
    setHistoricalData(data.prices)
  }


  useEffect(() => {
    fetchCoinHistoricData()
  }, [currency, days])


  // console.log("CoinHistoricData: ", CoinHistoricData)
  // console.log("historicalData: ", historicalData)


  return (
    <div className={classes.container}>
      {
        !historicalData ? (
          <CircularProgress
            style={{ color: "#0582CA" }}
            size={150}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  const date = new Date(coin[0])
                  const time = date.getHours() > 12
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
                },
                scales: {
                  y: {
                    grid: {
                      display: false
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
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
                <ToggleButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setSelected(!selected)
                  }}
                  selected={day.value === days}
                  value="toggle"
                  className={classes.selectButton}
                  classes={{ selected: classes.selected }}
                >
                  {day.label}
                </ToggleButton>
              ))}
            </div>
          </>
        )
      }
    </div>
  )
}


export default CoinChart
