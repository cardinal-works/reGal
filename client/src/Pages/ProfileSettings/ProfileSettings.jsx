//Modules
import React, { useEffect, useState, Fragment, useContext } from "react";
import { Container, Row, Col, Image, Button, Form, FormFile  } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
//Contracts
import ProfileNftDisplay from "../../Components/ProfileNftDisplay";
import UserStore from "../../Stores/UserStore";
import { observer } from "mobx-react-lite";
import { toJS } from 'mobx'
import ipfs from "../../ipfs";
var Buffer = require("buffer/").Buffer;
//Media


const ProfileSettings = () => {
  const userStore = useContext(UserStore);
  const { loadUser, updateUser, user, loadingInitial, submitting } = userStore;
  const [editMode, setEditMode] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userChanges, setUserChanges] = useState(toJS(user) || {
    profile_image: "",
    bio: "",
    display_name: ""
  })

  // useEffect(() => {
  //   if (!window.ethereum.isMetaMask) {
  //     setRedirect(true)
  //     return () => {
  //       setRedirect(false)
  //     }
  //   };
  //   if (!window.ethereum.selectedAddress) {
  //     setRedirect(true)
  //     return () => {
  //       setRedirect(false)
  //     }
  //   }

  //   loadUser(window.ethereum.selectedAddress)
  //   .then(res => setUserChanges(res))
  // }, []);



  


  // const handleFileUpload = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsArrayBuffer(file);
  //   reader.onloadend = () => uploadToIPFS(reader);
  // };

  // const uploadToIPFS = async (reader) => {
  //   const buffer = await Buffer.from(reader.result);
  //   const result = await ipfs.add(buffer);
  //   const ipfsLink = "https://gateway.ipfs.io/ipfs/" + result.path;
  //   let userChange = userChanges;
  //   setUserChanges({
  //     ...userChange,
  //     profile_image: ipfsLink,
  //   });
  // };

  // const handleDisplayName = (e) => {
  //   e.preventDefault()
  //   let userChange = userChanges;
  //   setUserChanges({
  //     ...userChange,
  //     display_name: e.target.value,
  //   });
  // }

  // const handleBio = (e) => {
  //   e.preventDefault()
  //   let userChange = userChanges;
  //   setUserChanges({
  //     ...userChange,
  //     bio: e.target.value,
  //   });
  // }

  // const handleUpdateUser = (e) => {
  //   e.preventDefault()
  //   // console.log('user', user)
  //   // console.log('js', toJS(user))
  //   // let proxy = toJS(user)
  //   if (userChanges.profile_image.length === 0) {
  //     setUserChanges({...userChanges, profile_image: user.profile_image})
  //   } 
  //   let newUser = { ...user, ...userChanges}

  //   updateUser(newUser)
  //   .then((res) => {
  //     setEditMode(false)
  //   })
  //   .catch((err) => console.log(err))

  // }




  // useEffect(() => {
  //   console.log(loadingInitial)
  // }, [loadingInitial, user]);
  

  return (
    <Fragment>
      {/* <Container className="profile-container">
        <Row className="nft-display-rows pb-5 mb-5 mt-5">
          <Col md={4} lg={4}>
          {redirect ? <Redirect to="/signup"></Redirect> : null}
  
          {editMode === false ? 
          <Fragment>
              <Col md={6}>
                  <Image className="profile-image" src={user ? user.profile_image : null} width="150px" height="150px"></Image>
              </Col>
              <Col md={6} className=" mt-3">
                  <span className="text-majesti text-white user-profile-name font-secondary">  {user ? "@" + user.display_name : "@displayname"} </span> </Col>
              <Col md={6} className="mt-1">
                  <span className="text-primary">{user ? user.wallet_id.slice(0, 3) + "..." + user.wallet_id.slice(-3) : null}</span>
              </Col>
              <Col md={6} className="mt-4">
                  <p className="text-start text-white user-profile-bio"> {user ? user.bio : null} </p>
              </Col>
              <Col md={6} className="text-start">
                <Button className="btn-regal mt-2 mb-3 mr-1 ml-1" onClick={() => setEditMode(!editMode)}>EDIT</Button>
                <Button className="btn-regal mt-2 mb-3 ml-1 mr-1"><i class="fas fa-cog"></i></Button>
            </Col>
          </Fragment> :
          <Form>
                <Form.Group>
                      <Col md={12} >
                          <Image className="profile-image mb-2" src={userChanges.profile_image.length > 1 ? userChanges.profile_image : user.profile_image} width="150px" height="150px"></Image>
          
                          <Form.File id="exampleFormControlFile1" className="choose-file-button" label={`PROFILE PICTURE UPLOAD (4mb max)`} onChange={(e) => handleFileUpload(e.target.files[0])}/>
                          <Form.Label className="text-white"></Form.Label>
                      </Col>
                </Form.Group>
                <Form.Group controlId="formDisplayName">
                      <Col md={12} lg={12} className=" mt-3">
                      <Form.Label className="text-white">DISPLAY NAME</Form.Label> 
                      <Form.Control type="text" placeholder={user ? user.display_name : "@displayname"} onChange={(e) => handleDisplayName(e)}/>
                      </Col>
                </Form.Group>
                <Form.Group controlId="formWalletId">
                      <Col md={12} className="mt-1">
                          <span className="text-primary">{user ? user.wallet_id.slice(0, 3) + "..." + user.wallet_id.slice(-3) : null}</span>
                      </Col>
                </Form.Group>
                <Form.Group controlId="formBio">
                      <Col md={12} className="mt-1">
                      <Form.Label className="text-white">ARTIST BIO</Form.Label> 
                      <Form.Control as="textarea" rows={3} type="text" placeholder={user ? user.bio : null} onChange={(e) => handleBio(e)}/>
                      </Col>
                </Form.Group>
                <Col lg={12} md={12} className="text-start">   
                <div>
                   <Button className="btn-regal mt-2 mb-3 mr-1" onClick={(e) => handleUpdateUser(e)}>
                     {submitting ? <span className="spinner-border spinner-border-sm"></span> : null}
                     {submitting ? "Submitting" : "Submit"}
                  </Button>          
                   <Button className="btn-regal mt-2 mb-3 ml-1" onClick={() => setEditMode(!editMode)}>CANCEL</Button>   
                </div>
                </Col>
          </Form>}
     
          </Col>
          </Row>
        </Container> */}
    </Fragment>
  );
};

export default observer(ProfileSettings);
