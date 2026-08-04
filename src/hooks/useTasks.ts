import { useState } from "react";
import type { ITask } from "../interfaces/Task";

export function useTasks() {
    const [taskList, setTaskList] = useState<ITask[]>([]);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    const addTask = (task: ITask) => {
        setTaskList((prev) => [...prev, { ...task, completed: false }]);
    };

    const updateTask = (id: string, title: string, difficulty: number) => {
        setTaskList((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, title, difficulty } : task
            )
        );
    };

    const toggleTask = (id: string) => {
        setTaskList((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const requestDelete = (id: string) => {
        setTaskToDelete(id);
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            setTaskList((prev) => prev.filter((task) => task.id !== taskToDelete));
        }
        setTaskToDelete(null);
    };

    const cancelDelete = () => {
        setTaskToDelete(null);
    };

    return {
        taskList,
        addTask,
        updateTask,
        toggleTask,
        taskToDelete,
        requestDelete,
        confirmDelete,
        cancelDelete,
    };
}
