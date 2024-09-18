import { Pagination } from 'antd';
import { memo } from 'react';

const MyPagination = memo(({totalPage, setCurrentPage, isError, posts, setIsScroll}) => {

        const onchange = (pages) => {
            if(pages === 1) {
                posts.length = 0
                setIsScroll(true);
                setCurrentPage(pages);
            }else {
                setIsScroll(false);
                setCurrentPage(pages);
            }
        }

        return (
            <Pagination
            onChange={onchange} 
            align="center" 
            defaultCurrent={1} 
            total={totalPage} 
            style={{"marginBottom": 20}}
            disabled={isError}
            showSizeChanger={false}
            />
        );
    
})

export default MyPagination;