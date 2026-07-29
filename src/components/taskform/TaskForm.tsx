interface TaskFormProps {
    buttonText: string;
}

const TaskForm = ({ buttonText }: TaskFormProps) => {
    return (
        <form>
            <div>
                <label htmlFor="title">Título</label>
                <input type="text" name="title" placeholder="Título da tarefa" />
            </div>
            <div>
                <label htmlFor="difficulty">Dificuldade</label>
                <input type="text" name="difficulty" placeholder="Dificuldade da tarefa" />
            </div>
            <input type="submit" value={buttonText} />
        </form>
    );
};

export default TaskForm;