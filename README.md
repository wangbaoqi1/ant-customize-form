## CustomizeForm

Demo

- 表单类型
- Customize 自定义组件
- 自定义组件的所有的使用的都是 antd 组件
- 两列以上表单

```ts
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
                 { itemProps: { ...layout }, type: 'Title', children: '基础信息', rowNum: true, typeProps: { level: 4 } }
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


// ##基于antd的 自定义表单Form  example


```

```ts
   input、inputNumber表单配置
   firstText 表单前文字
   lastText  表单后文字
     {
      itemProps: { name: 'input', label: '账单生成', rules: [{ required: true }] },
      type: ItemTypes.INPUTNUMBER,
      typeProps: {
        firstText: '导入或录入抄表数据后，',
        lastText: '小时后，自动生成收费账单',
        style: { width: 80 },
      },
    },

    select表单项
     {
      itemProps: { name: 'select', label: '收费项目', rules: [{ required: true }] },
      type: ItemTypes.SELECT,
      typeProps: {
        options: [
          { label: '项目一', value: 1 },
          { label: '项目二', value: 2 },
        ],
        style: { width: 200 },
      },
    },

```

```tsx
import { Form, Input, Select, Button } from 'antd';
import moment from 'moment';
import { CustomizeForm, ItemTypes, WFC } from 'wbq-dumiapp';
import React, { useContext, useState } from 'react';
const { Option } = Select;

const formConfig1 = () => {
  const [formRef] = Form.useForm();
  const [type3, setType3] = useState('hangzhou');

  const formBaseConfig = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    // formRef必填
    form: formRef,
    onValuesChange: (changedValues?: any, values?: unknown): void => {
      formRef.setFields([
        { name: 'name', value: 123 },
        { name: 'read', value: 7878 },
      ]); // 设置值的唯一方法
    },
    //设置默认值 或者 修改表单时的回显值 时间类型需要设置成moment
    initialValues: {
      type3: 'hangzhou',
      type4: 'hangzhou',
      type8: 'hangzhou1',
      type9: 'hangzhou1',
      type10: { type101: 1, type102: 1 },
    },
  };
  const type4OptionsObj = {
    hangzhou: [
      { value: 'hangzhou', label: '单价*计量单位' },
      { value: 'hangzhou1', label: '固定金额' },
    ],
    hangzhou1: [{ value: 'hangzhou3', label: '单价*使用量' }],
    hangzhou2: [
      { value: 'hangzhou', label: '单价*计量单位' },
      { value: 'hangzhou1', label: '固定金额' },
    ],
    hangzhou3: [{ value: 'hangzhou4', label: '押金' }],
  };
  // 自定义校验方法
  const handleValidator = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords that you entered do not match!'));
    },
  });

  // 可以在onChange里面设置其他表单的值
  const formItemConfig = [
    {
      itemProps: { name: 'type1', label: '收费项目', rules: [{ required: true }] },
      type: ItemTypes.SELECT,
      col: 24,
      rowNum: 1,
      typeProps: {
        options: [
          { label: '项目一', value: 1 },
          { label: '项目二', value: 2 },
        ],
        style: { width: 400 },
      },
    },
    {
      itemProps: { name: 'type2', label: '收费标准', rules: [{ required: true }] },
      type: ItemTypes.INPUT,
      rowNum: 3,
      typeProps: { style: { width: 200 } },
    },
    {
      itemProps: { name: 'type3', label: '收费类型', rules: [{ required: true }, handleValidator] },
      type: ItemTypes.RADIO,
      typeProps: {
        options: [
          { value: 'hangzhou', label: '周期性收费' },
          { value: 'hangzhou1', label: '走表收费' },
          { value: 'hangzhou2', label: '临时性收费' },
          { value: 'hangzhou3', label: '押金' },
        ],
        onChange: (val: { target: { value: SetStateAction<string> } }) => {
          formRef.setFieldsValue({
            type4: type4OptionsObj[val.target.value][0].value,
          });
          setType3(val.target.value);
        },
      },
    },
    {
      itemProps: { name: 'type4', label: '计算方式', rules: [{ required: true }, handleValidator] },
      type: ItemTypes.RADIO,
      typeProps: {
        options: type4OptionsObj[type3],
      },
    },
    {
      itemProps: { name: 'type5', label: '计量单位', rules: [{ required: true }] },
      type: ItemTypes.SELECT,
      rowNum: 3,
      show: () => {
        return {
          dependencies: ['type4'], //依赖项
          flag: formRef.getFieldValue('type4') === 'hangzhou', //显示的条件
        };
      },
      typeProps: {
        options: [
          { label: 'm2', value: 1 },
          { label: 's', value: 2 },
        ],
        style: { width: 200 },
      },
    },
    {
      itemProps: { name: 'type6', label: '单价', rules: [{ required: true }] },
      type: ItemTypes.INPUT,

      show: () => {
        return {
          dependencies: ['type4', 'type3'], //依赖项
          flag:
            formRef.getFieldValue('type4') === 'hangzhou' ||
            formRef.getFieldValue('type3') === 'hangzhou1', //显示的条件
        };
      },
      typeProps: { suffix: '元/m2/月', style: { width: 200 } },
    },
    {
      itemProps: { name: 'type6.1', label: '固定金额', rules: [{ required: true }] },
      type: ItemTypes.INPUT,
      show: () => {
        return {
          dependencies: ['type4'], //依赖项
          flag: formRef.getFieldValue('type4') === 'hangzhou1', //显示的条件
        };
      },
      typeProps: { suffix: '元/m2/月', style: { width: 200 } },
    },
    {
      itemProps: { name: 'type6.2', label: '押金金额', rules: [{ required: true }] },
      type: ItemTypes.MOREITEM,
      show: () => {
        return {
          dependencies: ['type3'], //依赖项
          flag: formRef.getFieldValue('type3') === 'hangzhou3', //显示的条件
        };
      },
      children: [
        {
          itemProps: { name: 'type6.21', label: '押金' },
          type: ItemTypes.INPUT,
          typeProps: {
            style: { width: 180 },
          },
        },
        {
          itemProps: { name: 'type6.22', label: '收款时是否可修改押金金额' },
          type: ItemTypes.CHECKBOX,
          typeProps: {
            style: { width: 200 },
            options: [{ label: '收款时是否可修改押金金额', value: 1 }],
          },
        },
      ],
      typeProps: {
        style: { width: 100 },
      },
    },
    {
      itemProps: { name: 'type6.3', label: '账单生成', rules: [{ required: true }] },
      type: ItemTypes.INPUTNUMBER,
      show: () => {
        return {
          dependencies: ['type3'], //依赖项
          flag: formRef.getFieldValue('type3') === 'hangzhou1', //显示的条件
        };
      },
      typeProps: {
        firstText: '导入或录入抄表数据后，',
        lastText: '小时后，自动生成收费账单',
        style: { width: 80 },
      },
    },
    // Cascader
    {
      itemProps: { name: 'type7', label: '计费精度', rules: [{ required: true }] },
      type: ItemTypes.SELECT,
      typeProps: {
        options: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ],
        style: { width: 200 },
      },
    },
    {
      itemProps: {
        name: 'type8',
        label: '账单生成模式',
        rules: [{ required: true }, handleValidator],
      },
      type: ItemTypes.RADIO,
      show: () => {
        return {
          dependencies: ['type3'], //依赖项
          flag: formRef.getFieldValue('type3') !== 'hangzhou3', //显示的条件
        };
      },
      typeProps: {
        options: [
          { value: 'hangzhou', label: '手动生成' },
          { value: 'hangzhou1', label: '自动生成' },
        ],
      },
    },

    {
      itemProps: {
        name: 'type9',
        label: '账单生成频率',
        rules: [{ required: true }, handleValidator],
      },
      type: ItemTypes.RADIO,
      show: () => {
        return {
          dependencies: ['type8', 'type3'], //依赖项
          flag:
            formRef.getFieldValue('type8') === 'hangzhou1' &&
            formRef.getFieldValue('type3') !== 'hangzhou3', //显示的条件
        };
      },
      typeProps: {
        options: [
          { value: 'hangzhou1', label: '按月生成' },
          { value: 'hangzhou2', label: '每3个月生成' },
          { value: 'hangzhou3', label: '每6个月生成' },
          { value: 'hangzhou4', label: '每12个月生成' },
        ],
      },
    },
    // MoreItem 一个Form.Item接多个表单项
    {
      itemProps: { name: 'type10', label: '账单生成日期', rules: [{ required: true }] },
      type: ItemTypes.MOREITEM,
      show: () => {
        return {
          dependencies: ['type8', 'type3', 'type9'], //依赖项
          flag:
            formRef.getFieldValue('type8') === 'hangzhou1' &&
            formRef.getFieldValue('type3') !== 'hangzhou3', //显示的条件
        };
      },
      children: [
        {
          itemProps: { name: 'type101', label: '单月' },
          type: ItemTypes.SELECT,
          typeProps: {
            style: { width: 120 },
            options: [
              { label: '上个周期', value: 1 },
              { label: '本周', value: 2 },
              { label: '下一个周期', value: 3 },
            ],
          },
        },
        {
          itemProps: { name: 'type102', label: '按月' },
          show: () => {
            return {
              dependencies: ['type9'], //依赖项
              flag: formRef.getFieldValue('type9') !== 'hangzhou1', //显示的条件
            };
          },
          type: ItemTypes.SELECT,
          typeProps: {
            style: { width: 120 },
            options: [
              { label: '第一月', value: 1 },
              { label: '第二月', value: 2 },
            ],
          },
        },
        {
          itemProps: { name: 'type103', label: '按天' },
          type: ItemTypes.SELECT,
          typeProps: {
            style: { width: 120 },
            options: [
              { label: '第一天', value: 1 },
              { label: '第二天', value: 2 },
            ],
          },
        },
      ],
      typeProps: {
        style: { width: 100 },
      },
    },
    {
      itemProps: { name: 'type81', label: '是否征税', rules: [{ required: true }] },
      type: ItemTypes.MOREITEM,
      show: () => {
        return {
          dependencies: ['type811', 'type1'], //依赖项
          flag: true, //显示的条件
        };
      },
      children: [
        {
          itemProps: { name: 'type811', label: '是否征税' },
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
          itemProps: { name: 'type812', label: '费率' },
          show: () => {
            return {
              dependencies: ['type811'], //依赖项
              flag: formRef.getFieldValue('type81')?.type811 === 1, //显示的条件
            };
          },
          type: ItemTypes.INPUT,
          typeProps: {
            style: { width: 200 },
            suffix: '%',
          },
        },
      ],
    },
    {
      itemProps: {
        name: 'type11',
        label: '支付规则',
        rules: [{ required: true }, handleValidator],
      },
      type: ItemTypes.SELECT,
      rowNum: 2,
      show: () => {
        return {
          dependencies: ['type3'], //依赖项
          flag: formRef.getFieldValue('type3') !== 'hangzhou3', //显示的条件
        };
      },
      typeProps: {
        style: { width: 200 },
        options: [
          { value: 'hangzhou', label: '规则1' },
          { value: 'hangzhou1', label: '规则2' },
        ],
      },
    },
    {
      itemProps: { name: 'type12', label: '备注' },
      type: ItemTypes.TEXTAREA,
      typeProps: {
        style: { width: 200 },
      },
    },
    {
      itemProps: { name: 'type13', label: '' },
      type: ItemTypes.BUTTON,
      typeProps: {
        style: { width: 200 },
      },
    },
  ];

  return {
    col: 3,
    // space: 2,
    formProps: formBaseConfig,
    formItemOption: formItemConfig,
  };
};

export default () => {
  return (
    <>
      <CustomizeForm {...formConfig1()} />
    </>
  );
};
```
