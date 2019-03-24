import { byActionType, byPosition } from '../src/reduxing';
import assert from 'assert';

describe('can build reducer and action creators', () => {
  const { foos, fooz, reducer } = byActionType({
    foos: (state, action) => ({ ...state, foos: action.payload }),
    fooz: (state, action) => ({ ...state, fooz: action.payload }),
  });
  const previous = { bar: 'baz' };

  it('can use foos', () => {
    const action = foos({ payload: { foo: 0 } });
    const state = reducer(previous, action);
    assert.deepEqual(state, { bar: 'baz', foos: { foo: 0 } });
  });

  it('can use fooz', () => {
    const action = fooz({ payload: { foo: 1 } });
    const state = reducer(previous, action);
    assert.deepEqual(state, { bar: 'baz', fooz: { foo: 1 } });
  });
});

describe('can build reducer and action creators position based', () => {
  const [foos, fooz, reducer] = byPosition(
    [
      (state, action) => ({ ...state, foos: action.payload }),
      (state, action) => ({ ...state, fooz: action.payload }),
    ],
    'foo',
  );
  const previous = { bar: 'baz' };

  it('can use foos', () => {
    const action = foos({ payload: { foo: 3 } });
    assert.deepEqual(action, {
      type: 'foo-0',
      payload: { foo: 3 },
      error: undefined,
      meta: undefined,
    });
    const state = reducer(previous, action);
    assert.deepEqual(state, { bar: 'baz', foos: { foo: 3 } });
  });

  it('can use fooz', () => {
    const action = fooz({ payload: { foo: 1 } });
    assert.deepEqual(action, {
      type: 'foo-1',
      payload: { foo: 1 },
      error: undefined,
      meta: undefined,
    });
    const state = reducer(previous, action);
    assert.deepEqual(state, { bar: 'baz', fooz: { foo: 1 } });
  });
});
