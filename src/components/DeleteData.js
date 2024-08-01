import axios from "axios"

let deleteData = async (name, id) => {
  try {
    alert(`you are trying to delete ${name} !`)

    let result = await axios({
      url: `http://localhost:5500/delete/${id}`,
      method: 'delete'
    })

    if (result.status == 200) {
      alert("data has been delete successfully !")
    }

    else {
      throw ("kuch message")
    }

  } catch (err) {
    alert("unable to delete the data !")
    console.log("unable to delete", err)
  }
}

export { deleteData }