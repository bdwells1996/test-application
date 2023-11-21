<template>
    <div class="product-widget">
        <h3 class="product-widget__title">Per product widgets</h3>
        <div class="cards-container">
            <div class="cards-container__item" v-for="card in cards" :key="card.id">
                <div
                    :class="[
                        'cards-container__item__title',
                        `cards-container__item__title--${card.selectedColor}`
                    ]"
                >
                    <GreenSparkLogo class="cards-container__item__title__logo" />
                    <div class="cards-container__item__title__content">
                        <p class="cards-container__item__title__tagline">
                            This product {{ card.action }}
                        </p>
                        <p class="cards-container__item__title__text">
                            {{ card.amount }} {{ card.type }}
                        </p>
                    </div>
                </div>
                <div class="cards-container__item__body">
                    <div class="cards-container__item__body__link">
                        <p class="cards-container__item__body__link__text">
                            Link to Public Profile
                            <img
                                src="@/assets/info_outline.svg"
                                @mouseover="setHoveredCard(card.id, true)"
                                @mouseout="setHoveredCard(card.id, false)"
                            />
                        </p>
                        <div
                            class="cards-container__item__body__link__tooltip"
                            :class="{
                                'cards-container__item__body__link__tooltip--active':
                                    hoveredCard === card.id
                            }"
                        >
                            <p class="cards-container__item__body__link__tooltip__text">
                                This widget links directly to your public profile so that you can
                                easily share your impact with your customers. Turn it off here if
                                you do not want the badge to link to it.
                            </p>
                            <a class="cards-container__item__body__link__tooltip__link" href="/"
                                >View Public Profile</a
                            >
                        </div>
                        <input
                            class="cards-container__item__body__link__checkbox"
                            type="checkbox"
                            name="public-profile"
                            id="public-profile"
                        />
                    </div>
                    <div class="cards-container__item__body__colour">
                        <label class="cards-container__item__body__colour__text"
                            >Badge colour</label
                        >
                        <div class="cards-container__item__body__colour__options">
                            <div
                                v-for="(color, index) in colorOptions"
                                :key="index"
                                class="cards-container__item__body__colour__option"
                                @click="selectColor(card, color)"
                            >
                                <input
                                    type="radio"
                                    :class="`colour-option--${color}`"
                                    class="colour-option"
                                    :id="'colour-option-' + index"
                                    :name="'colour-option-' + card.id"
                                    :value="color"
                                    v-model="card.selectedColor"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cards-container__item__active">
                    <label
                        class="cards-container__item__active__text"
                        :for="'active-card-' + card.id"
                        >Active</label
                    >
                    <input
                        type="radio"
                        class="cards-container__item__active__toggle"
                        :checked="isActiveRadio(card.id)"
                        @change="toggleActive(card.id)"
                        name="active-card"
                        :id="'active-card-' + card.id"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect, reactive } from 'vue'
import GreenSparkLogo from '@/components/GreenSparkLogo.vue'
import { useStore } from 'vuex'
import './CardList.scss'

interface Card {
    id: string
    title: string
    color: string
    action: string
    amount: number
    type: string
    selectedColor: string
}

export default defineComponent({
    components: { GreenSparkLogo },
    data() {
        return {
            hoveredCard: null as string | null
        }
    },
    methods: {
        setHoveredCard(cardId: string, isHovered: boolean) {
            this.hoveredCard = isHovered ? cardId : null
        }
    },
    setup() {
        const store = useStore()
        const cards = ref<Card[]>([])
        const activeCard = ref<string | null>(null)

        watchEffect(() => {
            cards.value = store.getters.cards
            console.log('Cards:', cards.value)
        })

        onMounted(async () => {
            try {
                await store.dispatch('fetchCards')
            } catch (error) {
                console.error('Error fetching cards:', error)
            }
            console.log('Active:', activeCard.value)
        })

        const colorOptions = ['blue', 'green', 'beige', 'white', 'black']

        const selectColor = (card: Card, color: string) => {
            store.dispatch('updateCardColor', { cardId: card.id, selectedColor: color })
            store.commit('setCards', [...store.state.cards])
        }

        const toggleActive = (cardId: string) => {
            activeCard.value = cardId
            store.dispatch('updateCardActive', { cardId, isActive: true })
            store.commit('setCards', [...store.state.cards]) // Update the entire cards array
            console.log(activeCard.value)
            console.log('activeCard after toggle:', activeCard.value)
        }

        const isActiveRadio = (cardId: string) => {
            return activeCard.value === cardId
        }

        return {
            cards,
            colorOptions,
            selectColor,
            toggleActive,
            isActiveRadio,
            activeCard
        }
    }
})
</script>
