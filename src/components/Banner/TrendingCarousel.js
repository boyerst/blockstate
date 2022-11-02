import React, { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { makeStyles, Box } from "@material-ui/core"
import AliceCarousel from "react-alice-carousel"
import axios from "axios"
import Skeleton from "@material-ui/lab/Skeleton"
import { TrendingCoins, TrendingCoinsData } from "../../config/api"
// import { } from "../../config/api"



const useStyles = makeStyles(() => ({
  carousel: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 60
  },
  carouselItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  carouselData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textTransform: "uppercase"
  }
}))



function TrendingCarousel() {

  const classes = useStyles()

  const [trending, setTrending] = useState([])
  const [ids, setIds] = useState([])
  const [trendingData, setTrendingData] = useState([])
  const [trendingLoading, setTrendingLoading] = useState(false)


  const fetchTrendingCoins = async () => {
    setTrendingLoading(true)
    const { data } = await axios.get(TrendingCoins())
    const { coins, exchanges } = data
    setTrending(coins)
    const coinIds = coins.map((coin) => coin.item.id)
    setIds(coinIds)
    setTrendingLoading(false)
  }


  const fetchTrendingCoinsData = async () => {
    const { data } = await axios.get(TrendingCoinsData(ids))
    setTrendingData(data)
    console.log("🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️TRENDING COINS DATA ", data) 
  }


  useEffect(() => {
    fetchTrendingCoins()
  }, [])


  useMemo(() => {
    fetchTrendingCoinsData()
  }, [ids])


  console.log("🟢trending: ", trending)
  console.log("🟢trending ID: ", trending[0]?.item.id)
  console.log("🇺🇸ids: ", ids)
  console.log("🇺🇸ids[]: ", ids[1])
  console.log("💰trendingData: ", trendingData)


  const items = trendingData.map((coin) => {

    const profit = coin?.price_change_percentage_24h >= 0
    
    return (
      <Box>
        {
          trendingLoading ? (
            <Skeleton variant="rect" width={400} height={50} />
          ) : (
            <Link
              to={`/coins/${coin.id}`}
              className={classes.carouselItem}
            >
              <img
                src={coin?.image}
                alt={coin?.name}
                height="50"
                width="50"
                style={{ marginRight: 15 }}
              />
              <Box className={classes.carouselData}>
                <span style={{ fontSize: 18, fontWeight: 500 }}>
                  {coin?.symbol}
                </span>
                <span>
                 $ {coin?.current_price}
                </span>
                <span
                  style={{
                      color: profit > 0 ? "rgb(14, 203, 129)" : "red"
                  }}
                >
                  {profit && "+"}
                  {coin?.price_change_percentage_24h.toFixed(2)} %
                </span>
              </Box>
            </Link>
          )
        }
      </Box>
    )
  })

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 5,
    }
  }


  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlay
        autoPlayInterval={4000}
        animationDuration={1500}
        autoPlayDirection="rtl"
        // paddingLeft={195}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
      />
    </div>

  )


}





export default TrendingCarousel
