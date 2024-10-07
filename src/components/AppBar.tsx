import { AppBar, Button, Drawer, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';


const AppBarComponent: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const navigate = useNavigate(); // Yönlendirme için navigate fonksiyonunu alıyoruz
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Admin Panel</Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={toggleDrawer}>
                <List>
                    <ListItem>
                        <Button onClick={() => { navigate("/home"); toggleDrawer(); }}>
                            Ana Sayfa
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={() => { navigate("/urun-islemleri"); toggleDrawer(); }}>
                            Ürün İşlemleri
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={() => { navigate("/recete-islemleri"); toggleDrawer(); }}>
                            Reçete İşlemleri
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={() => { navigate("/kullanici-islemleri"); toggleDrawer(); }}>
                            Kullanıcı İslemleri
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button onClick={() => { navigate("/admin-profili"); toggleDrawer(); }}>
                            Admin Profili
                        </Button>
                    </ListItem>
                </List>
            </Drawer>

        </>
    )

}
export default AppBarComponent;


