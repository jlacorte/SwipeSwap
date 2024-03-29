import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile, updateAvatar } from '../../actions/profile';
// import Loading from '../Loading';
import { useUploadPhoto } from '../../actions/item';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBIcon } from 'mdbreact';
import "../../css/style.css";
import "../../css/mediaQuery.css";
import Avatar from '../../assets/images/avatar.png';
import Navbar from '../navbar';
import ProfileTabs from './tabs';


const Profile = ({ profile:{ profile, loading }, auth: { isAuthenticated, user }, createProfile,  getCurrentProfile, updateAvatar, history }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    dateofbirth: '',
    facebook: '',
    instagram: '',
    google: '',
    avatar:''
  })

  const [showModal, setShowModal] = useState(false);  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [picture, setPicture] = useState(null);
  const [file, setfile] = useState(undefined)

  useEffect(() =>{

    getCurrentProfile()
  
    setFormData({
      name: loading || !profile.user.name ? '' : profile.user.name,
      email: loading || !profile.user.email ? '' : profile.user.email,
      location: loading || !profile.location ? '' : profile.location,
      dateofbirth: loading || !profile.dateofbirth ? '' : profile.dateofbirth,
      facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
      instagram: loading || !profile.social.instagram ? '' : profile.social.instagram,
      google: loading || !profile.social.google ? '' : profile.social.google,
      avatar: loading || !profile.avatar ? Avatar : profile.avatar,
      
    })
  }, [getCurrentProfile, loading]);

  let userid
    if(isAuthenticated){
      userid = user._id
    }
    useEffect(() => {
      
      let socket = require('socket.io-client')('/', {
        secure: true,
        rejectUnauthorized: false,
        path: '/chat/socket.io'
      });

      socket.on(`messageFrom${userid}`, (data) => toast(`New message from ${data}`, {
        transition: Slide
      }));

      socket.on(`match${userid}`, (data) => toast.success(data, {
        transition: Slide
      }));

      socket.on(`accept${userid}`, (data) => toast.success(`Superwant accepted by ${data}!`, {
        transition: Slide
      }));

      socket.on(`approve`, (data) => document.location.reload(false));

      return () => {
        socket.removeListener(`messageFrom${userid}`);
        socket.removeListener(`accept${userid}`);
        socket.removeListener(`match${userid}`);
        socket.removeListener(`approve`);
      };
    }, []);

    const uploadPhoto = useUploadPhoto()

    const onChangePicture = e => {
        document.getElementById('uploadingBtn').style.display = "";
        document.getElementById('confirmBtn').style.display = "none";

        setPicture(URL.createObjectURL(e.target.files[0]));
        setfile(e.target.files[0])

        uploadPhoto(e.target.files[0]).then(res => {
          document.getElementById('uploadingBtn').style.display = "none";
          document.getElementById('confirmBtn').style.display = "";
          setFormData({ avatar: res })
        })
    };


    const {
        name,
        location,
        email,
        dateofbirth,
        facebook,
        instagram,
        google,
        avatar
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();
      createProfile(formData, history);
      handleClose();
      // window.location.reload()
    };

    const ImgUpload = () =>{
      return(
        <label htmlFor="photo-upload" className="avatar-upload flex-center">
          <div className="avatar-img-wrap avatar-img-upload" >
            <img htmlFor="photo-upload" src={picture ? picture : `${avatar}`}  className="rounded-circle" />
          </div>
          <input id="photo-upload" type="file" onChange={onChangePicture}/> 
        </label>
      );
    }

    return (
      <>
      {/* Modals */}

      {/* Edit Profile Modal */}
      <MDBModal isOpen={showModal} toggle={handleClose}>
        <MDBModalHeader toggle={handleClose}>Edit Profile</MDBModalHeader>
        <MDBModalBody className="px-4 text-center">
          <form onSubmit={e => onSubmit(e)}>
          <ImgUpload/>
          <input type="text" name="name" value={name} onChange={ e => onChange(e) } className="form-control mt-3" placeholder="Name" />
          <input type="text" name="location" value={location} onChange={ e => onChange(e) } className="form-control mt-3" placeholder="Address" />
          <input type="email" name="email" value={email} className="form-control mt-3" placeholder="Email" disabled/>
          <input type="date" name="dateofbirth" value={dateofbirth} onChange={ e => onChange(e) } className="form-control mt-3" placeholder="Birthdate" />
          <input type="text" name="facebook" value={facebook} onChange={ e => onChange(e) } className="form-control mt-3" placeholder="Facebook Link" />
          <input type="text" name="instagram" value={instagram} onChange={ e => onChange(e) } className="form-control mt-3" placeholder="Instagram Link" />
          <input type="text" name="google" value={google} onChange={ e => onChange(e) } className="form-control mt-3" placeholder="Gmail Link" />
          <MDBBtn className="confirm-btn color1 mx-auto mt-4 mb-2 py-2 px-5" id="uploadingBtn" style={{ display:'none' }} disabled>Uploading Image...</MDBBtn>
          <MDBBtn className="confirm-btn color1 mx-auto mt-4 mb-2 py-2 px-5" id="confirmBtn" type="submit">Confirm</MDBBtn>
          </form>
        </MDBModalBody>
      </MDBModal>
      {/* Edit Profile Modal */}
      
      {/* //Modals */}
      <ToastContainer/>
      <Navbar />
        <div className="profile">
          <div className="profile-container">
            <MDBRow className="mx-auto">
              <MDBCol lg="6">
              <div className="d-flex bd-highlight example-parent flex-center">
                <div className="bd-highlight col-example mx-2">
                  <img src={loading ? Avatar : `${avatar}`} alt="avatar" className="rounded-circle profile-avatar" />
                </div>
                <div className="flex-grow-1 bd-highlight col-example">
                  <div className="">
                    <div className="profile-name">{loading ? "Retrieving data..." :name}</div>
                    <div className="profile-address">{loading ? "Retrieving data..." :location}</div>
                  </div>
                </div>
              </div>
              </MDBCol>
              <MDBCol lg="6" className="text-center">
              <div className="d-flex bd-highlight example-parent profile-details flex-center">
                <div className="p-2 flex-fill bd-highlight col-example px-3">
                  <div className="font-weight-bold">0</div>
                  <div>Swaps</div>
                </div>
                <div className="p-2 flex-fill bd-highlight col-example px-3">
                  <div className="font-weight-bold">0</div>
                  <div>Rating</div>
                </div>
                <div className="p-2 flex-fill bd-highlight col-example px-3">
                  <div className="font-weight-bold">0 <MDBIcon icon="award" className="text-color-1" /></div>
                  <div>Badges</div>
                </div>
                <div className="p-2 flex-fill bd-highlight col-example px-3">
                  <div className="font-weight-bold">10.00 <MDBIcon icon="coins" style={{color: 'gold'}} /></div>
                  <div>SwapCoins</div>
                </div>
              </div>
              </MDBCol>
              <MDBCol lg="12" className="text-center flex-center">
                <div className="edit-profile-btn my-3 mx-2" onClick={handleShow}>Edit Profile</div>
              </MDBCol>
            </MDBRow>    
          </div>
          <ProfileTabs />
        </div>
      </> 
    );
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});




export default connect(mapStateToProps, { createProfile, getCurrentProfile, updateAvatar })(withRouter(Profile));
