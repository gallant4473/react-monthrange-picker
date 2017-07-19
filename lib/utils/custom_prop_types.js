'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('moment-range');

function isMomentRange(val) {
  return val && val.start && val.end && _moment2.default.isMoment(val.start) && _moment2.default.isMoment(val.end);
}

var chainablePropType = function chainablePropType(predicate) {
  var propType = function propType(props, propName, componentName) {
    // don't do any validation if empty
    if (props[propName] == null) {
      return false;
    }

    return predicate(props, propName, componentName);
  };

  propType.isRequired = function (props, propName, componentName) {
    // warn if empty
    if (props[propName] == null) {
      return new Error('Required prop `' + propName + '` was not specified in `' + componentName + '`.');
    }

    return predicate(props, propName, componentName);
  };

  return propType;
};

var MomentType = function MomentType(props, propName) {
  var val = props[propName];
  if (!val) {
    return null;
  } else if (_moment2.default.isMoment(val)) {
    return null;
  }
  return new Error('\'' + propName + '\' must be a moment');
};

var MomentRangeType = function MomentRangeType(props, propName) {
  var val = props[propName];

  if (!val) {
    return null;
  } else if (isMomentRange(val)) {
    return null;
  }
  return new Error('\'' + propName + '\' must be a moment range');
};

module.exports = {
  MomentType: chainablePropType(MomentType),
  MomentRangeType: chainablePropType(MomentRangeType)
};