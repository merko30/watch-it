const createAction = name => {
  return {
    start: (payload = {}) => ({ type: `${name}`, payload }),
    success: (payload = {}) => ({ type: `${name}_SUCCESS`, payload }),
    failure: (payload = {}) => ({ type: `${name}_FAILURE`, payload })
  };
};

export default createAction;
