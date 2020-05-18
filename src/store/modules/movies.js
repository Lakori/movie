import axios from '@/plugins/axios';
import IDs from '@/store/mocks/top250';

const moviesStore = {
    namespaced: true,
    state: {
        top250IDs: IDs,
        moviesPerPage: 12,
        currentPage: 1
    },
    getters: {
        slicedIDs: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
        currentPage: ({ currentPage }) => currentPage,
        moviesPerPage: ({ moviesPerPage }) => moviesPerPage
    },
    mutations: {},
    actions: {
        async fetchMovies({ getters }) {
            const { currentPage, moviesPerPage, slicedIDs } = getters;
            const from = currentPage * moviesPerPage - moviesPerPage;
            const to = currentPage * moviesPerPage;
            const moviesFetch = slicedIDs(from, to)
            console.log(moviesFetch)

            const request = moviesFetch.map((id) => axios.get(`/?i=${id}`));
            const response = await Promise.all(request)
            // const response = await axios.get('/', {
            //     params: {
            //         i: 'tt0111161',

            //     }
            // })
            console.log(response)
        }
    }
};

export default moviesStore;