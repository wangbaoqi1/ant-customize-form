import { Button, Cascader, Checkbox, DatePicker, Input, InputNumber, Radio, Select, Space, TreeSelect, Typography, Upload } from "antd"
import { isFunction } from "lodash"
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
            if (typeof (item.children) !== 'string') {
                return <WFC.Provider value={childrenProps as any}> {item.children}</WFC.Provider>
            }
            return <Typography.Title{...childProps}>{item.children}</Typography.Title>
        case ItemTypes.INPUT:
            return <Space className={styles.InputStyles}>
                <span>{typeProps?.firstText}</span>
                <Input   {...childProps} placeholder='请输入' /><span>{typeProps?.lastText}
                </span>
            </Space>
        case ItemTypes.INPUTNUMBER:
            return <Space className={styles.InputStyles}><span>{typeProps?.firstText}</span><InputNumber  {...childProps} placeholder='请输入' /><span>{typeProps?.lastText}</span></Space>

        case ItemTypes.SELECT:
            if (item.children) {
                return <Select   {...childProps} placeholder='请输入' > item.children </Select>  //自定义select选择
            }
            return <Select   {...childProps} placeholder='请输入' />
        case ItemTypes.RADIO:
            if (item.children) {
                return <Radio.Group   {...childProps}  > {item.children}</Radio.Group>
            }
            return < Radio.Group    {...childProps} />
        case ItemTypes.TEXTAREA:
            return <Input.TextArea   {...childProps} placeholder='请输入' />
        case ItemTypes.UPLOAD:
            if (item.children) {
                return <Upload   {...childProps} > {item.children} </Upload>
            }
            return <Upload   {...childProps} />
        case ItemTypes.TREESELECT:
            if (item.children) {
                return <TreeSelect   {...childProps} > {item.children} </TreeSelect>
            }
            return <TreeSelect   {...childProps} />
        case ItemTypes.DRAGGER:
            if (item.children) {
                return <Upload.Dragger   {...childProps} >
                    {item.children}
                </Upload.Dragger>
            }
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
            if (item.children) {
                return <WFC.Provider value={childrenProps as any}> {item.children}</WFC.Provider>
            }
            return <Space className={styles.btnStyles}>
                <Button type="primary" htmlType="submit">
                    查询
                </Button>
                <Button htmlType="button" onClick={() => { context?.formProps?.form?.resetFields() }}>
                    重置
                </Button>
            </Space>
        case ItemTypes.MOREITEM:
            return <MoreItem  {...childProps} item={item.children} />    //一个表单多个输入框的情况
        case ItemTypes.CUSTOMIZE:
            return <WFC.Provider value={childrenProps as any}> {itemProps?.name && customize?.[itemProps?.name as any] || '未配置自定义组件'}</WFC.Provider>    //自定义组件获取formitem的值
    }
}

export default ChildItem