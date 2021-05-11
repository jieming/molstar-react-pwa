import React from 'react'
import {
  ListItem,
  Button,
  Collapse,
  colors,
  Divider,
  Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'

import { navItems } from './nav-menu-items'

const useStyles = makeStyles(theme => ({
  navMenu: {
    display: 'flex',
    background: 'white',
    flexDirection: 'column',
    width: theme.spacing(32),
    height: '100%',
    transition: '350ms width ease, 350ms transform ease',
    zIndex: theme.zIndex.drawer
  },
  menuTransform: {
    width: 0,
    transform: `translateX(-100%)`
  },
  menuContentTransform: {
    transform: `translateX(-${theme.spacing(30)}px)`
  },
  menuItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    transition: '350ms transform ease'
  },
  menuItem: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    color: colors.blueGrey[800]
  },
  selectedMenuItem: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    color: 'white',
    background: colors.blueGrey[800],
    '&:hover': {
      background: colors.blueGrey[600]
    }
  },
  menuLink: {
    display: 'flex',
    flex: 1
  },
  selectedLabel: {
    fontWeight: 'bold'
  },
  subMenuItem: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
    color: colors.blueGrey[800],
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 0, 1, 6)
  },
  selectedSubMenuItem: {
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    fontWeight: theme.typography.fontWeightBold,
    color: 'white',
    background: colors.blueGrey[800],
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 0, 1, 6),
    '&:hover': {
      background: colors.blueGrey[600]
    }
  },
  subMenu: {
    width: '100%'
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2)
  },
  expandIcon: {
    marginLeft: 'auto'
  }
}))

const NavMenu = ({ navState, dispatch }) => {
  const classes = useStyles()

  const handleClick = item => () => {
    if (item.url) {
      window.location.href = item.url()
    }
  }

  const toggleExpand = item => () =>
    dispatch({ type: 'TOGGLE-NAV-EXPAND', payload: { item: item.label } })

  const renderExpandIcon = item => {
    if (navState.expand[item.label] === undefined) {
      return
    }

    return navState.expand[`${item.label}`] ? (
      <ExpandMoreIcon
        data-testid={`${item.label}-expand`}
        className={classes.expandIcon}
        onClick={toggleExpand(item)}
      />
    ) : (
      <ExpandLessIcon
        data-testid={`${item.label}-collapse`}
        className={classes.expandIcon}
        onClick={toggleExpand(item)}
      />
    )
  }

  const renderChildMenu = item =>
    item.children && (
      <Collapse
        in={navState.expand[`${item.label}`]}
        className={classes.subMenu}
      >
        {item.children.map(childItem => (
          <Button
            key={childItem.label}
            className={
              navState.selectedItem === childItem.label
                ? classes.selectedSubMenuItem
                : classes.subMenuItem
            }
          >
            <div className={classes.menuLink} onClick={handleClick(childItem)}>
              <Typography
                className={
                  navState.selectedItem === childItem.label
                    ? classes.selectedLabel
                    : undefined
                }
                variant='subtitle2'
              >
                {childItem.label}
              </Typography>
            </div>
          </Button>
        ))}
      </Collapse>
    )

  const renderNavItems = items =>
    items.map(item => (
      <ListItem className={getMenuItemContainerClass()} key={item.label}>
        <Button
          className={
            navState.selectedItem === item.label
              ? classes.selectedMenuItem
              : classes.menuItem
          }
          name={item.label}
        >
          <div className={classes.menuLink} onClick={handleClick(item)}>
            <item.Icon className={classes.icon} />
            <Typography
              className={
                navState.selectedItem === item.label
                  ? classes.selectedLabel
                  : undefined
              }
              variant='subtitle1'
            >
              {item.label}
            </Typography>
          </div>
          {renderExpandIcon(item)}
        </Button>
        {renderChildMenu(item)}
      </ListItem>
    ))

  const getNavMenuClass = () =>
    navState.open
      ? classes.navMenu
      : `${classes.navMenu} ${classes.menuTransform}`

  const getMenuItemContainerClass = () =>
    navState.open
      ? classes.menuItemContainer
      : `${classes.menuItemContainer} ${classes.menuContentTransform}`

  return (
    <div className={getNavMenuClass()}>
      <Divider />
      {renderNavItems(navItems)}
    </div>
  )
}

export default NavMenu
