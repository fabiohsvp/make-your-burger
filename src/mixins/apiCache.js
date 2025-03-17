export default {
  data() {
    return {
      apiCache: {}
    }
  },
  methods: {
    async fetchWithCache(url, options = {}) {
      // If it's not a GET request, don't use cache
      if (options.method && options.method !== 'GET') {
        return fetch(url, options);
      }

      // Check if we have a cached response
      const cacheKey = url;
      if (this.apiCache[cacheKey]) {
        return {
          ok: true,
          json: () => Promise.resolve(JSON.parse(JSON.stringify(this.apiCache[cacheKey])))
        };
      }

      // If not cached, make the request
      const response = await fetch(url, options);
      
      if (response.ok) {
        // Cache the response
        const data = await response.json();
        this.apiCache[cacheKey] = data;
        
        // Return a response-like object with the data
        return {
          ok: true,
          json: () => Promise.resolve(JSON.parse(JSON.stringify(data)))
        };
      }
      
      return response;
    },
    clearCache(url = null) {
      if (url) {
        delete this.apiCache[url];
      } else {
        this.apiCache = {};
      }
    }
  }
}