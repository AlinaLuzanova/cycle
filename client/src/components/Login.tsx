import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
    name: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: (formData: LoginFormData) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<LoginFormData>({
        name: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const resJson = await response.json();
            if (resJson.text === 'OK') {
                navigate('/');
            }
            
        } catch (error) {
            console.error('Error login up:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit"> Sign Up</button>
        </form>
    );
}

export default LoginForm;