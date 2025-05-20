import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


import styles from '../components/commons/form.module.scss';
import { useAppDispatch } from '../hooks/useAuth';
import { LOGIN } from '../graphql/login.graphql';
import { setCredentials } from '../slices/auth/authSlice';
import { setUser } from '../slices/auth/userSile';
import Input from '../components/Input/Input';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    const [login, { data, loading, error }] = useMutation(LOGIN);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login({ variables: formData });
            const { token, user } = res.data.login;

            if (token && user) {
                dispatch(setCredentials({ token, username: user.username }));
                dispatch(setUser(user));
                navigate('/home');
            }
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    name="identifier"
                    placeholder="Email or Username"
                    onChange={handleChange}
                    required
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {data?.login.message && (
                <p className={styles.success}>{data.login.message}</p>
            )}
            {data?.login.error && (
                <p className={styles.error}>{data.login.error}</p>
            )}
            {error && <p className={styles.error}>GraphQL error: {error.message}</p>}
        </div>
    );
};

export default Login;
