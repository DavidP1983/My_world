import { Button, Modal, Space } from 'antd';

const ModalForm = ({ children, open, setOpen }) => {

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Space style={{ "marginBottom": 30 }}>
                <Button type="primary" onClick={showModal}>
                    Create country
                </Button>
            </Space>
            <Modal
                open={open}
                title="Create your country"
                onCancel={handleCancel}
                footer={(_, { CancelBtn }) => (
                    <>
                        <CancelBtn />
                    </>
                )}
            >
                {children}
            </Modal>
        </>
    );
}

export default ModalForm;