import React, { useState } from "react";
import { Form, Input, Modal, Button, Select, Spin } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetThisBlogSuccess } from "../../redux/GetThisBlog";
import { useParams } from "react-router-dom";

const ModalDesign = ({
  commentId,
  commentMessage,
  isModalVisible,
  handleCancel,
}) => {
  const [loginLoading, setLoginLoading] = useState(false);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const { id } = useParams();

  const updateComments = async () => {
    await axios
      .get(`https://flaskapi-sanjeev.herokuapp.com/posts/${id}`)
      .then((res) => {
        dispatch(GetThisBlogSuccess([res?.data?.post]));
      })
      .catch((err) => {
        toast.error(err.response.data.message[0]);
      });
  };

  const onFinish = async (values) => {
    setLoginLoading(true);

    const config = {
      headers: {
        access_token: token,
      },
    };

    await axios
      .put(
        `https://flaskapi-sanjeev.herokuapp.com/comments/${commentId}`,
        {
          message: values.review,
        },
        config
      )
      .then((res) => {
        setLoginLoading(false);
        updateComments();
        toast.success("Comment updated successfully");
        handleCancel();
      })
      .catch((err) => {
        setLoginLoading(false);

        toast.error(err.response.data.message[0]);
      });
  };
  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="nest-messages"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ review: commentMessage }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="review"
            label="Write your review"
            rules={[{ required: true, message: "Please write a review" }]}
          >
            <Input.TextArea
              rows={4}
              cols={10}
              showCount
              maxLength={200}
            ></Input.TextArea>
          </Form.Item>

          <button className="submitBtn" type="primary">
            {loginLoading ? (
              <Spin
                indicator={antIcon}
                style={{ margin: "auto", color: "white" }}
              />
            ) : (
              <div style={{ margin: "auto", color: "white" }}>Submit</div>
            )}
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default ModalDesign;
