import React, { useState } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import axios from "axios"
import { Affix } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const DefaultForm = ({data}) => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [image,setImage]  =useState("");
  const [top, setTop] = useState(1);

console.log("--------------------------------",data)

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
const intials = {
  firstname: data.firstname,
  lastname: data.lastname,
  profession:data.profession,
  gender:data.gender,
  height: data.height,
  // dob:data.dob
  image: data.image
}

  const upload  =async (file)=>{
    console.log(file)
    if (file.file.status === "done"){
        console.log("file")
    
        const body = new FormData();
         body.append('file', file.file.originFileObj);
         body.append('upload_preset',"my-uploads")
     
         const res = await fetch('https://api.cloudinary.com/v1_1/dlgwvuu5d/image/upload', { method: 'POST', body }).then(r=>r.json());
         console.log("-----",res.secure_url)
         setImage(res.secure_url)
     
    }
  
  }

const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
	  };



    const submitHandler =(values)=>{
      const data = values;
      data.image=image
      console.log(data)

      axios.post('http://127.0.0.1:8081/add',data)
      .then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err)
      })
    }

  return (
    <div>
     
     <Affix offsetTop={top}  style={{position:"absolute",top:"10px",right:"10px"}} >
          <Link to="/" >      
        <Button type="primary" onClick={() => setTop(top + 10)}>
          View All
        </Button>
        </Link>
      </Affix>
      <Form
         labelCol={{ span: 8 }}
         wrapperCol={{ span: 8 }}  
        initialValues={intials}
        onFinish={submitHandler}
        sx = {{border:"2px solid black"}}
       
      >
       
        
        <Form.Item label="First Name"     name="firstname" >
          <Input           type="text"
          placeholder="First Name" />
        </Form.Item>
        <Form.Item label="Last Name"  name="lastname" >
          <Input            type="text"
          placeholder="Last Name" />
        </Form.Item>
        <Form.Item label="Profession" name="profession" >
          <Select>
            <Select.Option value="comedian">comedian</Select.Option>
            <Select.Option value="actor">actor</Select.Option>
            <Select.Option value="model">model</Select.Option>
            <Select.Option value="other">other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="D.O.B"  name="dob">
          <DatePicker />
        </Form.Item>
        
        <Form.Item label="Height"  name="height" >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Gender"  name="gender" >
          <Radio.Group>
            <Radio value="male">male </Radio>
            <Radio value="female">female </Radio>
            <Radio value="other">other </Radio></Radio.Group>
        </Form.Item>
        

        <Form.Item label="Upload"    valuePropName="fileList">
          <Upload   customRequest={dummyRequest} listType="picture-card"   defaultFileList={} onChange={(e)=>{upload(e)}} >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item  style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
          <Button style={{with:"100px"}}  type="primary"  htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DefaultForm ;
