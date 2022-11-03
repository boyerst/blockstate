// import React from "react"
import "../../App.css"
import { makeStyles, Container, Typography, Box } from "@material-ui/core"
import TopCarousel from "./TopCarousel"
import TrendingCarousel from "./TrendingCarousel"




const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 60,
    paddingBottom: 60
  }
}))


function Banner() {

  const classes = useStyles()

  return (
    <div>
      <Container className={classes.container}>
        <Typography
          variant="h6"
          style={{
            marginLeft: 20,
            fontWeight: 700,
            fontFamily: "Open Sans",
            textAlign: "left",
            border: "red"
          }}
        >
          Trending Coins
        </Typography>
        <TrendingCarousel />
        <Typography
          variant="h6"
          style={{
            marginLeft: 20,
            fontWeight: 700,
            fontFamily: "Open Sans",
            textAlign: "left",
            paddingTop: 70
          }}
        >
          Top Coins
        </Typography>
        <TopCarousel />
      </Container>
    </div>
  )
}


export default Banner
