import axios from 'axios'
import React, { useState } from 'react'

const CreateData = () => {

    let [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        city: "",
        age: "",
        address: "",
        pincode: "",
        dob: ""
    })

    let [canSubmit, SetCanSubmit] = useState(false)

    let [status, setStatus] = useState(false)

    let [message, setMessage] = useState("")

    let [messageColor, setMessageColor] = useState("")

    let handelChange = (e) => {

        let { name, value } = e.target

        setFormData((prev) => {

            return (
                { ...prev, [name]: value }
            )

        })

    }

    let getAge = (e) => {
        formData.age = new Date().getFullYear() - new Date(e.target.value).getFullYear()
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

            if (result.status === 202) {
                resetForm()
                setStatus(true)
                closePopUp()
                setMessage(result.data.message)
                setMessageColor("success")
            } else {
                resetForm()
                setStatus(true)
                closePopUp()
                setMessage(result.data.message)
                setMessageColor("danger")
            }

        } catch (err) {
            console.log("unable to send data", err)
        }

    }

    let resetForm = () => {

        setFormData(
            {
                name: "",
                email: "",
                phone: "",
                city: "",
                age: "",
                address: "",
                pincode: "",
                dob: ""
            }
        )

    }

    // pop up from backend

    let closePopUp = () => {
        setTimeout(() => {
            setStatus(false)
        }, 5000)
    }

    let CountNumber = (e) => {
        let value = e.target.value
        if (value.length === 10) {
            SetCanSubmit(true)
        } else {
            SetCanSubmit(false)
        }
    }

    return (
        <>
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
                                    <input required onChange={handelChange} onBlur={CountNumber} className='form-control' placeholder='Enter Phone (10 digits only)' type="tel" name='phone' value={formData.phone} />
                                </div>
                                <div className="col">
                                    <input required onChange={handelChange} className='form-control' placeholder='Enter Email' type="email" name='email' value={formData.email} />
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
                                            <input required onChange={(e) => { handelChange(e); getAge(e) }} className='form-control' placeholder='Enter ' type="date" name='dob' value={formData.dob} />
                                        </div>

                                    </div>
                                </div>
                                <div className="col">

                                    <div className='row align-items-center'>
                                        <div className="col">
                                            <label htmlFor="job">Your Age is : </label>
                                        </div>
                                        <div className="col-9">
                                            <input required onChange={handelChange} className='form-control' placeholder='Enter Age' type="number" name='age' value={formData.age} disabled />
                                        </div>
                                    </div>
                                    {/* we will calculate it */}

                                </div>
                            </div>

                            <div className='d-flex justify-content-center gap-3'>
                                <button type='submit' className='btn btn-success' id='submitBtn' disabled={!canSubmit}>Submit</button>
                                <button type='reset' onClick={resetForm} className='btn btn-danger'>Reset</button>
                            </div>

                        </div>

                    </form>

                </div>

            </div>

            {/* pop up */}

            {
                status ?
                    <div className='mt-3 p-2 w-50 position-absolute start-50 top-0 z-3 translate-middle-x bg-light text-center text-dark shadow-lg'>
                        <h4 className={`text-${messageColor}`}>{message}</h4>
                    </div> : null
            }
        </>
    )
}

export default CreateData
