'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _custom_prop_types = require('./utils/custom_prop_types');

var _custom_prop_types2 = _interopRequireDefault(_custom_prop_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Picker = function Picker(props) {
  var startDate = props.selectedDateRange.start;
  var endDate = props.selectedDateRange.end;

  return _react2.default.createElement(
    'div',
    { className: 'picker' },
    _react2.default.createElement(
      'button',
      {
        onClick: props.onClick,
        className: 'btn btn-default',
        id: 'date-range'
      },
      _react2.default.createElement('i', { className: 'fa fa-calendar glyphicon glyphicon-calendar' }),
      _react2.default.createElement(
        'span',
        { className: 'date-str' },
        _react2.default.createElement(
          'strong',
          { className: 'date' },
          startDate.format('MMM, YYYY')
        ),
        '-',
        _react2.default.createElement(
          'strong',
          { className: 'date' },
          endDate.format('MMM, YYYY')
        )
      ),
      _react2.default.createElement('i', { className: 'fa fa-angle-down' })
    )
  );
};

Picker.propTypes = {
  selectedDateRange: _custom_prop_types2.default.MomentRangeType.isRequired,
  onClick: _react2.default.PropTypes.func.isRequired
};

exports.default = Picker;