import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import "../../css/style.css";
import "../../css/mediaQuery.css";
import { acceptSuperWant, declineSuperWant } from "../../actions/match";
import { connect } from 'react-redux';
import { createConversation } from '../../actions/chat';
import { useHistory } from 'react-router-dom';

const Notification = ({ id, userID, name, message, profilePic, timestamp, superwant, usersuperwant, acceptSuperWant, declineSuperWant, accepted, messaged, auth: { isAuthenticated, user } }) => {
    
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

      socket.on(`messaged${userid}`, (data) => setMessaged(true))

      return () => {
        socket.removeListener(`messaged${userid}`);
      };

    }, [])

    const accept = (val, user_id) => {
      acceptSuperWant(val, user_id)
      console.log(user_id)
      window.location.reload(false)
    }
    const decline = (val) => {
      declineSuperWant(val)
      window.location.reload(false)
    }

    let history = useHistory()

    const createMessage = () => {
      createConversation(userID, id).then(() => {
        history.push('/conversation')
      })
    }

    const [msg, setMessaged] = useState(false)

    return (
      <>
      {superwant === "false" ? 
      ( 
          <MDBRow>
            <MDBCol md="12">
           {/* read-notification if read */}
            <div className="d-flex bd-highlight example-parent unread-notification my-2"> 
              <div className="p-2 flex-shrink-1 bd-highlight col-example">
              <img src={profilePic} className="rounded-circle notif-image mx-1" alt="KB" />
              </div>
              <div className="py-2 w-100 bd-highlight col-example">
                  <div className="notif-name">{name}</div>
                  <div className="notif-message">{message}</div>
                  <div className="notif-timestamp">{timestamp}</div>
              </div>
              {messaged || msg ?  '' : <MDBBtn className="my-auto mr-3 notif-btn-accept p-1 text-capitalize" onClick={val => createMessage()}>Message</MDBBtn>}
                           
            </div>
            </MDBCol>
          </MDBRow>
      ) 
        : 
      (
        <MDBRow>
          <MDBCol md="12">
         {/* read-notification if read */}
          <div className="d-flex bd-highlight example-parent unread-notification my-2"> 
            <div className="p-2 flex-shrink-1 bd-highlight col-example">
            <img src={profilePic} className="rounded-circle notif-image mx-1" alt="KB" />
            </div>
            <div className="py-2 w-100 bd-highlight col-example">
                <div className="notif-name">{name}</div>
                <div className="notif-message">{message}</div>
                <div className="notif-timestamp">{timestamp}</div>
            </div>
            {
            accepted === "false" ? (<>
              {
                messaged
              }
            </>):
            accepted === "true" || usersuperwant === "true" ? (<>
            {
              messaged || msg ? '' : <MDBBtn className="my-auto mr-3 notif-btn-accept p-1 text-capitalize" onClick={val => createMessage()}>Message</MDBBtn>
            }
            </>):(<>
            <MDBBtn className="my-auto mr-3 notif-btn-accept p-1 text-capitalize" onClick={val => accept(id, userID)}>Accept</MDBBtn>
            <MDBBtn className="my-auto mr-3 notif-btn-decline p-1 text-capitalize" onClick={val => decline(id)}>Decline</MDBBtn></>)
            
            }
            
          </div>
          </MDBCol>
        </MDBRow>
      )
    }
   
    </>
    );
}

const mapStateToProps = state => ({
  match: state.match,
  auth: state.auth
})

export default connect(mapStateToProps, { acceptSuperWant, declineSuperWant })(Notification);
