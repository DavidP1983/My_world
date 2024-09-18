import { Form, Input } from 'antd';
import MyButton from '../components/UI/button/MyButton';
import useFalidateLogin from '../hooks/useFalidateLogin';
import Loader from '../components/UI/loader/Loader';
import useDebounce from '../hooks/useDebounce';

import './login.scss';



const Login = () => {
    const [form] = Form.useForm();
    const {formVal, handleChange, setFormVal} = useDebounce();
    const [isSubbmiting, onFinish, onFinishFailed, contextHolder] = useFalidateLogin(form, setFormVal, formVal);


    return (
        <div
            className='login'
        >
            <div className='login__text'>Login before using App</div>
            {isSubbmiting ? <Loader/> : null}
            {contextHolder}
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={formVal}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size='large'

            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input onChange={handleChange} name="username" placeholder='name'/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            min: 5,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password onChange={handleChange} name="password" placeholder='password'/>

                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <MyButton
                        type="primary"
                        htmlType="submit"
                        disabled={isSubbmiting}
                    >
                        Log in
                    </MyButton>
                </Form.Item>
            </Form>

        </div>
    );
}

export default Login;