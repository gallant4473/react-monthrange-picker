'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YearEnd = exports.YearStart = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _custom_prop_types = require('./utils/custom_prop_types');

var _custom_prop_types2 = _interopRequireDefault(_custom_prop_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var YearBase = function (_React$Component) {
  _inherits(YearBase, _React$Component);

  function YearBase(props) {
    _classCallCheck(this, YearBase);

    var _this = _possibleConstructorReturn(this, (YearBase.__proto__ || Object.getPrototypeOf(YearBase)).call(this, props));

    _this.selectMonthFn = _this.selectMonth.bind(_this);
    _this.reduceYear = _this.changeYear.bind(_this, -1);
    _this.incYear = _this.changeYear.bind(_this, 1);

    _this.state = {
      currYear: _this.props.currYear.format('YYYY')
    };
    return _this;
  }

  _createClass(YearBase, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ currYear: nextProps.currYear.format('YYYY') });
    }
  }, {
    key: 'changeYear',
    value: function changeYear(n) {
      var year = this.state.currYear;
      // check the min and max date;
      if (n < 0 && year === this.props.restrictionRange.start.format('YYYY') || n > 0 && year === this.props.restrictionRange.end.format('YYYY')) {
        return false;
      }

      this.props.currYear.add(n, 'y');
      var currYear = this.props.currYear.format('YYYY');

      if (this.props.onYearChange) {
        this.props.onYearChange(currYear);
      }

      this.setState({ currYear: currYear });
      return true;
    }
  }, {
    key: 'selectMonth',
    value: function selectMonth(e) {
      e.preventDefault();
      e.stopPropagation();
      var target = (0, _jquery2.default)(e.target);
      var selectedMonth = parseInt(target.data('idx'), 10);
      // this is either start or end of the moment range
      this.datePoint.month(selectedMonth).year(this.state.currYear);
      // passing selectedDateRange because the app should get the range rather
      // than start or end of the range.
      // this.datePoint is a reference to the prop selectedDateRange
      this.props.onSelect(this.props.selectedDateRange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var currYear = this.state.currYear;
      var selectedRange = this.props.selectedDateRange;
      var newDate = new Date();

      newDate.setYear(currYear);
      newDate.setDate(1);
      var months = MONTHS.map(function (month, idx) {
        newDate.setMonth(idx);
        var selection = '';
        if (currYear === _this2.datePoint.format('YYYY') && month === _this2.datePoint.format('MMM')) {
          selection = 'selected';
        } else if (selectedRange.contains(newDate, true)) {
          selection = 'highlight';
        }

        return _react2.default.createElement(
          'span',
          { key: Date.now() + idx, className: selection + ' month' },
          _react2.default.createElement(
            'button',
            {
              className: 'cal-month btn btn-plain',
              'data-idx': idx,
              onClick: _this2.selectMonthFn,
              'data-month': month
            },
            month
          )
        );
      }, this);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'head' },
          _react2.default.createElement(
            'h4',
            { className: 'title clearfix' },
            _react2.default.createElement(
              'button',
              {
                className: 'btn btn-plain year-down pull-left',
                onClick: this.reduceYear
              },
              _react2.default.createElement('i', { className: 'fa fa-chevron-circle-left' })
            ),
            currYear,
            _react2.default.createElement(
              'button',
              {
                className: 'btn btn-plain year-up pull-right',
                onClick: this.incYear
              },
              _react2.default.createElement('i', { className: 'fa fa-chevron-circle-right' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'months' },
          _react2.default.createElement(
            'div',
            { className: 'clearfix' },
            months
          )
        )
      );
    }
  }]);

  return YearBase;
}(_react2.default.Component);

YearBase.propTypes = {
  restrictionRange: _custom_prop_types2.default.MomentRangeType.isRequired,
  currYear: _custom_prop_types2.default.MomentType.isRequired,
  selectedDateRange: _custom_prop_types2.default.MomentRangeType.isRequired,
  onYearChange: _react2.default.PropTypes.func,
  onSelect: _react2.default.PropTypes.func.isRequired
};

var YearStart = function (_YearBase) {
  _inherits(YearStart, _YearBase);

  function YearStart(props) {
    _classCallCheck(this, YearStart);

    var _this3 = _possibleConstructorReturn(this, (YearStart.__proto__ || Object.getPrototypeOf(YearStart)).call(this, props));

    _this3.datePoint = _this3.props.selectedDateRange.start;
    return _this3;
  }

  _createClass(YearStart, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.datePoint = nextProps.selectedDateRange.start;
      _get(YearStart.prototype.__proto__ || Object.getPrototypeOf(YearStart.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
    }
  }]);

  return YearStart;
}(YearBase);

var YearEnd = function (_YearBase2) {
  _inherits(YearEnd, _YearBase2);

  function YearEnd(props) {
    _classCallCheck(this, YearEnd);

    var _this4 = _possibleConstructorReturn(this, (YearEnd.__proto__ || Object.getPrototypeOf(YearEnd)).call(this, props));

    _this4.datePoint = _this4.props.selectedDateRange.end;
    return _this4;
  }

  _createClass(YearEnd, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.datePoint = nextProps.selectedDateRange.end;
      _get(YearEnd.prototype.__proto__ || Object.getPrototypeOf(YearEnd.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
    }
  }]);

  return YearEnd;
}(YearBase);

exports.YearStart = YearStart;
exports.YearEnd = YearEnd;