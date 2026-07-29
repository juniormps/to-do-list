//Styles
import styles from "./App.module.css";

//Components
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import TaskForm from "./components/taskform/TaskForm";
import TaskList from "./components/tasklist/TaskList";

//Interfaces
import { ITask } from "./interfaces/Task";

function App() {
    return (
        <>
            <div>
                <Header />

                <main className={styles.main}>
                    <div>
                        <h2>O que você vai fazer?</h2>
                        <TaskForm buttonText="Criar tarefa" />
                    </div>
                    <div>
                        <h2>Lista de tarefas</h2>
                        <TaskList />
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}

export default App;
