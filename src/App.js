import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

// import other from './Other.module.css'; .module is important!
// import { TitleClassComponent, TitleFnComponent } from "./components/title"

import { ContactFormClassComponent, ContactFormFnComponent } from "./components/contact"
import { DataGrid, DataGridClsComponent } from './components/data-grid';
import { Header } from './components/header';
import { Button } from "./components/button"

function App() {

  const [activeTab, setActiveTab] = useState("fn")

  const [todos, setTodos] =useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(10);

  useEffect( () => {
    const fetchTodos = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(res.data);
      setLoading(false);
    }
    fetchTodos();
  },[]);

  console.log(todos);

  return (
    <div className="App">
      <Header />
      {/* <ContactFormClassComponent /> */}
      <div className='container'>
        <div className="btn-group tabs" role="group" ariaLabel="Basic example">
          <Button onClick={() => setActiveTab("cls")} className={activeTab === "cls" ? "btn btn-primary" : "btn btn-default"}>Class Component</Button>
          <Button onClick={() => setActiveTab("fn")} className={activeTab === "fn" ? "btn btn-primary" : "btn btn-default"}>Fn Component</Button>
        </div>
        <br />
        { activeTab == "fn" ? <DataGrid /> : <DataGridClsComponent />}
      </div>
    </div>
  );
}
export default App;