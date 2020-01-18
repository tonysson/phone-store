import React from 'react'

export default function CartColums() {
    return (
        <div className="container-fluid text-center d-none d-lg-block mt-5">
            <div className="row" style={{fontWeight:'bold'}}>
                <div className="col-10 mx-auto col-lg-2">
                    <p className ="text-uppercase">products</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase"> name of products</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">price</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">quantity</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">remove</p>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">total</p>
                </div>
            </div>
            
        </div>
    )
}
