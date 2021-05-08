import React, { Fragment} from "react";
import { Image, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Profile from "../../../assets/images/profile.png";
const ProfileNftDisplay = ({
  likes,
  comments,
  image,
  id,
  bid,
  title,
  creator,
  date_mint,
  current,
  previous,
}) => {
  return (
    <Fragment>
      <Card className="profile-card">
        <Card.Img className="profile-card-img" src={image}  />
      </Card>
    </Fragment>
  );
};

export default ProfileNftDisplay;
