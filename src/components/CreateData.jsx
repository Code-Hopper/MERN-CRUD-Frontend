import axios from 'axios'
import React, { useState } from 'react'

const CreateData = () => {

    let [formData, setFormData] = useState({
        name: "",
        phone: "",
        city: "",
        age: "",
        address: "",
        pincode: "",
        dob: ""
    })

    let handelChange = (e) => {

        let { name, value } = e.target

        setFormData((prev) => {

            return (
                { ...prev, [name]: value }
            )

        })

    }

    let handelSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        // after getting from a objecct send it to backend !

        try {

            let result = await axios({
                method: "post",
                url: "http://localhost:5500/acceptform",
                data: formData
            })

            console.log("your has been sent to backend for validation !")

        } catch (err) {
            console.log("unable to send data", err)
        }

    }

    let resetForm = () => {

        setFormData(
            {
                name: "",
                phone: "",
                city: "",
                age: "",
                address: "",
                pincode: "",
                dob: ""
            }
        )

    }

    return (

        <div>

            <div className='container shadow-lg my-5 p-5'>
                <h1 className='py-2'>Data Entry Form</h1>

                <form onSubmit={handelSubmit}>
                    <div className='d-flex flex-column gap-3'>

                        <div className="row">
                            <div className="col">
                                <input required onChange={handelChange} className='form-control' placeholder='Enter Name' type="text" name='name' value={formData.name} />
                            </div>
                            <div className="col">
                                <input required onChange={handelChange} className='form-control' placeholder='Enter Phone' type="tel" name='phone' value={formData.phone} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col">
                                <input required onChange={handelChange} className='form-control' placeholder='Enter City' type="text" name='city' value={formData.city} />
                            </div>
                            <div className="col-8">
                                <input required onChange={handelChange} className='form-control' placeholder='Enter Address' type="text" name='address' value={formData.address} />
                            </div>
                            <div className="col">
                                <input required onChange={handelChange} className='form-control' type="number" placeholder='Enter Pincode' name='pincode' value={formData.pincode} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col">
                                <div className='row align-items-center'>
                                    <div className="col">
                                        <label htmlFor="job">Enter D.O.B.</label>
                                    </div>
                                    <div className="col-9">
                                        <input required onChange={handelChange} className='form-control' placeholder='Enter ' type="date" name='dob' value={formData.dob} />
                                    </div>

                                </div>
                            </div>
                            <div className="col">
                                {/* we will calculate it */}
                                <input required onChange={handelChange} className='form-control' placeholder='Enter Age' type="number" name='age' value={formData.age} />
                            </div>
                        </div>

                        <div className='d-flex justify-content-center gap-3'>
                            <button type='submit' className='btn btn-success'>Submit</button>
                            <button type='reset' onClick={resetForm} className='btn btn-danger'>Reset</button>
                        </div>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default CreateData
