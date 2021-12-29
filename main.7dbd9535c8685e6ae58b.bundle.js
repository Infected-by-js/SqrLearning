/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _MAX_ANGLE = /*#__PURE__*/new WeakMap();

var _PERSPECTIVE = /*#__PURE__*/new WeakMap();

var _SCALE = /*#__PURE__*/new WeakMap();

var _EASING = /*#__PURE__*/new WeakMap();

var _SPEED = /*#__PURE__*/new WeakMap();

var _BOX_SHADOW = /*#__PURE__*/new WeakMap();

var _SHADOW_COLOR = /*#__PURE__*/new WeakMap();

var _SHADOW_BLUR = /*#__PURE__*/new WeakMap();

var _SHADOW_COEF = /*#__PURE__*/new WeakMap();

var _setDefaultStyles = /*#__PURE__*/new WeakSet();

var Tilt = /*#__PURE__*/function () {
  function Tilt(element, _config) {
    _classCallCheck(this, Tilt);

    _classPrivateMethodInitSpec(this, _setDefaultStyles);

    _classPrivateFieldInitSpec(this, _MAX_ANGLE, {
      writable: true,
      value: 25
    });

    _classPrivateFieldInitSpec(this, _PERSPECTIVE, {
      writable: true,
      value: 1500
    });

    _classPrivateFieldInitSpec(this, _SCALE, {
      writable: true,
      value: 1.1
    });

    _classPrivateFieldInitSpec(this, _EASING, {
      writable: true,
      value: 'cubic-bezier(0.03,0.98,0.52,0.99)'
    });

    _classPrivateFieldInitSpec(this, _SPEED, {
      writable: true,
      value: 800
    });

    _classPrivateFieldInitSpec(this, _BOX_SHADOW, {
      writable: true,
      value: false
    });

    _classPrivateFieldInitSpec(this, _SHADOW_COLOR, {
      writable: true,
      value: 'rgba(0,0,0,0.25)'
    });

    _classPrivateFieldInitSpec(this, _SHADOW_BLUR, {
      writable: true,
      value: 3
    });

    _classPrivateFieldInitSpec(this, _SHADOW_COEF, {
      writable: true,
      value: 0.2
    });

    this.element = element;

    _classPrivateMethodGet(this, _setDefaultStyles, _setDefaultStyles2).call(this, _config);

    this.element.addEventListener('mousemove', this.handlerMouseMove.bind(this));
    this.element.addEventListener('mouseenter', this.handlerMouseHover.bind(this));
    this.element.addEventListener('mouseleave', this.handlerMouseLeave.bind(this));
  }

  _createClass(Tilt, [{
    key: "getRotationAngle",
    value: function getRotationAngle(mousePosition, elementSize) {
      return (2 * (mousePosition / elementSize * this.maxAngle - this.maxAngle / 2)).toFixed(1);
    }
  }, {
    key: "handlerMouseMove",
    value: function handlerMouseMove(event) {
      var angleX = this.getRotationAngle(event.offsetY, this.element.offsetHeight);
      var angleY = -1 * this.getRotationAngle(event.offsetX, this.element.offsetWidth);
      this.setTransform({
        angleX: angleX,
        angleY: angleY
      });
      this.setShadow(angleX, angleY);
    }
  }, {
    key: "handlerMouseHover",
    value: function handlerMouseHover() {
      this.setTransform();
      this.setShadow();
    }
  }, {
    key: "handlerMouseLeave",
    value: function handlerMouseLeave() {
      this.setTransform({
        scale: 1
      });
      this.setShadow();
    }
  }, {
    key: "setTransform",
    value: function setTransform() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$angleX = _ref.angleX,
          angleX = _ref$angleX === void 0 ? 0 : _ref$angleX,
          _ref$angleY = _ref.angleY,
          angleY = _ref$angleY === void 0 ? 0 : _ref$angleY,
          _ref$scale = _ref.scale,
          scale = _ref$scale === void 0 ? this.scale : _ref$scale;

      var scaleValue = "scale3d(".concat(scale, ",").concat(scale, ",").concat(scale, ")");
      var perspectiveValue = "perspective(".concat(this.perspective, "px)");
      var rotateValue = "rotateX(".concat(angleX, "deg) rotateY(").concat(angleY, "deg)");
      return this.element.style.transform = "".concat(scaleValue, " ").concat(perspectiveValue, " ").concat(rotateValue);
    }
  }, {
    key: "setShadow",
    value: function setShadow() {
      var angleX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var angleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this.boxShadow) {
        var shadowParams = "".concat(this.shadowBlur, "px ").concat(this.shadowColor);
        var offsetX = _classPrivateFieldGet(this, _SHADOW_COEF) * angleX;
        var offsetY = -1 * _classPrivateFieldGet(this, _SHADOW_COEF) * angleY;
        return this.element.style.filter = "drop-shadow(".concat(offsetY, "px ").concat(offsetX, "px ").concat(shadowParams, ")");
      }
    }
  }, {
    key: "setTransition",
    value: function setTransition() {
      this.element.style.transition = "transform ".concat(this.speed, "ms ").concat(this.easing, ", box-shadow 100ms ease-out");
    }
  }]);

  return Tilt;
}();

function _setDefaultStyles2() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.maxAngle = config.max || _classPrivateFieldGet(this, _MAX_ANGLE);
  this.perspective = config.perspective || _classPrivateFieldGet(this, _PERSPECTIVE);
  this.scale = config.scale || _classPrivateFieldGet(this, _SCALE);
  this.easing = config.easing || _classPrivateFieldGet(this, _EASING);
  this.speed = config.speed || _classPrivateFieldGet(this, _SPEED);
  this.boxShadow = config.boxShadow || _classPrivateFieldGet(this, _BOX_SHADOW);
  this.shadowColor = config.shadowColor || _classPrivateFieldGet(this, _SHADOW_COLOR);
  this.shadowBlur = config.shadowBlur || _classPrivateFieldGet(this, _SHADOW_BLUR);
  this.element.style.transformStyle = 'preserve-3d';
  this.setShadow();
  this.setTransition();
}

var mainImage = document.querySelector('#main-image');
new Tilt(mainImage, {
  boxShadow: true
});
/******/ })()
;