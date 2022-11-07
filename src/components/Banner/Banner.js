import React from "react"
import "../../App.css"
import {
  makeStyles, Container, Typography, Box
} from "@material-ui/core"
import InfoIcon from '@material-ui/icons/Info'
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
  },
  carouselHeader: {
    // backgroundColor: "#2A2A2A0D",
    backgroundColor: "#0582CA5E",
    width: 160,
    height: 36,
    borderColor: "text.primary",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: 5
  },
  trending: {
    display: "flex",
    flexDirection: "row"
  }
}))



function Banner() {


  const classes = useStyles()

  return (
    <div>
      <Container className={classes.container}>
        <Box className={classes.trending}>
          <Box className={classes.carouselHeader}>
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: 700,
                fontFamily: "Open Sans",
              }}
            >
              Trending Coins
            </Typography>
          </Box>
          <InfoIcon style={{fontSize: "medium", marginTop: 4, marginLeft: 3}}/>
        </Box>
        <TrendingCarousel />
        <Box className={classes.carouselHeader}>
          <Typography
            variant="subtitle1"
            style={{
              fontWeight: 700,
              fontFamily: "Open Sans",
            }}
          >
            Top Coins
          </Typography>
        </Box>
        <TopCarousel />
      </Container>
    </div>
  )
}


export default Banner
