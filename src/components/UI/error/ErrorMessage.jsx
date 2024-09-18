import { Result } from 'antd';
import { Link } from 'react-router-dom';

const ErrorMessage = ({ isError, subTitle }) => {
    return (
        isError ?
            <Result
                status="500"
                title="500"
                subTitle={subTitle ? subTitle : "Sorry, something went wrong."}
            
            />
            :
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to="/posts" type="primary">Back Home</Link>}
            />

    );
}

export default ErrorMessage;
