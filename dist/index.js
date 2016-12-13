'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step = exports.StepWizard = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _animate = require('animate.css');

var _animate2 = _interopRequireDefault(_animate);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StepWizard = exports.StepWizard = function (_React$Component) {
  _inherits(StepWizard, _React$Component);

  function StepWizard(props) {
    _classCallCheck(this, StepWizard);

    var _this = _possibleConstructorReturn(this, (StepWizard.__proto__ || Object.getPrototypeOf(StepWizard)).call(this, props));

    _this.state = _this.initialState();
    return _this;
  }

  _createClass(StepWizard, [{
    key: 'animateSteps',
    value: function animateSteps(change) {
      var active = this.state.step;
      var next = this.state.step + change;
      // console.log(change, active, next);
      var styles = this.props.transitions || {
        enterRight: _animate2.default.animated + ' ' + _animate2.default.fadeInRight,
        enterLeft: _animate2.default.animated + ' ' + _animate2.default.fadeInLeft,
        exitRight: _animate2.default.animated + ' ' + _animate2.default.fadeOutRight,
        exitLeft: _animate2.default.animated + ' ' + _animate2.default.fadeOutLeft
      };
      var classes = this.state.classes;
      if (active < next) {
        // slide left
        classes[active] = styles.exitLeft, classes[next] = styles.enterRight;
      } else {
        // slide right
        classes[active] = styles.exitRight, classes[next] = styles.enterLeft;
      }
      this.setState(classes);
    }
  }, {
    key: 'firstStep',
    value: function firstStep() {
      this.goToStep(1);
    }
  }, {
    key: 'goToStep',
    value: function goToStep(step) {
      step--;
      var current = this.state.step;
      var change = step - current;
      var action = change > 0 ? this.nextStep.bind(this) : this.previousStep.bind(this);
      // console.log(current, step, change, Math.abs(change));
      var pause = 0;
      for (var i = 0; i < Math.abs(change); i++) {
        setTimeout(function () {
          action();
        }, pause);
        pause += 5;
      }
    }
  }, {
    key: 'initialState',
    value: function initialState() {
      var state = {
        step: 0, classes: {}
      };

      // Set initial classes
      for (var i = 0; i < this.props.children.length; i++) {
        if (this.props.children[i].props.active) {
          state.step = i;
          continue;
        }
        state.classes[i] = _styles2.default.hide;
      }
      state.classes[state.step] = _styles2.default.active;

      return state;
    }
  }, {
    key: 'lastStep',
    value: function lastStep() {
      this.goToStep(this.props.children.length);
    }
  }, {
    key: 'nextStep',
    value: function nextStep() {
      var _this2 = this;

      this.animateSteps(1);
      this.setState({ step: this.state.step + 1 }, function () {
        _this2.updateHash();
      });
    }
  }, {
    key: 'previousStep',
    value: function previousStep() {
      var _this3 = this;

      this.animateSteps(-1);
      this.setState({ step: this.state.step - 1 }, function () {
        _this3.updateHash();
      });
    }
  }, {
    key: 'updateHash',
    value: function updateHash() {
      // window.location.hash = 'step'+this.state.step;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = {
        currentStep: this.state.step + 1,
        totalSteps: this.props.children.length,

        nextStep: this.nextStep.bind(this),
        previousStep: this.previousStep.bind(this),
        goToStep: this.goToStep.bind(this),
        firstStep: this.firstStep.bind(this),
        lastStep: this.lastStep.bind(this)
      };
      var classes = this.state.classes;

      var childrenWithProps = React.Children.map(this.props.children, function (child, i) {
        props.animate = classes[i];
        return React.cloneElement(child, props);
      });

      return React.createElement(
        'div',
        { className: _styles2.default['step-wizard'] },
        childrenWithProps
      );
    }
  }]);

  return StepWizard;
}(React.Component);

var Step = exports.Step = function (_React$Component2) {
  _inherits(Step, _React$Component2);

  function Step() {
    _classCallCheck(this, Step);

    return _possibleConstructorReturn(this, (Step.__proto__ || Object.getPrototypeOf(Step)).apply(this, arguments));
  }

  _createClass(Step, [{
    key: 'render',
    value: function render() {
      var content = React.cloneElement(this.props.children, this.props);
      return React.createElement(
        'div',
        { className: _styles2.default.step + ' ' + this.props.animate },
        content
      );
    }
  }]);

  return Step;
}(React.Component);

//# sourceMappingURL=index.js.map