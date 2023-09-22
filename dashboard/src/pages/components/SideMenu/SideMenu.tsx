import React from 'react';
import { CSSObject } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Person2Icon from '@mui/icons-material/Person2';
import NextLink from 'next/link';
import scss from './SideMenu.module.scss';
import HomeIcon from '@mui/icons-material/Home';

import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Theme,
    useMediaQuery,
    useTheme,
  } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const menuRouteList = ["", "data", "chains", , ""];
const menuListTranslations = ["Home","Data", "Chains"];
const menuListIcons = [
    <HomeIcon />,
    <EqualizerIcon />,
    <Person2Icon />,
  ];

const SideMenu = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleListItemButtonClick = () => {
        setOpen(false);
      };

    return (
        <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        className={scss.sideMenu}
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            left: 0,
            top: 57,
            flexShrink: 0,
            whiteSpace: "nowrap",
            boxSizing: "border-box",
            ...(open && {
              ...openedMixin(theme),
              "& .MuiDrawer-paper": openedMixin(theme),
            }),
            ...(!open && {
              ...closedMixin(theme),
              "& .MuiDrawer-paper": closedMixin(theme),
            }),
          },
        }}
      >   
        <div className={scss.drawerHeader}>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>

      <List>
        {menuListTranslations.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <NextLink
              className={scss.link}
              href={`/dashboard/${menuRouteList[index]}`}
            >
              <ListItemButton
                onClick={() => handleListItemButtonClick()}
                title={text}
                aria-label={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {menuListIcons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    color: theme.palette.text.primary,
                    opacity: open ? 1 : 0,
                  }}
                />{" "}
              </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
      </List>
      </Drawer>
      );
};

export default SideMenu;