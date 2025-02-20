export function Cache(
	cacheKey: string,
	cacheExpirationMs: number = 60 * 60 * 1000,
) {
	return (
		_target: unknown,
		_propertyKey: string,
		descriptor: PropertyDescriptor,
	) => {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: unknown[]): Promise<unknown> {
			const cachedData = sessionStorage.getItem(cacheKey);
			if (cachedData) {
				const parsedCache = JSON.parse(cachedData);
				const isCacheValid =
					Date.now() - parsedCache.cacheTimestamp < cacheExpirationMs;
				if (isCacheValid) {
					return parsedCache.data;
				}
				sessionStorage.removeItem(cacheKey);
			}

			const result = await originalMethod.apply(this, args);

			const cacheData = {
				data: result,
				cacheTimestamp: Date.now(),
			};
			sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
			return result;
		};

		return descriptor;
	};
}
