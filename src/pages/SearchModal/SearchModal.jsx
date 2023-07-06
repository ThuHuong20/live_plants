import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '@stores/slices/product.slice';
import { convertToUSD, randomId } from "@mieuteacher/meomeojs"
import './SearchModal.scss'
function Example() {
    const dispatch = useDispatch();
    /* bootstrap */
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        dispatch(productActions.clearSearchData())
    };
    const handleShow = () => {
        setShow(true)
        dispatch(productActions.clearSearchData())
    };


    const productStore = useSelector(store => store.productStore);

    const [searchTimeOut, setSearchTimeOut] = useState(null);

    function searchEngine(keyWord) {
        clearTimeout(searchTimeOut);

        setSearchTimeOut(setTimeout(() => {
            if (!productStore.loading) {
                if (keyWord != "") {
                    dispatch(productActions.searchProductByName(keyWord))
                }
            }
        }, 500))

    }
    return (
        <>
            <Button variant="light" onClick={handleShow} >
                <span class="material-symbols-outlined">
                    <input type="text" style={{ width: "200px" }} className='input' placeholder='Search' />
                </span>
            </Button>
            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title >
                        <input style={{ border: "2px solid green", width: "1024px" }} onChange={(e) => searchEngine(e.target.value)} type='text' placeholder='Enter search' className='input' />
                    </Modal.Title>
                </Modal.Header>
                {
                    productStore.searchData.map((item, index) =>
                        <Modal.Body onClick={() => {
                            window.open("/detailItem/" + item.id, "_blank");
                        }} key={randomId()}>
                            <div className='DetailItem_container'>
                                <div className='DetailItem'>
                                    <div className='DetailItem_img'>
                                        <img src={item.img} />
                                    </div>
                                    <div className='DetailItem_name'>
                                        <h3>{item.name}</h3>
                                        <p>{convertToUSD(item.price)}</p>
                                    </div>
                                </div>
                            </div>

                        </Modal.Body>
                    )
                }
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;