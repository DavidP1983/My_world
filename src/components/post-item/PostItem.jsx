import { Avatar, Button, List, Skeleton } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const PostItem = ({ item, deletePot }) => {
    // const router = useNavigate();
    return (

        <List.Item
            actions={[
            <Button key="list-loadmore-more" onClick={() => deletePot(item.id)}>delete</Button>]}            
            style={{ "borderBottom": "1px solid #d9d9d9", "margin": '0 15px'}}
        >
            <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.id}`} />}
                // title={<a onClick={() => router(`/posts/${item.id}`)}>{item.country}</a>}
                title={<Link to={`/posts/${item.id}`}>{item.country}</Link>}
                description={item.description}
            />
        </List.Item>

    );
}

export default PostItem;