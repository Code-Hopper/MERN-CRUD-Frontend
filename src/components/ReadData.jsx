import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ReadData = () => {

    let [FetchedData, SetFetchedData] = useState(null)

    let fetchDataFromDatabase = async () => {
        try{

            let result  = axios({
                method:"get",
                url:"http://localhost:5500/fetchData"
            })

            SetFetchedData(FetchedData)

        }catch(err){

        }
    }

    useEffect(()=>{
        fetchDataFromDatabase()
    },[])

    return (

        <>
            <h1>Reading the data from database !</h1>



        </>
    )
}
export default ReadData