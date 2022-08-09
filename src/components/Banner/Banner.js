import "../../App.css"
import { makeStyles, Container } from "@material-ui/core"


const useStyles = makeStyles(() => ({
  bannerContent: {
    height: 400, 
    display: "flex",
    flexDirection: "column",
    paddingTop: 25, 
    justifyContent: "space-around",
  }
}))


const Banner = () => {

  const classes = useStyles()

  return (
    <div>
      <Container className={classes.bannerContent}>
        <div>
          Banner
          
        </div>
      </Container>
    </div>
  )
}


export default Banner