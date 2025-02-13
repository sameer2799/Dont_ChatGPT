import { Box, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import TypeAnim from '../components/typer/TypeAnim';
import Footer from '../components/Footer';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box sx={{display:"flex", width:"100%", flexDirection:"column", alignItems:"center", mx:"auto", mt:3 }}>
        <Box>
          <TypeAnim />
        </Box>
        <Box sx={{ width:"100%", display:"flex", flexDirection: { md: "row", xs: "column", sm:"column" }, gap:5, my:10 }}>
          <img src="robot.png" alt="vite" style={{ width: "200px", margin:"auto" }}/>
          <img src="openai.png" alt="react" style={{ width: "200px", margin:"auto" }} className='rotate'/>
        </Box>
        <Box sx={{ width:"100%", display:"flex" , mx:"auto" }}>
          <img src="chat.png" alt="react" style={{ display:"flex", margin:"auto", width: isMobile? "80%" : "60%", borderRadius:20, marginTop:20, marginBottom:20, boxShadow:"-5px -5px 105px #64f3d5" }} />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default Home;