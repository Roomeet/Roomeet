import React, {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChatRoom from './ChatRoom';
import { logout } from '../utils/authUtils';
import { UserContext } from '../context/UserContext';
import LogoutModal from './LogoutModal';
import { chatRoomI } from '../interfaces/chat';

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
    background: '#293241',
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
  chatrooms: {
    position: 'fixed',
    display: 'flex',
    right: '60px',
  },
}));

type navbarProps = {
  setMessengerOpen: Dispatch<SetStateAction<boolean>>;
  openChatRooms: chatRoomI[];
  closeChatRoom: (roomId: chatRoomI) => void;
  setNotificationsOpen: Dispatch<SetStateAction<boolean>>;
  unseenNotificationsLength: number | undefined;
  fetchAllNotifications: () => void;
};

const NavBar: React.FC<navbarProps> = ({
  setMessengerOpen,
  openChatRooms,
  closeChatRoom,
  setNotificationsOpen,
  unseenNotificationsLength,
  fetchAllNotifications,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [openLogout, setOpenLogout] = React.useState<boolean>(false);
  const [numberOfNewMesseges, setNumberOfNewMesseges] = React.useState<number | null>(0);
  const [openChatroom, setOpenChatroom] = useState('');
  const context = React.useContext(UserContext);
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const handleNotificationClick = () => {
    handleMenuClose();
    fetchAllNotifications();
    setNotificationsOpen((prev) => !prev);
  };

  const handleDesktopNotificationClick = () => {
    fetchAllNotifications();
    setNotificationsOpen((prev) => !prev);
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

  const openChatroomOnClick = (chatroomId: string) => {
    if (openChatroom === chatroomId) {
      setOpenChatroom('');
      return;
    }
    setOpenChatroom(chatroomId);
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
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <div className={classes.sectionMobile}>
      <div className={classes.chatrooms}>
        {openChatRooms[0] && openChatRooms.map((chatroom) => (
          <ChatRoom
            chatroom={chatroom}
            closeChatRoom={closeChatRoom}
            open={openChatroom === chatroom.id}
            openChatroomOnClick={openChatroomOnClick}
          />
        ))}
      </div>
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
        <MenuItem onClick={() => { setMessengerOpen((prev) => !prev); handleMenuClose(); }}>
          <IconButton aria-label="messeges" color="inherit" onClick={() => setMessengerOpen((prev) => !prev)}>
            <Badge badgeContent={numberOfNewMesseges} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messeges</p>
        </MenuItem>
        <MenuItem onClick={handleNotificationClick}>
          <IconButton aria-label="notifications" color="inherit">
            <Badge badgeContent={unseenNotificationsLength} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleLogoutOpen}>
          <IconButton
            aria-label="logout"
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
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.background}>
        <Toolbar>
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
              <ChatRoom
                chatroom={chatroom}
                closeChatRoom={closeChatRoom}
                open={openChatroom === chatroom.id}
                openChatroomOnClick={openChatroomOnClick}
              />
            ))}
            <IconButton aria-label="show messenger" color="inherit" onClick={() => setMessengerOpen((prev) => !prev)}>
              <Badge badgeContent={numberOfNewMesseges} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="show notifications"
              color="inherit"
              onClick={handleDesktopNotificationClick}
            >
              <Badge badgeContent={unseenNotificationsLength} color="secondary">
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
