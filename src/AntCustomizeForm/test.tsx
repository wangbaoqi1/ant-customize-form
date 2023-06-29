import { CustomizeForm, ItemTypes, WFC } from 'ant-customize-form';
import { Button, Form } from 'antd';
import React, { useState } from 'react';
export default () => {
    const [formRef] = Form.useForm();
    const [isShow, setIsShow] = useState(false)
    // 相当于Form的props
    const formBaseConfig = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
        form: formRef,
        onValuesChange: (changedValues?: any, values?: unknown): void => {
            console.log(changedValues, values, 1212132312);
        },
        initialValues: {},
    };
    // 可以在onChange里面设置其他表单的值
    const formItemConfig = [
        {
            itemProps: { name: '1', label: '表单', rules: [{ required: true }] },
            type: ItemTypes.SELECT,
            typeProps: {
                placeholder: '请输入',
                options: [
                    { label: '项目一', value: 1 },
                    { label: '项目二', value: 2 },]
            },
        },
        {
            itemProps: { name: '2', label: '联动', rules: [{ required: true }] },
            type: ItemTypes.INPUT,
            show: () => {
                return {
                    dependencies: ['1'], //依赖项
                    flag: formRef.getFieldValue('1') === 1, //显示的条件
                };
            },
            typeProps: {},
        },
        {
            itemProps: { name: '2', label: '联动类型2', rules: [{ required: true }] },
            type: ItemTypes.RADIO,
            show: isShow,
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
            <Button onClick={() => { setIsShow(!isShow) }}>控制显示隐藏</Button>
            <CustomizeForm {...formConfig} />
        </>
    );
};