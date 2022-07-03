import React, { useEffect, useState } from "react"
import { Button } from "../button"
import { FormItem } from "../form-item"
import Pagination from "../pagination/pagination"

export function DataGrid() {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  //rjfhdkjfndfneefef

//todo listelerini sıralama:
  const [todo, setTodo] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setitemPerPage] = useState(30)
  const[pageId, setPageId] = useState("asc")
  const[pageName, setPageName] = useState("asc")
  const[pageRight, setPageRight] = useState("asc")


  useEffect(() => {
    loadData()
  },
  [itemPerPage, setitemPerPage])
  const indexOfLastitem = currentPage * itemPerPage;
  const indexOfFirstitem = indexOfLastitem - itemPerPage;
  const currentitem = items.slice(indexOfFirstitem, indexOfLastitem);
  const totalPagesNum = Math.ceil(items.length / itemPerPage)



  const loadData = () => {
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(x => x.json())
      .then(response => {
        setItems(response)
        setLoading(false)
    }).catch(e => {
      console.log(e)
      setLoading(false)
    })
  }

  const renderBody = () => {
    return (
      <React.Fragment>
        {currentitem.map((item, i) => 
        {
          return (
            <tr key={i}>
              <th scope="row" >{item.id}</th>
              <td>{item.title}</td>
              <td>{item.completed ? "Tamamlandı" : "Yapılacak"}</td>
              <td>
                <Button className="btn btn-xs btn-danger" onClick={() => onRemove(item.id)}>Sil</Button>
                <Button className="btn btn-xs btn-warning" onClick={() => onEdit(item)}>Düzenle</Button>
              </td>
            </tr>
          )
        })}
      </React.Fragment>
    )
  }

  const renderTable = () => {
    return (
    <>

      <Pagination pages = {totalPagesNum} setCurrentPage={setCurrentPage}/>
      <Button onClick={onAdd}>Ekle</Button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" 
             onClick={() => reverseId(items.id)}>Id</th>
            <th scope="col" 
             onClick={() => reverseName(items.name)}>Başlık</th>
            <th scope="col" 
             onClick={() => reverseRight(items.right)}>Durum</th>
            <th scope="col">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody>
          {renderBody()}
        </tbody>
      </table>
    </>
    )
  }

  const reverseId = (col) => {
    if(pageId === "asc"){
      const reversed = [...items].sort((a, b) => (a.id > b.id ? -1 : 1))
      setPageId("desc");
      setItems(reversed);
    }else{
      const reversed = [...items].sort((a, b) => (a.id > b.id ? 1 : -1))
      setPageId("asc");
      setItems(reversed);
    }
  }


  const reverseName = (col) => {
    if(pageName === "asc"){
      const reversed = [...items].sort((a, b) => (a.id > b.id ? -1 : 1))
      setPageId("desc");
      setItems(reversed);
    }else{
      const reversed = [...items].sort((a, b) => (a.id > b.id ? 1 : -1))
      setPageName("asc");
      setItems(reversed);
    }
  }
  

  const reverseRight = (col) => {

    if(pageRight === "asc"){
      const reversed = [...items].sort((a, b) => 
      (a.id > b.id ? -1 : 1));
      setPageRight("desc");
      setItems(reversed);

    }else{
      const reversed = [...items].sort((a, b) => (a.id > b.id ? 1 : -1))
      setPageRight("asc");
      setItems(reversed);
    }
  }

  const saveChanges = () => {

    // insert 
    if (todo && todo.id === -1) {
      todo.id = Math.max(...items.map(item => item.id)) + 1;
      setItems(items => {
        items.push(todo)
        return [...items]
      })

      alert("Ekleme işlemi başarıyla gerçekleşti.")
      setTodo(null)
      return
    }
    // update
    const index = items.findIndex(item => item.id == todo.id)
    setItems(items => {
      items[index] = todo
      return [...items]
    })
    setTodo(null)
  }

  const onAdd = () => {
    setTodo({
      id: -1,
      title: "",
      completed: false
    })
  }

  const onRemove = (id) => {
    const status = window.confirm("Silmek istediğinize emin misiniz?")

    if (!status) {
      return
    }
    const index = items.findIndex(item => item.id == id)
    
    setItems(items => {
      items.splice(index, 1)
      return [...items]
    })
  }

  const onEdit = (todo) => {
    setTodo(todo)
  }
  
  const cancel = () => {
    setTodo(null)
  }

  const renderEditForm = () => {
    return (
      <>
        <FormItem
          title="Title"
          value={todo.title}
          onChange={e => setTodo(todos => {
            return {...todos, title: e.target.value}
          })}
        />
        <FormItem
          component="checkbox"
          title="Completed"
          value={todo.completed}
          onChange={e => setTodo(todos => {
            return {...todos, completed: e.target.checked}
          })}
        />
        <Button onClick={saveChanges}>Kaydet</Button>
        <Button className="btn btn-default" onClick={cancel}>Vazgeç</Button>
      </>
    )
  }
  
  return (
    <>
      { loading ? "Yükleniyor...." : (todo ? renderEditForm() : renderTable())}
    
    </>
  )
}