import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Divider, Table } from 'antd';
import useFetching from '../hooks/useFetching';
import PostService from "../API/PostServiec";
import ErrorMessage from "../components/UI/error/ErrorMessage";
import PostIdCard from "../components/UI/postIdCard/PostIdCard";

import './postIdPage.scss';

const PostIdPage = () => {

    let { id } = useParams();
    const [postById, setPostById] = useState([]);
    const {isLoading, isError, fetchData, isErrorMessage} = useFetching(async (id) => {
        const singlePost = await PostService.getById(id);
        const transformObj = await Array.of(Object.assign(singlePost, { key: 1 }));
        setPostById(transformObj);
    });

    useEffect(() => {
        if(/\W/.test(id)) {
            const singlePostFromStorage = localStorage.getItem('posts');
            const parsePostFromStorage = JSON.parse(singlePostFromStorage);
            const filterPosts = parsePostFromStorage.filter(item => item.id === id).map(item => Object.assign(item, {key: 1}));
            setPostById(filterPosts);
        }else {
            fetchData(id)
        }
    }, [id]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            fixed: 'left',
            align: "center",
            width: 100,
        },
        {
            title: 'Continent',
            dataIndex: 'continent',
            width: 100,
            align: "center"

        },
        {
            title: 'Population',
            dataIndex: 'population',
            width: 110,
            align: "center"

        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            align: "center",
            width: 100
        },
        {
            title: 'Language',
            dataIndex: 'language',
            align: "center",
            width: 100
        },
        {
            title: 'Best time to visit',
            dataIndex: 'best_time_to_visit',
            align: "center",
            width: 90
        },
        {
            title: 'Top attractions',
            dataIndex: 'top_attractions',
            with: 100,
            render: (text) => {
                const attraction = Array.isArray(text) ? text : text.split(',');
                const list = attraction.map((item, index) => <li key={index}>{item}</li>)
                return <ul className="postId">{list}</ul>
            },

        },
        {
            title: 'Local dishes',
            dataIndex: 'local_dishes',
            render: (text) => {
                const dishes = Array.isArray(text) ? text : text.split(',');
                const list = dishes.map((item, index) => <li key={index}>{item}</li>)
                return <ul className="postId">{list}</ul>
            },

        },
        {
            title: 'Activities',
            dataIndex: 'activities',
            // align: "center",
            render: (text) => {
                const activities = Array.isArray(text) ? text : text.split(',');
                const list = activities.map((item, index) => <li key={index}>{item}</li>)
                return <ul className="postId">{list}</ul>
            },

        },
    ];
    
    return (
        <>
            <Divider>Country's Description</Divider>
            <PostIdCard postById={postById} isLoading={isLoading} isError={isErrorMessage} id={id}/>
            {isError ? <ErrorMessage isError={isErrorMessage === 'Network Error' ? isError : null} /> :
                <>

                    <Table
                        style={{"padding": "10px 0"}}
                        loading={isLoading}
                        columns={columns}
                        dataSource={postById}
                        size="large"
                        pagination={false}
                        bordered
                        scroll={{ x: 1200 }}
                    />

                </>

            }
        </>

    );
}

export default PostIdPage;