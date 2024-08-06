import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { deleteData } from "./DeleteData.js"

const ReadData = () => {

    let [FetchedData, SetFetchedData] = useState(null)

    let [openEdit, SetOpenEdit] = useState(false)

    let [editData, setEditData] = useState(null)

    let fetchDataFromDatabase = async () => {
        try {

            let result = await axios({
                method: "get",
                url: "http://localhost:5500/fetchData"
            })

            console.log(result.data.database)

            SetFetchedData(result.data.database)

        } catch (err) {

        }
    }

    useEffect(() => {
        fetchDataFromDatabase()
    }, [])

    let DisplayDataRow = (props) => {

        let rawData = props

        return (
            <tr className='' key={props._id}>
                <td>{props.name}</td>
                <td>{props.phone}</td>
                <td>{props.email}</td>
                <td>{props.city}</td>
                <td>{props.pincode}</td>
                <td>{props.address}</td>
                <td>{props.dob}</td>
                <td>{props.age}</td>
                <td>
                    <button className='btn btn-danger me-2' onClick={() => {
                        deleteData(props.name, props._id)
                    }}>Delete</button>
                    <button className='btn btn-primary'
                        onClick={() => {
                            SetOpenEdit(true)
                            setEditData(rawData)
                        }}
                    >Edit</button>
                </td>
            </tr>
        )
    }

    let EditPopUp = () => {
        console.log(editData)
        return (
            <div style={{ width: "450px" }} className='bg-dark position-absolute start-50 top-50 translate-middle text-light p-5'>
                <h1>Edit Form</h1>
                <div className='row flex-column gap-2 p-5'>
                    <div className="col">
                        <input className='form-control' type="text" placeholder={editData.name} />
                    </div>
                    <div className="col">
                        <input className='form-control' type="number" placeholder={editData.phone} />
                    </div>
                    <div className="col">
                        <input className='form-control' type="email" placeholder={editData.email} />
                    </div>
                    <div className="col">
                        <input className='form-control' type="text" placeholder={editData.address} />
                    </div>
                    <div className="col">
                        <input className='form-control' type="number" placeholder={editData.pincode} />
                    </div>
                    <div className="col">
                        <input className='form-control' type="text" placeholder={editData.city} />
                    </div>
                    <div className="col">
                        <input className='form-control' type="date" value={editData.dob} />
                    </div>
                    <div className="col">
                        <input className='form-control' type="number" placeholder={editData.age} />
                    </div>
                    <div className="col d-flex gap-3">
                        <button type='submit' className='btn btn-success'>Save</button>
                        <button type='button' className='btn btn-danger' onClick={() => SetOpenEdit(false) }>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }

    return (

        <>
            <div style={{maxHeight:"300px", overflowY:"scroll"}} className='container'>
                {
                    FetchedData ?
                        <table className='table table-border'>
                            <thead>
                                <tr className='table-dark'>
                                    <th>name</th>
                                    <th>phone</th>
                                    <th>email</th>
                                    <th>city</th>
                                    <th>pincode</th>
                                    <th>address</th>
                                    <th>dob</th>
                                    <th>age</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    FetchedData.map(DisplayDataRow)
                                }
                            </tbody>
                        </table>
                        : <h1>Unable to Get Data From Backend</h1>
                }
            </div>

            {/* open edit popup */}

            {openEdit ? <EditPopUp /> : null}

        </>
    )
}
export default ReadData