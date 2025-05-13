import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userLogin } from '../services/LoginService';

export const LoginHook = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: userLogin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: error => console.error('Login failed:', error)
    })
}