import React, { useState, useEffect } from "react"
import axios from "axios"
import { makeStyles } from "@material-ui/core"




const useStyles = makeStyles(() => ({

}))



function TrendingCarousel() {

  const [trending, setTrending] = useState([])

  const classes = useStyles()


  return (
    <span>Trending Coins</span>

  )

}





export default TrendingCarousel
