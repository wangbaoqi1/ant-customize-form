import { InboxOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Cascader, Checkbox, DatePicker, Input, InputNumber, Radio, Select, Space, TimePicker, TreeSelect, Typography, Upload } from "antd"
import { isFunction } from "lodash"
import React, { useContext } from "react"
import { ItemTypes } from "../../constant"
import styles from '../../index.less'
import type { FormItemType } from "../../interface"
import WFC from "../WFC"

const ChildItem = (props: { item: FormItemType, onChange: any }) => {
    const context = useContext(WFC) as any
    const { type, typeProps, itemProps } = props.item

    const item = props.item
    const { customize, renderOptions } = context
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
            return <Typography.Title style={typeProps?.style} {...childProps}>{item.children}</Typography.Title>
        case ItemTypes.INPUT:
            return <Space className={styles.InputStyles}>
                <span>{typeProps?.firstText}</span>
                <Input placeholder='请输入'  {...childProps} /><span>{typeProps?.lastText}
                </span>
            </Space>
        case ItemTypes.INPUTNUMBER:
            return <Space className={styles.InputStyles}><span>{typeProps?.firstText}</span><InputNumber placeholder='请输入'   {...childProps} /><span>{typeProps?.lastText}</span></Space>

        case ItemTypes.SELECT:
            return <Space className={styles.InputStyles}><span>{typeProps?.firstText}</span><Select placeholder='请输入'   {...childProps} /><span>{typeProps?.lastText}</span></Space>
        case ItemTypes.RADIO:
            return <Space className={styles.InputStyles}><span>{typeProps?.firstText}</span><Radio.Group placeholder='请输入'   {...childProps} /><span>{typeProps?.lastText}</span></Space>
        case ItemTypes.TEXTAREA:
            return <Space className={styles.InputStyles}><span>{typeProps?.firstText}</span><Input.TextArea placeholder='请输入'   {...childProps} /><span>{typeProps?.lastText}</span></Space>
        case ItemTypes.UPLOAD:
            if (item.children) {
                return <Upload   {...childProps} > {item.children} </Upload>
            }
            return <Upload   {...childProps} >    <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
            </div></Upload>
        case ItemTypes.TREESELECT:
            return <Space className={styles.InputStyles}><span>{typeProps?.firstText}</span><TreeSelect placeholder='请输入'   {...childProps} /><span>{typeProps?.lastText}</span></Space>
        case ItemTypes.DRAGGER:
            if (item.children) {
                return <Upload.Dragger   {...childProps} > {item.children} </Upload.Dragger>
            }
            return <Upload.Dragger {...childProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className={styles.firstStyles}>点击上传或拖拽文件</p>
            </Upload.Dragger>
        case ItemTypes.CASCADER:
            return <Space className={styles.InputStyles}><span>{typeProps?.firstText}</span><Cascader placeholder='请输入'   {...childProps} /><span>{typeProps?.lastText}</span></Space>
        case ItemTypes.CHECKBOX:
            return <Space className={styles.InputStyles}><span>{typeProps?.firstText}</span><Checkbox.Group placeholder='请输入'   {...childProps} /><span>{typeProps?.lastText}</span></Space>
        case ItemTypes.DATEPICKER:
            return <Space className={styles.InputStyles}>
                <span>{typeProps?.firstText}</span>
                <DatePicker   {...childProps} /><span>{typeProps?.lastText}
                </span>
            </Space>
        case ItemTypes.TIMEPICKER:
            return <Space className={styles.InputStyles}>
                <span>{typeProps?.firstText}</span>
                <TimePicker   {...childProps} /><span>{typeProps?.lastText}
                </span>
            </Space>
        case ItemTypes.RANGEPICKER:
            return <Space className={styles.InputStyles}>
                <span>{typeProps?.firstText}</span>
                <DatePicker.RangePicker  {...childProps} /><span>{typeProps?.lastText}
                </span>
            </Space>

        case ItemTypes.BUTTON:
            return <Space style={typeProps?.style} className={typeProps?.style ? '' : styles.btnStyles}>
                <Button type="primary" htmlType="submit">
                    {typeProps?.btnText || '查询'}
                </Button>
                <Button htmlType="submit" onClick={() => {
                    context?.formProps?.form?.resetFields()
                    renderOptions()
                }}>
                    重置
                </Button>

                {typeProps?.linkBtnText && <Button type="link"  {...typeProps}>
                    {typeProps.linkBtnText}
                </Button>}
            </Space>
        case ItemTypes.CUSTOMIZE:
            return <WFC.Provider value={childrenProps as any}> {itemProps?.name && customize?.[itemProps?.name as any] || '未配置自定义组件'}</WFC.Provider>    //自定义组件获取formitem的值
    }
}

export default ChildItem