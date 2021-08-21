import React from 'react';
import { Table, Tag, Space } from 'antd';

const { Column, ColumnGroup } = Table;

const BasicTable = (props) => {
    return(
        <Table dataSource={props.data}>
            <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="firstName" key="firstName" />
            <Column title="Last Name" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
            <Column title="Age" dataIndex="age" key="age" />
            <Column title="Address" dataIndex="address" key="address" />
            <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
                <>
                {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                    {tag}
                    </Tag>
                ))}
                </>
            )}
            />
            <Column
            title="Action"
            key="action"
            render={(text, record) => (
                <Space size="middle">
                <a href="/">Invite {record.lastName}</a>
                <a href="/">Delete</a>
                </Space>
            )}
            />
        </Table>
    );
}

export default BasicTable;