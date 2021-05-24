import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    top: 0,
    left: 0,
    boxShadow: "0 .2rem .5rem rgba(0,0,0,.1) !important",
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
    borderRadius: 0,
  },

  appName: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  mobileListItem: {
    color: "#000",
    margin: 5,
    width: 240,
    "&:hover": {
      backgroundColor: fade("#f0f4f8", 1),
    },
  },

  toolbar: {
    height: "20px !important",
    minHeight: 14,
    marginTop: 4,
    marginBottom: 14,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.6),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    borderRadius: "1000px",
    border: "1px solid #aaa",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#aaaaaa",
  },
  inputRoot: {
    color: "inherit",
    borderRadius: 0,
    height: 26,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      // width: "24ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // drawer
  list: {
    width: 300,
  },

  listItem: {
    color: theme.palette.common.black,
  },
}));

export default useStyles;
