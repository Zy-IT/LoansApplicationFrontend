import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './Loginpage.css';
import { LoginHook } from '../../hooks/loginHook';

const LoginPage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        officeId: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const { mutate: login } = LoginHook();

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        login(user, {
            onSuccess: (User) => {
                localStorage.setItem('currentUser', JSON.stringify(User));
                navigate('/Dashboard');
                console.log("Login successful:", User);
            },
            onError: (error) => {
                console.error('Login failed:', error);
            }
        })
    }

    return (
        <div className='Login-Page'>
            <div className='Login-Container'>
                <h2>Login</h2>
                <div className="LP-Office-Id">
                    <label>Office-ID</label>
                    <input
                        type="number"
                        name="officeId"
                        value={user.officeId}
                        onChange={handleInputChange}
                        placeholder="Enter the Branch Code Number"
                    />
                </div>
                <div className="LP-Password">
                    <label>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        placeholder="Enter your Password"
                    />
                    <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Eye size={30} /> : <EyeOff size={30} />}
                    </span>
                </div>

                <div className="LP-Submit">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                    >Login</button>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;