import { useEffect, useState } from "react";
import './TodoList.css'




function TodoList() {

    const [value, setValue] = useState("")
    const [list, setList] = useState([])




    const getList = async () => {

        fetch('https://playground.4geeks.com/todo/users/martinlfd', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setList(data.todos))
            .catch((error) => console.log(error));
    };



    const userPost = async (obj) => {
        fetch("https://playground.4geeks.com/todo/todos/martinlfd", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },


        })

            .then((response) => response.json())
            .then((data) => setList(list.concat(data)))
            .catch((error) => console.log(error));

    };

    const deletePost = async (id) => {
        fetch("https://playground.4geeks.com/todo/todos/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then((resp) => {

                if (resp.ok)
                    setList(list.filter((todo) => id !== todo.id))
            })
            .catch((error) => console.log(error));
    };



    useEffect(() => {
        getList();
    }, [])



    return (

        <div className='container'>

            <h1>Todo List</h1>
            <div className="form-body">

                <input className="input-body" type="text" onChange={(e) => setValue(e.target.value)}
                    value={value}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            const obj = { label: value, is_done: false }
                            userPost(obj);
                            setValue("");
                        }
                    }}
                    placeholder='what do you need to do' />
            </div>
            <ul className="task-body">


                {list.map((item) =>
                    <li key={item.id}>
                        {item.label}
                        <button onClick={() => deletePost(item.id)}>X</button>
                    </li>)}
            </ul>

            <div className="items-left">{list.length}Tareas</div>
        </div>

    )
}

export default TodoList;