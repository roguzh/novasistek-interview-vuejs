import { getComics } from '@/api/api';
import type { Comic } from '@/types/types';
import { createStore } from 'vuex';

interface State {
    isLoading: boolean;
    comicList: Array<Comic>;
    selectedComic: Comic | null;
    favouriteComics: Array<number>;
    toggleFavourites: boolean;
}

const store = createStore<State>({
    state: {
        favouriteComics: [],
        comicList: [],
        selectedComic: null,
        isLoading: false,
        toggleFavourites: false
    },
    mutations: {
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
        setComics(state, comicList: Array<Comic>) {
            state.comicList = comicList;
        },
        setSelectedComic(state, comic: Comic | null) {
            state.selectedComic = comic;
        },
        changeComicFavState(state, comicId: number) {
            const index = state.favouriteComics.indexOf(comicId);
            //Unfav if exists
            if (index != -1) {
                state.favouriteComics.splice(index, 1);
            } else {
                state.favouriteComics.push(comicId);
            }
        },
        changeToggleFavourites(state) {
            state.toggleFavourites = !state.toggleFavourites;
        }
    },
    actions: {
        async fetchComics({ commit }) {
            try {
                commit('setIsLoading', true);
                const comicList = await getComics();
                commit('setIsLoading', false);
                commit('setComics', comicList);
            } catch (error) {
                console.error('Error fetching comicList:', error);
            }
        },
    },
    getters: {
        getComicByID: (state) => (id: number) => {
            return state.comicList.find((c) => c.id == id);
        },
        isComicFav: (state) => (id: number) => {
            return state.favouriteComics.includes(id);
        }
    },
});

export default store;