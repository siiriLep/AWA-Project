import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function Header() {
  // 'Basic App bar' taken from mui.com ->  https://mui.com/material-ui/react-app-bar/

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: '#ffb7a8'}}>
        <Toolbar>          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{color: "black"}}>
            Tinteri
          </Typography>
          <Button id="fi" style={{color: "black"}}>FI</Button>
          <Button id="en" style={{color: "black"}}>EN</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}