//Styles
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./App.module.css";

import { useMemo, useState } from "react";

//Hooks
import { useTasks } from "./hooks/useTasks";

//Components
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Modal from "./components/modal/Modal";
import TaskForm from "./components/taskform/TaskForm";
import TaskList from "./components/tasklist/TaskList";

//Interfaces
import type { ITask } from "./interfaces/Task";

function App() {
    const {
        taskList,
        addTask,
        updateTask,
        taskToDelete,
        requestDelete,
        confirmDelete,
        cancelDelete,
    } = useTasks();

    const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState("");

    const filteredTasks = useMemo(() => {
        return taskList.filter((task) => {
            const matchesSearch = task.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const difficultyNum = parseInt(filterDifficulty);
            const matchesDifficulty =
                filterDifficulty === "" || task.difficulty === difficultyNum;

            return matchesSearch && matchesDifficulty;
        });
    }, [taskList, search, filterDifficulty]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const editTask = (task: ITask): void => {
        setTaskToUpdate(task);
        openModal();
    };

    const handleUpdate = (id: string, title: string, difficulty: number) => {
        updateTask(id, title, difficulty);
        closeModal();
    };

    return (
        <>
            <div>
                <Modal
                    show={showModal}
                    onClose={closeModal}
                    title="Editar Tarefa"
                    children={
                        <TaskForm
                            buttonText="Editar tarefa"
                            taskToUpdate={taskToUpdate}
                            handleUpdate={handleUpdate}
                        />
                    }
                />

                <Modal
                    show={taskToDelete !== null}
                    onClose={cancelDelete}
                    title="Confirmar Exclusão"
                    children={
                        <div className={styles.confirm_content}>
                            <p className={styles.confirm_message}>
                                Tem certeza que deseja excluir esta tarefa?
                            </p>
                            <div className={styles.confirm_actions}>
                                <button
                                    className={styles.confirm_btn}
                                    onClick={cancelDelete}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className={styles.confirm_btn_danger}
                                    onClick={confirmDelete}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    }
                />

                <Header />

                <main className={styles.main}>
                    <div>
                        <h2>O que você vai fazer?</h2>
                        <TaskForm buttonText="Criar tarefa" onAdd={addTask} />
                    </div>
                    <div>
                        <h2>Lista de tarefas</h2>
                        <div className={styles.filter}>
                            <input
                                type="text"
                                placeholder="Buscar por título..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Filtrar por dificuldade"
                                value={filterDifficulty}
                                onChange={(e) =>
                                    setFilterDifficulty(e.target.value)
                                }
                                min="1"
                            />
                        </div>
                        <TaskList
                            taskList={filteredTasks}
                            handleDelete={requestDelete}
                            handleEdit={editTask}
                        />
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}

export default App;
