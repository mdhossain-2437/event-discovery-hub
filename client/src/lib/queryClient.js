import { QueryClient } from "@tanstack/react-query";

/**
 * Throws an error if the response is not ok
 * @param {Response} res - Fetch response
 * @throws {Error} If response is not ok
 */
async function throwIfResNotOk(res) {
	if (!res.ok) {
		const text = (await res.text()) || res.statusText;
		throw new Error(`${res.status}: ${text}`);
	}
}

/**
 * Makes an API request
 * @param {string} method - HTTP method
 * @param {string} url - Request URL
 * @param {any} [data] - Request data
 * @returns {Promise<Response>} Fetch response
 */
export async function apiRequest(method, url, data) {
	const res = await fetch(url, {
		method,
		headers: data ? { "Content-Type": "application/json" } : {},
		body: data ? JSON.stringify(data) : undefined,
		credentials: "include",
	});

	await throwIfResNotOk(res);
	return res;
}

/**
 * Creates a query function for react-query
 * @param {Object} options - Query function options
 * @param {string} options.on401 - Behavior on 401 unauthorized ('returnNull' or 'throw')
 * @returns {Function} Query function
 */
export const getQueryFn = ({ on401: unauthorizedBehavior }) => {
	return async ({ queryKey }) => {
		const res = await fetch(queryKey[0], {
			credentials: "include",
		});

		if (unauthorizedBehavior === "returnNull" && res.status === 401) {
			return null;
		}

		await throwIfResNotOk(res);
		return await res.json();
	};
};

/**
 * React Query client instance
 */
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: getQueryFn({ on401: "throw" }),
			refetchInterval: false,
			refetchOnWindowFocus: false,
			staleTime: Infinity,
			retry: false,
		},
		mutations: {
			retry: false,
		},
	},
});
