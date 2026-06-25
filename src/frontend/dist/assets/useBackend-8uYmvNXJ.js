var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a;
import { d as Subscribable, p as pendingThenable, e as resolveEnabled, s as shallowEqualObjects, f as resolveStaleTime, n as noop, g as environmentManager, i as isValidTimeout, t as timeUntilStale, h as timeoutManager, k as focusManager, l as fetchState, m as replaceData, o as notifyManager, r as reactExports, q as shouldThrowError, u as useQueryClient, v as useInternetIdentity, w as createActorWithConfig, x as Record, T as Text, N as Nat, O as Opt, B as Bool, y as Service, F as Func, V as Vec, H as HttpAgent, A as Actor } from "./index-qRdbC-rq.js";
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actor = await createActorWithConfig(createActor2, {
        agentOptions: { identity }
      });
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const ContractorAssignment = Record({
  "endDate": Opt(Text),
  "allocationPercent": Nat,
  "contractor": Text,
  "project": Text,
  "startDate": Text
});
const Contractor = Record({
  "status": Text,
  "country": Text,
  "contractStart": Text,
  "name": Text,
  "agency": Text,
  "contractEnd": Text,
  "email": Text,
  "hourlyRateUsd": Nat,
  "department": Text
});
const Contract = Record({
  "status": Text,
  "title": Text,
  "endDate": Text,
  "kind": Text,
  "vendor": Text,
  "department": Text,
  "valueUsd": Nat,
  "startDate": Text
});
const Customer = Record({
  "country": Text,
  "signupDate": Text,
  "plan": Text,
  "accountManager": Text,
  "monthlyRevenueUsd": Nat,
  "companyName": Text,
  "churnDate": Opt(Text),
  "industry": Text
});
const Department = Record({
  "foundedYear": Nat,
  "name": Text,
  "annualBudgetUsd": Nat,
  "costCenter": Text
});
const EmployeeAssignment = Record({
  "endDate": Opt(Text),
  "allocationPercent": Nat,
  "employee": Text,
  "project": Text,
  "startDate": Text
});
const Employee = Record({
  "manager": Opt(Text),
  "country": Text,
  "hireDate": Text,
  "name": Text,
  "office": Text,
  "email": Text,
  "level": Nat,
  "jobTitle": Text,
  "terminationDate": Opt(Text),
  "salaryUsd": Nat,
  "department": Text,
  "employmentStatus": Text,
  "vacationDaysRemaining": Nat
});
const Expense = Record({
  "date": Text,
  "submittedBy": Text,
  "approvalStatus": Text,
  "category": Text,
  "amountUsd": Nat,
  "payee": Text,
  "department": Text,
  "project": Opt(Text)
});
const InternAssignment = Record({
  "allocationPercent": Nat,
  "intern": Text,
  "project": Text
});
const Intern = Record({
  "mentor": Text,
  "endDate": Text,
  "name": Text,
  "email": Text,
  "university": Text,
  "department": Text,
  "monthlyStipendUsd": Nat,
  "startDate": Text
});
const Invoice = Record({
  "issueDate": Text,
  "status": Text,
  "contract": Opt(Text),
  "dueDate": Text,
  "paidDate": Opt(Text),
  "vendor": Text,
  "amountUsd": Nat
});
const Office = Record({
  "country": Text,
  "openedDate": Text,
  "city": Text,
  "isHq": Bool,
  "addressLine": Text,
  "capacity": Nat
});
const Product = Record({
  "name": Text,
  "annualRevenueUsd": Nat,
  "codename": Text,
  "launchDate": Text,
  "lifecycle": Text,
  "department": Text
});
const Project = Record({
  "plannedEndDate": Text,
  "status": Text,
  "actualEndDate": Opt(Text),
  "lead": Text,
  "name": Text,
  "codename": Text,
  "department": Text,
  "budgetUsd": Nat,
  "product": Opt(Text),
  "startDate": Text
});
const Vendor = Record({
  "paymentTermsDays": Nat,
  "taxId": Text,
  "country": Text,
  "name": Text,
  "createdDate": Text,
  "primaryContactName": Text
});
Service({
  "__contractorAssignments": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(ContractorAssignment)],
    ["query"]
  ),
  "__contractors": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Contractor)],
    ["query"]
  ),
  "__contracts": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Contract)],
    ["query"]
  ),
  "__customers": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Customer)],
    ["query"]
  ),
  "__departments": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Department)],
    ["query"]
  ),
  "__employeeAssignments": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(EmployeeAssignment)],
    ["query"]
  ),
  "__employees": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Employee)],
    ["query"]
  ),
  "__expenses": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Expense)],
    ["query"]
  ),
  "__internAssignments": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(InternAssignment)],
    ["query"]
  ),
  "__interns": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Intern)],
    ["query"]
  ),
  "__invoices": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Invoice)],
    ["query"]
  ),
  "__offices": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Office)],
    ["query"]
  ),
  "__products": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Product)],
    ["query"]
  ),
  "__projects": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Project)],
    ["query"]
  ),
  "__vendors": Func(
    [Opt(Nat), Opt(Nat)],
    [Vec(Vendor)],
    ["query"]
  ),
  "getAllContractorAssignments": Func(
    [],
    [Vec(ContractorAssignment)],
    ["query"]
  ),
  "getAllContractors": Func([], [Vec(Contractor)], ["query"]),
  "getAllContracts": Func([], [Vec(Contract)], ["query"]),
  "getAllCustomers": Func([], [Vec(Customer)], ["query"]),
  "getAllDepartments": Func([], [Vec(Department)], ["query"]),
  "getAllEmployeeAssignments": Func(
    [],
    [Vec(EmployeeAssignment)],
    ["query"]
  ),
  "getAllEmployees": Func([], [Vec(Employee)], ["query"]),
  "getAllExpenses": Func([], [Vec(Expense)], ["query"]),
  "getAllInternAssignments": Func(
    [],
    [Vec(InternAssignment)],
    ["query"]
  ),
  "getAllInterns": Func([], [Vec(Intern)], ["query"]),
  "getAllInvoices": Func([], [Vec(Invoice)], ["query"]),
  "getAllOffices": Func([], [Vec(Office)], ["query"]),
  "getAllProducts": Func([], [Vec(Product)], ["query"]),
  "getAllProjects": Func([], [Vec(Project)], ["query"]),
  "getAllVendors": Func([], [Vec(Vendor)], ["query"]),
  "uploadContractorAssignments": Func(
    [Vec(ContractorAssignment)],
    [],
    []
  ),
  "uploadContractors": Func([Vec(Contractor)], [], []),
  "uploadContracts": Func([Vec(Contract)], [], []),
  "uploadCustomers": Func([Vec(Customer)], [], []),
  "uploadDepartments": Func([Vec(Department)], [], []),
  "uploadEmployeeAssignments": Func([Vec(EmployeeAssignment)], [], []),
  "uploadEmployees": Func([Vec(Employee)], [], []),
  "uploadExpenses": Func([Vec(Expense)], [], []),
  "uploadInternAssignments": Func([Vec(InternAssignment)], [], []),
  "uploadInterns": Func([Vec(Intern)], [], []),
  "uploadInvoices": Func([Vec(Invoice)], [], []),
  "uploadOffices": Func([Vec(Office)], [], []),
  "uploadProducts": Func([Vec(Product)], [], []),
  "uploadProjects": Func([Vec(Project)], [], []),
  "uploadVendors": Func([Vec(Vendor)], [], [])
});
const idlFactory = ({ IDL }) => {
  const ContractorAssignment2 = IDL.Record({
    "endDate": IDL.Opt(IDL.Text),
    "allocationPercent": IDL.Nat,
    "contractor": IDL.Text,
    "project": IDL.Text,
    "startDate": IDL.Text
  });
  const Contractor2 = IDL.Record({
    "status": IDL.Text,
    "country": IDL.Text,
    "contractStart": IDL.Text,
    "name": IDL.Text,
    "agency": IDL.Text,
    "contractEnd": IDL.Text,
    "email": IDL.Text,
    "hourlyRateUsd": IDL.Nat,
    "department": IDL.Text
  });
  const Contract2 = IDL.Record({
    "status": IDL.Text,
    "title": IDL.Text,
    "endDate": IDL.Text,
    "kind": IDL.Text,
    "vendor": IDL.Text,
    "department": IDL.Text,
    "valueUsd": IDL.Nat,
    "startDate": IDL.Text
  });
  const Customer2 = IDL.Record({
    "country": IDL.Text,
    "signupDate": IDL.Text,
    "plan": IDL.Text,
    "accountManager": IDL.Text,
    "monthlyRevenueUsd": IDL.Nat,
    "companyName": IDL.Text,
    "churnDate": IDL.Opt(IDL.Text),
    "industry": IDL.Text
  });
  const Department2 = IDL.Record({
    "foundedYear": IDL.Nat,
    "name": IDL.Text,
    "annualBudgetUsd": IDL.Nat,
    "costCenter": IDL.Text
  });
  const EmployeeAssignment2 = IDL.Record({
    "endDate": IDL.Opt(IDL.Text),
    "allocationPercent": IDL.Nat,
    "employee": IDL.Text,
    "project": IDL.Text,
    "startDate": IDL.Text
  });
  const Employee2 = IDL.Record({
    "manager": IDL.Opt(IDL.Text),
    "country": IDL.Text,
    "hireDate": IDL.Text,
    "name": IDL.Text,
    "office": IDL.Text,
    "email": IDL.Text,
    "level": IDL.Nat,
    "jobTitle": IDL.Text,
    "terminationDate": IDL.Opt(IDL.Text),
    "salaryUsd": IDL.Nat,
    "department": IDL.Text,
    "employmentStatus": IDL.Text,
    "vacationDaysRemaining": IDL.Nat
  });
  const Expense2 = IDL.Record({
    "date": IDL.Text,
    "submittedBy": IDL.Text,
    "approvalStatus": IDL.Text,
    "category": IDL.Text,
    "amountUsd": IDL.Nat,
    "payee": IDL.Text,
    "department": IDL.Text,
    "project": IDL.Opt(IDL.Text)
  });
  const InternAssignment2 = IDL.Record({
    "allocationPercent": IDL.Nat,
    "intern": IDL.Text,
    "project": IDL.Text
  });
  const Intern2 = IDL.Record({
    "mentor": IDL.Text,
    "endDate": IDL.Text,
    "name": IDL.Text,
    "email": IDL.Text,
    "university": IDL.Text,
    "department": IDL.Text,
    "monthlyStipendUsd": IDL.Nat,
    "startDate": IDL.Text
  });
  const Invoice2 = IDL.Record({
    "issueDate": IDL.Text,
    "status": IDL.Text,
    "contract": IDL.Opt(IDL.Text),
    "dueDate": IDL.Text,
    "paidDate": IDL.Opt(IDL.Text),
    "vendor": IDL.Text,
    "amountUsd": IDL.Nat
  });
  const Office2 = IDL.Record({
    "country": IDL.Text,
    "openedDate": IDL.Text,
    "city": IDL.Text,
    "isHq": IDL.Bool,
    "addressLine": IDL.Text,
    "capacity": IDL.Nat
  });
  const Product2 = IDL.Record({
    "name": IDL.Text,
    "annualRevenueUsd": IDL.Nat,
    "codename": IDL.Text,
    "launchDate": IDL.Text,
    "lifecycle": IDL.Text,
    "department": IDL.Text
  });
  const Project2 = IDL.Record({
    "plannedEndDate": IDL.Text,
    "status": IDL.Text,
    "actualEndDate": IDL.Opt(IDL.Text),
    "lead": IDL.Text,
    "name": IDL.Text,
    "codename": IDL.Text,
    "department": IDL.Text,
    "budgetUsd": IDL.Nat,
    "product": IDL.Opt(IDL.Text),
    "startDate": IDL.Text
  });
  const Vendor2 = IDL.Record({
    "paymentTermsDays": IDL.Nat,
    "taxId": IDL.Text,
    "country": IDL.Text,
    "name": IDL.Text,
    "createdDate": IDL.Text,
    "primaryContactName": IDL.Text
  });
  return IDL.Service({
    "__contractorAssignments": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(ContractorAssignment2)],
      ["query"]
    ),
    "__contractors": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Contractor2)],
      ["query"]
    ),
    "__contracts": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Contract2)],
      ["query"]
    ),
    "__customers": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Customer2)],
      ["query"]
    ),
    "__departments": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Department2)],
      ["query"]
    ),
    "__employeeAssignments": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(EmployeeAssignment2)],
      ["query"]
    ),
    "__employees": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Employee2)],
      ["query"]
    ),
    "__expenses": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Expense2)],
      ["query"]
    ),
    "__internAssignments": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(InternAssignment2)],
      ["query"]
    ),
    "__interns": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Intern2)],
      ["query"]
    ),
    "__invoices": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Invoice2)],
      ["query"]
    ),
    "__offices": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Office2)],
      ["query"]
    ),
    "__products": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Product2)],
      ["query"]
    ),
    "__projects": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Project2)],
      ["query"]
    ),
    "__vendors": IDL.Func(
      [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
      [IDL.Vec(Vendor2)],
      ["query"]
    ),
    "getAllContractorAssignments": IDL.Func(
      [],
      [IDL.Vec(ContractorAssignment2)],
      ["query"]
    ),
    "getAllContractors": IDL.Func([], [IDL.Vec(Contractor2)], ["query"]),
    "getAllContracts": IDL.Func([], [IDL.Vec(Contract2)], ["query"]),
    "getAllCustomers": IDL.Func([], [IDL.Vec(Customer2)], ["query"]),
    "getAllDepartments": IDL.Func([], [IDL.Vec(Department2)], ["query"]),
    "getAllEmployeeAssignments": IDL.Func(
      [],
      [IDL.Vec(EmployeeAssignment2)],
      ["query"]
    ),
    "getAllEmployees": IDL.Func([], [IDL.Vec(Employee2)], ["query"]),
    "getAllExpenses": IDL.Func([], [IDL.Vec(Expense2)], ["query"]),
    "getAllInternAssignments": IDL.Func(
      [],
      [IDL.Vec(InternAssignment2)],
      ["query"]
    ),
    "getAllInterns": IDL.Func([], [IDL.Vec(Intern2)], ["query"]),
    "getAllInvoices": IDL.Func([], [IDL.Vec(Invoice2)], ["query"]),
    "getAllOffices": IDL.Func([], [IDL.Vec(Office2)], ["query"]),
    "getAllProducts": IDL.Func([], [IDL.Vec(Product2)], ["query"]),
    "getAllProjects": IDL.Func([], [IDL.Vec(Project2)], ["query"]),
    "getAllVendors": IDL.Func([], [IDL.Vec(Vendor2)], ["query"]),
    "uploadContractorAssignments": IDL.Func(
      [IDL.Vec(ContractorAssignment2)],
      [],
      []
    ),
    "uploadContractors": IDL.Func([IDL.Vec(Contractor2)], [], []),
    "uploadContracts": IDL.Func([IDL.Vec(Contract2)], [], []),
    "uploadCustomers": IDL.Func([IDL.Vec(Customer2)], [], []),
    "uploadDepartments": IDL.Func([IDL.Vec(Department2)], [], []),
    "uploadEmployeeAssignments": IDL.Func(
      [IDL.Vec(EmployeeAssignment2)],
      [],
      []
    ),
    "uploadEmployees": IDL.Func([IDL.Vec(Employee2)], [], []),
    "uploadExpenses": IDL.Func([IDL.Vec(Expense2)], [], []),
    "uploadInternAssignments": IDL.Func([IDL.Vec(InternAssignment2)], [], []),
    "uploadInterns": IDL.Func([IDL.Vec(Intern2)], [], []),
    "uploadInvoices": IDL.Func([IDL.Vec(Invoice2)], [], []),
    "uploadOffices": IDL.Func([IDL.Vec(Office2)], [], []),
    "uploadProducts": IDL.Func([IDL.Vec(Product2)], [], []),
    "uploadProjects": IDL.Func([IDL.Vec(Project2)], [], []),
    "uploadVendors": IDL.Func([IDL.Vec(Vendor2)], [], [])
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async __contractorAssignments(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__contractorAssignments(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return from_candid_vec_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__contractorAssignments(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return from_candid_vec_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async __contractors(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__contractors(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__contractors(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async __contracts(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__contracts(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__contracts(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async __customers(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__customers(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return from_candid_vec_n6(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__customers(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return from_candid_vec_n6(this._uploadFile, this._downloadFile, result);
    }
  }
  async __departments(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__departments(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__departments(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async __employeeAssignments(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__employeeAssignments(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return from_candid_vec_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__employeeAssignments(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return from_candid_vec_n9(this._uploadFile, this._downloadFile, result);
    }
  }
  async __employees(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__employees(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return from_candid_vec_n12(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__employees(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return from_candid_vec_n12(this._uploadFile, this._downloadFile, result);
    }
  }
  async __expenses(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__expenses(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return from_candid_vec_n15(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__expenses(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return from_candid_vec_n15(this._uploadFile, this._downloadFile, result);
    }
  }
  async __internAssignments(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__internAssignments(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__internAssignments(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async __interns(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__interns(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__interns(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async __invoices(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__invoices(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return from_candid_vec_n18(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__invoices(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return from_candid_vec_n18(this._uploadFile, this._downloadFile, result);
    }
  }
  async __offices(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__offices(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__offices(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async __products(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__products(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__products(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async __projects(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__projects(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return from_candid_vec_n21(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__projects(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return from_candid_vec_n21(this._uploadFile, this._downloadFile, result);
    }
  }
  async __vendors(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.__vendors(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.__vendors(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0), to_candid_opt_n1(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async getAllContractorAssignments() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllContractorAssignments();
        return from_candid_vec_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllContractorAssignments();
      return from_candid_vec_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllContractors() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllContractors();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllContractors();
      return result;
    }
  }
  async getAllContracts() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllContracts();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllContracts();
      return result;
    }
  }
  async getAllCustomers() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllCustomers();
        return from_candid_vec_n6(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllCustomers();
      return from_candid_vec_n6(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllDepartments() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllDepartments();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllDepartments();
      return result;
    }
  }
  async getAllEmployeeAssignments() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllEmployeeAssignments();
        return from_candid_vec_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllEmployeeAssignments();
      return from_candid_vec_n9(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllEmployees() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllEmployees();
        return from_candid_vec_n12(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllEmployees();
      return from_candid_vec_n12(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllExpenses() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllExpenses();
        return from_candid_vec_n15(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllExpenses();
      return from_candid_vec_n15(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllInternAssignments() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllInternAssignments();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllInternAssignments();
      return result;
    }
  }
  async getAllInterns() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllInterns();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllInterns();
      return result;
    }
  }
  async getAllInvoices() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllInvoices();
        return from_candid_vec_n18(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllInvoices();
      return from_candid_vec_n18(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllOffices() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllOffices();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllOffices();
      return result;
    }
  }
  async getAllProducts() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllProducts();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllProducts();
      return result;
    }
  }
  async getAllProjects() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllProjects();
        return from_candid_vec_n21(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllProjects();
      return from_candid_vec_n21(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllVendors() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllVendors();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllVendors();
      return result;
    }
  }
  async uploadContractorAssignments(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadContractorAssignments(to_candid_vec_n24(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadContractorAssignments(to_candid_vec_n24(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async uploadContractors(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadContractors(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadContractors(arg0);
      return result;
    }
  }
  async uploadContracts(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadContracts(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadContracts(arg0);
      return result;
    }
  }
  async uploadCustomers(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadCustomers(to_candid_vec_n27(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadCustomers(to_candid_vec_n27(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async uploadDepartments(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadDepartments(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadDepartments(arg0);
      return result;
    }
  }
  async uploadEmployeeAssignments(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadEmployeeAssignments(to_candid_vec_n30(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadEmployeeAssignments(to_candid_vec_n30(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async uploadEmployees(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadEmployees(to_candid_vec_n33(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadEmployees(to_candid_vec_n33(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async uploadExpenses(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadExpenses(to_candid_vec_n36(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadExpenses(to_candid_vec_n36(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async uploadInternAssignments(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadInternAssignments(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadInternAssignments(arg0);
      return result;
    }
  }
  async uploadInterns(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadInterns(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadInterns(arg0);
      return result;
    }
  }
  async uploadInvoices(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadInvoices(to_candid_vec_n39(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadInvoices(to_candid_vec_n39(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async uploadOffices(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadOffices(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadOffices(arg0);
      return result;
    }
  }
  async uploadProducts(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadProducts(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadProducts(arg0);
      return result;
    }
  }
  async uploadProjects(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadProjects(to_candid_vec_n42(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadProjects(to_candid_vec_n42(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async uploadVendors(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.uploadVendors(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.uploadVendors(arg0);
      return result;
    }
  }
}
function from_candid_ContractorAssignment_n3(_uploadFile, _downloadFile, value) {
  return from_candid_record_n4(_uploadFile, _downloadFile, value);
}
function from_candid_Customer_n7(_uploadFile, _downloadFile, value) {
  return from_candid_record_n8(_uploadFile, _downloadFile, value);
}
function from_candid_EmployeeAssignment_n10(_uploadFile, _downloadFile, value) {
  return from_candid_record_n11(_uploadFile, _downloadFile, value);
}
function from_candid_Employee_n13(_uploadFile, _downloadFile, value) {
  return from_candid_record_n14(_uploadFile, _downloadFile, value);
}
function from_candid_Expense_n16(_uploadFile, _downloadFile, value) {
  return from_candid_record_n17(_uploadFile, _downloadFile, value);
}
function from_candid_Invoice_n19(_uploadFile, _downloadFile, value) {
  return from_candid_record_n20(_uploadFile, _downloadFile, value);
}
function from_candid_Project_n22(_uploadFile, _downloadFile, value) {
  return from_candid_record_n23(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n5(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n11(_uploadFile, _downloadFile, value) {
  return {
    endDate: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.endDate)),
    allocationPercent: value.allocationPercent,
    employee: value.employee,
    project: value.project,
    startDate: value.startDate
  };
}
function from_candid_record_n14(_uploadFile, _downloadFile, value) {
  return {
    manager: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.manager)),
    country: value.country,
    hireDate: value.hireDate,
    name: value.name,
    office: value.office,
    email: value.email,
    level: value.level,
    jobTitle: value.jobTitle,
    terminationDate: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.terminationDate)),
    salaryUsd: value.salaryUsd,
    department: value.department,
    employmentStatus: value.employmentStatus,
    vacationDaysRemaining: value.vacationDaysRemaining
  };
}
function from_candid_record_n17(_uploadFile, _downloadFile, value) {
  return {
    date: value.date,
    submittedBy: value.submittedBy,
    approvalStatus: value.approvalStatus,
    category: value.category,
    amountUsd: value.amountUsd,
    payee: value.payee,
    department: value.department,
    project: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.project))
  };
}
function from_candid_record_n20(_uploadFile, _downloadFile, value) {
  return {
    issueDate: value.issueDate,
    status: value.status,
    contract: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.contract)),
    dueDate: value.dueDate,
    paidDate: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.paidDate)),
    vendor: value.vendor,
    amountUsd: value.amountUsd
  };
}
function from_candid_record_n23(_uploadFile, _downloadFile, value) {
  return {
    plannedEndDate: value.plannedEndDate,
    status: value.status,
    actualEndDate: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.actualEndDate)),
    lead: value.lead,
    name: value.name,
    codename: value.codename,
    department: value.department,
    budgetUsd: value.budgetUsd,
    product: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.product)),
    startDate: value.startDate
  };
}
function from_candid_record_n4(_uploadFile, _downloadFile, value) {
  return {
    endDate: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.endDate)),
    allocationPercent: value.allocationPercent,
    contractor: value.contractor,
    project: value.project,
    startDate: value.startDate
  };
}
function from_candid_record_n8(_uploadFile, _downloadFile, value) {
  return {
    country: value.country,
    signupDate: value.signupDate,
    plan: value.plan,
    accountManager: value.accountManager,
    monthlyRevenueUsd: value.monthlyRevenueUsd,
    companyName: value.companyName,
    churnDate: record_opt_to_undefined(from_candid_opt_n5(_uploadFile, _downloadFile, value.churnDate)),
    industry: value.industry
  };
}
function from_candid_vec_n12(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Employee_n13(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n15(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Expense_n16(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n18(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Invoice_n19(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n2(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_ContractorAssignment_n3(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n21(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Project_n22(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n6(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Customer_n7(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n9(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_EmployeeAssignment_n10(_uploadFile, _downloadFile, x));
}
function to_candid_ContractorAssignment_n25(_uploadFile, _downloadFile, value) {
  return to_candid_record_n26(_uploadFile, _downloadFile, value);
}
function to_candid_Customer_n28(_uploadFile, _downloadFile, value) {
  return to_candid_record_n29(_uploadFile, _downloadFile, value);
}
function to_candid_EmployeeAssignment_n31(_uploadFile, _downloadFile, value) {
  return to_candid_record_n32(_uploadFile, _downloadFile, value);
}
function to_candid_Employee_n34(_uploadFile, _downloadFile, value) {
  return to_candid_record_n35(_uploadFile, _downloadFile, value);
}
function to_candid_Expense_n37(_uploadFile, _downloadFile, value) {
  return to_candid_record_n38(_uploadFile, _downloadFile, value);
}
function to_candid_Invoice_n40(_uploadFile, _downloadFile, value) {
  return to_candid_record_n41(_uploadFile, _downloadFile, value);
}
function to_candid_Project_n43(_uploadFile, _downloadFile, value) {
  return to_candid_record_n44(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n1(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
function to_candid_record_n26(_uploadFile, _downloadFile, value) {
  return {
    endDate: value.endDate ? candid_some(value.endDate) : candid_none(),
    allocationPercent: value.allocationPercent,
    contractor: value.contractor,
    project: value.project,
    startDate: value.startDate
  };
}
function to_candid_record_n29(_uploadFile, _downloadFile, value) {
  return {
    country: value.country,
    signupDate: value.signupDate,
    plan: value.plan,
    accountManager: value.accountManager,
    monthlyRevenueUsd: value.monthlyRevenueUsd,
    companyName: value.companyName,
    churnDate: value.churnDate ? candid_some(value.churnDate) : candid_none(),
    industry: value.industry
  };
}
function to_candid_record_n32(_uploadFile, _downloadFile, value) {
  return {
    endDate: value.endDate ? candid_some(value.endDate) : candid_none(),
    allocationPercent: value.allocationPercent,
    employee: value.employee,
    project: value.project,
    startDate: value.startDate
  };
}
function to_candid_record_n35(_uploadFile, _downloadFile, value) {
  return {
    manager: value.manager ? candid_some(value.manager) : candid_none(),
    country: value.country,
    hireDate: value.hireDate,
    name: value.name,
    office: value.office,
    email: value.email,
    level: value.level,
    jobTitle: value.jobTitle,
    terminationDate: value.terminationDate ? candid_some(value.terminationDate) : candid_none(),
    salaryUsd: value.salaryUsd,
    department: value.department,
    employmentStatus: value.employmentStatus,
    vacationDaysRemaining: value.vacationDaysRemaining
  };
}
function to_candid_record_n38(_uploadFile, _downloadFile, value) {
  return {
    date: value.date,
    submittedBy: value.submittedBy,
    approvalStatus: value.approvalStatus,
    category: value.category,
    amountUsd: value.amountUsd,
    payee: value.payee,
    department: value.department,
    project: value.project ? candid_some(value.project) : candid_none()
  };
}
function to_candid_record_n41(_uploadFile, _downloadFile, value) {
  return {
    issueDate: value.issueDate,
    status: value.status,
    contract: value.contract ? candid_some(value.contract) : candid_none(),
    dueDate: value.dueDate,
    paidDate: value.paidDate ? candid_some(value.paidDate) : candid_none(),
    vendor: value.vendor,
    amountUsd: value.amountUsd
  };
}
function to_candid_record_n44(_uploadFile, _downloadFile, value) {
  return {
    plannedEndDate: value.plannedEndDate,
    status: value.status,
    actualEndDate: value.actualEndDate ? candid_some(value.actualEndDate) : candid_none(),
    lead: value.lead,
    name: value.name,
    codename: value.codename,
    department: value.department,
    budgetUsd: value.budgetUsd,
    product: value.product ? candid_some(value.product) : candid_none(),
    startDate: value.startDate
  };
}
function to_candid_vec_n24(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_ContractorAssignment_n25(_uploadFile, _downloadFile, x));
}
function to_candid_vec_n27(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_Customer_n28(_uploadFile, _downloadFile, x));
}
function to_candid_vec_n30(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_EmployeeAssignment_n31(_uploadFile, _downloadFile, x));
}
function to_candid_vec_n33(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_Employee_n34(_uploadFile, _downloadFile, x));
}
function to_candid_vec_n36(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_Expense_n37(_uploadFile, _downloadFile, x));
}
function to_candid_vec_n39(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_Invoice_n40(_uploadFile, _downloadFile, x));
}
function to_candid_vec_n42(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_Project_n43(_uploadFile, _downloadFile, x));
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
function useBackendActor() {
  return useActor(createActor);
}
function useEmployees() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEmployees();
    },
    enabled: !!actor && !isFetching
  });
}
function useContractors() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["contractors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContractors();
    },
    enabled: !!actor && !isFetching
  });
}
function useInterns() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["interns"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInterns();
    },
    enabled: !!actor && !isFetching
  });
}
function useProjects() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching
  });
}
function useProducts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching
  });
}
function useOffices() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["offices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOffices();
    },
    enabled: !!actor && !isFetching
  });
}
function useCustomers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCustomers();
    },
    enabled: !!actor && !isFetching
  });
}
function useVendors() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVendors();
    },
    enabled: !!actor && !isFetching
  });
}
function useDepartments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDepartments();
    },
    enabled: !!actor && !isFetching
  });
}
function useContracts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContracts();
    },
    enabled: !!actor && !isFetching
  });
}
function useInvoices() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInvoices();
    },
    enabled: !!actor && !isFetching
  });
}
function useExpenses() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllExpenses();
    },
    enabled: !!actor && !isFetching
  });
}
function useEmployeeAssignments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["employeeAssignments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEmployeeAssignments();
    },
    enabled: !!actor && !isFetching
  });
}
function useContractorAssignments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["contractorAssignments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContractorAssignments();
    },
    enabled: !!actor && !isFetching
  });
}
function useInternAssignments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["internAssignments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInternAssignments();
    },
    enabled: !!actor && !isFetching
  });
}
export {
  useContractors as a,
  useInterns as b,
  useProjects as c,
  useProducts as d,
  useOffices as e,
  useCustomers as f,
  useActor as g,
  useVendors as h,
  useDepartments as i,
  useContracts as j,
  useInvoices as k,
  useExpenses as l,
  useEmployeeAssignments as m,
  useContractorAssignments as n,
  useInternAssignments as o,
  createActor as p,
  useEmployees as u
};
