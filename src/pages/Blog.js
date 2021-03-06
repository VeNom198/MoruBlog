import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { LikeTwoTone } from "@ant-design/icons";
import ColorBadge from "../components/ColorBadge";
import LatestBlog from "../components/LatestBlog";
import { Spin } from "antd";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../components/ReviewForm";
import { GetThisBlogSuccess } from "../redux/GetThisBlog";
import ModalDesign from "../components/Modal/Modal";
import { fetchLatestBlog } from "../redux/GetLatestBlog";
import { Markup } from "interweave";
import HelmetMetaData from "../components/HelmetMetaData";

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const Blog = () => {
  const [blog, setBlog] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [commentMessage, setCommentMessage] = useState(null);

  const [likes, setLikes] = useState();
  const [likeTrigger, setLikeTrigger] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const latestBlog2 = useSelector((state) => state.getLatestBLog);
  const { blogs } = latestBlog2;

  const reduxBlog = useSelector((state) => state.getBlogdetail?.blog);

  const userID = useSelector(
    (state) => state.getLoggedInUserDetail?.loggedinuserDetail
  );

  const { id } = useParams();

  var location = useLocation();
  var currentUrl = "http://moru-blog.herokuapp.com" + location.pathname;
  const dispatch = useDispatch();

  const declareDate = (dateFromDB) => {
    const date = dateFromDB;
    const newDate = new Date(date);

    return newDate.toDateString().slice(3, 15);
  };
  const timeRead = (blog) => {
    if (blog?.length < 2000) {
      return 1;
    } else if (2001 < blog?.length < 4000) {
      return 2;
    } else if (4001 < blog?.length < 6000) {
      return 3;
    } else if (6001 < blog?.length < 8000) {
      return 4;
    } else {
      return 5;
    }
  };

  const getSingleBlog = async () => {
    await axios
      .get(`https://flaskapi-sanjeev.herokuapp.com/posts/${id}`)
      .then((res) => {
        setBlog(res?.data?.post);
        setLikes(res?.data?.post?.votes.length);
        dispatch(GetThisBlogSuccess([res.data.post]));
      })
      .catch((err) => {
        toast.error(err.response.data.message[0]);
      });
  };

  const config = {
    headers: {
      access_token: token,
    },
  };

  const hitLike = async () => {
    if (!token) {
      alert("Login to Like the post !!!");
    } else {
      await axios
        .post(
          `https://flaskapi-sanjeev.herokuapp.com/votes/${id}`,
          {},

          config
        )
        .then((res) => {
          setLikeTrigger(!likeTrigger);
        });
    }
  };
  const deleteThisComment = async (id) => {
    await axios
      .delete(
        `https://flaskapi-sanjeev.herokuapp.com/comments/${id}`,

        config
      )
      .then((res) => {
        toast.success("Comment deleted succesfully");
        setLikeTrigger(!likeTrigger);
      });
  };

  const editThisComment = (id, message) => {
    setCommentId(id);
    setCommentMessage(message);
    showModal();
  };
  useEffect(() => {
    if (id) {
      getSingleBlog();
      dispatch(fetchLatestBlog());
    }
  }, [id, dispatch, likeTrigger]);

  const styleInfo = {
    float: "left",
    margin: "5px 0 10px 7px",
  };

  return (
    <div className="pagecontainer">
      <MDBRow>
        <MDBCol>
          <MDBContainer style={{ marginTop: "15px" }}>
            <ModalDesign
              isModalVisible={isModalVisible}
              handleCancel={handleCancel}
              commentId={commentId}
              commentMessage={commentMessage}
              LikeTrigger={likeTrigger}
            />
            <HelmetMetaData
              title={blog?.title}
              description={blog?.title + blog?.author?.username}
              image={blog?.image}
            ></HelmetMetaData>

            <MDBTypography
              tag="h2"
              className="text-muted"
              style={{ display: "contents" }}
            >
              {blog && blog.title}
            </MDBTypography>

            <br />

            <div style={{ float: "left", margin: "5px 0 7px 7px" }}>
              by {blog && blog.author.username} |
            </div>
            <div style={{ float: "left", margin: "5px 0 7px 7px" }}>
              {blog && declareDate(blog.created_at)} |
            </div>
            <div style={{ float: "left", margin: "5px 0 7px 7px" }}>
              {timeRead(blog?.content)} min read. |
            </div>
            <ColorBadge styleInfo={styleInfo}>
              {blog && blog.category}
            </ColorBadge>

            <div>
              <div
                style={{
                  position: "fixed",
                  display: "grid",
                  left: "0px",
                  zIndex: "1",
                }}
              >
                <FacebookShareButton
                  url={currentUrl}
                  quote={blog?.title}
                  hashtag="#Moruwallet"
                  className="shareButton"
                >
                  <FacebookIcon size={42} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={currentUrl}
                  title={blog?.title}
                  hashtag="#Moruwallet"
                  className="shareButton"
                >
                  <TwitterIcon size={42} />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={currentUrl}
                  title={blog?.title}
                  hashtag="#Moruwallet"
                  className="shareButton"
                >
                  <LinkedinIcon size={42} />
                </LinkedinShareButton>
                <WhatsappShareButton
                  url={currentUrl}
                  title={blog?.title}
                  separator=":: "
                  className="shareButton"
                >
                  <WhatsappIcon size={42} />
                </WhatsappShareButton>
              </div>

              <img
                className="img-fluid rounded"
                // style={{ width: "100%", maxHeight: "450px" }}
                alt="This is blog"
                src={blog?.image}
              ></img>
            </div>

            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  marginBottom: "20px",
                  textAlign: "justify",
                  fontFamily: "Open Sans",
                }}
              >
                {!blog?.content ? (
                  <Spin size="medium" style={{ display: "block" }} />
                ) : (
                  <Markup content={blog?.content} />
                )}
              </div>{" "}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{}}>{likes} Like(s)</div>
              <div style={{ marginTop: "10px" }}>
                If you Liked This Blog, Do Like it.{" "}
              </div>

              <LikeTwoTone
                onClick={() => hitLike()}
                className="likeButton"
                style={{ fontSize: "40px" }}
              />
            </div>
            <div style={{ marginBottom: "5px" }}>
              <h4>Reviews and comments</h4>
              {reduxBlog[0]?.comments?.length === 0 && (
                <Message type="info">No comments.</Message>
              )}
              {reduxBlog[0]?.comments?.map((item, index) => (
                <MDBRow key={index}>
                  <MDBCol md={1} style={{ display: "flex" }}>
                    <img
                      src="../images/user.jpg
      "
                      alt="imag"
                      fluid
                      style={{
                        height: "36px",
                        borderRadius: "50%",
                        margin: "12px 0",
                      }}
                    ></img>
                  </MDBCol>
                  <MDBCol md={9}>
                    <MDBCardText
                      style={{
                        textAlign: "left",
                        margin: "5px 0px 0px 0px",
                        padding: "0px",
                      }}
                    >
                      {item.author.username} says:
                    </MDBCardText>
                    <MDBCardBody
                      style={{
                        display: "flex",

                        padding: "0px",
                      }}
                    >
                      <MDBCardText>
                        <strong>{item.message}</strong>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                  <MDBCol md={2}>
                    {item.author.id === userID?.id ? (
                      <div key={index}>
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "red", margin: "39px 10px 0 0" }}
                          size="sm"
                          onClick={() => deleteThisComment(item.id)}
                        />
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "blue", margin: "39px 10px 0 0" }}
                          size="sm"
                          onClick={() => editThisComment(item.id, item.message)}
                        />
                      </div>
                    ) : null}
                  </MDBCol>
                </MDBRow>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {token ? (
                <ReviewForm id={id} />
              ) : (
                <div style={{ marginBottom: "10px" }}>
                  <Message type="info">
                    Please Login to review this blog
                  </Message>
                </div>
              )}
            </div>
          </MDBContainer>
        </MDBCol>
        <MDBCol lg={3} style={{ marginTop: "32px" }}>
          {blogs?.length === 0 ? (
            <Spin size="medium" style={{ display: "block" }} />
          ) : (
            <h3>Latest Post</h3>
          )}
          {blogs &&
            blogs
              ?.filter((item) => item.id !== parseInt(id))
              .slice(0, 3)
              .map((item, index) => (
                <LatestBlog
                  key={index}
                  {...item}
                  style={{ paddingRight: "0px" }}
                />
              ))}
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Blog;
