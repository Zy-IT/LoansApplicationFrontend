import Api from '../Api/Api';

export const userLogin = async (login) => {
    try {
        const response = await Api.post("/User/Login", login)
        return response.data;
    } catch (error) {
        throw error.response.data || new Error("Error at Login Service")
    }
} 