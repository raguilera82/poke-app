import axios, { type AxiosRequestConfig } from "axios";

/**
 * HTTP request methods
 */
enum HttpMethod {
	GET = "get",
	POST = "post",
	PUT = "put",
	DELETE = "delete",
	PATCH = "patch",
}

/**
 * Generic request service to abstract the HTTP client implementation
 */
class HttpHelper {
	private token: string | null = null;

	constructor() {
		this.setupInterceptors();
	}

	private setupInterceptors() {
		axios.interceptors.request.use(
			(config) => {
				if (this.token) {
					config.headers.Authorization = `Bearer ${this.token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);

		axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error.response.status === 401) {
					this.token = null;
				}
				return Promise.reject(error);
			},
		);
	}

	/**
	 * Sets the authentication token for subsequent requests
	 * @param token The Bearer token
	 */
	setAuthToken(token: string | null) {
		this.token = token;
	}

	/**
	 * Makes a request to the API
	 * @param method HTTP method
	 * @param endpoint API endpoint
	 * @param data Request payload data
	 * @param config Additional request configuration
	 * @returns Promise with response data
	 */
	async request<T, D = unknown>(
		method: HttpMethod,
		url: string,
		data?: D,
		config?: Omit<AxiosRequestConfig, "url" | "method" | "data">,
	): Promise<T> {
		const response = await axios.request<T>({
			url,
			method,
			data,
			...config,
		});

		return response.data;
	}

	/**
	 * Makes a GET request
	 * @param endpoint API endpoint
	 * @param config Additional request configuration
	 * @returns Promise with response data
	 */
	async get<T>(
		endpoint: string,
		config?: Omit<AxiosRequestConfig, "url" | "method">,
	): Promise<T> {
		return this.request<T>(HttpMethod.GET, endpoint, undefined, config);
	}

	/**
	 * Makes a POST request
	 * @param endpoint API endpoint
	 * @param data Request payload data
	 * @param config Additional request configuration
	 * @returns Promise with response data
	 */
	async post<T, D = unknown>(
		endpoint: string,
		data?: D,
		config?: Omit<AxiosRequestConfig, "url" | "method" | "data">,
	): Promise<T> {
		return this.request<T, D>(HttpMethod.POST, endpoint, data, config);
	}

	/**
	 * Makes a PUT request
	 * @param endpoint API endpoint
	 * @param data Request payload data
	 * @param config Additional request configuration
	 * @returns Promise with response data
	 */
	async put<T, D = unknown>(
		endpoint: string,
		data?: D,
		config?: Omit<AxiosRequestConfig, "url" | "method" | "data">,
	): Promise<T> {
		return this.request<T, D>(HttpMethod.PUT, endpoint, data, config);
	}

	/**
	 * Makes a DELETE request
	 * @param endpoint API endpoint
	 * @param config Additional request configuration
	 * @returns Promise with response data
	 */
	async delete<T>(
		endpoint: string,
		config?: Omit<AxiosRequestConfig, "url" | "method">,
	): Promise<T> {
		return this.request<T>(HttpMethod.DELETE, endpoint, undefined, config);
	}

	/**
	 * Makes a PATCH request
	 * @param endpoint API endpoint
	 * @param data Request payload data
	 * @param config Additional request configuration
	 * @returns Promise with response data
	 */
	async patch<T, D = unknown>(
		endpoint: string,
		data?: D,
		config?: Omit<AxiosRequestConfig, "url" | "method" | "data">,
	): Promise<T> {
		return this.request<T, D>(HttpMethod.PATCH, endpoint, data, config);
	}
}

// Create a singleton instance to be used throughout the application
export const http = new HttpHelper();
