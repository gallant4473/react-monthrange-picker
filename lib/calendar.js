'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _cloneDeep2 = require('lodash/cloneDeep');

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _custom_prop_types = require('./utils/custom_prop_types');

var _custom_prop_types2 = _interopRequireDefault(_custom_prop_types);

var _year = require('./year');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.selectMonthFn = _this.selectMonth.bind(_this);

    var positionTop = void 0;

    try {
      positionTop = props.position.top;
    } catch (e) {
      positionTop = 0;
    }

    var positionLeft = void 0;

    try {
      positionLeft = props.position.left;
    } catch (e) {
      positionLeft = 0;
    }

    _this.calStyle = {
      width: '700px',
      top: positionTop + 'px',
      left: positionLeft + 'px',
      display: props.display ? 'block' : 'none'
    };

    _this.arrowStyle = {};

    var selectedDateRange = props.selectedDateRange,
        restrictionRange = props.restrictionRange;
    // using state here because on month selection
    // both yearstart and yearend gets re-rendered
    // rather than propagating to the App.
    // App component stores the current select so
    // that on apply it can just change the state
    // to the current stored selection.

    _this.state = { selectedDateRange: selectedDateRange, restrictionRange: restrictionRange };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.$el = (0, _jquery2.default)(this.node);
      this.setStyle(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setStyle(nextProps);

      var _cloneDeep = (0, _cloneDeep3.default)(nextProps),
          selectedDateRange = _cloneDeep.selectedDateRange,
          restrictionRange = _cloneDeep.restrictionRange;

      this.setState({ selectedDateRange: selectedDateRange, restrictionRange: restrictionRange });
    }
  }, {
    key: 'setStyle',
    value: function setStyle(props) {
      var positionTop = void 0;

      try {
        positionTop = props.position.top;
      } catch (e) {
        positionTop = 0;
      }

      var positionLeft = void 0;

      try {
        positionLeft = props.position.left;
      } catch (e) {
        positionLeft = 0;
      }

      var calStyle = (0, _cloneDeep3.default)(this.calStyle);
      var arrowStyle = (0, _cloneDeep3.default)(this.arrowStyle);
      var picker = this.$el.siblings('.picker');
      var direction = this.props.direction;
      var adjustmentConstant = 10;

      var calDim = {
        height: this.$el.height(),
        width: this.$el.width()
      };

      var pickerDim = {
        height: picker.height(),
        width: picker.width()
      };

      if (direction === 'left' || direction === 'right') {
        calStyle.top = positionTop ? calStyle.top + 'px' : '-' + calDim.height / 2 + 'px';
        if (direction === 'left') {
          var leftWidth = calDim.width + adjustmentConstant;

          calStyle.left = positionLeft ? calStyle.left + 'px' : '-' + leftWidth + 'px';
        } else {
          var rightWidth = pickerDim.width + adjustmentConstant;
          calStyle.left = positionLeft ? calStyle.left + 'px' : rightWidth + 'px';
        }

        var arrowTop = Math.abs(parseInt(calStyle.top, 10)) + pickerDim.height / 2;
        arrowStyle.top = arrowTop + 'px';
      } else if (direction === 'top' || direction === 'bottom') {
        calStyle.left = positionLeft ? calStyle.left + 'px' : '-' + (calDim.width - pickerDim.width) / 2 + 'px';

        if (direction === 'top') {
          var top = calDim.height + pickerDim.height;
          calStyle.top = positionTop ? calStyle.top + 'px' : '-' + top + 'px';
        } else {
          var _top = pickerDim.height + adjustmentConstant;
          calStyle.top = positionTop ? calStyle.top + 'px' : _top + 'px';
        }
        var arrowLeft = Math.abs(parseInt(calStyle.left, 10)) + pickerDim.width / 2;
        arrowStyle.left = arrowLeft + 'px';
      }

      calStyle.display = props.display ? 'block' : 'none';

      this.calStyle = calStyle;
      this.arrowStyle = arrowStyle;
    }
  }, {
    key: 'selectMonth',
    value: function selectMonth(newDateRange) {
      var newDateRangeClone = newDateRange.clone();
      if (newDateRangeClone.start > newDateRangeClone.end) {
        newDateRangeClone.end.month(newDateRangeClone.start.month());
        newDateRangeClone.end.year(newDateRangeClone.start.year());
      }
      if (this.props.onSelect) {
        newDateRangeClone.end.date(new Date(newDateRangeClone.end.year(), newDateRangeClone.end.month() + 1, 0).getDate());
        this.props.onSelect(newDateRangeClone);
      }

      this.state.selectedDateRange = newDateRangeClone;
      this.setState(this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var selectedRange = this.state.selectedDateRange.clone();
      var startDate = selectedRange.start;
      var endDate = selectedRange.end;
      var popOverClass = this.props.direction + ' popover';

      return _react2.default.createElement(
        'div',
        { ref: function ref(node) {
            return _this2.node = node;
          }, className: popOverClass, style: this.calStyle },
        _react2.default.createElement('div', { className: 'arrow', style: this.arrowStyle }),
        _react2.default.createElement(
          'div',
          { className: 'clearfix sec-wrap' },
          _react2.default.createElement(
            'div',
            { className: 'calendar col-xs-10' },
            _react2.default.createElement(
              'div',
              { className: 'clearfix' },
              _react2.default.createElement(
                'div',
                { className: 'col-xs-6 year-start year' },
                _react2.default.createElement(_year.YearStart, {
                  restrictionRange: this.props.restrictionRange,
                  onYearChange: this.props.onYearChange,
                  onSelect: this.selectMonthFn,
                  currYear: startDate.clone(),
                  selectedDateRange: selectedRange,
                  futureDisable: this.props.futureDisable
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-xs-6 year-end year' },
                _react2.default.createElement(_year.YearEnd, {
                  restrictionRange: this.props.restrictionRange,
                  onYearChange: this.props.onYearChange,
                  onSelect: this.selectMonthFn,
                  currYear: endDate.clone(),
                  selectedDateRange: selectedRange,
                  futureDisable: this.props.futureDisable
                })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'shortcuts col-xs-2' },
            _react2.default.createElement(
              'button',
              {
                onClick: this.props.onApply,
                type: 'button',
                className: 'btn btn-block btn-success'
              },
              'Apply'
            ),
            _react2.default.createElement(
              'button',
              {
                onClick: this.props.onCancel,
                type: 'button',
                className: 'btn btn-default btn-block'
              },
              'Cancel'
            )
          )
        )
      );
    }
  }]);

  return Calendar;
}(_react2.default.Component);

Calendar.propTypes = {
  selectedDateRange: _custom_prop_types2.default.MomentRangeType.isRequired,
  restrictionRange: _custom_prop_types2.default.MomentRangeType.isRequired,
  direction: _propTypes2.default.oneOf(['top', 'left', 'right', 'bottom']).isRequired,
  display: _propTypes2.default.bool.isRequired,
  onSelect: _propTypes2.default.func.isRequired,
  onApply: _propTypes2.default.func.isRequired,
  onCancel: _propTypes2.default.func.isRequired,
  futureDisable: _propTypes2.default.bool.isRequired,
  onYearChange: _propTypes2.default.func,
  position: _propTypes2.default.shape({
    top: _propTypes2.default.number,
    left: _propTypes2.default.number
  })
};

exports.default = Calendar;