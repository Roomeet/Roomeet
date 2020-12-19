import React, {
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Messenger from '../containers/Messenger';
import makeToast from '../utils/Toaster';
import ChatRoom from './ChatRoom';
import network from '../utils/network';
import { logout } from '../utils/authUtils';
import { UserContext } from '../context/UserContext';
import LogoutModal from './LogoutModal';

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  background: {
    background: 'linear-gradient(45deg, #a16254 30%, #5f413a 90%)',
  },
  colorTextRoo: {
    color: '#5AFF3D',
  },
  colorTextEet: {
    color: '#d8fd08',
  },
  colorTextM: {
    color: '#ffffff',
  },
  appBarTitle: {
    flexGrow: 1,
    fontSize: '1.5rem',
    fontFamily: 'Nunito',
  },
}));

type chatroomType = {
  id: string;
  name: string;
  participants: string[]
}

type navbarProps = {
  setMessengerOpen: Dispatch<SetStateAction<boolean>>;
  openChatRooms: chatroomType[];
  socket: any;
  closeChatRoom: (roomId: chatroomType) => void;
}

const NavBar: React.FC<navbarProps> = ({
  setMessengerOpen,
  openChatRooms,
  socket,
  closeChatRoom,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const [openLogout, setOpenLogout] = React.useState<boolean>(false);
  const context = React.useContext(UserContext);
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutOpen = () => {
    setOpenLogout(true);
  };

  const handleLogoutClose = () => {
    setOpenLogout(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    context.logUserOut();
    logout();
    handleMenuClose();
  };

  const handleMobileMenu = (url: string) => {
    handleMenuClose();
    history.push(url);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/MyProfile">Profile</Link>
      </MenuItem>
      {/* <MenuItem onClick={() =>
        context.logUserOut()}><Link to="/landing">Logout</Link></MenuItem> */}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handleMobileMenu('/myProfile')}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        My profile
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => setMessengerOpen((prev) => !prev)}>
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={() => handleMobileMenu('/notifications')}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      {/* onClick={handleProfileMenuOpen} */}
      <MenuItem onClick={handleLogoutOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
        Logout
      </MenuItem>
      <LogoutModal
        openLogout={openLogout}
        handleLogoutClose={handleLogoutClose}
        logout={handleLogOut}
      />
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.background}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => setMessengerOpen((prev) => !prev)} />
            <MenuIcon />
          </IconButton>
          <Link to="/home">
            <h1 className={classes.appBarTitle}>
              <span className={classes.colorTextRoo}>Roo</span>
              <span className={classes.colorTextM}>M</span>
              <span className={classes.colorTextEet}>eet</span>
              .
            </h1>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {openChatRooms[0] && openChatRooms.map((chatroom) => (
              <ChatRoom socket={socket} chatroom={chatroom} closeChatRoom={closeChatRoom} />
            ))}
            <MenuItem>
              <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => setMessengerOpen((prev) => !prev)}>
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
            </MenuItem>
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => history.push('/notifications')}
            >
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="user profile"
              color="inherit"
              onClick={() => history.push('/myProfile')}
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
            >
              <Badge>
                <AccountCircle />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={handleLogoutOpen}
            >
              <Badge>
                <ExitToAppIcon />
              </Badge>
            </IconButton>
            <LogoutModal
              openLogout={openLogout}
              handleLogoutClose={handleLogoutClose}
              logout={handleLogOut}
            />
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
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
export default NavBar;
