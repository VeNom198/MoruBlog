import React, { useState } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetThisBlogSuccess } from "../redux/GetThisBlog";

const ReviewForm = ({ id, LikeTrigger }) => {
  const [form] = Form.useForm();
  const [loginLoading, setLoginLoading] = useState(false);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const dispatch = useDispatch();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const updateComments = async () => {
    await axios
      .get(`https://flaskapi-sanjeev.herokuapp.com/posts/${id}`)
      .then((response) => {
        dispatch(GetThisBlogSuccess([response?.data?.post]));
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
      .post(
        `https://flaskapi-sanjeev.herokuapp.com/comments/${id}`,
        {
          message: values.review,
        },
        config
      )
      .then((response) => {
        setLoginLoading(false);
        updateComments();
        toast.success("Comment added successfully");
        form.resetFields();
      })
      .catch((err) => {
        setLoginLoading(false);
        toast.error("Something went wrong");
      });
  };
  const validateMessages = {
    required: "${label} is required!",
  };
  return (
    <Form
      form={form}
      name="nest-messages"
      layout="vertical"
      onFinish={onFinish}
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
  );
};

export default ReviewForm;
