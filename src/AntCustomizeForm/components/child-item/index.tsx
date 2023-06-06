import { PlusOutlined } from "@ant-design/icons"
import { Button, Cascader, Checkbox, DatePicker, Input, InputNumber, Radio, Select, Space, TreeSelect, Typography, Upload } from "antd"
import { isFunction } from "lodash"
import React from "react"
import { useContext } from "react"
import { ItemTypes } from "../../constant"
import styles from '../../index.less'
import type { FormItemType } from "../../interface"
import MoreItem from "../more-item"
import WFC from "../WFC"

const ChildItem = (props: { item: FormItemType, onChange: any }) => {
    const context = useContext(WFC) as any
    const { type, typeProps, itemProps } = props.item

    const item = props.item
    const { customize } = context
    const childrenProps = { ...props, ...context }
    const childProps = {
        ...props,
        ...typeProps,
        onChange: (val: any) => {
            if (isFunction(typeProps?.onChange)) {
                typeProps.onChange(val)
            }
            if (isFunction(props?.onChange)) {
                props.onChange(val)
            }
        }
    }

    switch (type) {
        case ItemTypes.TITLE:
            return <Typography.Title{...childProps}>{item.children}</Typography.Title>
        case ItemTypes.INPUT:
            return <Space className={styles.InputStyles}>
                <span>{typeProps?.firstText}</span>
                <Input placeholder='请输入'  {...childProps} /><span>{typeProps?.lastText}
                </span>
            </Space>
        case ItemTypes.INPUTNUMBER:
            return <Space className={styles.InputStyles}><span>{typeProps?.firstText}</span><InputNumber placeholder='请输入'   {...childProps} /><span>{typeProps?.lastText}</span></Space>

        case ItemTypes.SELECT:
            return <Select placeholder='请输入'   {...childProps} />
        case ItemTypes.RADIO:
            return < Radio.Group    {...childProps} />
        case ItemTypes.TEXTAREA:
            return <Input.TextArea placeholder='请输入'  {...childProps} />
        case ItemTypes.UPLOAD:
            if (item.children) {
                return <Upload   {...childProps} > {item.children} </Upload>
            }
            return <Upload   {...childProps} >    <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
            </div></Upload>
        case ItemTypes.TREESELECT:
            return <TreeSelect   {...childProps} />
        case ItemTypes.DRAGGER:
            return <Upload.Dragger   {...childProps} />
        case ItemTypes.CASCADER:
            return <Cascader   {...childProps} />
        case ItemTypes.CHECKBOX:
            return <Checkbox.Group    {...childProps} />
        case ItemTypes.DATEPICKER:
            return <DatePicker   {...childProps} />
        case ItemTypes.RANGEPICKER:
            return < DatePicker.RangePicker   {...childProps} />
        case ItemTypes.BUTTON:
            return <Space className={styles.btnStyles}>
                <Button type="primary" htmlType="submit">
                    查询
                </Button>
                <Button htmlType="button" onClick={() => { context?.formProps?.form?.resetFields() }}>
                    重置
                </Button>

                {item.children && <Button  {...childProps} >
                    {item.children}
                </Button>}
            </Space>
        case ItemTypes.CUSTOMIZE:
            return <WFC.Provider value={childrenProps as any}> {itemProps?.name && customize?.[itemProps?.name as any] || '未配置自定义组件'}</WFC.Provider>    //自定义组件获取formitem的值
    }
}

export default ChildItem