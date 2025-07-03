import { Card } from "antd";
import "../styles/HomeTab.css";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import Markdown from 'react-markdown'



export default function HomeTab() {
  
  const [data, setData] = useState([]);
  useEffect(() => {
      fetch("http://localhost:8000/api/get_notes/")
        .then((res) => res.json())
        .then((res) => {
          // let resp=res.map(item=>{
          //   return {
          //     key: item.id,
          //     label: (<>
          //       <h2>{item.title}</h2>
          //       <h6 style={{color:"gray",marginTop:0}}>{item.upload_time} • {item.subject__name} • {item.uploader__username}</h6></>),
          //     children: <Markdown>{item.summary}</Markdown>,
          //   }
          // })
          setData(res);
        });
    }, []);

  return (
    <Flex vertical gap="3em">
      
      {
        data.length!==0?
        
        data.map((item) => {
          return (
            <Card className="post-card" key={item.id}
            title={<>
                <h1 style={{marginBottom:0}}>{item.title}</h1>
                <h5 style={{color:"gray",marginTop:0}}>{item.upload_time} • {item.subject__name} • Uploaded by {item.uploader__username}</h5></>}>
              
                <Markdown>{item.summary}</Markdown>
              
            </Card>
          )
        })
        :
        <p>NO DATA</p>
      }
    </Flex>
  );
}
