import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor: "secondary", position: "static"}}>

      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        
        <div>
          {auth?.isLoggedIn ? (
          <>
            <NavigationLink to="/chat" text='Go to Chat' bg="#00fffc" textColor='black' />
            <NavigationLink to="/" text='Logout' bg="#51538f" textColor='white' onClick={auth.logout} />
          </>
          ) : (
          <>
            <NavigationLink to="/login" text='Login' bg="#00fffc" textColor='black' />
            <NavigationLink to="/signup" text='Signup' bg="#51538f" textColor='white' />
          </>
          ) }
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header