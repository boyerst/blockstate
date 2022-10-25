import React, { useState, useEffect } from "react"
import { TrendingCoins } from "../../config/api"
import axios from "axios"
import { makeStyles } from "@material-ui/core"




const useStyles = makeStyles(() => ({

}))



function TrendingCarousel() {

  const [trending, setTrending] = useState([])

  const classes = useStyles()


  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins())
    const { coins, exchanges } = data
    setTrending(coins)
  }


  useEffect(() => {
    fetchTrendingCoins()
  }, [])

  console.log("🟢trending: ", trending)


  return (
    <span>Trending Coins</span>



  )

}





export default TrendingCarousel
