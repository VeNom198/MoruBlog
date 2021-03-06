import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";
import ColorBadge from "./ColorBadge";
import { deleteThisBlog, getApiDataSuccess } from "../redux/GetApiData";
import { GetThisBlogSuccess } from "../redux/GetThisBlog";
import axios from "axios";
import { toast } from "react-toastify";

const Blogs = ({
  title,
  date,
  category,
  description,
  id,
  image,

  userIdWhoCreatedThisBLog,
}) => {
  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const user = useSelector(
    (state) => state.getLoggedInUserDetail?.loggedinuserDetail
  );

  const dispatch = useDispatch();

  const excerpt2 = (string) => {
    if (string?.length > 45) {
      string = string.substring(0, 45) + "...";
    }
    return string;
  };

  const loadBlogsData = async () => {
    await axios
      .get("https://flaskapi-sanjeev.herokuapp.com/posts")
      .then((res) => {
        dispatch(getApiDataSuccess(res?.data?.posts));
      });
  };

  const deleteThisId = async (id) => {
    if (window.confirm("Are you sure you want to Delete this Blog?")) {
      const config = {
        headers: {
          access_token: token,
        },
      };
      await axios
        .delete(
          `https://flaskapi-sanjeev.herokuapp.com/posts/${id}`,

          config
        )
        .then((res) => {
          dispatch(deleteThisBlog(id));
          loadBlogsData();
          toast.success("Blog deleted successfully");
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    }
  };

  const editThisBlog = async (id, title, description) => {
    dispatch(GetThisBlogSuccess({ title: title, description: description }));
  };

  return (
    <MDBCard className="h-100 blogCard " style={{ margin: "0 0px" }}>
      <Link to={`/blog/${id}`}>
        <div
          style={{
            position: "absolute",
            right: "5px",
          }}
        >
          <ColorBadge>{category}</ColorBadge>
        </div>
        <MDBCardImage
          src={image}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
      </Link>

      <MDBCardBody
        style={{ padding: "0.8rem 1.5rem 0.5rem", backgroundColor: "#f5f5f4" }}
      >
        {/* <div
          style={{
            display: "flex",
            marginBottom: "0px",
            color: "#a3a199",
            justifyContent: "space-between",
          }}
        >
          {date?.slice(0, 10)}
          <ColorBadge>{category}</ColorBadge>
        </div> */}
        <MDBCardTitle
          style={{
            fontSize: "18px",
            display: "flex",
            padding: "0",
            fontWeight: "400",
          }}
        >
          {excerpt2(title)}
        </MDBCardTitle>
        {/* <MDBCardText>
          <Link
            to={`/blog/${id}`}
            style={{
              display: "flex",
              color: "#d6d6d6",
              padding: "0",
              fontSize: "12px",
            }}
          >
            {" "}
            read more
          </Link>
        </MDBCardText> */}

        {(user?.is_admin || userIdWhoCreatedThisBLog === user?.id) && (
          <>
            <MDBBtn
              tag="a"
              className="mt-1"
              color="none"
              onClick={() => deleteThisId(id)}
            >
              <MDBIcon
                fas
                icon="trash"
                style={{ color: "red", marginRight: "10px" }}
                size="lg"
              />
            </MDBBtn>
            <Link
              to={`/editblog/${id}`}
              onClick={() => editThisBlog(id, title, description)}
            >
              <MDBIcon fas icon="edit" style={{ color: "green" }} size="lg" />
            </Link>
          </>
        )}
      </MDBCardBody>
    </MDBCard>
  );
};

export default Blogs;
