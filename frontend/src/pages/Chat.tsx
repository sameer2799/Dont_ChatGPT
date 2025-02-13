import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { getUserChats, sendChatRequest, deleteUserChats } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Message = {
  role: "user" | "assistant";
  content:string;
}

const chatmessages : Message[] = [
  {
    role: "assistant",
    content: "Hello, I am a bot. You can ask me anything you want. I will try to answer your questions. But remember, I am a bot. I am not perfect. Also, do not share your personal information with me."
  },
  {
    role: "user",
    content: "What is your name?"
  },
  {
    role: "assistant",
    content: "I am a bot. I do not have a name."
  },
  {
    role: "user",
    content: "a random code snippet."
  },
  {
    role: "assistant",
    content: "Sure, here is a code snippet.```javascript\nconst a = 10;\nconst b = 20;\nconst c = a + b;\nconsole.log(c);``` Had fun?"
  }
];



const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement|null>(null);
  const auth = useAuth();
  const [ chatMessages, setChatMessages ] = useState<Message[]>([]); // chatMessages
  const handleSubmit = async () => {
      const content = inputRef.current?.value as string;
      if(inputRef && inputRef.current){
        inputRef.current.value = "";
      }
      const newMessage : Message = { role: "user", content };
      setChatMessages((prev) => [...prev, newMessage]);
      const chatData = await sendChatRequest(content);
      if(chatData.message == "Internal server error"){toast.error("Sorry, API's are costly :(", { id: "login" });; return;}
      setChatMessages([...chatData.chats]);
      
  };
  useLayoutEffect(() => {
    if(auth?.isLoggedIn && auth.user){
      toast.loading("Loading Chats...", { id: "loadchats" });
      getUserChats().then((data) => {
        console.log(data);
      setChatMessages([...data.chats]);
      toast.success("Successfully Loaded Chats", { id: "loadchats" });
    }).catch((error) => {
      console.log(error);
      toast.error("Failed to load chats", { id: "loadchats" });
    })}
  }, [auth]);

  useEffect(() => {
    if(!auth?.user){
      return navigate("/login");
    }
  }), [auth];

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats...", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Successfully Deleted Chats", { id: "deletechats" });
    } catch (error) {
      toast.error("Failed to delete chats", { id: "deletechats" });
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flex: 1,
      width: '100%',
      height: '100%',
      mt: 3,
      gap: 3,
    }}>
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
        <Box sx={{ display: "flex", width: "100%", height: "60vh", bgcolor: "rgb(17,29,39)", borderRadius: 5, flexDirection: "column", mx: 3 }}>
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700 }}>
            {auth?.user?.username[0].toUpperCase()}
            {/* {auth?.user?.username.split(" ")[1][0].toUpperCase()} */}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a bot.
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask me anything you want.
            I will try to answer your questions.
            But remember, I am a bot.
            I am not perfect.
            Also, do not share your personal information with me.
          </Typography>
          <Button onClick={handleDeleteChats} sx={{ width: "200px", my: "auto", color: "white", fontWeight: "600", borderRadius: 3, mx: "auto", bgcolor: red[300], ": hover" :{bgcolor:red.A400,} }}>Clear Conversation</Button>
        </Box>

      </Box>
 
      <Box sx={{display:"flex", flex: { md: 0.8, xs: 1, sm: 1}, flexDirection:'column', px:3}}>
        <Typography sx={{ mx:"auto", fontSize: "40px", color:"white", mb: 2}}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box sx={{ width:"100%", height:"60vh", borderRadius: 3, mx:"auto",display:"flex",flexDirection:"column", overflow:"scroll", overflowX: "hidden", overflowY:"auto", scrollBehavior:"smooth" }}>
          {chatMessages.map((chat, index) => (
            <ChatItem content={ chat.content } role={ chat.role as "user" | "assistant"} key={index}/>
          ))}
        </Box>

        <div style={{ width:"100%", borderRadius:8, backgroundColor:"rgb(17,27,39)", display:"flex", margin:"auto" }}>
          <input type="text" ref={inputRef} name="message" id="content" placeholder="Type a message..." style={{ width:"100%", backgroundColor:"transparent", padding:"30px", border:"none", outline:"none", color:"white", fontSize:"20px" }} />
          <IconButton onClick={handleSubmit} sx={{mx:1, color:"white" }}><IoMdSend /></IconButton>
        </div>

      </Box>
    </Box>
  )
}

export default Chat

function deleteChats() {
  throw new Error('Function not implemented.');
}
