// store/modules/cards.ts

import axios from 'axios'
import { createStore } from 'vuex'

export interface Card {
    id: string
    title: string
    color: string
    active: boolean
    linked: boolean
}

interface CardsState {
    cards: Card[]
}

export default createStore({
    state: (): CardsState => ({
        cards: []
    }),
    mutations: {
        setCards(state: CardsState, cards: Card[]) {
            state.cards = cards
        },
        updateCardColor(state: CardsState, { cardId, selectedColor }) {
            const card = state.cards.find((c) => c.id === cardId)
            if (card) {
                card.selectedColor = selectedColor
            }
        },
        updateCardActive(state, { cardId, isActive }) {
            state.cards.forEach((card) => {
                card.active = card.id === cardId ? isActive : false
            })
        }
    },
    actions: {
        async fetchCards({ commit }) {
            try {
                const response = await axios.get('https://api.mocki.io/v2/016d11e8/product-widgets')
                const cards = response.data
                commit('setCards', cards)
                console.log('Cards in fetchCards action:', cards)
            } catch (error) {
                console.error('Error fetching cards:', error)
            }
        },
        updateCardColor({ commit }, payload) {
            // Additional logic can be added here, such as API calls
            commit('updateCardColor', payload)
        },
        updateCardActive({ commit }, payload) {
            // Additional logic can be added here, such as API calls
            commit('updateCardActive', payload)
        }
    },
    getters: {
        cards: (state: CardsState) => state.cards
    }
})
