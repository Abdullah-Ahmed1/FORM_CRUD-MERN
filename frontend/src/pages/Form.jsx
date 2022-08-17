import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import moment from "moment";
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
//const { RangePicker } = DatePicker;
const { TextArea } = Input;

const DefaultForm = ({data}) => {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [image,setImage]  =useState("");
  const [top, setTop] = useState(1);
  const [isEdit,setIsEdit] =useState(false) 

console.log("--------------------------------",data)

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };


useEffect(()=>{
  console.log("///////////",data)
  if(data.nodata){
    console.log("happy")
  }else{

    setIsEdit(true);
  const initials = {
    firstname: data.firstname,
    lastname: data.lastname,
    profession:data.profession,
    gender:data.gender,
    height: data.height,
    dob:moment(data.dob),
    image: [{uid: data.id, url : data.image}]
  }
  form.setFieldsValue(initials)


}

  
 // console.log("--------------------",form.values)
},[data])

  const upload  =async (file)=>{
    console.log(file)
    if (file.fileList.status === "done"){
        console.log("file")
    
        const body = new FormData();
         body.append('file', file.fileList.originFileObj);
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
      
      if(isEdit){
        console.log("Edit")
        axios.post(`http://127.0.0.1:8081/update/${data._id}`,data)
        .then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err)
        })
      }else{
        console.log("add")
        axios.post('http://127.0.0.1:8081/add',data)
      .then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err)
      })
      }
      
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
      <div style ={{border:"2px solid black"}}>
      <Form
         labelCol={{ span: 8 }}
         wrapperCol={{ span: 8 }}  
         form={form}
        onFinish={submitHandler}
        className = {{backgroundColor:"black"}}
       
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
        

        <Form.Item label="Upload"   valuePropName="fileList">
          <Upload    listType="picture-card"    >
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

        <Form.Item   style={{}}  label= "upload image" name="image"  valuePropName="fileList">
          <Upload  customRequest={dummyRequest} listType="picture" style={{width:"10px"}}
            onChange={(e)=>upload(e)} 
          
          >
            <Button>upload</Button>
          </Upload>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};

export default DefaultForm ;
