import styles from "./Header.module.css";

const Header = () => {
    return (
        <div>
            <header className={styles.header}>
                <h1>to-do list</h1>
            </header>
        </div>
    );
};

export default Header;
