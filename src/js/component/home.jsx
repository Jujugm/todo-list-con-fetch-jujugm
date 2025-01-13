import React, {useState, useEffect} from "react";
                                                        // 1er paso para declarar estados

//create your first component
const Home = () => {
	
	const [traerLista, setgetLista]=useState([])

// Los estados son espacios de memoria que van a cambiar
		    //  Aqui se guarda la tarea 
			 const [task,setTask]=useState("")          //  2do paso para declarar estados (decarar espacio de memoria y funcion a declarar SIEMPRE COLOCAR SET (DE SETTER))

			// Aqui se guarda la lista de tareas
			const [taskList,setTaskList]=useState([])   
	

 function handleTask(event) {

	if(event.keyCode === 13){

		//funcion post de postman

		// despues de pulsar enter quiero que agregue una nueva tarea (task) a la lista (TaskList) 
		let nuevoArray = taskList.concat(task);
		// concat es una funcion por lo que le añado parentesis
		setTaskList(nuevoArray)
	}
	// setTask("");
	// setTaskList([TaskList, task]);
 }


function deleteTask (deleteIndex) {
// // Cuando pulse la X se elimina un elemento
setTaskList(taskList.filter((_, index) => index !== deleteIndex)); // Actualiza el estado
setgetLista(traerLista.filter((_,index)=> index !== deleteIndex))
}
// // En la funcion debe llegar la informacion del elemento que queremos eliminar
// let deleteTask = task.concat (span)

// Aquí empieza todo lo de fetch

function borrarTarea() {
	const requestOptions = {
		method: "DELETE",
		redirect: "follow"
	  };
	  
	  fetch("https://playground.4geeks.com/todo/todos/80", requestOptions)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
}


function createUser() {
	const requestOptions = {
		method: "POST",
		redirect: "follow"
	  };
	  
	  fetch("https://playground.4geeks.com/todo/users/jujugm", requestOptions)
		 .then((response) => 
		// si el usuario ha sido creado con exito traeme getLista()
		 {
			if (response.status >= 200 && response.status < 300) {
			getLista();
		  }
		  else if (response.status === 400) {
			// Si el usuario ya existe 
			getLista();
		}
		  
		  return response.json()
		})
			
			
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
	// console.log(creandousuario);

}

// function getuser(){
// 	const requestOptions = {
// 		method: "GET",
// 		redirect: "follow"
// 	  };
	  
// 	  fetch("https://playground.4geeks.com/todo/users/jujugm", requestOptions)
// 		.then((response) => response.text())
// 		.then((result) => console.log(result))
// 		.catch((error) => console.error(error));

// }


function crearLista() {
	const requestOptions = {
		method: "POST",
		redirect: "follow"
	  };
	  
	  fetch("https://playground.4geeks.com/todo/users/jujugm", requestOptions)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
		// console.log (response);
}

function getLista() {
	const requestOptions = {
		method: "GET",
		redirect: "follow"
	  };
	  
	  fetch("https://playground.4geeks.com/todo/users/jujugm", requestOptions)
		.then((response) => 
			{if (response.status === 404){
				createUser()
			  }
			  
			  return response.json()
			})
		.then((data) => setgetLista(data.todos))
		.catch((error) => console.error(error));
}


useEffect (()=>{
	//codigo a ejecutar
	createUser();
	getLista();
	// getuser();
	crearTarea();
	

},[])

function crearTarea() {
	// if (traerLista.some((item) => item.label === "Andar 20 minutos")) {
	// 	console.log("La tarea ya existe, no se agregará de nuevo.");
	// 	return;
	//   }
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	
	const raw = JSON.stringify({
	  "label": "Andar 20 minutos",
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
	  .catch((error) => console.error(error)); }

// function putLista() {
// 	const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   "label": "Andar 15 minutos",
//   "is_done": true
// });

// const requestOptions = {
//   method: "PUT",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("https://playground.4geeks.com/todo/todos/80", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
// }

const handleClick = (id) => {

	console.log(id);
}   ;


// peticion para enviar el id borrar la tarea  (poner id en vez del numero del link)

return (
<div className= "container">
	<h1>To-Do List</h1>
		
		<div className="input-group input-group-lg">
  <input type="text" 
  className="form-control" 
  aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
  onChange={(event)=>setTask(event.target.value)} 
  onKeyDown={handleTask}
  
  />
		</div>
		
				

					<div className="listgroup">
		<ul className="list-group ">
{traerLista.map((item, index) => <li className="list-group-item">{item.label}
<span
              className="delete-click"
              onClick={() => deleteTask(index)}
            >
              X
            </span></li>)}
			{/* Mapear taskList para que se generen nuevos li uno debajo de otro */}
			
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
        ))}
		

		
		</ul>
		<p>{traerLista.length+taskList.length } items left</p>
			</div>
		</div>
	);
};

export default Home;
