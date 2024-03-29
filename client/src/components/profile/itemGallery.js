import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllItemsByUser, addItem, useUploadPhoto } from '../../actions/item';
import Loading from '../Loading';
import Add from '../../assets/images/additem.png';
import ItemImg from '../../assets/images/swipeswap_item.jpg';
import { MDBRow, MDBCol, MDBModal, MDBModalHeader, MDBModalBody, MDBBtn, MDBAnimation } from 'mdbreact';
import { Container, Button } from 'react-floating-action-button';
import "../../css/style.css";
import "../../css/mediaQuery.css";
import Select, { components } from "react-select";


const ItemGallery = ({ getAllItemsByUser, item:{ items, swappedItems, loading }, addItem }) => {

  useEffect(() => {
    getAllItemsByUser()
  }, [getAllItemsByUser])
  
    const [showModal, setShowModal] = useState(false);  
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [picture, setPicture] = useState(null);
    const [file, setfile] = useState(undefined);

    const [selectedValue, setSelectedValue] = useState([]);

    const [formData, setFormData] = useState({
      description:'',
      itemname:'',
      status:'',
      categories: '',
      imgUrl:''
    })

    const {
      description,
      itemname,
      status,
      categories,
      imgUrl
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = () => {
        addItem(formData)
    }

    const ImgUpload = () =>{
      return(
        <label htmlFor="photo-upload" className="item-prev-upload flex-center">
          <div className="item-prev-upload-wrap item-prev-upload-img" >
            <img htmlFor="photo-upload" src={picture ? picture : Add} />
          </div>
          <input id="photo-upload" type="file" onChange={onChangePicture}/> 
        </label>
      );
    }
    // const ImgUpload2 = () =>{
    //   return(
    //     <label htmlFor="photo-upload2" className="item-prev-upload flex-center">
    //       <div className="item-prev-upload-wrap item-prev-upload-img" >
    //         <img htmlFor="photo-upload2" src={picture2 ? picture2 : Add} />
    //       </div>
    //       <input id="photo-upload2" type="file" onChange={onChangePicture2}/> 
    //     </label>
    //   );
    // }
    // const ImgUpload3 = () =>{
    //   return(
    //     <label htmlFor="photo-upload3" className="item-prev-upload flex-center">
    //       <div className="item-prev-upload-wrap item-prev-upload-img" >
    //         <img htmlFor="photo-upload3" src={picture3 ? picture3 : Add} />
    //       </div>
    //       <input id="photo-upload3" type="file" onChange={onChangePicture3}/> 
    //     </label>
    //   );
    // }
    // const ImgUpload4 = () =>{
    //   return(
    //     <label htmlFor="photo-upload4" className="item-prev-upload flex-center">
    //       <div className="item-prev-upload-wrap item-prev-upload-img" >
    //         <img htmlFor="photo-upload4" src={picture4 ? picture4 : Add} />
    //       </div>
    //       <input id="photo-upload4" type="file" onChange={onChangePicture4}/> 
    //     </label>
    //   );
    // }

    const uploadPhoto = useUploadPhoto()

    const onChangePicture = e => {
      document.getElementById('uploadButton').style.display = "";
      document.getElementById('cnfrmBtn').style.display = "none";

      setPicture(URL.createObjectURL(e.target.files[0]));
      setfile(e.target.files[0])
      
      uploadPhoto(e.target.files[0]).then((res) => {
        document.getElementById('uploadButton').style.display = "none";
        document.getElementById('cnfrmBtn').style.display = "";
        setFormData({ imgUrl: res })
      })
    };


    // const onChangePicture2 = e => {
    //   setPicture2(URL.createObjectURL(e.target.files[0]));
    //   setfile2(e.target.files[0])
    // };
    // const onChangePicture3 = e => {
    //   setPicture3(URL.createObjectURL(e.target.files[0]));
    //   setfile3(e.target.files[0])
    // };
    // const onChangePicture4 = e => {
    //   setPicture4(URL.createObjectURL(e.target.files[0]));
    //   setfile4(e.target.files[0])
    // };

    // const [picture2, setPicture2] = useState(null);
    // const [file2, setfile2] = useState(undefined);
  
    // const [picture3, setPicture3] = useState(null);
    // const [file3, setfile3] = useState(undefined);
  
    // const [picture4, setPicture4] = useState(null);
    // const [file4, setfile4] = useState(undefined);
    
    const onChangeStatus = e => {
      setFormData({ ...formData, status: e.value })
    }

    const onChangeCategory = val => {
      setFormData({ ...formData, categories: selectedValue.toString() })
      setSelectedValue(Array.isArray(val) ? val.map(x => x.value) : '')
    }

    const cat = [
      { value: 'Vehicles', label: 'Vehicles' },
      { value: 'Apparel', label: 'Apparel' },
      { value: 'Electronics', label: 'Electronics' },
      { value: 'Entertainment', label: 'Entertainment' },
      { value: 'Baby & Kids Items', label: 'Baby & Kids Items' },
      { value: 'Health & Beauty', label: 'Health & Beauty' },
      { value: 'Pet Supplies', label: 'Pet Supplies' },
      { value: 'Musical Instruments', label: 'Musical Instruments' },
      { value: 'Office Supplies', label: 'Office Supplies' },
      { value: 'Sporting Goods', label: 'Sporting Goods' },
      { value: 'Toys & Games', label: 'Toys & Games' }      
  ];

    const conditions = [
      { value: 'Very Bad', label: 'Very Bad' },
      { value: 'Poor', label: 'Poor' },
      { value: 'Ok', label: 'Ok' },
      { value: 'Good', label: 'Good' },
      { value: 'Excellent', label: 'Excellent' }
    ];


    const Menu = props => {
      const optionSelectedLength = props.getValue().length || 0;
      return (
        <components.Menu {...props}>
          {optionSelectedLength < 5 ? (
            props.children
          ) : (
            <div className="p-2 red-text" style={{fontSize: "14px"}}>Max limit reached!</div>
          )}
        </components.Menu>
      );
    };

    useEffect(() => {

    }, [file, selectedValue, imgUrl])
    
    return (
      <Fragment>
      {/* Modals */}
      <MDBModal isOpen={showModal} toggle={handleClose}>
        <MDBModalHeader toggle={handleClose}>Add Item</MDBModalHeader>
        <MDBModalBody className="px-4">
          <form onSubmit={e => onSubmit(e)}>
            <MDBRow className="mx-auto">
            <MDBCol className="item-prev-col flex-center" size="6">
              <ImgUpload/>
            </MDBCol>
            <MDBCol className="item-prev-col flex-center" size="6">
              {/* <ImgUpload2/> */}
            </MDBCol>
            <MDBCol className="item-prev-col flex-center" size="6">
              {/* <ImgUpload3/> */}
            </MDBCol>
            <MDBCol className="item-prev-col flex-center" size="6">
              {/* <ImgUpload4/> */}
            </MDBCol>
            </MDBRow>
            <input type="text" name="itemname" value={itemname} onChange={e => onChange(e)} className="form-control mt-3" placeholder="Item Name" required />
            <textarea type="text" name="description" value={description} onChange={e => onChange(e)} className="form-control mt-3" placeholder="Description" />
            <Select
              className="w-100 mt-3"
              onChange={onChangeCategory}
              value={cat.filter(obj => selectedValue.includes(obj.value))}
              options={cat}
              placeholder="Categories"
              isMulti
              isSearchable
              components={{ Menu }}
            />
            <Select
              className="w-100 mt-3"
              onChange={onChangeStatus}
              options={conditions}
              placeholder="Condition"
            />
            <div id="uploadButton" className="flex-center" style={{display: 'none' }}>
              <MDBBtn className="confirm-btn color1 my-4 py-2 px-5" disabled>Uploading Image</MDBBtn>
            </div>
            <div  id="cnfrmBtn" className="flex-center">
              <MDBBtn  type="submit" className="confirm-btn color1 my-4 py-2 px-5">Confirm</MDBBtn>
            </div>
            </form>
        </MDBModalBody>
        
      </MDBModal>

      {/* //Modals */}

      <MDBRow className="mx-auto item-gallery-container" style={{ height: '650px' }}>
        {
         loading ? (
          <h1><Loading/></h1>
         ) : (
          items.length > 0 ? (
            items.map(item => (
              <MDBCol size="4" className="item-gallery-image item-grid" style={{padding: '2px'}}>
                <a href={`/itemDetails/${item._id}`}>
                  {/* item.photo[0] ? `${item.photo[0].url}` :  */}
                  <img src={item.photo[0] ? `${item.photo[0].url}` : ItemImg} alt="img.png"/>
                </a>
             </MDBCol>
            ))
          ) : (<div className="mx-auto grey-text mt-3">No items yet</div>)
         )
        }
          {/* <MDBCol size="12" className="my-3 text-center">
              <div>Swapped Items</div>
          </MDBCol> */}
          

          {/* Swapped Items */}
          
          {/* {
            swappedItems.length > 0 ? (
              swappedItems.map((item) => (
              <MDBCol size="4" className="p-0 swapped-item item-grid">
              <img src={item.photo[0].url} alt="img.jpg"/>
              </MDBCol>
            ))): (<div className="mx-auto grey-text">No items yet</div>)
          } */}

          
          
          <Container className="add-item-container">
          <MDBAnimation type="zoomIn" className="fast">
          <MDBAnimation type="heartBeat" className="slower" delay="1s" infinite>
            <Button
                className="add-item-btn"
                tooltip="Add Item"
                icon="fas fa-plus"
                onClick={handleShow}
               />
               </MDBAnimation>
               </MDBAnimation>
          </Container>
          

        </MDBRow>
      </Fragment> 
    );
}
 
const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getAllItemsByUser, addItem })(ItemGallery);
