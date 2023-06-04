import { Col, Form, Row, Space } from "antd";
import { cloneDeep, isFunction, isNumber, isObject } from "lodash";
import React from "react";
import { useEffect, useState } from "react";
import ChildItem from "./components/child-item";
import WFC from "./components/WFC";
import { ItemTypes } from "./constant";
import type { FormType } from "./interface";

const CustomizeForm = (props: FormType) => {
    const { formProps, formItemOption, col = 1, customize, formList, space } = props
    const getFormItemOption = (arr: any[]) => {
        return cloneDeep(arr).map(i => {
            //针对moreItem类型的情况单独处理
            if (i.type === ItemTypes.MOREITEM) {
                const children = i.children.map((j: any) => {
                    if (isFunction(j?.show)) {
                        return { ...j, show: j?.show()?.flag, showFun: j?.show() }
                    }
                    return { ...j, show: true }
                })
                if (isFunction(i?.show)) {
                    return { ...i, show: i?.show()?.flag, showFun: i?.show(), children }
                }
                return { ...i, show: true, children }
            }
            if (isFunction(i?.show)) {
                return { ...i, show: i?.show()?.flag, showFun: i?.show(), }
            }
            return { ...i, show: true }
        })
    }

    const [itemOptions, setItemOptions] = useState(getFormItemOption(formItemOption))

    const onValuesChange = (val: any, value: unknown) => {
        //获取隐藏的key值
        const filterKeys: string[] = []
        formItemOption.filter(i => (isFunction(i?.show) && Array.isArray(i?.show()?.dependencies) && i?.show()?.dependencies.length > 0))
            .forEach(j => {
                filterKeys.push(...(j.show().dependencies))
                if (j.type === ItemTypes.MOREITEM) {
                    j.children.map(item => {
                        if (isFunction(item?.show) && Array.isArray(item?.show()?.dependencies) && item?.show()?.dependencies.length > 0) {
                            filterKeys.push(...(item.show().dependencies))
                        }
                    })
                }
            })
        // moreItem情况的处理
        formItemOption.filter(item => item?.itemProps?.name === Object.keys(val)[0]).forEach(item => {
            if (item.type === ItemTypes.MOREITEM) {
                (item?.children || []).map(item => {
                    if (filterKeys.includes(item?.itemProps?.name)) {
                        setItemOptions(getFormItemOption(formItemOption))
                    }
                })
            }
        })

        if (filterKeys.includes(Object.keys(val)[0])) {
            setItemOptions(getFormItemOption(formItemOption))
        }

        if (isFunction(formProps?.onValuesChange)) {
            formProps?.onValuesChange(val, value)
        }
    }

    // 根据列数修改数据 自定义组件是否需要单独一行rowNum
    const groupArr = (array: any[], subGroupLength: number) => {
        let index = 0;
        const newArray = [];
        // 单独一行的item
        const newArr = array.filter(d => d?.show).map(a => {
            if (a.type === ItemTypes.MOREITEM) {
                const children = a.children.filter(d => d?.show)
                return { ...a, children }
            }
            return a
        }) //过滤掉隐藏的数据包括moreItem子选项隐藏的数据
        let singleRowIndexArr: Record<number, number> = {}
        newArr.forEach((item, i) => {
            if (item?.rowNum) {
                singleRowIndexArr[i] = item?.rowNum
            }
        })
        while (index < newArr.length) {
            if (Object.keys(singleRowIndexArr).includes(String(index))) {
                newArray.push(newArr.slice(index, index + singleRowIndexArr?.[index]))
                index += singleRowIndexArr?.[index]

            } else {
                newArray.push(newArr.slice(index, index += subGroupLength));
            }

        }
        return newArray;
    }

    const renderFormItem = (optArr: any[] = [],) => {
        return optArr.map((item: any, index) => {
            if (Array.isArray(item)) {
                if (isNumber(space)) {
                    return <Space key={index + 10}>{
                        item.map(i => {
                            if (i.type === ItemTypes.LIST) {
                                return formList?.[i?.itemProps?.name]
                            }
                            return <Form.Item rules={[{ required: false }]} {...i.itemProps}>
                                <ChildItem item={i} />
                            </Form.Item>
                        }
                        )}</Space>
                }
                return <Row key={index + 10}>{
                    item.map(i => {
                        const newCol = i?.col && i?.col || (24 / col)
                        if (i.type === ItemTypes.LIST) {
                            return <Col span={newCol} key={i.itemProps.name}>{formList?.[i?.itemProps?.name]
                            }</Col>
                        }
                        return <Col span={newCol} key={i.itemProps.name}>
                            <Form.Item rules={[{ required: false }]} {...i.itemProps}>
                                <ChildItem item={i} />
                            </Form.Item>
                        </Col>
                    }
                    )}</Row>
            }
            if (isNumber(space)) {
                return <Form.Item rules={[{ required: false }]} {...item.itemProps}  >
                    {item.type === ItemTypes.LIST && formList?.[item?.itemProps?.name] || <ChildItem item={item} />}
                </Form.Item>
            }
            const newCol = item?.col && item?.col || (24 / col)
            return <Row key={index + 20}><Col span={newCol} >
                <Form.Item rules={[{ required: false }]} {...item.itemProps}  >
                    {item.type === ItemTypes.LIST && formList?.[item?.itemProps?.name] || <ChildItem item={item} />}
                </Form.Item>
            </Col></Row>
        })
    }
    useEffect(() => {
        setItemOptions(getFormItemOption(formItemOption))
    }, [JSON.stringify(formItemOption)])

    const newFormProps = {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
        ...formProps,
        onValuesChange
    }

    return <WFC.Provider value={{
        formProps: newFormProps, itemOptions, col, customize
    } as any} >
        <Form  {...newFormProps} >
            {space && renderFormItem(groupArr(itemOptions, space)) || renderFormItem(groupArr(itemOptions, col))}
        </Form >
    </WFC.Provider>

};
export { WFC, CustomizeForm, ItemTypes };

