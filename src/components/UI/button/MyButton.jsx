import { Button } from "antd";


const MyButton = ({children, ...props}) => {
  return (
    <Button type="primary" {...props}>
      {children}
    </Button>
  );
};

export default MyButton;