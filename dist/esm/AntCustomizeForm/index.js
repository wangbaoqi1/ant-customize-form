function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Col, Form, Row, Space } from "antd";
import { cloneDeep, isBoolean, isFunction, isNumber } from "lodash";
import React from "react";
import { useEffect, useState } from "react";
import ChildItem from "./components/child-item";
import WFC from "./components/WFC";
import { ItemTypes } from "./constant";
import { jsx as _jsx } from "react/jsx-runtime";

var CustomizeForm = function CustomizeForm(props) {
  var formProps = props.formProps,
      formItemOption = props.formItemOption,
      _props$col = props.col,
      col = _props$col === void 0 ? 1 : _props$col,
      customize = props.customize,
      formList = props.formList,
      space = props.space;

  var getFormItemOption = function getFormItemOption(arr) {
    return cloneDeep(arr).map(function (i) {
      //针对moreItem类型的情况单独处理
      if (i.type === ItemTypes.MOREITEM) {
        var children = i.children.map(function (j) {
          if (isFunction(j === null || j === void 0 ? void 0 : j.show)) {
            var _j$show;

            return _objectSpread(_objectSpread({}, j), {}, {
              show: j === null || j === void 0 ? void 0 : (_j$show = j.show()) === null || _j$show === void 0 ? void 0 : _j$show.flag,
              showFun: j === null || j === void 0 ? void 0 : j.show()
            });
          }

          return _objectSpread(_objectSpread({}, j), {}, {
            show: isBoolean(i === null || i === void 0 ? void 0 : i.show) ? i === null || i === void 0 ? void 0 : i.show : true
          });
        });

        if (isFunction(i === null || i === void 0 ? void 0 : i.show)) {
          var _i$show;

          return _objectSpread(_objectSpread({}, i), {}, {
            show: i === null || i === void 0 ? void 0 : (_i$show = i.show()) === null || _i$show === void 0 ? void 0 : _i$show.flag,
            showFun: i === null || i === void 0 ? void 0 : i.show(),
            children: children
          });
        }

        return _objectSpread(_objectSpread({}, i), {}, {
          show: isBoolean(i === null || i === void 0 ? void 0 : i.show) ? i === null || i === void 0 ? void 0 : i.show : true,
          children: children
        });
      }

      if (isFunction(i === null || i === void 0 ? void 0 : i.show)) {
        var _i$show2;

        return _objectSpread(_objectSpread({}, i), {}, {
          show: i === null || i === void 0 ? void 0 : (_i$show2 = i.show()) === null || _i$show2 === void 0 ? void 0 : _i$show2.flag,
          showFun: i === null || i === void 0 ? void 0 : i.show()
        });
      }

      return _objectSpread(_objectSpread({}, i), {}, {
        show: isBoolean(i === null || i === void 0 ? void 0 : i.show) ? i === null || i === void 0 ? void 0 : i.show : true
      });
    });
  };

  var _useState = useState(getFormItemOption(formItemOption)),
      _useState2 = _slicedToArray(_useState, 2),
      itemOptions = _useState2[0],
      setItemOptions = _useState2[1];

  var onValuesChange = function onValuesChange(val, value) {
    //获取隐藏的key值
    var filterKeys = [];
    formItemOption.filter(function (i) {
      var _i$show3, _i$show4;

      return isFunction(i === null || i === void 0 ? void 0 : i.show) && Array.isArray(i === null || i === void 0 ? void 0 : (_i$show3 = i.show()) === null || _i$show3 === void 0 ? void 0 : _i$show3.dependencies) && (i === null || i === void 0 ? void 0 : (_i$show4 = i.show()) === null || _i$show4 === void 0 ? void 0 : _i$show4.dependencies.length) > 0;
    }).forEach(function (j) {
      filterKeys.push.apply(filterKeys, _toConsumableArray(j.show().dependencies));

      if (j.type === ItemTypes.MOREITEM) {
        j.children.map(function (item) {
          var _item$show, _item$show2;

          if (isFunction(item === null || item === void 0 ? void 0 : item.show) && Array.isArray(item === null || item === void 0 ? void 0 : (_item$show = item.show()) === null || _item$show === void 0 ? void 0 : _item$show.dependencies) && (item === null || item === void 0 ? void 0 : (_item$show2 = item.show()) === null || _item$show2 === void 0 ? void 0 : _item$show2.dependencies.length) > 0) {
            filterKeys.push.apply(filterKeys, _toConsumableArray(item.show().dependencies));
          }
        });
      }
    }); // moreItem情况的处理

    formItemOption.filter(function (item) {
      var _item$itemProps;

      return (item === null || item === void 0 ? void 0 : (_item$itemProps = item.itemProps) === null || _item$itemProps === void 0 ? void 0 : _item$itemProps.name) === Object.keys(val)[0];
    }).forEach(function (item) {
      if (item.type === ItemTypes.MOREITEM) {
        ((item === null || item === void 0 ? void 0 : item.children) || []).map(function (item) {
          var _item$itemProps2;

          if (filterKeys.includes(item === null || item === void 0 ? void 0 : (_item$itemProps2 = item.itemProps) === null || _item$itemProps2 === void 0 ? void 0 : _item$itemProps2.name)) {
            setItemOptions(getFormItemOption(formItemOption));
          }
        });
      }
    });

    if (filterKeys.includes(Object.keys(val)[0])) {
      setItemOptions(getFormItemOption(formItemOption));
    }

    if (isFunction(formProps === null || formProps === void 0 ? void 0 : formProps.onValuesChange)) {
      formProps === null || formProps === void 0 ? void 0 : formProps.onValuesChange(val, value);
    }
  }; // 根据列数修改数据 自定义组件是否需要单独一行rowNum


  var groupArr = function groupArr(array, subGroupLength) {
    var index = 0;
    var newArray = [];
    var newArr = array.filter(function (d) {
      return d === null || d === void 0 ? void 0 : d.show;
    }).map(function (a) {
      if (a.type === ItemTypes.MOREITEM) {
        var children = a.children.filter(function (d) {
          return d === null || d === void 0 ? void 0 : d.show;
        });
        return _objectSpread(_objectSpread({}, a), {}, {
          children: children
        });
      }

      return a;
    }); //过滤掉隐藏的数据包括moreItem子选项隐藏的数据

    var singleRowIndexArr = {};
    newArr.forEach(function (item, i) {
      if (item !== null && item !== void 0 && item.rowNum) {
        singleRowIndexArr[i] = item === null || item === void 0 ? void 0 : item.rowNum;
      }
    });

    while (index < newArr.length) {
      if (Object.keys(singleRowIndexArr).includes(String(index))) {
        newArray.push(newArr.slice(index, index + (singleRowIndexArr === null || singleRowIndexArr === void 0 ? void 0 : singleRowIndexArr[index])));
        index += singleRowIndexArr === null || singleRowIndexArr === void 0 ? void 0 : singleRowIndexArr[index];
      } else {
        newArray.push(newArr.slice(index, index += subGroupLength));
      }
    }

    return newArray;
  }; // 渲染表单


  var renderFormItem = function renderFormItem() {
    var optArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var getCol = function getCol(i) {
      return (i === null || i === void 0 ? void 0 : i.col) && (i === null || i === void 0 ? void 0 : i.col) || 24 / col;
    };

    var renderChildrenItem = function renderChildrenItem(a) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'col';

      if (a.type === ItemTypes.LIST) {
        var _a$itemProps;

        return formList === null || formList === void 0 ? void 0 : formList[a === null || a === void 0 ? void 0 : (_a$itemProps = a.itemProps) === null || _a$itemProps === void 0 ? void 0 : _a$itemProps.name];
      }

      if (Array.isArray(a === null || a === void 0 ? void 0 : a.children) && (a === null || a === void 0 ? void 0 : a.children.length) > 0) {
        if (type === 'col') {
          return /*#__PURE__*/_jsx(Col, {
            span: getCol(a),
            children: /*#__PURE__*/_jsx(Form.Item, _objectSpread(_objectSpread({
              rules: [{
                required: false
              }]
            }, a.itemProps), {}, {
              children: /*#__PURE__*/_jsx(Space, {
                children: a.children.map(function (i) {
                  return /*#__PURE__*/_jsx(Col, {
                    span: getCol(i),
                    children: /*#__PURE__*/_jsx(Form.Item, _objectSpread(_objectSpread({
                      rules: [{
                        required: false
                      }]
                    }, i.itemProps), {}, {
                      noStyle: true,
                      children: /*#__PURE__*/_jsx(ChildItem, {
                        item: i
                      })
                    }))
                  }, i.itemProps.name);
                })
              })
            }))
          }, a.itemProps.label);
        }

        return /*#__PURE__*/_jsx(Form.Item, _objectSpread(_objectSpread({
          rules: [{
            required: false
          }]
        }, a.itemProps), {}, {
          children: /*#__PURE__*/_jsx(Space, {
            children: a.children.map(function (i) {
              return /*#__PURE__*/_jsx(Form.Item, _objectSpread(_objectSpread({
                rules: [{
                  required: false
                }]
              }, i.itemProps), {}, {
                noStyle: true,
                children: /*#__PURE__*/_jsx(ChildItem, {
                  item: i
                })
              }), i.itemProps.name);
            })
          })
        }));
      }

      if (type === 'col') {
        if (a.type === ItemTypes.LIST) {
          var _a$itemProps2;

          return /*#__PURE__*/_jsx(Col, {
            span: getCol(a),
            children: formList === null || formList === void 0 ? void 0 : formList[a === null || a === void 0 ? void 0 : (_a$itemProps2 = a.itemProps) === null || _a$itemProps2 === void 0 ? void 0 : _a$itemProps2.name]
          }, a.itemProps.name);
        }

        return /*#__PURE__*/_jsx(Col, {
          span: getCol(a),
          children: /*#__PURE__*/_jsx(Form.Item, _objectSpread(_objectSpread({
            rules: [{
              required: false
            }]
          }, a.itemProps), {}, {
            children: /*#__PURE__*/_jsx(ChildItem, {
              item: a
            })
          }))
        }, a.itemProps.name);
      }

      return /*#__PURE__*/_jsx(Form.Item, _objectSpread(_objectSpread({
        rules: [{
          required: false
        }]
      }, a.itemProps), {}, {
        children: /*#__PURE__*/_jsx(ChildItem, {
          item: a
        })
      }));
    };

    return optArr.map(function (item, index) {
      if (Array.isArray(item)) {
        if (isNumber(space)) {
          return /*#__PURE__*/_jsx(Space, {
            children: item.map(function (i) {
              return renderChildrenItem(i, 'space');
            })
          }, index + 10);
        }

        return /*#__PURE__*/_jsx(Row, {
          children: item.map(function (i) {
            return renderChildrenItem(i, 'col');
          })
        }, index + 10);
      }

      if (isNumber(space)) {
        return renderChildrenItem(item, 'space');
      }

      return /*#__PURE__*/_jsx(Row, {
        children: renderChildrenItem(item, 'col')
      }, index + 20);
    });
  };

  useEffect(function () {
    setItemOptions(getFormItemOption(formItemOption));
  }, [JSON.stringify(formItemOption)]);

  var newFormProps = _objectSpread(_objectSpread({
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    }
  }, formProps), {}, {
    onValuesChange: onValuesChange
  });

  return /*#__PURE__*/_jsx(WFC.Provider, {
    value: {
      formProps: newFormProps,
      itemOptions: itemOptions,
      col: col,
      customize: customize
    },
    children: /*#__PURE__*/_jsx(Form, _objectSpread(_objectSpread({}, newFormProps), {}, {
      children: space && renderFormItem(groupArr(itemOptions, space)) || renderFormItem(groupArr(itemOptions, col))
    }))
  });
};

export { WFC, CustomizeForm, ItemTypes };