import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../i18n';
import { useTranslation } from 'react-i18next';


export default function Header() {
  // 'Basic App bar' taken from mui.com ->  https://mui.com/material-ui/react-app-bar/

    // Translation
    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: '#ffb7a8'}}>
        <Toolbar>          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{color: "black"}}>
            {t("Tinteri")}
          </Typography>
          <Button id="fi" onClick={()=> changeLanguage("fi")} style={{color: "black"}}>FI</Button>
          <Button id="en" onClick={()=> changeLanguage("en")} style={{color: "black"}}>EN</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

