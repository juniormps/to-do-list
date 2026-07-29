//Styles
import styles from "./App.module.css";

//Components
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function App() {
    return (
        <>
            <div>
                <Header />

                <main className={styles.main}>
                    <h1>conteúdo</h1>
                </main>
                
                <Footer />
            </div>
        </>
    );
}

export default App;
