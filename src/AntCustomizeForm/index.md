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
import { CustomizeForm, ItemTypes, WFC } from 'ant-customize-form';
import React, { useContext, useState } from 'react';
const { Option } = Select;
const getDataText = (num: number, data: string = 'day') => {
  let index = 1;
  const dataArr = [];
  while (index <= num) {
    if (data === 'day') {
      dataArr.push({ label: `第 ${index} 天`, value: index });
    }
    if (data === 'month') {
      dataArr.push({ label: `第 ${index} 月`, value: index });
    }
    index++;
  }
  return dataArr;
};

const formConfig1 = () => {
  const [formRef] = Form.useForm();
  const [ruleType, setRuleType] = useState(1);
  const formBaseConfig = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    // formRef必填
    form: formRef,
    onValuesChange: (changedValues?: any, values?: unknown): void => {
      console.log(changedValues, values, 1212132312);
    },
    //设置默认值 或者 修改表单时的回显值 时间类型需要设置成moment
    initialValues: {
      ruleType: 1,
      countType: 1,
      createType: 2,
      autoRate: 1,
      autoDateType: 1,
      autoMoonNum: 1,
      autoDateNum: 1,
      taxRateType: 1,
    },
  };
  const countTypeOptionsObj = {
    1: [
      { value: 1, label: '单价*计量单位' },
      { value: 2, label: '固定金额' },
    ],
    2: [{ value: 1, label: '单价*使用量' }],
    3: [
      { value: 1, label: '单价*计量单位' },
      { value: 2, label: '固定金额' },
    ],
    4: [{ value: 'hangzhou4', label: '押金' }],
  };

  // 可以在onChange里面设置其他表单的值
  const formItemConfig = [
    {
      itemProps: { name: 'chargeCategoryId', label: '收费项目', rules: [{ required: true }] },
      type: ItemTypes.SELECT,
      typeProps: {
        options: [
          { label: '项目一', value: 1 },
          { label: '项目二', value: 2 },
        ],
        style: { width: 400 },
      },
    },
    {
      itemProps: { name: 'name', label: '收费标准', rules: [{ required: true }] },
      type: ItemTypes.INPUT,
      typeProps: {
        showCount: true,
        maxLength: 20,
        style: { width: 400 },
      },
    },
    {
      itemProps: { name: 'ruleType', label: '收费类型', rules: [{ required: true }] },
      type: ItemTypes.RADIO,
      rowNum: 3,
      typeProps: {
        options: [
          { value: 1, label: '周期性收费' },
          { value: 2, label: '走表收费' },
          { value: 3, label: '临时性收费' },
          { value: 4, label: '押金' },
        ],
        onChange: (val: { target: { value: SetStateAction<string> } }) => {
          formRef.setFieldsValue({
            countType: countTypeOptionsObj[val.target.value][0].value,
          });
          setRuleType(+val.target.value);
        },
      },
    },
    {
      itemProps: { name: 'countType', label: '计算方式', rules: [{ required: true }] },
      type: ItemTypes.RADIO,
      typeProps: {
        options: countTypeOptionsObj[String(ruleType)],
      },
    },
    {
      itemProps: { name: 'meteringUnitType', label: '计量单位', rules: [{ required: true }] },
      type: ItemTypes.SELECT,
      show: () => {
        return {
          dependencies: ['countType'], //依赖项
          flag: formRef.getFieldValue('countType') === 1, //显示的条件
        };
      },
      typeProps: {
        options: [
          { label: '房屋建筑面积', value: 1 },
          { label: '房屋套内面积', value: 2 },
        ],
        style: { width: 400 },
      },
    },
    {
      itemProps: { name: 'unitPrice', label: '单价', rules: [{ required: true }] },
      rowNum: 3,
      type: ItemTypes.INPUTNUMBER,
      show: () => {
        return {
          dependencies: ['countType', 'ruleType'], //依赖项
          flag: formRef.getFieldValue('countType') === 1 || formRef.getFieldValue('ruleType') === 2, //显示的条件
        };
      },
      typeProps: { min: 0, addonAfter: '元', precision: 2, style: { width: 400 } },
    },
    {
      itemProps: { name: 'fixedAmount', label: '固定金额', rules: [{ required: true }] },
      type: ItemTypes.INPUTNUMBER,
      show: () => {
        return {
          dependencies: ['countType'], //依赖项
          flag: formRef.getFieldValue('countType') === 2, //显示的条件
        };
      },
      typeProps: { min: 0, precision: 2, addonAfter: '元', style: { width: 400 } },
    },
    {
      itemProps: {
        name: 'ruleType.2',
        label: '押金金额',
        rules: [{ required: true }],
      },
      type: ItemTypes.MOREITEM,
      show: () => {
        return {
          dependencies: ['ruleType'], //依赖项
          flag: formRef.getFieldValue('ruleType') === 4, //显示的条件
        };
      },
      children: [
        {
          itemProps: { name: 'ruleType.21', label: '押金' },
          type: ItemTypes.INPUT,
          typeProps: {
            style: { width: 180 },
          },
        },
        {
          itemProps: { name: 'ruleType.22', label: '收款时是否可修改押金金额' },
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
      itemProps: { name: 'delayedNum', label: '账单生成', rules: [{ required: true }] },
      type: ItemTypes.INPUTNUMBER,
      show: () => {
        return {
          dependencies: ['ruleType'], //依赖项
          flag: formRef.getFieldValue('ruleType') === 2, //显示的条件
        };
      },
      typeProps: {
        min: 0,
        precision: 2,
        firstText: '导入或录入抄表数据后，',
        lastText: '小时后，自动生成收费账单',
        style: { width: 80 },
      },
    },
    {
      itemProps: { name: 'type7', label: '计费精度', rules: [{ required: true }] },
      type: ItemTypes.SELECT,
      show: false, //暂时不做
      typeProps: {
        style: { width: 400 },
      },
    },
    {
      itemProps: { name: 'createType', label: '账单生成模式', rules: [{ required: true }] },
      type: ItemTypes.RADIO,
      show: () => {
        return {
          dependencies: ['ruleType'], //依赖项
          flag: formRef.getFieldValue('ruleType') !== 4, //显示的条件
        };
      },
      typeProps: {
        options: [
          { value: 1, label: '手动生成' },
          { value: 2, label: '自动生成' },
        ],
      },
    },

    {
      itemProps: { name: 'autoRate', label: '账单生成频率', rules: [{ required: true }] },
      type: ItemTypes.RADIO,
      show: () => {
        return {
          dependencies: ['createType', 'ruleType'], //依赖项
          flag:
            formRef.getFieldValue('createType') === 2 && formRef.getFieldValue('ruleType') !== 4, //显示的条件
        };
      },
      typeProps: {
        options: [
          { value: 1, label: '按月生成' },
          { value: 3, label: '每3个月生成' },
          { value: 6, label: '每6个月生成' },
          { value: 12, label: '每12个月生成' },
        ],
      },
    },
    // MoreItem 一个Form.Item接多个表单项
    {
      itemProps: { label: '账单生成日期' },
      type: ItemTypes.MOREITEM,
      show: () => {
        return {
          dependencies: ['createType', 'ruleType', 'autoRate'], //依赖项
          flag:
            formRef.getFieldValue('createType') === 2 && formRef.getFieldValue('ruleType') !== 4, //显示的条件
        };
      },
      children: [
        {
          itemProps: { name: 'autoDateType' },
          type: ItemTypes.SELECT,
          typeProps: {
            style: { width: 120 },
            options: [
              { label: '上周期', value: 1 },
              { label: '本期', value: 2 },
              { label: '下周期', value: 3 },
            ],
          },
        },
        {
          itemProps: {
            name: 'autoMoonNum',
          },
          show: () => {
            return {
              dependencies: ['autoRate'], //依赖项
              flag: formRef.getFieldValue('autoRate') !== 1, //显示的条件
            };
          },
          type: ItemTypes.SELECT,
          typeProps: {
            style: { width: 120 },
            options: getDataText(12, 'month'),
          },
        },
        {
          itemProps: { name: 'autoDateNum', style: { display: 'inline-block', width: 10 } },
          type: ItemTypes.SELECT,
          typeProps: {
            style: { width: 120 },
            options: getDataText(28, 'day'),
          },
        },
      ],
      typeProps: {
        style: { width: 100 },
      },
    },
    {
      itemProps: { label: '是否征税' },
      rowNum: 1,
      type: ItemTypes.MOREITEM,
      show: () => {
        return {
          dependencies: ['taxRateType'], //依赖项
          flag: true, //显示的条件
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
          typeProps: {
            style: { width: 200 },
            suffix: '%',
          },
        },
      ],
    },
    {
      itemProps: { name: 'type11', label: '支付规则', rules: [{ required: true }] },
      type: ItemTypes.SELECT,
      // show: () => {
      //     return {
      //         dependencies: ['ruleType'], //依赖项
      //         flag: formRef.getFieldValue('ruleType') !== 4 //显示的条件
      //     }
      // },
      show: false, //暂时先不做
      typeProps: {
        style: { width: 400 },
        options: [
          { value: 'hangzhou', label: '规则1' },
          { value: 'hangzhou1', label: '规则2' },
        ],
      },
    },
    {
      itemProps: { name: 'memo', label: '备注' },
      type: ItemTypes.TEXTAREA,
      typeProps: {
        style: { width: 400 },
      },
    },
    {
      itemProps: {},
      type: ItemTypes.BUTTON,
      typeProps: {
        style: { width: 400 },
      },
    },
  ];
  return {
    col: 1,
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
