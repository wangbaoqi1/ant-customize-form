function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Button, Cascader, Checkbox, DatePicker, Input, InputNumber, Radio, Select, Space, TreeSelect, Typography, Upload } from "antd";
import { isFunction } from "lodash";
import { useContext } from "react";
import { ItemTypes } from "../../constant";
import styles from "../../index.less";
import MoreItem from "../more-item";
import WFC from "../WFC";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

var ChildItem = function ChildItem(props) {
  var context = useContext(WFC);
  var _props$item = props.item,
      type = _props$item.type,
      typeProps = _props$item.typeProps,
      itemProps = _props$item.itemProps;
  var item = props.item;
  var customize = context.customize;

  var childrenProps = _objectSpread(_objectSpread({}, props), context);

  var childProps = _objectSpread(_objectSpread(_objectSpread({}, props), typeProps), {}, {
    onChange: function onChange(val) {
      if (isFunction(typeProps === null || typeProps === void 0 ? void 0 : typeProps.onChange)) {
        typeProps.onChange(val);
      }

      if (isFunction(props === null || props === void 0 ? void 0 : props.onChange)) {
        props.onChange(val);
      }
    }
  });

  switch (type) {
    case ItemTypes.TITLE:
      if (typeof item.children !== 'string') {
        return /*#__PURE__*/_jsxs(WFC.Provider, {
          value: childrenProps,
          children: [" ", item.children]
        });
      }

      return /*#__PURE__*/_jsx(Typography.Title, _objectSpread(_objectSpread({}, childProps), {}, {
        children: item.children
      }));

    case ItemTypes.INPUT:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(Input, _objectSpread(_objectSpread({}, childProps), {}, {
          placeholder: "\u8BF7\u8F93\u5165"
        })), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.INPUTNUMBER:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(InputNumber, _objectSpread(_objectSpread({}, childProps), {}, {
          placeholder: "\u8BF7\u8F93\u5165"
        })), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.SELECT:
      if (item.children) {
        return /*#__PURE__*/_jsx(Select, _objectSpread(_objectSpread({}, childProps), {}, {
          placeholder: "\u8BF7\u8F93\u5165",
          children: " item.children "
        })); //自定义select选择
      }

      return /*#__PURE__*/_jsx(Select, _objectSpread(_objectSpread({}, childProps), {}, {
        placeholder: "\u8BF7\u8F93\u5165"
      }));

    case ItemTypes.RADIO:
      if (item.children) {
        return /*#__PURE__*/_jsxs(Radio.Group, _objectSpread(_objectSpread({}, childProps), {}, {
          children: [" ", item.children]
        }));
      }

      return /*#__PURE__*/_jsx(Radio.Group, _objectSpread({}, childProps));

    case ItemTypes.TEXTAREA:
      return /*#__PURE__*/_jsx(Input.TextArea, _objectSpread(_objectSpread({}, childProps), {}, {
        placeholder: "\u8BF7\u8F93\u5165"
      }));

    case ItemTypes.UPLOAD:
      if (item.children) {
        return /*#__PURE__*/_jsxs(Upload, _objectSpread(_objectSpread({}, childProps), {}, {
          children: [" ", item.children, " "]
        }));
      }

      return /*#__PURE__*/_jsx(Upload, _objectSpread({}, childProps));

    case ItemTypes.TREESELECT:
      if (item.children) {
        return /*#__PURE__*/_jsxs(TreeSelect, _objectSpread(_objectSpread({}, childProps), {}, {
          children: [" ", item.children, " "]
        }));
      }

      return /*#__PURE__*/_jsx(TreeSelect, _objectSpread({}, childProps));

    case ItemTypes.DRAGGER:
      if (item.children) {
        return /*#__PURE__*/_jsx(Upload.Dragger, _objectSpread(_objectSpread({}, childProps), {}, {
          children: item.children
        }));
      }

      return /*#__PURE__*/_jsx(Upload.Dragger, _objectSpread({}, childProps));

    case ItemTypes.CASCADER:
      return /*#__PURE__*/_jsx(Cascader, _objectSpread({}, childProps));

    case ItemTypes.CHECKBOX:
      return /*#__PURE__*/_jsx(Checkbox.Group, _objectSpread({}, childProps));

    case ItemTypes.DATEPICKER:
      return /*#__PURE__*/_jsx(DatePicker, _objectSpread({}, childProps));

    case ItemTypes.RANGEPICKER:
      return /*#__PURE__*/_jsx(DatePicker.RangePicker, _objectSpread({}, childProps));

    case ItemTypes.BUTTON:
      if (item.children) {
        return /*#__PURE__*/_jsxs(WFC.Provider, {
          value: childrenProps,
          children: [" ", item.children]
        });
      }

      return /*#__PURE__*/_jsxs(Space, {
        className: styles.btnStyles,
        children: [/*#__PURE__*/_jsx(Button, {
          type: "primary",
          htmlType: "submit",
          children: "\u67E5\u8BE2"
        }), /*#__PURE__*/_jsx(Button, {
          htmlType: "button",
          onClick: function onClick() {
            var _context$formProps, _context$formProps$fo;

            context === null || context === void 0 ? void 0 : (_context$formProps = context.formProps) === null || _context$formProps === void 0 ? void 0 : (_context$formProps$fo = _context$formProps.form) === null || _context$formProps$fo === void 0 ? void 0 : _context$formProps$fo.resetFields();
          },
          children: "\u91CD\u7F6E"
        })]
      });

    case ItemTypes.MOREITEM:
      return /*#__PURE__*/_jsx(MoreItem, _objectSpread(_objectSpread({}, childProps), {}, {
        item: item.children
      }));
    //一个表单多个输入框的情况

    case ItemTypes.CUSTOMIZE:
      return /*#__PURE__*/_jsxs(WFC.Provider, {
        value: childrenProps,
        children: [" ", (itemProps === null || itemProps === void 0 ? void 0 : itemProps.name) && (customize === null || customize === void 0 ? void 0 : customize[itemProps === null || itemProps === void 0 ? void 0 : itemProps.name]) || '未配置自定义组件']
      });
    //自定义组件获取formitem的值
  }
};

export default ChildItem;