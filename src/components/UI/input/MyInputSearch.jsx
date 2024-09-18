import { Input } from 'antd';
const { Search } = Input;

const MyInputSearch = (props) => {
    return (
        <Search
        {...props}
        allowClear
        size="large"
      />
    );
}

export default MyInputSearch;