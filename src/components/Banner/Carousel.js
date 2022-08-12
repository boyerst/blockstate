import { makeStyles } from "@material-ui/core"
import axios from "axios"
import { CurrencyState } from "../../CurrencyContext"


const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center"
  }
}))

const Carousel = () => {

  const classes = useStyles()

  const { currency, setCurrency } = CurrencyState()

  return (
    <div className={classes.carousel}>
      Carousel
    </div>

  )    
}

export default Carousel