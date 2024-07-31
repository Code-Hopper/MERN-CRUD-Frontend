import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ReadData = () => {

    let [FetchedData, SetFetchedData] = useState(null)

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
                    <button className='btn btn-danger me-2'>Delete</button>
                    <button className='btn btn-primary'>Edit</button>
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