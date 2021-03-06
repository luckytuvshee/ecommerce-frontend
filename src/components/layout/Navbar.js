import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import {
  getProductTypes,
  getProductBrands,
  searchText,
  fetchSearchResult,
} from "../../actions/product";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Favorite from "@material-ui/icons/FavoriteBorder";
import ShoppingCart from "@material-ui/icons/ShoppingCartOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";

// Drawer
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
// Styles
import useStyles from "../../styles/NavbarStyle";
import { toast } from "react-toastify";

// ant
import { Menu as AntMenu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Navbar = ({
  auth: { isAuthenticated },
  product: { productTypes, productBrands, loading },
  cart: { cartItems, guestCartItems },
  logout,
  getProductTypes,
  getProductBrands,
  fetchSearchResult,
  searchText,
  history,
  profile: { likedProducts },
}) => {
  const classes = useStyles();
  const [leftDrawer, setLeftDrawer] = React.useState(false);

  const [searchInput, setSearchInput] = React.useState("");

  useEffect(() => {
    getProductTypes();
    getProductBrands();
  }, [getProductTypes, getProductBrands]);

  const toggleDrawer = (open) => (event) => {
    setLeftDrawer(open);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <AppBar color="transparent" position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setLeftDrawer(false);
            }}
          >
            <MenuIcon />
          </IconButton>
          <MenuItem component={Link} to="/">
            <img
              style={{ width: 50, marginLeft: 0 }}
              src={require("../../assets/images/leaf.png")}
            />
          </MenuItem>
        </Toolbar>
        <List>
          <ListItem
            button
            onClick={() => {
              setLeftDrawer(false);
              history.push("/dashboard/liked");
            }}
          >
            <ListItemIcon>
              <IconButton color="inherit">
                <Badge
                  badgeContent={isAuthenticated ? likedProducts.length : 0}
                  color="secondary"
                >
                  <Favorite />
                </Badge>
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="???????????????????? ??????????" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setLeftDrawer(false);
              history.push("/cart");
            }}
          >
            <ListItemIcon>
              <IconButton color="inherit">
                <Badge
                  badgeContent={
                    isAuthenticated ? cartItems.length : guestCartItems.length
                  }
                  color="secondary"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="????????" />
          </ListItem>
        </List>
        {productTypes.map((type_group, index) => (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {type_group.name}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List component="nav" aria-label="secondary mailbox folders">
                {type_group.type.map((type, index2) => (
                  <ListItem
                    onClick={() => {
                      setLeftDrawer(false);
                      history.push(`/products/type/${type.id}`);
                    }}
                    className={classes.mobileListItem}
                    button
                    key={index2}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {type.type_name}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </AppBar>
    </div>
  );

  const [selectedMenu, setSelectedMenu] = React.useState(-1);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorTypeMenuEl, setAnchorTypeMenuEl] = React.useState(null);
  const [anchorBrandMenuEl, setAnchorBrandMenuEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTypeMenuOpen = (event) => {
    console.log(event);
    setAnchorTypeMenuEl(event.currentTarget);
  };

  const handleBrandMenuOpen = (event) => {
    console.log(event);
    setAnchorBrandMenuEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleTypeMenuClose = () => {
    setAnchorTypeMenuEl(null);
  };

  const handleBrandMenuClose = () => {
    setAnchorBrandMenuEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const authLinks = (
    <div>
      <MenuItem component={Link} onClick={handleMenuClose} to="/dashboard">
        <AccountCircle style={{ marginRight: 10, color: "#bbc9d0" }} />
        ??????????????
      </MenuItem>
      <MenuItem
        component={Link}
        onClick={() => {
          logout();
          handleMenuClose();
        }}
        to="/"
      >
        <MeetingRoomIcon style={{ marginRight: 10, color: "#bbc9d0" }} />
        ??????????
      </MenuItem>
    </div>
  );

  const guestLinks = (
    <div>
      <MenuItem onClick={handleMenuClose} component={Link} to="/login">
        ??????????????
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/register">
        ????????????????????
      </MenuItem>
    </div>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated ? authLinks : guestLinks}
    </Menu>
  );

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
      borderRadius: 0,
    },
  }))(MenuItem);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAuthenticated ? authLinks : guestLinks}
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <React.Fragment key={"left"}>
            <Drawer
              transitionDuration={50}
              anchor={"left"}
              open={leftDrawer}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
          </React.Fragment>

          <div style={{ display: "flex" }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <MenuItem className={classes.appName} component={Link} to="/">
              <img
                style={{ width: 50 }}
                src={require("../../assets/images/leaf.png")}
              />
            </MenuItem>
          </div>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (searchInput.trim() === "") {
                    toast.warn("???????? ?????????? ?????????????? ????");
                  } else {
                    history.push("/search");
                    searchText(searchInput.trim());
                    fetchSearchResult(searchInput);
                    setSearchInput("");
                  }
                }
              }}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              placeholder="???????? ????????"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton onClick={() => history.push("/cart")} color="inherit">
              <Badge
                badgeContent={
                  isAuthenticated ? cartItems.length : guestCartItems.length
                }
                color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => history.push("/dashboard/liked")}
              color="inherit"
            >
              <Badge
                badgeContent={isAuthenticated ? likedProducts.length : 0}
                color="secondary"
              >
                <Favorite />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Toolbar className={classes.toolbar}>
          {productTypes.map((type, index) => {
            const menu = (
              <AntMenu style={{ top: 10 }}>
                <AntMenu.Item
                  key={type.id}
                  onClick={() => {
                    setSelectedMenu(index);
                    history.push(`/products/type/group/${type.id}`);
                  }}
                >
                  <span>{type.name}</span>
                </AntMenu.Item>
                <AntMenu.Divider />
                {type.type.map((subType) => (
                  <AntMenu.Item
                    key={subType.id}
                    onClick={() => {
                      setSelectedMenu(index);
                      history.push(`/products/type/${subType.id}`);
                    }}
                  >
                    <span>{subType.type_name}</span>
                  </AntMenu.Item>
                ))}
              </AntMenu>
            );

            return (
              // <Dropdown overlay={menu} trigger={["click"]}>
              <Dropdown overlay={menu}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                  style={{ marginRight: 20 }}
                >
                  {type.name} <DownOutlined />
                </a>
              </Dropdown>
            );
          })}
          {/* {productTypes.map((type, index) => (
            <Button
              key={index}
              aria-haspopup="true"
              onClick={(event) => {
                setSelectedMenu(index);
                handleTypeMenuOpen(event);
              }}
            >
              {type.name}
              <ExpandMoreIcon />
            </Button>
          ))}
          <Menu
            id="fade-menu"
            anchorEl={anchorTypeMenuEl}
            keepMounted
            open={Boolean(anchorTypeMenuEl)}
            onClose={handleTypeMenuClose}
            TransitionComponent={Fade}
          >
            <StyledMenuItem>
              {selectedMenu !== -1 && (
                <ListItem
                  className={classes.listItem}
                  onClick={handleTypeMenuClose}
                  component={Link}
                  to={`/products/type/group/${productTypes[selectedMenu].id}`}
                >
                  {productTypes[selectedMenu].name}
                </ListItem>
              )}
            </StyledMenuItem>
            {selectedMenu !== -1 &&
              productTypes[selectedMenu].type.map((menu, index) => (
                <StyledMenuItem key={index}>
                  <ListItem
                    className={classes.listItem}
                    onClick={handleTypeMenuClose}
                    component={Link}
                    to={`/products/type/${menu.id}`}
                  >
                    {menu.type_name}
                  </ListItem>
                </StyledMenuItem>
              ))}
          </Menu> */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
  profile: state.profile,
  cart: state.cart,
});

export default connect(mapStateToProps, {
  logout,
  getProductTypes,
  getProductBrands,
  fetchSearchResult,
  searchText,
})(withRouter(Navbar));
