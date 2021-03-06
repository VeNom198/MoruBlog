import React, { useState } from "react";
import { Form, Input, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { GetUserDetailssuccess } from "../../redux/GetAllUsers";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteThisBlog } from "../../redux/GetUnverifiedBlogs";

const DiscardBlogModal = ({ blogId, discardModalVisible, handleCancel }) => {
  const [discardblog, setDiscardBlog] = useState(false);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const getUnverifiedBlogs = async () => {
    const config = {
      headers: {
        access_token: token,
      },
    };
    await axios
      .get("https://flaskapi-sanjeev.herokuapp.com/posts/review", config)
      .then((res) => {
        dispatch(getUnverifiedBlogs(res.data.posts));
      });
  };

  const onFinish = async (values) => {
    setDiscardBlog(true);

    const config = {
      headers: {
        access_token: token,
      },
    };
    await axios
      .put(
        `https://flaskapi-sanjeev.herokuapp.com/posts/review/${blogId}`,
        {
          is_accepted: false,
          rejected_reason: values.title,
        },
        config
      )
      .then((res) => {
        setDiscardBlog(false);
        dispatch(deleteThisBlog(blogId));

        handleCancel();
        toast.success("Blog discarded successfully");
      });
  };
  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        centered
        visible={discardModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="nest-messages"
          layout="vertical"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="title"
            label="Discard reason"
            rules={[{ required: true, message: "Please enter valid reason" }]}
          >
            <Input.TextArea
              rows={10}
              cols={10}
              showCount
              maxLength={500}
            ></Input.TextArea>
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "right" }}>
            <button className="submitBtn" type="primary">
              {discardblog ? (
                <Spin
                  indicator={antIcon}
                  style={{ margin: "auto", color: "white" }}
                />
              ) : (
                <div style={{ margin: "auto", color: "white" }}>Discard</div>
              )}
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default DiscardBlogModal;
