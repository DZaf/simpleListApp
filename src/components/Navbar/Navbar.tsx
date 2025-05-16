import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navLinks}>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? styles.active : styles.link)}
                >
                    Login
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? styles.active : styles.link)}
                >
                    Profile
                </NavLink>
                <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? styles.active : styles.link)}
                >
                    Register
                </NavLink>
                <NavLink
                    to="/home"
                    className={({ isActive }) => (isActive ? styles.active : styles.link)}
                >
                    List
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
