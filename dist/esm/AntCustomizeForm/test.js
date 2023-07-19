function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { CustomizeForm, ItemTypes } from 'ant-customize-form';
import { Form } from 'antd';
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default (function () {
  var _Form$useForm = Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      formRef = _Form$useForm2[0]; // 相当于Form的props


  var formBaseConfig = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 16
    },
    form: formRef,
    initialValues: {}
  }; // 可以在onChange里面设置其他表单的值

  var formItemConfig = [{
    itemProps: {
      name: '1',
      label: '表单1',
      rules: [{
        required: true
      }]
    },
    type: ItemTypes.INPUT
  }, {
    itemProps: {
      name: '2',
      label: '表单2',
      rules: [{
        required: true
      }]
    },
    type: ItemTypes.INPUT
  }, {
    itemProps: {
      name: '3',
      label: '表单3',
      rules: [{
        required: true
      }]
    },
    type: ItemTypes.INPUT
  }, {
    itemProps: {
      name: '4',
      label: '表单4',
      rules: [{
        required: true
      }]
    },
    type: ItemTypes.INPUT
  }, {
    itemProps: {
      name: '5',
      label: '表单5',
      rules: [{
        required: true
      }]
    },
    type: ItemTypes.RADIO,
    typeProps: {
      options: [{
        label: '项目一',
        value: 1
      }, {
        label: '项目二',
        value: 2
      }]
    }
  }, {
    itemProps: {},
    type: ItemTypes.BUTTON
  }];
  var formConfig = {
    col: 1,
    //一行几列，支持多列的情况
    formProps: formBaseConfig,
    formItemOption: formItemConfig
  };
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsx(CustomizeForm, _objectSpread({}, formConfig))
  });
});