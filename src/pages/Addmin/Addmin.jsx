import './Addmin.scss'
import React, { useState } from 'react'
import { uploadFileToStorage } from '../../firebase.config';
import { useDispatch } from 'react-redux';
import { productActions } from '@stores/slices/product.slice';
export default function Admin() {
    const [imgBlod, setImgBlod] = useState(null)
    const dispatch = useDispatch();
    // let result = uploadFileToStorage(e.target.productUrl.file[0],"productImages")

    return (
        <form className='form_addmin' onSubmit={async (e) => {
            e.preventDefault();
            let newProduct = {
                name: e.target.NameProduct.value,
                price: e.target.Price.value,
                type: e.target.type.value,
                img: "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
            }
            if (e.target.productUrl.files.length == 0 || e.target.NameProduct.value == "" || e.target.Price.value == "" || e.target.type.value == "") {
                alert("Please select an image to continue.")
                return
            }


            let urlLink = await uploadFileToStorage(e.target.productUrl.files[0], "images")
            if (urlLink) {
                newProduct.img = urlLink;
            }
            dispatch(productActions.addNewProduct(newProduct))

        }}

        >
            <div className='form_add_Product'>
                <h1>Add Product</h1>
                <input type='text' placeholder='Name Product' name='NameProduct'></input>
                <input type='text' placeholder='Price' name='Price'></input>
                <select style={{ border: "1px solid black", borderRadius: "5px" }} defaultValue={""} name='type'>
                    <option value="">Choose...</option>
                    <option value="Cactus">Cactus</option>
                    <option value="Largeplant">Largeplant</option>
                    <option value="Orchid">Orchid</option>
                    <option value="Dried">Dried</option>
                </select>
            </div>
            <div className='form_add_Product_img'>
                <label>Image:</label>
                <input onChange={(e) => {
                    if (e.target.files[0] != undefined) {
                        let fakeLink = URL.createObjectURL(e.target.files[0])
                        setImgBlod(fakeLink)
                    }
                }} type='file' name='productUrl' /><br />
                <div>
                    <img style={{ width: "200px", height: "200px", marginTop: "20px" }} src={imgBlod != null ? imgBlod : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"} alt='' />
                </div>
                <button type="submit" className="btn btn-danger" onClick={() => {
                    alert("Successful Add Product")
                }}>Add</button>
            </div>
        </form>
    )
}
