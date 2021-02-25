export default httpClient => ({
    getAll: async () => {
        const { response } = await httpClient.get('/products');

        return { data: response.data }
    },
    getProduct: async (slug) => {
        const { response } = await httpClient.get(`/products/${slug}`);

        return { data: response.data }
    }
});
