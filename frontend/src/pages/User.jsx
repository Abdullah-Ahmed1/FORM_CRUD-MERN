import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EditOutlined, EllipsisOutlined, SettingOutlined ,DeleteOutlined} from '@ant-design/icons';
import { Avatar, Card,Affix, Button } from 'antd';

const { Meta } = Card;

const User = ({handleUpdate})=>{

  const [data,setData] = useState([]);
const [top, setTop] = useState(1);


    const handleDelete = async(id)=>{
        console.log(id)
       setData(data.filter(item=>item._id !==id))
       const users =  await axios.delete(`http://127.0.0.1:8081/delete/${id}`) 
    }

    useEffect(()=>{
        
        async function data(){
        const users =  await axios.get('http://127.0.0.1:8081/all') 
        console.log(users.data)
        setData(users.data)  
        }
        data() 
    },[])
    return(
        <div style={{backgroundColor:"grey",flexWrap:"wrap",display:"flex",padding:"10px",flexDirection:"row",alignItems:"center",justifyContent:"center"}} >
            
            <Affix offsetTop={top}  style={{position:"absolute",top:"10px",right:"10px"}} >
          <Link to="/add" >      
        <Button type="primary" onClick={() => setTop(top + 10)}>
          Add
        </Button>
        </Link>
      </Affix>
            
            {data.map((item)=>{
                return(
                              <Card key={item._id}
                              style={{ width: 300 ,margin:"10px" }}
                              cover={
                                <img
                                  alt="example"
                                  src={item.image}
                                  style={{maxHeight:300, maxWidth:"200"}}
                                />
                              }
                              actions={[
                                <DeleteOutlined ket = "delete"   onClick={()=>handleDelete(item._id)} />,
                                <EditOutlined key="edit"    onClick={()=>handleUpdate(item)}   />,
                                <EllipsisOutlined key="ellipsis" />,
                              ]}
                            >
                              <Meta
                                avatar={<Avatar src={item.image} />}
                                title={`${item.firstname}  ${item.lastname}`}
                                description={`profession: ${item.profession} `}
                              />
                            </Card> 
                            )
            
            })}
  
        </div>
    )
}
export default User;