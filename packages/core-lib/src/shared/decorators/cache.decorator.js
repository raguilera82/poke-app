/**
 * Creates a cache decorator that stores the result in sessionStorage
 * @param {string} cacheKey - The key to use in sessionStorage
 * @param {number} expirationMinutes - Cache expiration time in minutes
 * @returns {Function} - The decorator function
 */
export function withCache(cacheKey, expirationMinutes = 30) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args) {
            const storageKey = `cache_${cacheKey}`;
            
            try {
                const cached = sessionStorage.getItem(storageKey);
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached);
                    const isExpired = Date.now() - timestamp > expirationMinutes * 60 * 1000;
                    
                    if (!isExpired) {
                        console.log(`[Cache Hit] Using cached ${cacheKey}`);
                        return data;
                    }
                    sessionStorage.removeItem(storageKey);
                }
            } catch (error) {
                console.warn('[Cache] Error reading from sessionStorage:', error);
            }

            console.log(`[Cache Miss] Fetching ${cacheKey}`);
            const result = await originalMethod.apply(this, args);
            
            try {
                const cacheData = {
                    data: result,
                    timestamp: Date.now()
                };
                sessionStorage.setItem(storageKey, JSON.stringify(cacheData));
            } catch (error) {
                console.warn('[Cache] Error writing to sessionStorage:', error);
            }

            return result;
        };

        return descriptor;
    };
}
