import { buildActionCreator, buildActionCreators } from '../src/reduxing';
import assert from 'assert';

const payload = { foo: 'foo' };
const meta = { bar: 'bar' };
const error = 'error';
const type = 'TYPE';

it('can build action creator', () => {
  assert.deepEqual(buildActionCreator(type)({ payload, error, meta }), {
    type,
    payload,
    error,
    meta,
  });
});

describe('can build action creators', () => {
  const { foo, bar } = buildActionCreators(['foo', 'bar']);
  it('can use action creator "foo"', () => {
    assert.deepEqual(foo({ payload, error, meta }), {
      type: 'foo',
      payload,
      error,
      meta,
    });
  });

  it('can use action creator "bar"', () => {
    assert.deepEqual(bar({ payload, error, meta }), {
      type: 'bar',
      payload,
      error,
      meta,
    });
  });
});
