import { Skeleton } from 'antd';

const LoadingSkeleton = () => {
    return (
        <div style={{width: "90%", margin: "0 auto", padding: "130px 0"}}>
            <Skeleton
                active
                avatar
                paragraph={{
                    rows: 4,
                }}
            />

            <Skeleton
                active
                avatar
                paragraph={{
                    rows: 4,
                }}
            />


        </div>
    );
}

export default LoadingSkeleton;