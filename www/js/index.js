"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mountNode = document.getElementById("root");

var sampleTodos = [{
  text: "Buy ingredients",
  done: false
}, {
  text: "Cook dinner",
  done: true
}, {
  text: "Do homework",
  done: false
}];

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.addTodo = function () {
      if (_this.todoInput.value !== "") {
        _this.setState({
          todos: [].concat(_this.state.todos, [{ text: _this.todoInput.value, done: false }])
        });
      }
    };

    _this.deleteTodo = function (index) {
      var todosCopy = [].concat(_this.state.todos);

      if (todosCopy.length > 0) {
        todosCopy.splice(index, 1);
      }

      _this.setState({
        todos: [].concat(todosCopy)
      });
    };

    _this.toggleDone = function (isDone, indexMatch) {
      var filterTodos = _this.state.todos.map(function (item, index) {
        if (index === indexMatch) {
          item.done = isDone;
        }

        return item;
      });

      _this.setState({
        todos: [].concat(filterTodos)
      });
    };

    _this.state = {
      todos: [].concat(sampleTodos),
      showIncompleteFirst: true
    };
    return _this;
  }

  App.prototype.render = function render() {
    var _this2 = this;

    // const todos = [...this.state.todos];
    var sortedTodos = undefined;
    if (this.state.showIncompleteFirst) {
      sortedTodos = this.state.todos.sort(function (prev, curr) {
        return prev.done - curr.done;
      });
    } else {
      sortedTodos = this.state.todos.sort(function (prev, curr) {
        return curr.done - prev.done;
      });
    }
    return React.createElement(
      "div",
      { className: "app animated slideInDown" },
      React.createElement(
        "header",
        null,
        React.createElement(
          "h2",
          { className: "text-primary" },
          "What's up for Today"
        )
      ),
      React.createElement(
        "form",
        {
          className: "form-inline add-form",
          onSubmit: function onSubmit(e) {
            e.preventDefault();
            _this2.addTodo();
          }
        },
        React.createElement("input", {
          type: "text",
          className: "form-control",
          placeholder: "todo item",
          ref: function ref(input) {
            _this2.todoInput = input;
          }
        }),
        React.createElement(
          "button",
          { type: "submit", className: "btn btn-primary" },
          "+"
        )
      ),
      React.createElement(
        "div",
        { className: "text-right text-muted mt-2" },
        React.createElement(
          "label",
          null,
          React.createElement("input", {
            className: "mr-1",
            type: "checkbox",
            checked: this.state.showIncompleteFirst,
            onChange: function onChange() {
              return _this2.setState({
                showIncompleteFirst: !_this2.state.showIncompleteFirst
              });
            }
          }),
          " ",
          "Show incomplete first"
        )
      ),
      React.createElement(
        "ul",
        { className: "list-group items" },
        sortedTodos.map(function (todo, index) {
          return React.createElement(
            "li",
            {
              className: "list-group-item" + (todo.done ? " completed" : ""),
              key: index
            },
            React.createElement(
              "label",
              null,
              React.createElement("input", {
                type: "checkbox",
                checked: todo.done ? "checked" : "",
                onChange: function onChange(e) {
                  var isDone = e.target.checked;

                  _this2.toggleDone(isDone, index);
                }
              }),
              todo.text
            ),
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-danger btn-sm",
                onClick: function onClick() {
                  _this2.deleteTodo(index);
                }
              },
              "×"
            )
          );
        })
      )
    );
  };

  return App;
}(React.Component);

// mount React components

ReactDOM.render(React.createElement(App, null), mountNode);