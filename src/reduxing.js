function buildActionCreator(type) {
  return function({ payload, error, meta }) {
    return {
      type,
      payload,
      error,
      meta,
    };
  };
}

function buildActionCreators(types = []) {
  return types.reduce((result, type) => {
    result[type] = buildActionCreator(type);
    return result;
  }, {});
}

function buildReducer(reducerByType = {}) {
  return function(state, action) {
    return state &&
      action &&
      action.type &&
      reducerByType &&
      reducerByType[action.type]
      ? reducerByType[action.type](state, action)
      : state || {};
  };
}

function buildReducerAndActionCreators(reducerByType = {}) {
  return {
    reducer: buildReducer(reducerByType),
    ...buildActionCreators(Object.keys(reducerByType)),
  };
}

function defaultReducerAlias() {
  // https://gist.github.com/gordonbrander/2230317
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

function buildReducerAndActionCreatorsByPosition(
  typeReducerByPosition = [],
  reducerAlias,
) {
  reducerAlias || (reducerAlias = defaultReducerAlias());
  function alias(index) {
    return `${reducerAlias}-${index}`;
  }
  const actionCreators = typeReducerByPosition.map((reducer, index) =>
    buildActionCreator(alias(index)),
  );
  const reducerByType = typeReducerByPosition.reduce((acc, reducer, index) => {
    acc[alias(index)] = reducer;
    return acc;
  }, {});
  return [...actionCreators, buildReducer(reducerByType)];
}

export default buildReducerAndActionCreators;
export {
  buildActionCreator,
  buildActionCreators,
  buildReducer,
  buildReducerAndActionCreators as byActionType,
  buildReducerAndActionCreatorsByPosition as byPosition,
};
