import { CustomizeForm, ItemTypes } from 'ant-customize-form';
import { Form } from 'antd';
import React from 'react';
export default () => {
    const [formRef] = Form.useForm();
    // 相当于Form的props
    const formBaseConfig = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
        form: formRef,
        initialValues: {},
    };
    // 可以在onChange里面设置其他表单的值
    const formItemConfig = [
        {
            itemProps: { name: '1', label: '表单1', rules: [{ required: true }] },
            type: ItemTypes.INPUT
        },
        {
            itemProps: { name: '2', label: '表单2', rules: [{ required: true }] },
            type: ItemTypes.INPUT,
        },
        {
            itemProps: { name: '3', label: '表单3', rules: [{ required: true }] },
            type: ItemTypes.INPUT,
        },
        {
            itemProps: { name: '4', label: '表单4', rules: [{ required: true }] },
            type: ItemTypes.INPUT,
        },
        {
            itemProps: { name: '5', label: '表单5', rules: [{ required: true }] },
            type: ItemTypes.RADIO,
            typeProps: {
                options: [
                    { label: '项目一', value: 1 },
                    { label: '项目二', value: 2 },]
            },
        },
        {
            itemProps: {},
            type: ItemTypes.BUTTON,
        },
    ];

    const formConfig = {
        col: 1, //一行几列，支持多列的情况
        formProps: formBaseConfig,
        formItemOption: formItemConfig,
    };

    return (
        <>
            <CustomizeForm {...formConfig} />
        </>
    );
};