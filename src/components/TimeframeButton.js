import { makeStyles } from "@material-ui/core"


const useStyles = makeStyles(({selected}) => ({
  selectbutton: {
    border: "1px solid #0582CA",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Open Sans",
    cursor: "pointer",
    backgroundColor: selected ? "#0582CA" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "#0582CA",
      color: "black",
    },
    width: "22%",
    margin: 5
  }
}))

const TimeframeButton = ({children, onClick, selected}) => {


  const classes = useStyles()

  return(
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  )
}

export default TimeframeButton