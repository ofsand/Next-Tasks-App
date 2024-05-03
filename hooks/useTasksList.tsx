import { useEffect, useState } from "react";
import useLocalStorageState from "./useLocalStorageState";

// Define the structure for each task in the todo list
type Task = {
	text: string;
	completed: boolean;
};

export const useTasksList = () => {
	const [tasks, setTasks] = useLocalStorageState<Task[]>('tasks', [])
	const [input, setInput] = useState<string>("");

	useEffect(() => {
		localStorage.setItem(`tasks`,JSON.stringify(tasks));
	}, [tasks]);


	const addTask = () => {
		if(input) {
			setTasks([...tasks, { text: input, completed: false }]);
			setInput("");
		}
	}

	const completeTask = (task: Task) => {
		const updatedTasks = tasks.map((t) =>
			t === task ? { ...t, completed: !t.completed } : t
		);
        console.log(updatedTasks);
		setTasks(updatedTasks);
	};

	const deleteTask = (index: number) => {
		const Tasks = [...tasks];
		Tasks.splice(index, 1);
		setTasks(Tasks);
	};

	return {
		tasks,
		input,
		setInput,
		addTask,
		deleteTask,
		completeTask,
	  };
}
