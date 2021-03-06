import React, { useState } from "react";
import { Form, Input, Upload, Button, Select, Spin } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import BlogPostModal from "../components/Modal/BlogPostModal";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FormData from "form-data";
import axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

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

const About = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [datas, setDatas] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  var data;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleCancel = () => {
    setVerifyModal(false);
  };
  let address;
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e.file;
    }
    return e.fileList;
  };

  const filechanged = async (e) => {
    let images = new FormData();
    images.append("file", e);
    images.append("upload_preset", "Moru-preset");
    await fetch("https://api.cloudinary.com/v1_1/dpnxzofqd/image/upload", {
      method: "post",

      body: images,
    })
      .then((response) => response.json())
      .then((data) => {
        const imageApi = data;
        address = imageApi.url;
        toast.success("Image uploaded");
      })
      .catch((err) => console.error(err));
  };

  const onFinish = async (values) => {
    setLoginLoading(true);
    let formData = new FormData();

    const sendFormData = async () => {
      let a = await address;
      if (a === undefined) {
        formData.append(
          "image",
          "https://moru.com.np/wp-content/uploads/2022/01/Featured-image.jpg"
        );
      } else {
        formData.append("image", a);
      }

      formData.append("content", datas);
      formData.append("title", values.title);
      formData.append("category", values.category.replace(/\s/g, ""));
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + "= " + pair[1]);
      // }

      fetch("https://flaskapi-sanjeev.herokuapp.com/posts/new", {
        method: "POST",
        body: formData,
        headers: {
          // "Content-type": "multipart/form-data",
          access_token: token,
        },
      })
        .then((res) => {
          setLoginLoading(false);
          navigate("/");
          toast.success("your blog will be verified by Moru");
        })
        .catch((err) => {
          setLoginLoading(false);
          toast.error(err.data.message.content[0]);
        });
    };

    sendFormData();
  };

  return (
    <div className="pagecontainer">
      {verifyModal && (
        <BlogPostModal
          isModalVisible={verifyModal}
          handleCancel={handleCancel}
        />
      )}
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
              getValueFromEvent={normFile}
              valuePropName="fileList"
              onChange={(e) => filechanged(e.target.files[0])}
              type="file"
            >
              <Upload
                name="logo"
                beforeUpload={() => {
                  return false;
                }}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </MDBCol>
          <MDBCol md={8}>
            <CKEditor
              editor={ClassicEditor}
              data=""
              placeholder="write your blogs here"
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "400px",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
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
    </div>
  );
};

export default About;
