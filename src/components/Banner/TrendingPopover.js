import React, { useState } from "react"
import "../../App.css"
import {
  makeStyles, Typography, Box, Popover
} from "@material-ui/core"
import InfoIcon from "@material-ui/icons/Info"



const useStyles = makeStyles(() => ({

  carouselHeader: {
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
  },
  popover: {
    pointerEvents: "none",
  }
}))


function TrendingPopover() {


  const classes = useStyles()
  const [popover, setPopover] = useState(null)


  const handlePopoverOpen = (e) => {
    setPopover(e.currentTarget)
  }
  const handlePopoverClose = () => {
    setPopover(null)
  }
  const open = Boolean(popover)


  return (

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
      <InfoIcon
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{
          fontSize: "medium",
          marginTop: 2,
          marginLeft: 3,
          color: "#BCBCBC6B"
        }}
      />
      <Popover
        className={classes.popover}
        open={open}
        popover={popover}
        onClose={handlePopoverClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 160, left: 650 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Typography style={{ padding: 5 }}>
          List of trending cryptocurrencies is based on coins that people have been searching for on CoinGecko for the past 3 hours.
        </Typography>
      </Popover>
    </Box>


  )


}




export default TrendingPopover













