function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Cascader, Checkbox, DatePicker, Input, InputNumber, Radio, Select, Space, TimePicker, TreeSelect, Typography, Upload } from "antd";
import { isFunction } from "lodash";
import React, { useContext } from "react";
import { ItemTypes } from "../../constant";
import styles from "../../index.less";
import WFC from "../WFC";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var ChildItem = function ChildItem(props) {
  var context = useContext(WFC);
  var _props$item = props.item,
      type = _props$item.type,
      typeProps = _props$item.typeProps,
      itemProps = _props$item.itemProps;
  var item = props.item;
  var customize = context.customize,
      renderOptions = context.renderOptions;

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
      return /*#__PURE__*/_jsx(Typography.Title, _objectSpread(_objectSpread({}, childProps), {}, {
        children: item.children
      }));

    case ItemTypes.INPUT:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(Input, _objectSpread({
          placeholder: "\u8BF7\u8F93\u5165"
        }, childProps)), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.INPUTNUMBER:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(InputNumber, _objectSpread({
          placeholder: "\u8BF7\u8F93\u5165"
        }, childProps)), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.SELECT:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(Select, _objectSpread({
          placeholder: "\u8BF7\u8F93\u5165"
        }, childProps)), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.RADIO:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(Radio.Group, _objectSpread({
          placeholder: "\u8BF7\u8F93\u5165"
        }, childProps)), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.TEXTAREA:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(Input.TextArea, _objectSpread({
          placeholder: "\u8BF7\u8F93\u5165"
        }, childProps)), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.UPLOAD:
      if (item.children) {
        return /*#__PURE__*/_jsxs(Upload, _objectSpread(_objectSpread({}, childProps), {}, {
          children: [" ", item.children, " "]
        }));
      }

      return /*#__PURE__*/_jsxs(Upload, _objectSpread(_objectSpread({}, childProps), {}, {
        children: ["    ", /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(PlusOutlined, {}), /*#__PURE__*/_jsx("div", {
            style: {
              marginTop: 8
            },
            children: "\u4E0A\u4F20"
          })]
        })]
      }));

    case ItemTypes.TREESELECT:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(TreeSelect, _objectSpread({
          placeholder: "\u8BF7\u8F93\u5165"
        }, childProps)), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.DRAGGER:
      if (item.children) {
        return /*#__PURE__*/_jsxs(Upload.Dragger, _objectSpread(_objectSpread({}, childProps), {}, {
          children: [" ", item.children, " "]
        }));
      }

      return /*#__PURE__*/_jsxs(Upload.Dragger, _objectSpread(_objectSpread({}, childProps), {}, {
        children: [/*#__PURE__*/_jsx("p", {
          className: "ant-upload-drag-icon",
          children: /*#__PURE__*/_jsx(InboxOutlined, {})
        }), /*#__PURE__*/_jsx("p", {
          className: styles.firstStyles,
          children: "\u70B9\u51FB\u4E0A\u4F20\u6216\u62D6\u62FD\u6587\u4EF6"
        })]
      }));

    case ItemTypes.CASCADER:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(Cascader, _objectSpread({
          placeholder: "\u8BF7\u8F93\u5165"
        }, childProps)), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.CHECKBOX:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(Checkbox.Group, _objectSpread({
          placeholder: "\u8BF7\u8F93\u5165"
        }, childProps)), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.DATEPICKER:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(DatePicker, _objectSpread({
          placeholder: "\u8BF7\u8F93\u5165"
        }, childProps)), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.TIMEPICKER:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(TimePicker, _objectSpread({
          placeholder: "\u8BF7\u8F93\u5165"
        }, childProps)), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.RANGEPICKER:
      return /*#__PURE__*/_jsxs(Space, {
        className: styles.InputStyles,
        children: [/*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.firstText
        }), /*#__PURE__*/_jsx(DatePicker.RangePicker, _objectSpread({
          placeholder: "\u8BF7\u8F93\u5165"
        }, childProps)), /*#__PURE__*/_jsx("span", {
          children: typeProps === null || typeProps === void 0 ? void 0 : typeProps.lastText
        })]
      });

    case ItemTypes.BUTTON:
      return /*#__PURE__*/_jsxs(Space, {
        className: typeProps === null || typeProps === void 0 ? void 0 : typeProps.style,
        children: [/*#__PURE__*/_jsx(Button, {
          type: "primary",
          htmlType: "submit",
          children: (typeProps === null || typeProps === void 0 ? void 0 : typeProps.btnText) || '查询'
        }), /*#__PURE__*/_jsx(Button, {
          htmlType: "button",
          onClick: function onClick() {
            var _context$formProps, _context$formProps$fo;

            context === null || context === void 0 ? void 0 : (_context$formProps = context.formProps) === null || _context$formProps === void 0 ? void 0 : (_context$formProps$fo = _context$formProps.form) === null || _context$formProps$fo === void 0 ? void 0 : _context$formProps$fo.resetFields();
            renderOptions();
          },
          children: "\u91CD\u7F6E"
        }), item.children && /*#__PURE__*/_jsx(Button, {
          type: "link",
          children: item.children
        })]
      });

    case ItemTypes.CUSTOMIZE:
      return /*#__PURE__*/_jsxs(WFC.Provider, {
        value: childrenProps,
        children: [" ", (itemProps === null || itemProps === void 0 ? void 0 : itemProps.name) && (customize === null || customize === void 0 ? void 0 : customize[itemProps === null || itemProps === void 0 ? void 0 : itemProps.name]) || '未配置自定义组件']
      });
    //自定义组件获取formitem的值
  }
};

export default ChildItem;