import { buildReducer } from '../src/reduxing';
import assert from 'assert';

const addTypeToState = type => (state, action) => ({ ...state, type });

const reducerByType = {
  foo: addTypeToState('foo'),
  bar: addTypeToState('bar'),
};

const previous = { toto: 1 };

describe('can buildReducer', () => {
  const reducer = buildReducer(reducerByType);

  it('returns empty when undefined previous state - hard redux requirement', () => {
    assert.deepEqual(reducer(undefined, {}), {});
  });

  it('returns previous state when no input', () => {
    assert.deepEqual(reducer(previous, {}), previous);
  });

  it('returns previous state when no matching action type', () => {
    assert.deepEqual(reducer(previous, { type: 'baz' }), previous);
  });

  it('applying matching "foo" state', () => {
    assert.deepEqual(reducer({ foo: 1 }, { type: 'foo' }), {
      foo: 1,
      type: 'foo',
    });
  });

  it('appying matching "bar" state', () => {
    assert.deepEqual(reducer({ bar: 2 }, { type: 'bar' }), {
      bar: 2,
      type: 'bar',
    });
  });
});
