
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
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