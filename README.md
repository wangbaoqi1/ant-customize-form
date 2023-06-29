yarn publish

# CustomizeForm

- 1：安装 npm install ant-customize-form 或者 yarn add ant-customize-form

- 2：开箱即用，支持所有的 ant 组件属性 基本的使用

- 表单类型
- Customize 自定义组件
- 自定义组件的所有的使用的都是 antd 组件
- 支持多列的情况的表单

````ts
export enum ItemTypes {
    TITLE = 'Title',
    INPUT = 'Input',
    SELECT = 'Select',
    CASCADER = 'Cascader',
    RADIO = 'Radio',
    TEXTAREA = 'TextArea',
    INPUTNUMBER = 'InputNumber',
    CHECKBOX = "Checkbox",
    UPLOAD = "Upload",
    DRAGGER = "Dragger",
    DATEPICKER = "DatePicker",
    RANGEPICKER = 'RangePicker',
    MOREITEM = 'MoreItem', //一个表单项支持多个输入框的
    BUTTON = 'Button',
    CUSTOMIZE = 'Customize' //自定义组件获取值
    LIST = 'List' //Form.List 的情况单独做处理
}

#Form的基本配置注意事项,其他配置遵循  antd的form配置
   1： const [formRef] = Form.useForm() // 注意只能使用 formRef
   2： formRef.setFields([{ name: 'name', value: 123 }, { name: 'read', value: 7878 }]) // 设置值的方法
   3： formRef.setFieldsValue({ [key:string]:123 }, { [key:string]: 7878 }) // 设置值的方法

