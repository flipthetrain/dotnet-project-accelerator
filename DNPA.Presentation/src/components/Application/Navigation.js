import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// material-ui utils
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
// material-ui Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// material-ui Icons
import Home from '@material-ui/icons/Home';
import Info from '@material-ui/icons/Info';
import Search from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
// Services
import LocalizationService from 'services/LocalizationService';
// Components
import AppTitle from 'components/Application/AppTitle';
import LanguageSelection from 'components/Application/LanguageSelection';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appTitle: {
    flexGrow: 1
  },
  sideMenuDrawer: {
    top: '65px',
    width: drawerWidth,
    height: '100%',
    flexShrink: 0
  },
  sideMenuDrawerPaper: {
    width: drawerWidth
  },
  sideMenuList: {
    padding: 10,
    width: drawerWidth + 'px'
  },
  sideMenuListItem: {
    paddingLeft: 10
  }
}));

function Navigation(props) {
  const [locData, setLocData] = useState({});
  const [openNavigation, setOpenNavigation] = useState(false);

  const localizationService = LocalizationService();

  const classes = useStyles();

  useEffect(() => {
    async function loadLocalization() {
      const locCode = localizationService.getUserLocale();
      const locDataLoaded = await localizationService.getLocalizedTextSet(
        ['apptitle', 'home', 'search', 'about'],
        locCode
      );

      setLocData(locDataLoaded);
    }
    loadLocalization();
  }, []);

  const toggleDrawerOpen = () => {
    setOpenNavigation(!openNavigation);
  };

  const closeDrawer = () => {
    setOpenNavigation(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => toggleDrawerOpen()}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <AppTitle locData={locData} />
          <LanguageSelection localizationService={localizationService} />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant="persistent"
        color="primary"
        open={openNavigation}
        className={classes.sideMenuDrawer}
        classes={{ paper: classes.sideMenuDrawerPaper }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={closeDrawer}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <List className={classes.sideMenuList}>
          <ListItem button className={classes.sideMenuListItem} onClick={closeDrawer} component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={locData.home} />
          </ListItem>
          <ListItem button className={classes.sideMenuListItem} onClick={closeDrawer} component={Link} to="/search">
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary={locData.search} />
          </ListItem>
          <ListItem button className={classes.sideMenuListItem} onClick={closeDrawer} component={Link} to="/about">
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary={locData.about} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default withWidth()(Navigation);
