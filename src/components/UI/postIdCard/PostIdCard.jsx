import { useState } from 'react';
import { Card, Rate } from 'antd';
import { Link } from 'react-router-dom';

import './postIdCard.scss';

const PostIdCard = ({ postById, isLoading, isError, id }) => {
    const storageRate = localStorage.getItem(`${id}`) || 1;
    const [rate, setRate] = useState(storageRate);

    if (!postById.length && !isLoading) {
        return (
            <Card
                bordered={true}
                style={{ width: 300 }}
                cover={<img alt="error" src={isError === "Network Error" 
                ? "https://static.thenounproject.com/png/237668-200.png"
                :
                "https://www.verticalrail.com/wp-content/uploads/2015/05/404-Page-Not-Found.png"} />}
            >
                <Card.Meta title="Error" description={`Sorry, something went wrong. ${isError}`} />
            </Card>
        );
    }

    const changRateValue = (val) => {
        setRate(val);
        localStorage.setItem(`${id}`, val);
    }

    const renderItem = (arr) => {
        const cartContent = arr.map((item) => {
            return (
                <Card
                    loading={isLoading}
                    key={item.id}
                    hoverable
                    style={{ width: 500}}
                    cover={<img alt={item.country} src={item.image} />}
                >                    

                    <Card.Meta 
                    title={item.country} 
                    description={item.description} 
                    style={{"minHeight": 100, "marginBottom": "10px"}}/>
                    <div className='rate'>
                        <Link to='/posts' className='link'>Back to All Conties</Link>
                        <Rate value={rate} onChange={changRateValue}/>
                    </div>
                </Card>
                
            );
        })
        return (
            <>
                {cartContent}
            </>
        )
    }
    const content = renderItem(postById);

    return (
        <>
            {content}

        </>
    );
}

export default PostIdCard;