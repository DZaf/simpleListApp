import React, { useState } from 'react';
import { useMutation } from '@apollo/client';


import styles from '../commons/form.module.scss';
import { useAppDispatch } from '../../hooks/useAuth';
import { REGISTER } from '../../graphql/registerUser.graphql';
import { setCredentials } from '../../slices/auth/authSlice';
import Input from '../Input/Input';

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
    const [errors, setErrors] = useState<Partial<Record<keyof UserInput, string>>>({});

    const [register, { data, loading, error }] = useMutation(REGISTER);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newErrors: typeof errors = {};

            if (!formData.name.trim()) newErrors.name = "Name is required";
            if (!formData.surname.trim()) newErrors.surname = "Surname is required";
            if (!formData.username.trim()) newErrors.username = "Username is required";
            if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
            if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            setErrors({});
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
                <div className={styles.inputAndError}>
                    <Input
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        error={!!errors.name}
                    />
                    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                </div>

                <div className={styles.inputAndError}>
                    <Input
                        name="surname"
                        placeholder="Surname"
                        onChange={handleChange}
                        error={!!errors.surname}
                    />
                    {errors.surname && <p className={styles.errorMessage}>{errors.surname}</p>}
                </div>

                <div className={styles.inputAndError}>
                    <Input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        error={!!errors.username}
                    />
                    {errors.username && <p className={styles.errorMessage}>{errors.username}</p>}
                </div>

                <div className={styles.inputAndError}>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        error={!!errors.email}
                    />
                    {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                </div>

                <div className={styles.inputAndError}>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        error={!!errors.password}
                    />
                    {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
                </div>


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
