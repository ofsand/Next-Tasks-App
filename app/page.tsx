"use client";
import React, { useState, useEffect, useRef } from "react";

// Define the structure for each task in the todo list
type Task = {
	text: string;
	completed: boolean;
};

const useTasksList = () => {
	const [tasks, setTasks] = useState<Task[]>(() => {
		const storedTasks = localStorage.getItem('tasks');
		return storedTasks ? JSON.parse(storedTasks) : [];
	});
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

const TodoApp: React.FC = () => {

	const {tasks, input, setInput, addTask, deleteTask, completeTask} = useTasksList();

	return (
		<div className="max-w-xl mx-auto mt-10">
			<div className="flex items-center space-x-2">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="flex-1 p-2 border-2 border-gray-300 rounded-md"
					placeholder="Add a new task..."
				/>
				<button
					onClick={() => addTask()}
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
					Add Task
				</button>
			</div>
			<ul className="mt-5 space-y-2">
				{tasks.map((task, index) => (
					<li
						key={index}
						className={`flex items-center justify-between p-2 rounded-md shadow-sm ${task.completed ? "bg-green-100": ""}`}>
						<span className={`flex-1 ${task.completed ? "line-through text-green-500": ""}`}>{task.text}</span>
						<div className="flex items-center space-x-2">
							<button
								onClick={() => completeTask(task)}
								className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">
								{task.completed ? "Undo" : "Complete"}
							</button>
							<button
								onClick={() => deleteTask(index)}
								className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoApp;
