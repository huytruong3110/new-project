import { Col, Form, Input, Row, Select } from "antd";
const UserAddAndUpdate = ({record}) => {
    return (
        <Form layout="vertical" labelCol={{ span: 4}} wrapperCol={{ span: 20 }}>
            <Form.Item label="Ten">

            </Form.Item>
            <Form.Item label="Email">
                <Input placeholder="Nhap Email"></Input>

            </Form.Item>
            <Form.Item label="Com">
            </Form.Item>

        </Form>
    )
};

export default UserAddAndUpdate;