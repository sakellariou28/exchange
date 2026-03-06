import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { AppSelect } from '../ui/components/AppSelect';

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 72;

interface MenuItemDefinition {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const mainMenuItems = useMemo<MenuItemDefinition[]>(
    () => [
      {
        label: t('navigation.home'),
        path: '/home',
        icon: <HomeIcon />,
      },
      {
        label: t('navigation.requests'),
        path: '/requests',
        icon: <ReceiptLongIcon />,
      },
    ],
    [t],
  );

  const drawerWidth = collapsed ? drawerWidthCollapsed : drawerWidthExpanded;

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    void i18n.changeLanguage(event.target.value);
  };

  const handleLogout = () => {
    logout();
    setMenuAnchor(null);
    navigate('/login', { replace: true });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1200,
          height: 64,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          px: 2,
        }}
      >
        <IconButton onClick={() => setCollapsed((value) => !value)}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ flex: 1 }} />

        <Stack direction="row" alignItems="center" spacing={2}>
          <Box sx={{ width: 130 }}>
            <AppSelect
              label="Language"
              value={i18n.language.startsWith('el') ? 'el' : 'en'}
              onChange={handleLanguageChange}
              options={[
                { value: 'en', label: 'English' },
                { value: 'el', label: 'Greek' },
              ]}
            />
          </Box>

          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.fullName.slice(0, 1).toUpperCase() ?? 'U'}
              </Avatar>
            </IconButton>
            <Typography variant="body2">{user?.fullName}</Typography>
          </Stack>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
          >
            <MenuItem onClick={handleLogout}>{t('navigation.logout')}</MenuItem>
          </Menu>
        </Stack>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Box
          component="aside"
          sx={{
            position: 'sticky',
            top: 64,
            width: drawerWidth,
            height: 'calc(100vh - 64px)',
            borderRight: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            transition: 'width 180ms ease-in-out',
            overflowX: 'hidden',
          }}
        >
          <Toolbar sx={{ minHeight: '48px !important', px: 2 }}>
            <Typography variant="subtitle2">{collapsed ? 'FB' : t('appName')}</Typography>
          </Toolbar>
          <Divider />
          <List>
            {mainMenuItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  '&.active': {
                    bgcolor: 'action.selected',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!collapsed ? <ListItemText primary={item.label} /> : null}
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

