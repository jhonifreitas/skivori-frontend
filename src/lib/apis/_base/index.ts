"use server";

import { updateTag } from "next/cache";

import { API_BASE_URL, API_TOKEN, REVALIDATE_TIME } from "./constants";
import { IError, TApiOption } from "./types";

export async function getApi<T = unknown>(
  endpoint: string,
  options?: TApiOption,
): Promise<T | IError> {
  const params = new URLSearchParams();

  if (options?.query) {
    const values = Object.entries(options.query).filter(([, value]) => value);
    for (const [key, value] of values) {
      if (value instanceof Array) params.set(key, value.join(","));
      else params.set(key, value!.toString());
    }
  }

  const headers = options?.headers || (await getHeaders(!!options?.noAuth));
  const fetchOptions: RequestInit = { headers };
  if (options?.tags) {
    fetchOptions.next = { tags: options.tags, revalidate: REVALIDATE_TIME };
    fetchOptions.cache = "force-cache";
  }

  const res = await fetch(
    `${API_BASE_URL}/${endpoint}?${params}`,
    fetchOptions,
  );

  const json = await res.json().catch(() => undefined);
  if (!res.ok) {
    const error = new Error(json?.message || json?.error || json);
    return {
      error,
      statusCode: res.status,
    };
  }
  return json;
}

export async function postApi<T = unknown>(
  endpoint: string,
  data?: object,
  options?: TApiOption,
): Promise<T | IError> {
  const headers = options?.headers || (await getHeaders(!!options?.noAuth));
  const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => undefined);
  if (!res.ok) {
    const error = new Error(json?.message || json?.error || json);
    return {
      error,
      statusCode: res.status,
    };
  }

  options?.tags?.map((tag) => updateTag(tag));

  return json;
}

export async function putApi<T = unknown>(
  endpoint: string,
  data?: object,
  options?: TApiOption,
): Promise<T | IError> {
  const headers = options?.headers || (await getHeaders(!!options?.noAuth));
  const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => undefined);
  if (!res.ok) {
    const error = new Error(json?.message || json?.error || json);
    return {
      error,
      statusCode: res.status,
    };
  }

  options?.tags?.map((tag) => updateTag(tag));

  return json;
}

export async function patchApi<T = unknown>(
  endpoint: string,
  data?: object,
  options?: TApiOption,
): Promise<T | IError> {
  const headers = options?.headers || (await getHeaders(!!options?.noAuth));
  const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => undefined);
  if (!res.ok) {
    const error = new Error(json?.message || json?.error || json);
    return {
      error,
      statusCode: res.status,
    };
  }

  options?.tags?.map((tag) => updateTag(tag));

  return json;
}

export async function deleteApi(
  endpoint: string,
  options?: TApiOption,
  data?: object,
): Promise<void | IError> {
  const headers = options?.headers || (await getHeaders(!!options?.noAuth));
  const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "DELETE",
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => undefined);
    const error = new Error(json?.message || json?.error || json);
    return {
      error,
      statusCode: res.status,
    };
  }

  options?.tags?.map((tag) => updateTag(tag));
}

async function getHeaders(noAuth: boolean): Promise<HeadersInit> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "X-Idempotency-Key": crypto.randomUUID(),
  };
  if (noAuth) return headers;

  headers["Authorization"] = `Bearer ${API_TOKEN}`;

  return headers;
}
