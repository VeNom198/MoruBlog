import React, { useState } from "react";
import { Form, Input, Upload, Button, Select, Spin } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { getApiDataSuccess } from "../../redux/GetApiData";
import { getunverified } from "../../redux/GetUnverifiedBlogs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};
/* eslint-disable no-template-curly-in-string */

const { Option } = Select;
const options = ["Latest Offer", "Trending", "New Event", "Stories", "Careers"];

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const DashboardForm = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [datas, setDatas] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e.file;
    }

    return e.fileList;
  };
  const filechanged = (e) => {
    setImage(e);
  };
  var data;
  const loadBlogsData = async () => {
    const response2 = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/posts"
    );
    // console.log("response2", response2?.data?.posts);
    dispatch(getApiDataSuccess(response2?.data?.posts));
  };

  const onFinish = async (values) => {
    setLoginLoading(true);
    let formData = new FormData();

    formData.append("image", image, image.name);
    formData.append("content", datas);
    formData.append("title", values.title);
    formData.append("category", values.category.replace(/\s/g, ""));

    const response = await fetch(
      "https://flaskapi-sanjeev.herokuapp.com/posts/new",
      {
        method: "POST",
        body: formData,
        headers: {
          // "Content-type": "multipart/form-data",
          access_token: token,
        },
      }
    );

    if (response.status === 201) {
      loadBlogsData();
      setLoginLoading(false);
      toast.success("Blog created successfully");
      dispatch(getunverified(token));
      navigate("/dashboard");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      Add New Blog
      <Form
        {...layout}
        name="nest-messages"
        layout="vertical"
        onFinish={onFinish}
        validateMessages={validateMessages}
        style={{ marginTop: "50px" }}
      >
        <MDBRow>
          <MDBCol md={4}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              {/* {JSON.stringify(desc)} */}

              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select Blog Topic!" }]}
            >
              <Select placeholder="select your blog topic">
                {options.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="upload"
              label="Image"
              valuePropName="fileList"
              onChange={(e) => filechanged(e.target.files[0])}
              getValueFromEvent={normFile}
            >
              <Upload
                name="logo"
                // action={"http://localhost:3000/"}
                beforeUpload={() => false}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </MDBCol>
          <MDBCol md={8}>
            <CKEditor
              editor={ClassicEditor}
              data="Write your blogs here"
              onChange={(event, editor) => {
                setDatas(editor.getData());
                data = editor.getData();
              }}
            />
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
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
            </Form.Item>
          </MDBCol>
        </MDBRow>
      </Form>
    </>
  );
};

export default DashboardForm;
