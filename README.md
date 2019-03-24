# reduxing

DRY for redux

Working with redux may require a lot of boiler plate code, namely the `action creators` and the `switch` statement in the `reducer`.
Both of these repetitive endeavours are related to the `action type` and may be automated to allow the developer to only provide the minimum required inputs and have the `reducer` method and the `action creator` methods generated.

`reduxing` aims to provide an API with the following usage:

```
import reduxing from 'reduxing';

const { reducer, addTodo, deleteTodo } = reduxing({
  addTodo: (state, action) => ({...}),
  deleteTodo: (state, action) => ({...}),
})
```

Where `reduxing` takes as input an object containing callbacks to handle each `case` of the `reducer`'s `switch` statement. The property name bound to each callback will be used as both action `creator name` and `action type`.

In a large application where many `reducer`s and `action type`s are combined, it is therefore easy to manage the uniqueness of `action type` by centrally declaring all `action type` in a single place, and then importing them into each call to `reduxing` to generate the required `reducer`s and `action creator`s.

```
[actions.js]
export const actions {
  addTodo: 'addTodo',
  deleteTodo: 'deleteTodo',
  toggleTodo: 'toggleTodo',
  filterTodo: 'filterTodo'
}

[crudReducer.js]
import { actions } from './actions';
import { byActionType } from 'reduxing';
export const { reducer, addTodo, deleteTodo } = byActionType({
  [actions.addTodo]: (state, action) => ({...}),
  [actions.deleteTodo]: (state, action) => ({...}),
})


[displayReducer.js]
import { actions } from './actions';
import { byActionType } from 'reduxing';
export const { reducer, filterTodo, toggleTodo } = byActionType({
  [actions.toggleTodo]: (state, action) => ({...}),
  [actions.filterTodo]: (state, action) => ({...}),
})
```

However, since we are aiming for DRY, it would be nice to be able to remove the repetitive use of each `action type`. For example in the code above, `addTodo` is "declared" 4 times in different "roles".
Ideally, it should only be declared once to assign a name to each `action creator` method in the destructuring of the result of `reduxing`.

Inspired by React's hooks API's `useState`, it is possible to provide a position-based API style for `reduxing`, where only an `array` of callbacks is provided as input (and an optional "unique" identifier), and an `array` of `action creator`s (and the reducer) is returned as output, with respective matching position between inputs and outputs:

```
import { byPosition } from 'reduxing';
const [addTodo, deleteTodo, reducer] = byPosition(
  [
    (state, action) => ({...}), // addTodo, bound to action type "crud-0"
    (state, action) => ({...}), // deleteTodo, bound to action type "crud-1"
  ],
  'crud'
)

const [toggleTodo, filterTodo, reducer] = byPosition(
  [
    (state, action) => ({...}), // toggleTodo, bound to action type "display-0"
    (state, action) => ({...}), // filterTodo, bound to action type "display-1"
  ],
  'display'
)
```

Please note that the optional identifier will be generated randomly if not provided for convenience, but it is recommended to provide a "readable" and meaningful value like in the example code above.
