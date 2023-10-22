import "./style.css";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListItem from "./SequenceList";
import { getCategoriesListseq,EditSequence } from "../../../actions/categories";
import {
    Table,
    Input,
    Button,
    PageHeader,
    Popconfirm,
    Tag,
    Form,
    Modal,
    Card,
    Row,
    Col,Select
  } from "antd";
  import { Content } from "antd/lib/layout/layout";
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  };
  const tailLayout = {
    wrapperCol: { offset: 7, span: 10 },
  };



  let demo=[]
function DragAndDropList() {
   
    const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const onFinish = async () => {
    // console.log(values)
    const code = await EditSequence(items)
    
    if (code === 201) {
      form.resetFields();

    //   handleRefresh();
    }
  };
  
//   const handleRefresh = async () => {
//     const res = await getCategoriesListseq();
//     // console.log('res',res)
//     setItems(res);
//     // for (
//     //     let i = 0;
//     //     i < res?.length;
//     //     i++
//     //   ) {
//     //     demo.push({
//     //         p_id: res[i].id.toString(),

//     //       id: res[i].sequence.toString(),
//     //       name: res[i].name,
//     //       categories:res[i].categories_type
          
//     //     });
//     //   }
//     form.resetFields();
//   };
  const fetchData = async () => {

    const res =  await getCategoriesListseq();
    // console.log(res.id!==items.id)
    // res.id!==items.id?
    demo = [];
    for ( let i = 0; i < res?.length; i++) {
        
            demo.push({
                p_id: res[i].id.toString(),
    
              id: res[i].sequence.toString(),
              name: res[i].name,
              categories:res[i].categories_type
              
            });}
    setItems(demo)
  }

//   console.log('demo',demo)
  useEffect (() => {
    
    // setItems(elements)
    fetchData();
  }, []);
  const onDragEnd = (result) => {
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  return (
    <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          form={form}
        >
            <Content>
                
            </Content>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items?.map((item, index) => (
                
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                    <>
                    {/* {console.log("update",items)} */}
                    <ListItem
                      provided={provided}
                      snapshot={snapshot}
                      item={item}
                    />
                    <Form.Item name='sequence' hidden={true} label="Sequence">
          <Input size="large" name={item.id} placeholder='1-2-3'  />
          {/* {console.log(item.id)} */}
          </Form.Item>
                    </>
                    
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
    </Form>
  );
}

export default function SequenceCategory() {
   
  return (
    <Content className="App">
      <DragAndDropList />
    </Content>
  );
}
