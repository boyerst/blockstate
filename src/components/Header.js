import "../App.css"
import { makeStyles, AppBar, Container, Toolbar, Typography, Select, MenuItem, Switch } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { CurrencyState } from "../CurrencyContext"


const useStyles = makeStyles(() => ({
  title: {
    flex: 1, 
    color: "#0582CA",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    cursor: "pointer"
  }
  
}))




const Header = (props) => {

  const classes = useStyles()

  const history = useHistory()

  const { currency, setCurrency } = CurrencyState()

  return(
    <AppBar color='transparent' position='static' >
      <Container>
        <Toolbar>
          <Typography 
            className={classes.title}
            onClick={() => history.push("/")}
            variant="h6"
          >
            BlockState
          </Typography>
          <Select 
            variant="outlined"
            style={{
              width: 100,
              height: 40, 
              marginLeft: 15
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"BTC"}>BTC</MenuItem>
          </Select>
          <Switch checked={props.darkMode} onChange={() => props.handleDarkMode()}/>
        </Toolbar>
      </Container>
    </AppBar>
  )
}


export default Header


 