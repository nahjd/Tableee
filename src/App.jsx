import React, { useState } from 'react';
import { Button, Table, Modal } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';


const OnChange = (pagination,filters,sorter, extra) =>{
  console.log("params",pagination,filters,sorter,extra)
}

function App() {
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [companyTitle,setcompanyTitle] = useState("")
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
  
    let obj = {
      companyTitle: companyTitle,
    };
    axios.patch("https://northwind.vercel.app/api/suppliers" + 
    record.id ,obj)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  let [data,setData]=useState([]);
  useEffect(()=>{
    axios.get("https://northwind.vercel.app/api/suppliers").then((res)=>{
      setData(res.data);
    })
  } ,[])
  console.log(data);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'contact title',
      dataIndex: 'contactTitle',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: "Delete",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => {
            fetch(`https://northwind.vercel.app/api/suppliers/${record.id}`, {
              method: "DELETE",
            });
            setData((suppliers) =>
              suppliers.filter((x) => x.id !== record.id)
            );
          }}
        >
          {"Delete"}
        </Button>
      ),
    },
  
    {
      title: 'Edit',
      dataIndex: "",
      key: "x",
      render: () => (   
      <>
        <Button type="primary" style={{background:"blue"}} onClick={showModal}>
          Edit
        </Button>
        <Modal 
        title="Edit"
         open={isModalOpen}
          onOk={handleOk} 
          onCancel={handleCancel}>
        <input 
        type="text" 
        placeholder='contact tittle'
        onChange={(e)=>{
          setcompanyTitle(e.target.value);
          
        }}
        />
        <br />
        <hr />
        <input 
        type="number"
        placeholder='ID'
         />
        </Modal>
      </>
      )
  
      },
    {
      title: 'Add',
      dataIndex: "",
      key: "x",
      render: () => <button style={{background:"green"}}>Add</button>
    },
  
  ];
  
  return <Table  columns={columns} dataSource={data} rowKey={(record) => record.id
  } />
} 
export default App;