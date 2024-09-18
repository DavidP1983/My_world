import { Flex, Spin, ConfigProvider } from 'antd';

const Loader = () => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Spin: {
                        dotSizeLG: 50
                    },
                },
            }}
        >
            <Flex align="center" gap="middle">

                <Spin size="large" />
            </Flex>
        </ConfigProvider>

    );
}

export default Loader;

