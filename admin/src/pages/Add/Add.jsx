import React, { useState } from 'react'
import "./Add.css"
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import axios from 'axios'



const Add = ({url}) => {


  const [image, setImage] = useState(false)
  const [data, setData] = useState({
     name: "",
     description:"",
     price: "",
     category: "Salad"
  })


  // onchange 
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data =>({...data,[name]:value}))

  }

  // onsubmit (for api call)
  const onsubmitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    
    // api call (this will add the data to the database)
    const response = await axios.post(`${url}/api/food/add`, formData)

    if (response.data.success) {
      setData({
        name: "",
        description:"",
        price: "",
        category: "Salad"
     })
     setImage(false)
     toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onsubmitHandler}>
          <div className='add-image-upload flex-col'>
              <p>Upload Image</p>
              <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
              </label>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required className='file'/>
          </div>
          <div className='add-product-name flex-col'>
             <p>Product name</p>
             <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
          </div>
          <div className='add-product-desc flex-col'>
          <p>Product desctiption</p>
          <textarea onChange={onChangeHandler} value={data.description}  name="description" rows="6" id="" placeholder='Write content here'></textarea>
          </div>
          <div className='add-category-price'>
              <div className='add-category flex-col'>
                <p>Product category</p>
                <select onChange={onChangeHandler} name="category" >
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
              </div>
            <div className='add-price flex-col'>
                <p>Product price</p>  
                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20'/>

            </div>  
          </div>
          <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add