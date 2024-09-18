import { Select, Space } from 'antd';

const SelectItem = ({onChange}) => {

const handleChange = (val) => {
    onChange(val);
}

   return (
    <div>
        <Space wrap>
            <Select
            defaultValue="Sort Post"
            style={{
                width: 120,
            }}
            onChange={handleChange}
            options={[
                {
                value: 'disabled',
                label: 'Sort Post',
                disabled: true,
                },
                {
                value: 'country',
                label: 'country',
                },
                {
                value: 'description',
                label: 'description',
                },
               
            ]}/>
        </Space>
    </div>
   );
}

export default SelectItem;