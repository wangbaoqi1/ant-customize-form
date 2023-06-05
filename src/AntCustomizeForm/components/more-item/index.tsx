import { Space } from 'antd';
import { has, isFunction } from 'lodash';
import { useEffect, useState } from 'react';
import { ItemTypes } from '../../constant';
import styles from '../../index.less';
import type { FormItemType, MoreProps } from "../../interface";
import ChildItem from "../child-item";

const MoreItem: React.FC<MoreProps> = (props) => {
    const [current, setCurrent] = useState<any>(props?.value || {})
    const newArr = (props.item || []).map((item: FormItemType) => {
        const newValue = item?.itemProps?.name && props?.value && has(props?.value, item?.itemProps?.name) && props?.value?.[item?.itemProps?.name as any] || current[item?.itemProps?.name as any]

        const onChange = (val: any) => {
            let value = val
            if ([ItemTypes.INPUT, ItemTypes.RADIO].includes(item.type)) {
                value = val.target.value
            }
            const newCurrent = {
                ...current, [item?.itemProps?.name as any]: value
            }
            setCurrent(newCurrent)
            if (isFunction(item?.typeProps?.onChange)) {
                item?.typeProps.onChange(val)
            }
            if (isFunction(props?.onChange)) {
                props?.onChange(newCurrent)
            }
        }

        const newItem = {
            ...item,
            typeProps: {
                ...item?.typeProps,
                value: newValue,
                onChange,
            }
        }
        if (isFunction(item?.show)) {
            return { ...newItem, show: item?.show()?.flag, showFun: item?.show() }
        }
        return newItem
    }).filter(j => j.show)

    useEffect(() => {
        const lastCurrent: Record<string, string> = {}
        props.item.map(i => i?.itemProps?.name).forEach(a => { lastCurrent[a] = current[a] })
        if (isFunction(props?.onChange)) {
            props?.onChange(lastCurrent)
        }
    }, [JSON.stringify(props.item)])

    return <Space className={styles.ChildrenStyles}>{(newArr || []).map((i, index: number) => {
        return <ChildItem item={i} key={index + 101} />
    })}</Space>
}
export default MoreItem 