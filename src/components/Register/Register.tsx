// src/pages/Register.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';


import styles from '../commons/form.module.scss';
import { useAppDispatch } from '../../hooks/useAuth';
import { REGISTER } from '../../graphql/registerUser.graphql';
import { setCredentials } from '../../slices/auth/authSlice';

interface UserInput {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<UserInput>({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
    });

    const [register, { data, loading, error }] = useMutation(REGISTER);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await register({ variables: { input: formData } });
            const { token, user } = response.data.register;

            if (token && user) {
                dispatch(setCredentials({ token, username: user.username }));
            }
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input name="name" placeholder="Name" onChange={handleChange} required />
                <input name="surname" placeholder="Surname" onChange={handleChange} required />
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {data?.register.message && (
                <p className={styles.success}>{data.register.message}</p>
            )}
            {data?.register.error && (
                <p className={styles.error}>{data.register.error}</p>
            )}
            {error && <p className={styles.error}>GraphQL error: {error.message}</p>}
        </div>
    );
};

export default Register;