##  Form.item 的基本配置
          itemProps：对应 antd 的 <Form.Item></Form.Item> 的的属性
          type: 对应的当前使用的输入框类型  example  Input Radio 等
          children?：自定义文案，
           col?: 24,新增配置
          rowNum?：多少Form.Item为一行 example:  rowNum:2;
          typeProps：antd对应的输入框的配置属性     example: <Input {...typeProps}/>
          typeProps:{ onChange: (val: { target: { value: SetStateAction<string> } }) => {  //可以在onChange 设置其他表单的值
              formRef.setFieldsValue({
                type4: type4OptionsObj[val.target.value][0].value,
                });
          };
          show：是否展示当前表单项 show: () => {
                                     return {
                                             dependencies: ['type1'],  //依赖对应
                                             flag: formRef.getFieldValue('type1') === 'Apple' //展示的条件
                                             }
                                  }

         const formItemConfig=[
                 // 阶段标题的配置
                 { itemProps: { ...layout }, type: 'Title', children: '基础信息', rowNum: 1, typeProps: { level: 4 } }
         ]


 ##基本配置
  space?:表单要分成几列   Space间距分
  col?：表单要分成几列，默认值1列 栅格分
  formProps：对应form的属性
  formItemOption： @Form.item 的基本配置
    const data1 = {
        col: 2,//space
        formProps：formBaseConfig,
        formItemOption：formItemConfig,
        customize: {
            type1: <div>111</div> //字段key为typ1的自定义组件
        },
       formList: {
            type6: <BindFeeForm form={formRef} /> //针对与Form.List的情况
        }
    }


# 自定义表单 show 属性的介绍-------也是支持复杂动态表单的控制显示

**Output:**

(Labels are automatically generated)

- 1：一个表单控制的情况 例子联动类型 1：

![Result](/public/show1.jpg)

```ts
show: () => {
        return {
          dependencies: ['1'], //依赖项
          flag: formRef.getFieldValue('1') === 1, //显示的条件
        };
      },
````

- 2：boolen 控制表单的情况 例子联动类型 2：

![Result](/public/show2.jpg)

```ts
  const [isShow, setIsShow] = useState(true);
  show: isShow,
```

- 3：多个表单控制的情况 例子联动类型 3：

![Result](/public/show3.jpg)

```ts
show: () => {
  return {
    dependencies: ['1', '2'], //依赖项
    flag: formRef.getFieldValue('1') === 1 || formRef.getFieldValue('2') === 1, //显示的条件
  };
};
```

- 4：子表单显隐控制的情况 例子联动类型 4：

![Result](/public/show4.jpg)

```ts
父表单：
show: () => {
  return {
    dependencies: ['taxRateType'], //嵌套表单的时候要把子表单的依赖写到父表单依赖中
    flag: true, //显示的条件也可以与其他表单联动
  };
};
children子表单：
show: () => {
            return {
              dependencies: ['taxRateType'], //依赖项
              flag: formRef.getFieldValue('taxRateType') === 1, //显示的条件
        };
};

```

- 5：其他表单控制 子表单显隐控制的情况 例子联动类型 5：

![Result](/public/show5.jpg)

```ts
父表单：
show: () => {
  return {
    dependencies: ['taxRateType', '1'], //嵌套表单的时候要把子表单的依赖写到父表单依赖中
    flag: true, //显示的条件也可以与其他表单联动
  };
};
children子表单：
show: () => {
            return {
              dependencies: ['taxRateType'], //依赖项
              flag: formRef.getFieldValue('1') === 1 || formRef.getFieldValue('2') === 1, //显示的条件
        };
};

```

![Result](/public/showall.jpg)

###代码

```tsx
import { CustomizeForm, ItemTypes, WFC } from 'ant-customize-form';
import { Button, Form } from 'antd';
import React, { useState } from 'react';
export default () => {
  const [formRef] = Form.useForm();
  const [isShow, setIsShow] = useState(true);
  // 相当于Form的props
  const formBaseConfig = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    form: formRef,
    onValuesChange: (changedValues?: any, values?: unknown): void => {
      console.log(changedValues, values, 1212132312);
    },
    initialValues: { 1: 1, 2: 2 },
  };
  // 可以在onChange里面设置其他表单的值
  const formItemConfig = [
    {
      itemProps: { name: '1', label: '条件一', rules: [{ required: true }] },
      type: ItemTypes.SELECT,
      typeProps: {
        placeholder: '请输入',
        style: { width: 400 },
        options: [
          { label: '项目一', value: 1 },
          { label: '项目二', value: 2 },
        ],
      },
    },
    {
      itemProps: { name: '2', label: '条件二', rules: [{ required: true }] },
      type: ItemTypes.RADIO,
      typeProps: {
        placeholder: '请输入',
        style: { width: 400 },
        options: [
          { label: '项目一', value: 1 },
          { label: '项目二', value: 2 },
        ],
      },
    },
    {
      itemProps: { name: '3', label: '联动类型1', rules: [{ required: true }] },
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
      itemProps: { name: '4', label: '联动类型2', rules: [{ required: true }] },
      type: ItemTypes.RADIO,
      show: isShow,
      typeProps: {
        options: [
          { label: '项目一', value: 1 },
          { label: '项目二', value: 2 },
        ],
      },
    },
    {
      itemProps: { name: '5', label: '联动类型3', rules: [{ required: true }] },
      type: ItemTypes.INPUT,
      show: () => {
        return {
          dependencies: ['1', '2'], //依赖项
          flag: formRef.getFieldValue('1') === 1 || formRef.getFieldValue('2') === 1, //显示的条件
        };
      },
      typeProps: {},
    },
    {
      itemProps: { label: '联动类型4' },
      type: ItemTypes.MOREITEM,
      show: () => {
        return {
          dependencies: ['taxRateType'], //嵌套表单的时候要把子表单的依赖写到父表单依赖中
          flag: true, //显示的条件也可以与其他表单联动
        };
      },
      children: [
        {
          itemProps: { name: 'taxRateType', rules: [{ required: true }] },
          type: ItemTypes.SELECT,
          typeProps: {
            options: [
              { value: 1, label: '征税' },
              { value: 2, label: '免征' },
              { value: 3, label: '不征税' },
            ],
            style: { width: 180 },
          },
        },
        {
          itemProps: { name: 'taxRate', rules: [{ required: true }] },
          show: () => {
            return {
              dependencies: ['taxRateType'], //依赖项
              flag: formRef.getFieldValue('taxRateType') === 1, //显示的条件
            };
          },
          type: ItemTypes.INPUT,
          typeProps: {},
        },
      ],
      typeProps: {},
    },
    {
      itemProps: { label: '联动类型5' },
      type: ItemTypes.MOREITEM,
      show: () => {
        return {
          dependencies: ['taxRateType1', '1'], //嵌套表单的时候要把子表单的依赖写到父表单依赖中
          flag: true, //显示的条件也可以与其他表单联动
        };
      },
      children: [
        {
          itemProps: { name: 'taxRateType1', rules: [{ required: true }] },
          type: ItemTypes.SELECT,
          typeProps: {
            options: [
              { value: 1, label: '征税' },
              { value: 2, label: '免征' },
              { value: 3, label: '不征税' },
            ],
            style: { width: 180 },
          },
        },
        {
          itemProps: { name: 'taxRate1', rules: [{ required: true }] },
          show: () => {
            return {
              dependencies: ['taxRateType1'], //依赖项
              flag: formRef.getFieldValue('taxRateType1') === 1 || formRef.getFieldValue('1') === 1, //显示的条件
            };
          },
          type: ItemTypes.INPUT,
          typeProps: {},
        },
      ],
      typeProps: {},
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
      <Button
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        控制表单显示隐藏
      </Button>
      <CustomizeForm {...formConfig} />
    </>
  );
};
```
