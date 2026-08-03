//Styles
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./App.module.css";

import { useState } from "react";

//Components
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Modal from "./components/modal/Modal";
import TaskForm from "./components/taskform/TaskForm";
import TaskList from "./components/tasklist/TaskList";

//Interfaces
import type { ITask } from "./interfaces/Task";

function App() {
    const [taskList, setTaskList] = useState<ITask[]>([]);
    const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);
    const [showModal, setShowModal] = useState(false);

    const deleteTask = (id: string) => {
        setTaskList(taskList.filter((task) => task.id !== id));
    };

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const editTask = (task: ITask): void => {
        setTaskToUpdate(task);
        openModal();
    }

    const updateTask = (id: string, title: string, difficulty: number) => {
        const updatedTask: ITask = { id, title, difficulty };

        const updatedItems = taskList.map((task) => {
            return task.id === updatedTask.id ? updatedTask : task;
        });

        setTaskList(updatedItems);
        closeModal();
    }

    return (
        <>
            <div>
                <Modal
                    show={showModal}
                    onClose={closeModal}
                    children={
                        <TaskForm
                            buttonText="Editar tarefa"
                            taskList={taskList}
                            setTaskList={setTaskList}
                            taskToUpdate={taskToUpdate}
                            handleUpdate={updateTask}
                        />
                    }
                />

                <Header />

                <main className={styles.main}>
                    <div>
                        <h2>O que você vai fazer?</h2>
                        <TaskForm
                            buttonText="Criar tarefa"
                            taskList={taskList}
                            setTaskList={setTaskList}
                        />
                    </div>
                    <div>
                        <h2>Lista de tarefas</h2>
                        <TaskList
                            taskList={taskList}
                            handleDelete={deleteTask}
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
