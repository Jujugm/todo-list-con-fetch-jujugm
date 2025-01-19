import React, { useState, useEffect } from "react";
// 1er paso para declarar estados

//create your first component
const Home = () => {

	const [traerLista, setGetLista] = useState([])

	// Los estados son espacios de memoria que van a cambiar
	//  Aqui se guarda la tarea 
	const [task, setTask] = useState("")          //  2do paso para declarar estados (decarar espacio de memoria y funcion a declarar SIEMPRE COLOCAR SET (DE SETTER))

	// Aqui se guarda la lista de tareas
	const [taskList, setTaskList] = useState([])


	function handleTask(event) {

		if (event.keyCode===13) {
		crearTarea(task)
		getLista()
		
	}
		
		// setTask("");
		// setTaskList([TaskList, task]);
	}


	// // En la funcion debe llegar la informacion del elemento que queremos eliminar
	// let deleteTask = task.concat (span)

	// Aquí empieza todo lo de fetch

	function borrarTarea(id) {
		const requestOptions = {
			method: "DELETE",
			redirect: "follow"
		};

		fetch(`https://playground.4geeks.com/todo/todos/${id}`, requestOptions)
			.then((response) => {
				if (response.status === 204) {
				
				// y se trae la tarea
				getLista()
			}
			})
		}


	function createUser() {
		const requestOptions = {
			method: "POST",
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/users/jujugm", requestOptions)
	}

	function getLista() {
		const requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/users/jujugm", requestOptions)
			.then((response) => {
				if (response.status == 404) {
					// se crea el usuario
					createUser()
					// y se trae la tarea
					getLista()
				}

				return response.json()
			})
			.then((data) => setGetLista(data.todos))
			.catch((error) => console.error(error));
	}


	function crearTarea(label) {
		
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			"label": `${label}`,
			"is_done": false
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch("https://playground.4geeks.com/todo/todos/jujugm", requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.error(error));
	}

	// const handleClick = (id) => {

	// 	console.log(id);
	// }   ;


	// peticion para enviar el id borrar la tarea  (poner id en vez del numero del link)
	useEffect(() => {
		//codigo a ejecutar
		createUser();
		getLista();

	}, [])

function handleSubmit(event) {
	event.preventDefault(); //Evita el recargar la pagina

	getLista();
	setTask("");
} 
	return (
		<div className="container">
			<h1>To-Do List</h1>

			<form onSubmit={handleSubmit}>

			<div className="input-group input-group-lg">
				<input type="text"
					className="form-control"
					aria-label="Large" aria-describedby="inputGroup-sizing-sm"
					value={task} // Aseguro que el input está sincronizado con el estado
					onChange={(event) => setTask(event.target.value)}
					onKeyDown={handleTask}
				/>
			</div>
			</form>



			<div className="listgroup">
				<ul className="list-group ">
					{traerLista.map((item) => <li id= {item.id} className="list-group-item">{item.label}
						<span
							className="delete-click"
							onClick={() => {
								borrarTarea(item.id) 
								getLista()
								}}>
							X
						</span></li>)}
					{/* Mapear taskList para que se generen nuevos li uno debajo de otro

					{taskList.map((item, index) => (
						<li key={index} className="list-group-item">
							{item}
							<span
								className="delete-click"
								onClick={() => deleteTask(index)}
							>
								X
							</span>
						</li>
					))} */}



				</ul>
				<p>{traerLista.length + taskList.length} items left</p>
			</div>
		</div>
	);
};

export default Home;
