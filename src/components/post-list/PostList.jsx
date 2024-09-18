import PostItem from "../post-item/PostItem";
import { Alert } from 'antd';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { List } from 'antd';

import './postList.scss';

const PostList = ({ posts, deletePot, isError, isLoading }) => {

    if (!posts.length && !isError && !isLoading) {
        return (
            <Alert
                style={{ "textAlign": "center" }}
                message="The list of Countries is empty"
                type="warning"
                closable
            />
        );
    }

    return (
        <div style={{"border": "1px solid #d9d9d9", "borderRadius": 20, "borderBlockEnd": "none", "margin": "0 0 10px 0"}}>
            <TransitionGroup>
                {posts.map((posts) => 
                    <CSSTransition
                        key={posts.id}
                        timeout={500}
                        classNames="post">

                        <List
                            itemLayout="horizontal"
                            bordered={false}
                            size='large'
                            dataSource={[posts]}
                            renderItem={(posts) => (

                                <PostItem item={posts} deletePot={deletePot} />

                            )}
                        />

                    </CSSTransition>
                )}


            </TransitionGroup>
        </div>
    );
}

export default PostList;