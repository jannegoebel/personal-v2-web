export type QueryResult<T> = {
  isLoading: boolean;
  isError: boolean;
  data:
    { ok: boolean; message: string; payload: T | null | undefined } | undefined;
};

function isValidNonEmptyQuery<T>(query: QueryResult<T>): query is {
  isLoading: false;
  isError: false;
  data: { ok: true; message: string; payload: T };
} {
  return (
    !query.isLoading &&
    !query.isError &&
    query.data != null &&
    query.data.ok === true &&
    query.data.payload != null
  );
}

function isValidEmptyQuery<T>(query: QueryResult<T>): query is {
  isLoading: false;
  isError: false;
  data: { ok: true; message: string; payload: null | undefined };
} {
  return (
    !query.isLoading &&
    !query.isError &&
    query.data != null &&
    query.data.ok === true &&
    (query.data.payload == null ||
      (Array.isArray(query.data.payload) && query.data.payload.length === 0))
  );
}

export function matchQuery<Q, R>(
  query: QueryResult<Q>,
  matcher: {
    loading?: () => R;
    error?: () => R;
    empty?: () => R;
    success: (payload: Q) => R;
  },
) {
  if (query.isLoading) {
    return matcher.loading?.();
  }

  if (isValidEmptyQuery(query)) {
    return matcher.empty?.() ?? matcher.error?.();
  }

  if (isValidNonEmptyQuery(query)) {
    return matcher.success(query.data.payload);
  }

  return matcher.error?.();
}
