'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _custom_prop_types = require('./utils/custom_prop_types');

var _custom_prop_types2 = _interopRequireDefault(_custom_prop_types);

var _picker = require('./picker');

var _picker2 = _interopRequireDefault(_picker);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('moment-range');

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.handleClickFn = _this.handleClick.bind(_this);
    _this.onSelectFn = _this.onSelect.bind(_this);
    _this.onApplyFn = _this.onApply.bind(_this);
    _this.onCancelFn = _this.onCancel.bind(_this);

    var selectedDateRange = props.selectedDateRange,
        restrictionRange = props.restrictionRange,
        display = props.display;

    _this.state = { selectedDateRange: selectedDateRange, restrictionRange: restrictionRange, display: display };
    _this.selectedDateRange = selectedDateRange.clone();
    return _this;
  }

  _createClass(App, [{
    key: 'handleClickOutside',
    value: function handleClickOutside(evt) {
      this.onCancel();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.onRender) {
        this.props.onRender();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var localState = Object.assign({}, this.state, nextProps);
      this.setState(localState);
    }
  }, {
    key: 'onSelect',
    value: function onSelect(newDateRange) {
      // so that if the user clicks cancel it doesn't change.
      this.selectedDateRange = newDateRange.clone();

      if (this.props.onSelect) {
        this.props.onSelect(this.selectedDateRange);
      }
    }
  }, {
    key: 'onApply',
    value: function onApply() {
      if (this.props.onApply) {
        this.props.onApply(this.selectedDateRange);
      }

      // what ever was selected currently gets applied
      this.state.selectedDateRange = this.selectedDateRange;

      this.state.display = false;
      this.setState(this.state);
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      this.state.display = false;
      if (this.props.onCancel) {
        this.props.onCancel();
      }
      this.setState(this.state);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.state.display) {
        return;
      }
      this.state.display = true;
      this.setState(this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'month-picker' },
        _react2.default.createElement(_picker2.default, {
          selectedDateRange: this.state.selectedDateRange.clone(), onClick: this.handleClickFn
        }),
        _react2.default.createElement(_calendar2.default, {
          selectedDateRange: this.state.selectedDateRange.clone(),
          restrictionRange: this.state.restrictionRange.clone(),
          display: this.state.display,
          onSelect: this.onSelectFn,
          onApply: this.onApplyFn,
          onCancel: this.onCancelFn,
          futureDisable: this.props.futureDisable,
          direction: this.props.direction,
          onYearChange: this.props.onYearChange,
          position: this.props.position
        })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

App.propTypes = {
  selectedDateRange: _custom_prop_types2.default.MomentRangeType,
  restrictionRange: _custom_prop_types2.default.MomentRangeType,
  onYearChange: _propTypes2.default.func,
  onRender: _propTypes2.default.func, // called after the initial render of the
  onSelect: _propTypes2.default.func,
  onApply: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  display: _propTypes2.default.bool,
  futureDisable: _propTypes2.default.bool,
  direction: _propTypes2.default.oneOf(['top', 'left', 'right', 'bottom']),
  position: _propTypes2.default.shape({
    top: _propTypes2.default.number,
    left: _propTypes2.default.number
  })
};

var date = new Date();
var startDate = new Date(date.getFullYear(), 0, 1);
var endDate = new Date(date.getFullYear(), 11, 31);
var minDate = new Date(2000, 0, 1);
var maxDate = new Date(date.getFullYear() + 4, 11, 31);

App.defaultProps = {
  selectedDateRange: _moment2.default.range(startDate, endDate),
  restrictionRange: _moment2.default.range(minDate, maxDate),
  display: false,
  futureDisable: false,
  direction: 'bottom'
};

exports.default = (0, _reactOnclickoutside2.default)(App);