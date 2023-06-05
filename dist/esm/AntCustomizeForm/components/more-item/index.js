function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Space } from 'antd';
import { has, isFunction } from 'lodash';
import { useEffect, useState } from 'react';
import { ItemTypes } from "../../constant";
import styles from "../../index.less";
import ChildItem from "../child-item";
import { jsx as _jsx } from "react/jsx-runtime";

var MoreItem = function MoreItem(props) {
  var _useState = useState((props === null || props === void 0 ? void 0 : props.value) || {}),
      _useState2 = _slicedToArray(_useState, 2),
      current = _useState2[0],
      setCurrent = _useState2[1];

  var newArr = (props.item || []).map(function (item) {
    var _item$itemProps, _item$itemProps2, _props$value, _item$itemProps3, _item$itemProps4;

    var newValue = (item === null || item === void 0 ? void 0 : (_item$itemProps = item.itemProps) === null || _item$itemProps === void 0 ? void 0 : _item$itemProps.name) && (props === null || props === void 0 ? void 0 : props.value) && has(props === null || props === void 0 ? void 0 : props.value, item === null || item === void 0 ? void 0 : (_item$itemProps2 = item.itemProps) === null || _item$itemProps2 === void 0 ? void 0 : _item$itemProps2.name) && (props === null || props === void 0 ? void 0 : (_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value[item === null || item === void 0 ? void 0 : (_item$itemProps3 = item.itemProps) === null || _item$itemProps3 === void 0 ? void 0 : _item$itemProps3.name]) || current[item === null || item === void 0 ? void 0 : (_item$itemProps4 = item.itemProps) === null || _item$itemProps4 === void 0 ? void 0 : _item$itemProps4.name];

    var onChange = function onChange(val) {
      var _item$itemProps5, _item$typeProps;

      var value = val;

      if ([ItemTypes.INPUT, ItemTypes.RADIO].includes(item.type)) {
        value = val.target.value;
      }

      var newCurrent = _objectSpread(_objectSpread({}, current), {}, _defineProperty({}, item === null || item === void 0 ? void 0 : (_item$itemProps5 = item.itemProps) === null || _item$itemProps5 === void 0 ? void 0 : _item$itemProps5.name, value));

      setCurrent(newCurrent);

      if (isFunction(item === null || item === void 0 ? void 0 : (_item$typeProps = item.typeProps) === null || _item$typeProps === void 0 ? void 0 : _item$typeProps.onChange)) {
        item === null || item === void 0 ? void 0 : item.typeProps.onChange(val);
      }

      if (isFunction(props === null || props === void 0 ? void 0 : props.onChange)) {
        props === null || props === void 0 ? void 0 : props.onChange(newCurrent);
      }
    };

    var newItem = _objectSpread(_objectSpread({}, item), {}, {
      typeProps: _objectSpread(_objectSpread({}, item === null || item === void 0 ? void 0 : item.typeProps), {}, {
        value: newValue,
        onChange: onChange
      })
    });

    if (isFunction(item === null || item === void 0 ? void 0 : item.show)) {
      var _item$show;

      return _objectSpread(_objectSpread({}, newItem), {}, {
        show: item === null || item === void 0 ? void 0 : (_item$show = item.show()) === null || _item$show === void 0 ? void 0 : _item$show.flag,
        showFun: item === null || item === void 0 ? void 0 : item.show()
      });
    }

    return newItem;
  }).filter(function (j) {
    return j.show;
  });
  useEffect(function () {
    var lastCurrent = {};
    props.item.map(function (i) {
      var _i$itemProps;

      return i === null || i === void 0 ? void 0 : (_i$itemProps = i.itemProps) === null || _i$itemProps === void 0 ? void 0 : _i$itemProps.name;
    }).forEach(function (a) {
      lastCurrent[a] = current[a];
    });

    if (isFunction(props === null || props === void 0 ? void 0 : props.onChange)) {
      props === null || props === void 0 ? void 0 : props.onChange(lastCurrent);
    }
  }, [JSON.stringify(props.item)]);
  return /*#__PURE__*/_jsx(Space, {
    className: styles.ChildrenStyles,
    children: (newArr || []).map(function (i, index) {
      return /*#__PURE__*/_jsx(ChildItem, {
        item: i
      }, index + 101);
    })
  });
};

export default MoreItem;