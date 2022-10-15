import "../App.css"
import { makeStyles, AppBar, Container, Toolbar, Typography, Select, MenuItem, Switch } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { CurrencyState } from "../CurrencyContext"
import Logo from '../logo.png'


const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1, 
    color: "#0582CA",
    fontFamily: "Fredoka",
    fontWeight: 600,
    cursor: "pointer"
  },
  select: {
    margin: 10,
    paddingBottom: 15, 
    paddingLeft: 5,
    maxHeight: 35,
    width: 100,
    borderBottom: "1px solid #0582CA",
    "&:hover": {
      borderBottom: "2px solid #0582CA"
    }
  },
  switchBase: {
    color: "#0582CA",
    "&.Mui-checked": {
      color: "#0582CA"
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#87888A",
    }
  },
  globalBar: {
    borderBottom: "1px solid grey",
  }
}))




const Header = (props, disabled) => {

  const classes = useStyles()

  const history = useHistory()

  const { currency, setCurrency } = CurrencyState()


  return(
    <AppBar color="transparent" position="static" elevation={20} >
      <Container maxWidth="xl">
        <Toolbar variant="dense" className={classes.globalBar}>
      
          
        </Toolbar>
      </Container>
      <Container maxWidth="xl">
        <Toolbar>
          <img src={Logo} height="60" width="80" alt="" style={{marginRight: -19}}/>
          <Typography 
            className={classes.title}
            onClick={() => history.push("/")}
            variant="h4"
          >
            BlockState
{/*            <Typography
              variant="subtitle2"
            >
              The State of The Blockchain
            </Typography>*/}
          </Typography>
          <Select 
            className={classes.select}
            variant="filled"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"BTC"}>BTC</MenuItem>
          </Select>
          <Switch 
            classes={{
              switchBase: classes.switchBase,
            }}
            checked={props.darkMode} 
            onChange={() => props.handleDarkMode()}
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}


export default Header


 