import { Select, Space } from 'antd';



const SelectLimit = ({onChange}) => {

const handleChange = (val) => {
    onChange(val);
}

   return (
    <div>
        <Space wrap>
            <Select
            defaultValue="Limit of items"
            style={{
                width: 120,
            }}
            onChange={handleChange}
            options={[
                {
                value: 'disabled',
                label: 'Limit of items',
                disabled: true,
                },
                {
                value: 100,
                label: '10',
                },
                {
                value: 150,
                label: '15',
                },
                {
                value: 200,
                label: '20',
                },
                {
                value: 500,
                label: 'Show all',
                },
               
            ]}/>
        </Space>
    </div>
   );
}

export default SelectLimit;