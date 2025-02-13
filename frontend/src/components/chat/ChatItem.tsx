import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighLighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message:string){
    if(message.includes("```")){
        const messageBlocks = message.split("```");
        return messageBlocks;
    }
}

function isCodeBlock(str: string){
    if ((str.includes("=")) || (str.includes(";")) || (str.includes("{")) || (str.includes("}")) || (str.includes("[")) || (str.includes("]"))|| (str.includes("#"))|| (str.includes("//"))) {
        return true;
    }else{
        return false;
    }
}

const ChatItem = ({content, role} : { content:string, role:"user" | "assistant" }) => {
    const messageBlocks = extractCodeFromString(content);
    const auth = useAuth();
    return role == "assistant" ? (
        <Box sx={{ display:"flex", p:2, bgcolor: "#004d5612", my: 1, borderRadius:2, gap:2 }}>
            <Avatar sx={{m1:'0'}}>
                <img src="vite.svg" alt="vite" width={"30px"} />
            </Avatar>
            <Box>
                {(!messageBlocks) && (
                <Typography fontSize={"20px"}>
                    {content}
                </Typography>)}
                {messageBlocks && messageBlocks.length && messageBlocks.map((block, _index) => (isCodeBlock(block) ? (
                    <SyntaxHighLighter style={coldarkDark} language='javascript' >{block}</SyntaxHighLighter>
                ) : (
                    <Typography fontSize={"20px"}>
                        {block}
                    </Typography>)
                ))}
                
            </Box>
        </Box>
    ) : (
        <Box sx={{ display:"flex", p:2, bgcolor: "#004d56", my: 1, borderRadius:2, gap:2 }}>
            <Avatar sx={{m1:'0', bgcolor:"black", color:"white"}}>
                {auth?.user?.username[0].toUpperCase()}
                {/* {auth?.user?.username.split(" ")[1][0].toUpperCase()} */}
            </Avatar>
            <Box>
                {(!messageBlocks) && (
                <Typography fontSize={"20px"}>
                    {content}
                </Typography>)}
                {messageBlocks && messageBlocks.length && messageBlocks.map((block, _index) => (isCodeBlock(block) ? (
                    <SyntaxHighLighter style={coldarkDark} language='javascript' >{block}</SyntaxHighLighter>
                ) : (
                    <Typography fontSize={"20px"}>
                        {block}
                    </Typography>)
                ))}
                
            </Box>
        </Box>
    ) ;
}

export default ChatItem