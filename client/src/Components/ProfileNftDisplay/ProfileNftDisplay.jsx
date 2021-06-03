import React, { Fragment} from "react";
import { Image, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Profile from "../../../assets/images/profile.png";
const ProfileNftDisplay = ({
  likes,
  comments,
  image,
  nft_id,
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
        <Link to={`/details/${nft_id}`}>
        <Card.Img className="profile-card-img" src={image}  />
        </Link>
      </Card>
    </Fragment>
  );
};

export default ProfileNftDisplay;
