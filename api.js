"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var API = /*#__PURE__*/function () {
  function API(fetch, apiUri) {
    (0, _classCallCheck2["default"])(this, API);
    (0, _defineProperty2["default"])(this, "clients", {
      challenge: this.createMethod("POST", "/clients/challenge"),
      signIn: this.createMethod("POST", "/clients/sign-in")
    });
    (0, _defineProperty2["default"])(this, "invite", {
      use: this.createMethod("POST", "/invite/use")
    });
    (0, _defineProperty2["default"])(this, "reducers", {
      create: this.createMethod("POST", "/reducers/create"),
      list: this.createMethod("POST", "/reducers/list"),
      update: this.createMethod("POST", "/reducers/update")
    });
    (0, _defineProperty2["default"])(this, "states", {
      archive: this.createMethod("POST", "/states/archive"),
      create: this.createMethod("POST", "/states/create"),
      get: this.createMethod("POST", "/states/get"),
      list: this.createMethod("POST", "/states/list")
    });
    (0, _defineProperty2["default"])(this, "users", {
      create: this.createMethod("POST", "/users/create"),
      list: this.createMethod("POST", "/users/list"),
      token: this.createMethod("POST", "/users/token"),
      update: this.createMethod("POST", "/users/update")
    });
    this.fetch = fetch;
    this.apiUri = apiUri;
  }

  (0, _createClass2["default"])(API, [{
    key: "signIn",
    value: function () {
      var _signIn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(client, key) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.client = client;
                _context.t0 = this.clients;
                _context.t1 = key;
                _context.next = 5;
                return this.clients.challenge({
                  client: client
                });

              case 5:
                _context.t2 = _context.sent;
                _context.t3 = _context.t1.decrypt.call(_context.t1, _context.t2);
                _context.t4 = {
                  solve: _context.t3,
                  ttl: 1000
                };
                _context.next = 10;
                return _context.t0.signIn.call(_context.t0, _context.t4);

              case 10:
                this.token = _context.sent;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function signIn(_x, _x2) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }, {
    key: "createMethod",
    value: function createMethod(url) {
      var _this = this;

      return /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
          var response, responseBody, message;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this.fetch("".concat(_this.prefix).concat(url), {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                      token: _this.token,
                      "content-type": "application/json"
                    }
                  });

                case 2:
                  response = _context2.sent;
                  _context2.next = 5;
                  return response.text();

                case 5:
                  responseBody = _context2.sent;

                  try {
                    responseBody = JSON.parse(responseBody);
                  } catch (e) {}

                  if (!(response.status === 200)) {
                    _context2.next = 9;
                    break;
                  }

                  return _context2.abrupt("return", responseBody);

                case 9:
                  message = typeof responseBody === "string" ? responseBody : JSON.stringify(responseBody);

                  if (_this.unmute) {
                    console.error("".concat(response.status, ":").concat(message));
                  }

                  throw "".concat(response.status, ":").concat(message);

                case 12:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3) {
          return _ref.apply(this, arguments);
        };
      }();
    }
  }]);
  return API;
}();

var _default = API;
exports["default"] = _default;