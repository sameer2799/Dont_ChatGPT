import { Router } from 'express';
import { verifyToken } from '../utils/token_manager.js';
import { validator, chatCompletionValidator } from '../utils/validators.js';
import { generateChatCompletion, sendChatsToUser, deleteChats } from '../controllers/chat_controllers.js';

// Protect all routes in this file
const chatRoutes = Router();

chatRoutes.post('/new', validator(chatCompletionValidator), verifyToken, generateChatCompletion);

chatRoutes.get('/all-chats', verifyToken, sendChatsToUser);
chatRoutes.delete('/delete', verifyToken, deleteChats);

export default chatRoutes;