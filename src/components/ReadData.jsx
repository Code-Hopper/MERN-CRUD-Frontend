import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { deleteData } from "./DeleteData.js"

const ReadData = () => {

    let [FetchedData, SetFetchedData] = useState(null)

    let [editFi, setEditFi] = useState(true)

    let [editedData, setEditedData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        age: "",
        address: "",
        pincode: "",
        dob: ""
    })

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

    let handelEditChange = (e) => {
        let { name, value } = e.target
        console.log(name + " : " + value)
        setEditedData((prev) => {

            return (
                { ...prev, [name]: value }
            )

        })
    }

    useEffect(() => {
        fetchDataFromDatabase()
    }, [])

    let DisplayDataRow = (props) => {

        return (
            <tr className='' key={props._id}>
                <td>
                    <input onChange={handelEditChange} className='editFi form-control' type="text" name='name' value={editedData.name ? null : editedData.name = props.name} disabled={editFi} />
                </td>
                <td>
                    <input onChange={handelEditChange} className='editFi form-control' type="text" name="phone" value={props.phone} disabled={editFi} />
                </td>
                <td>
                    <input onChange={handelEditChange} className='editFi form-control' type="email" name="email" value={props.email} disabled={editFi} />
                </td>
                <td>
                    <input onChange={handelEditChange} className='editFi form-control' type="text" name='city' value={props.city} disabled={editFi} />
                </td>
                <td>
                    <input onChange={handelEditChange} className='editFi form-control' type="number" name='pincode' value={props.pincode} disabled={editFi} />

                </td>
                <td>
                    <input onChange={handelEditChange} className='editFi form-control' type="text" name='address' value={props.address} disabled={editFi} />
                </td>
                <td>
                    <input onChange={handelEditChange} className='editFi form-control' type="date" name='dob' value={props.dob} disabled={editFi} />
                </td>
                <td>
                    <input onChange={handelEditChange} className='editFi form-control' type="number" name='age' value={props.age} disabled={editFi} />
                </td>
                <td>
                    <button className='btn btn-danger me-2' onClick={() => {
                        deleteData(props.name, props._id)
                    }}>Delete</button>
                    <button className='btn btn-primary' onClick={() => {
                        setEditFi(!editFi)
                    }}>Edit</button>
                    {editFi ? null : <button className='btn btn-success'>Save</button>}
                </td>
            </tr>
        )
    }

    return (

        <>
            <div className='container'>

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
        </>
    )
}
export default ReadData