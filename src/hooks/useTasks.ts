import { useState } from "react";
import type { ITask } from "../interfaces/Task";

export function useTasks() {
    const [taskList, setTaskList] = useState<ITask[]>([]);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    const addTask = (task: ITask) => {
        setTaskList((prev) => [...prev, task]);
    };

    const updateTask = (id: string, title: string, difficulty: number) => {
        setTaskList((prev) =>
            prev.map((task) =>
                task.id === id ? { id, title, difficulty } : task
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
        taskToDelete,
        requestDelete,
        confirmDelete,
        cancelDelete,
    };
}
