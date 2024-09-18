import { Form, notification, Input } from "antd";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const arr = [
  {id: 0, label: "Name", name: "name", req: [{required: true, max: 10}], placeholder: "city name"},
  {id: 1, label: "Country", name: "country", req: [{required: true, max: 10}], placeholder: "County name"},
  {id: 2, label: "Activities", name: "activities", placeholder: "list activities separated by comma"},
  {id: 3, label: "Best time to visit", name: "best_time_to_visit", placeholder: "best time to visit"},
  {id: 4, label: "Continent", name: "continent", placeholder: "continent"},
  {id: 5, label: "Currency", name: "currency", placeholder: "currency"},
  {id: 6, label: "Description", name: "description", req: [{required: true, min: 10}] , placeholder: "County description"},
  {id: 7, label: "Image", name: "image", placeholder: "image url adress required"},
  {id: 8, label: "Language", name: "language", placeholder: "language"},
  {id: 9, label: "Local dishes", name: "local_dishes", placeholder: "local dishes separated by comma"},
  {id: 10, label: "Population", name: "population", placeholder: "population"},
  {id: 11, label: "Top attractions", name: "top_attractions", placeholder: "list top attractions separated by comma"},

];

const FormItem = ({props, isEmpty, onInputChanges}) => {
  return (
    <Form.Item
    hasFeedback={isEmpty > 0}
    label={props.label}
    name={props.name}
    rules={props.req}
  >
    {props.label === "Description" ? 
    <Input.TextArea
    placeholder={props.placeholder}
    onChange={onInputChanges}
    name={props.name}/>
    :
    <MyInput
    placeholder={props.placeholder}
    onChange={onInputChanges}
    name={props.name}
  />
  
  }
  </Form.Item>
  );
}




const CreateItem = ({ createItem }) => {

  const [form] = Form.useForm();
  // Для уведомления о добавлении поста
  const [api, contextHolder] = notification.useNotification();

  const [formVal, setTitle] = useState({});


 //Сохраняем данные в стейт
  const onInputChanges = (e) => {
    const target = e.target.getAttribute("name");
    setTitle({
        ...formVal,
      [target]: e.target.value,
    });
  };

  //Создаем новый пост
  const createNewItem = (e) => {
    e.preventDefault();
    const [val1, val2] = Object.values(formVal);

    //Проверка полей
    if (val1 && val2) {
      const newPost = Object.assign({id: uuidv4()}, formVal);
      createItem(newPost);

      // Уведомление о добавлении поста
      api.open({
        message: `Post has been added`,
        description: <div>{newPost.country} <br/>{ newPost.description}</div>,
        showProgress: true,
        pauseOnHover: false,
      });

      // Очищения полей после добавления
      form.setFieldValue(
        setTitle({}),
      );
    }
  };

  return (
    <>
     {contextHolder}
    <Form
      form={form}
      name="trigger"
      style={{
        maxWidth: 600,
      }}
      layout="vertical"
      autoComplete="off"
      initialValues={formVal}
    >
      {() => {
        //Для условного рендеринга кновки
        const isEmpty = Object.values(form.getFieldValue() ?? []).join('').length;
        const [isErrorCountry, isErrorDesc] = form.getFieldsError(['title', 'description']);
        const isError = isErrorCountry.errors.concat(isErrorDesc.errors);
        return (
          <>
            {arr.map((item) => {
              return <FormItem props={item} isEmpty={isEmpty} onInputChanges={onInputChanges} key={item.id}/>
            })}
            <MyButton
              onClick={createNewItem}
              disabled={isEmpty && !(isError.length) ? false: true}
            >
              Create
            </MyButton>
          </>
        );
      }}
    </Form>
    </>
  );
};

export default CreateItem;
