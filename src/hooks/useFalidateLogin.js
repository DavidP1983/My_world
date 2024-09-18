import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { dataContext } from '../context';

const useFalidateLogin = (form, setFormVal, formVal) => {
    const [isSubbmiting, setIsubmiting] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { setIsAuth } = useContext(dataContext);
    const navigate = useNavigate();


    const onFinishFailed = () => {
        messageApi.open({
            type: 'error',
            content: 'This is an error try again',
        });
        form.setFieldValue(
            setFormVal({ username: '', password: '' }),
        );

    };

    const onFinish = () => {
        setIsubmiting(true);
        let timer = setTimeout(falidate, 3000);
        function falidate() {
            try {
                messageApi.open({
                    type: 'success',
                    content: 'Success message',
                });
                // form.setFieldValue(
                //     setFormVal({ username: '', password: '' }),
                // );
                setIsAuth(formVal.username);
                localStorage.setItem('isAuth', formVal.username)
                navigate('/posts');
                clearTimeout(timer);

            } catch (e) {
                console.log(e.message)
            } finally {
                setIsubmiting(false);
            }
        }
    };


    return [isSubbmiting, onFinish, onFinishFailed, contextHolder]
}

export default useFalidateLogin;