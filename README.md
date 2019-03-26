# reduxing

DRY for redux

Working with redux may require a lot of boiler plate code, namely the `action creator`s and the `switch` statement in the `reducer`.
Both of these repetitive endeavours are bound to each-other through the `action type` which may be automated to allow developers to only provide the minimum required inputs: the `reducer case` functions, and have the `reducer` and the `action creator` functions generated.

`reduxing` aims to provide an API with the following usage:

```javascript
import reduxing from 'reduxing';

const { reducer, addTodo, deleteTodo } = reduxing({
  addTodo: (state, action) => ({...}),
  deleteTodo: (state, action) => ({...}),
})
```

Where `reduxing` takes as input an object containing `reducer case` functions (callbacks to handle each `case` of the `reducer`'s `switch` statement). The property name bound to each `reducer case` function will be used as both `action creator` function name and `action type` value.

Please note however that is easy to rename the functions as to achieve a more "standard" `camelCase` for functions and `UPPER_SNAKE_CASE` for constants like so:

```javascript
import reduxing from 'reduxing';

const { reducer, ADD_TODO: addTodo, DELETE_TODO: deleteTodo } = reduxing({
  ADD_TODO: (state, action) => ({...}),
  DELETE_TODO: (state, action) => ({...}),
})
```

In a large application where many `reducer`s and `action type`s are combined, it is therefore easy to manage the uniqueness of `action type` by centrally declaring all `action type` in a single place, and then importing them into each call to `reduxing` to generate the required `reducer`s and `action creator`s.

```javascript
[actions.js]
export const actions {
  ADD_TODO: 'ADD_TODO',
  DELETE_TODO: 'DELETE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  FILTER_TODO: 'FILTER_TODO'
}

[crudReducer.js]
import { actions } from './actions';
import { byActionType } from 'reduxing';
export const { reducer, ADD_TODO: addTodo, DELETE_TODO: deleteTodo } = byActionType({
  [actions.ADD_TODO]: (state, action) => ({...}),
  [actions.DELETE_TODO]: (state, action) => ({...}),
})


[displayReducer.js]
import { actions } from './actions';
import { byActionType } from 'reduxing';
export const { reducer, TOGGLE_TODO: toggleTodo, FILTER_TODO: filterTodo } = byActionType({
  [actions.TOGGLE_TODO]: (state, action) => ({...}),
  [actions.FILTER_TODO]: (state, action) => ({...}),
})
```

However, since we are aiming for DRY, it would be nice to be able to remove the repetitive use of each `action type`. For example in the code above, `ADD_TODO` is declared 3 times on top of `addTodo`.
Ideally, we should only need to declare `addTodo` once: to assign a name to each `action creator` function in the destructuring of the result of `reduxing`, and avoid using `ADD_TODO` all-together.

Taking a page from React's hooks API's `useState`, let's provide a position-based API style for `reduxing`, where only an `array` of `reducer case` functions is provided as input, with an optional "unique" identifier, and an `array` of `action creator`s (and the reducer) is returned as output, with respective matching position between inputs and outputs:

```javascript
import { byPosition } from 'reduxing';
const [addTodo, deleteTodo, reducer] = byPosition(
  [
    (state, action) => ({...}), // addTodo, bound to action type "CRUD-0"
    (state, action) => ({...}), // deleteTodo, bound to action type "CRUD-1"
  ],
  'CRUD'
)

const [toggleTodo, filterTodo, reducer] = byPosition(
  [
    (state, action) => ({...}), // toggleTodo, bound to action type "DISPLAY-0"
    (state, action) => ({...}), // filterTodo, bound to action type "DISPLAY-1"
  ],
  'DISPLAY'
)
```

Please note that the optional identifier will be generated randomly if not provided for convenience, but it is recommended to provide a "readable" and meaningful value like in the example code above.
