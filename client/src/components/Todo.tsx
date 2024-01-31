import React, { useEffect, useState } from 'react';
import { User } from '../interfaces/user.interface';
import { api } from '../services/apis';
import './todo.scss';
import { Modal, message } from 'antd';
import { updateUser } from '../interfaces/updateUser.interface';
export default function Todo() {
    const [data, setData] = useState<User[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                let result: any = await api.todo.findAll();
                if (result.status == 200) {
                    setData(result.data.data)
                }
            } catch (err) {
                console.log('err', err);

            }
        }
        fetchData()
    }, [])
    const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if((e.target as any).userName.value == ''){
            message.error(`Không được để trống tên!`)
            return
        }
        const userData = {
            name: (e.target as any).userName.value
        }
        try {
            let result = await api.todo.create(userData)
            if (result.status == 200) {
                setData([...data, result.data.data]);
                message.success(`Bạn đã thêm công việc ${result.data.data.name} thành công!`);
                (e.target as any).userName.value = '';
            } 
        } catch (err: any) {
            console.log('err', err);
            (e.target as any).userName.value = '';
            message.error(`${err.response.data.message}`)
        }
    }
    const handleDelete = async (userId: number) => {
        try {
            let result = await api.todo.delete(userId);
            if (result.status == 200) {
                let currentData = data.filter(item => item.id != userId)
                setData(currentData);
                message.success(`Bạn đã xóa công việc thành công!`)
            }
        } catch (err) {
            console.log('err', err);
        }
    }
    const handleuUpdate = async (userId: number, updatedData: updateUser) => {
        try {
            let result = await api.todo.update(userId, updatedData)
            if (result.status == 200) {
                let currentData = data.map(item => {
                    if (item.id == result.data.data.id) {
                        return result.data.data
                    } else {
                        return item
                    }
                })
                setData(currentData);
                message.success(`Bạn đã update ${result.data.data.name} thành công!`)
            }
        } catch (err) {
            console.log('err', err);
        }
    }

    return (
        <div className='todo_box'>
            <div className='todo_container'>
                <h1>Todo List</h1>
                <p style={{ fontSize: 13 }} className='text'>Get things done, one item at a time!</p>
                {
                    data?.map(item => (
                        <>
                            <div key={Date.now() * Math.random()} className='todo'>
                                <span className='content' style={item.status ? { textDecoration: 'line-through', color: "#ccc" } : undefined}>{item.name}</span>
                                <div className='tools'>
                                    <input
                                        type='checkbox'
                                        checked={item.status}
                                        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                            const checkbox = e.target;
                                            let status = checkbox.checked;
                                            Modal.warning({
                                                title: "warning!",
                                                content: `Bạn có chắc muốn thay đổi status của ${item.name} không?`,
                                                onOk: async () => {
                                                    handleuUpdate(item.id, { name: item.name, status: Boolean(status) }) 
                                                },
                                                onCancel: () => { }
                                            })

                                        }}
                                    />
                                    <ion-icon
                                        onClick={() => {
                                            Modal.warning({
                                                title: "warning!",
                                                content: `Bạn có chắc muốn xóa công việc ${item.name} không?`,
                                                onOk: async () => {
                                                    handleDelete(item.id)
                                                },
                                                onCancel: () => { }
                                            })

                                        }}
                                        name="trash-outline"></ion-icon>
                                </div>
                            </div>
                        </>
                    ))
                }<div className='main-tog'>
                    <div className='box-tog'>
                        <p style={{ fontSize: 13 }}>Move done items at the end?</p>
                        <input type="checkbox" id="toggle" />
                        <label htmlFor="toggle"></label>
                    </div>

                </div>
                <p style={{ fontSize: 20, marginBottom: 5 }}>Add to the todo list:</p>
                <form onSubmit={(e) => {
                    handleAddTodo(e)
                }}>
                    <input type='text' name='userName' placeholder='Nhập tên todo'></input>
                    <button type='submit'>ADD ITEM</button>
                </form>

            </div>
        </div>
    )
}
