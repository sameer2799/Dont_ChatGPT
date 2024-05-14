import axios from 'axios';


export const loginUser = async (email: string, password:string) => {
    const response = await axios.post("/user/login", {
        email,
        password
    });
    if (response.status !== 200) {
        throw new Error("Failed to login");
    };
        
    const data = await response.data;
    
    return data;
}

export const checkAuthStatus = async () => {
    const response = await axios.get("/user/auth-status");
    if (response.status !== 200) {
        throw new Error("Failed to Authenticate User");
    };
        
    const data = await response.data;
    
    return data;
}

export const sendChatRequest = async (message: string) => {
    
    try {
        const response = await axios.post("/chat/new", { message });
        if (response.status !== 200) {
            return response.data;
            // throw new Error("Failed to send chat");
            
        };
    
        const data = await response.data;
        
        return data;
    } catch (error : any) {
        console.log(error);
        return error.response.data;
    }
    
};

export const getUserChats = async () => {
    
    try {
        const response = await axios.post("/chat/all-chats");
        if (response.status !== 200) {
            return response.data;
            // throw new Error("Failed to send chat");
            
        };
    
        const data = await response.data;
        
        return data;
    } catch (error : any) {
        
        return error.response.data;
    }
    
};

export const deleteUserChats = async () => {
    
    try {
        const response = await axios.delete("/chat/delete");
        if (response.status !== 200) {
            return response.data;
            // throw new Error("Failed to delete chat");
        };
        const data = await response.data;
        return data;
    } catch (error : any) {
        return error.response.data;
    }
    
}

export const logoutUser = async () => {
    
    try {
        const response = await axios.get("/user/logout");
        if (response.status !== 200) {
            return response.data;
            // throw new Error("Failed to delete chat");
        };
        const data = await response.data;
        return data;
    } catch (error : any) {
        return error.response.data;
    }
    
}

export const signupUser = async (username:string, email: string, password:string) => {
    const response = await axios.post("/user/signup", {
        username,
        email,
        password
    });
    if (response.status !== 201) {
        throw new Error("Failed to Signup");
    };
        
    const data = await response.data;
    
    return data;
}