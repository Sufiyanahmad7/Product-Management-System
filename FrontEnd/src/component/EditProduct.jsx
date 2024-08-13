import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import productservice from '../service/productservice';
import productEdit from './EditProduct';

function EditProduct() {
    const [product, setProduct] = useState({
        id:"",
        productName: "",
        description: "",
        price: "",
        status: "",
    });

    const navigate = useNavigate();

   const { id } = useParams();
   console.log(id);
    const[Msg, setMsg] = useState("");

    useEffect(()=>{
        productservice.getProductById(id).then((res)=>{
            setProduct(res.data);
        }).catch((error)=>{
            console.log(error);
        });
    },[]);


    const handleChange = (e) => {
        const value = e.target.value;
        setProduct({ ...product, [e.target.name]: value });
    };


    const productUpdate = (e) => {
        e.preventDefault();
        productservice.saveProduct(product).then((res) => {
            navigate("/");
           
        })

            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header fs-3 text-center">
                            Edit Product
                        </div>
                        {
                            Msg &&
                            <p className="fs-4 text-centre text-success">{Msg}</p>
                        }
                        <div className="card-body">
                            <form onSubmit={(e) => productEdit(e)}>
                                <div className="mb-3">
                                    <label>Enter Product Name</label>
                                    <input type="text" name="productName" className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value ={product.productName}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Enter Description</label>
                                    <input type="text" name="description" className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value ={product.description}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Enter Price</label>
                                    <input type="text" name="price" className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value ={product.price}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Enter Status</label>
                                    <input type="text" name="status" className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value ={product.status}
                                    />
                                </div>
                                <button className="btn btn-primary col-md-12">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct

