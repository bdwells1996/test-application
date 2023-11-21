<template>
    <div class="product-widget">
        <h3 class="product-widget__title">Per product widgets</h3>
        <div class="cards-container">
            <div class="cards-container__item" v-for="card in cards" :key="card.id">
                <div
                    class="cards-container__item__title"
                    :class="`cards-container__item__title--${card.selectedColor}`"
                >
                    <img
                        src="../assets/greenspark-logo.svg"
                        class="cards-container__item__title__logo"
                    />
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
                                src="../assets/info_outline.svg"
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

<style scoped lang="scss">
.product-widget {
    max-width: 1000px;
    padding: 36px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow:
        0px 0.77778px 2.99074px 0px rgba(0, 0, 0, 0.01),
        0px 3.42222px 6.19259px 0px rgba(0, 0, 0, 0.02),
        0px 8.4px 12.35px 0px rgba(0, 0, 0, 0.03),
        0px 16.17778px 24.20741px 0px rgba(0, 0, 0, 0.03),
        0px 27.22222px 44.50926px 0px rgba(0, 0, 0, 0.04),
        0px 42px 76px 0px rgba(0, 0, 0, 0.05);

    &__title {
        margin: 0 0 14px 0;
    }
}

.cards-container {
    display: grid;
    border-top: 2px solid #b0b0b0;
    padding-top: 32px;

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        column-gap: 58px;
    }
    &__item {
        &__title {
            padding: 12px;
            border-radius: 6px;
            color: #ffffff;
            display: flex;

            &--green {
                background-color: #3b755f; // make these colours variables so we only have to update them in one place
            }

            &--blue {
                background-color: #2e3a8c;
            }

            &--beige {
                background-color: #f2ebdb;
                color: #3b755f;
                .cards-container__item__title__logo {
                    fill: #3b755f;
                }
            }

            &--white {
                background-color: #ffffff;
                color: #3b755f;

                .cards-container__item__title__logo {
                    fill: #3b755f;
                }
            }

            &--black {
                background-color: #212121;
            }

            &__logo {
                margin-right: 14px;
                fill: #f9f9f9;
            }

            &__content {
                .cards-container__item__title__tagline {
                    font-size: 12px;
                    margin: 0;
                }

                .cards-container__item__title__text {
                    font-size: 18px;
                    font-weight: bold;
                    margin: 4px 0 0 0;
                }
            }
        }

        &__body {
            color: #3b755f;

            &__link {
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;

                &__text {
                    display: flex;
                    align-items: flex-start;
                    img {
                        cursor: pointer;
                    }
                }

                &__checkbox {
                    visibility: hidden;
                    height: 18px;
                    width: 18px;
                    position: relative;
                    cursor: pointer;

                    &:hover {
                        &::after {
                            opacity: 0.5;
                        }
                    }

                    &:checked {
                        &::before {
                            background-image: url('../assets/checkbox-checked.svg');
                            background-repeat: no-repeat;
                            background-position: center;
                            background-color: #3b755f;
                            border: 2px solid #3b755f;
                        }

                        &::after {
                            opacity: 0;
                        }
                    }

                    &::before {
                        content: '';
                        height: 100%;
                        width: 100%;
                        border: 2px solid #212121;
                        visibility: visible;
                        display: flex;
                        border-radius: 2px;
                    }

                    &::after {
                        content: '';
                        height: 40px;
                        width: 40px;
                        position: absolute;
                        top: -9px;
                        left: -9px;
                        z-index: 2;
                        display: flex;
                        background-color: #afc6bd;
                        opacity: 0;
                        pointer-events: none;
                        visibility: visible;
                        border-radius: 50%;
                        transition: opacity 200ms ease;
                    }
                }

                &__tooltip {
                    position: absolute;
                    right: 0;
                    top: -160px;
                    width: 248px;
                    padding: 24px 16px;
                    background-color: #fff;
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    font-size: 14px;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 200ms ease;
                    box-shadow:
                        0px 0.77778px 2.99074px 0px rgba(0, 0, 0, 0.01),
                        0px 3.42222px 6.19259px 0px rgba(0, 0, 0, 0.02),
                        0px 8.4px 12.35px 0px rgba(0, 0, 0, 0.03),
                        0px 16.17778px 24.20741px 0px rgba(0, 0, 0, 0.03),
                        0px 27.22222px 44.50926px 0px rgba(0, 0, 0, 0.04),
                        0px 42px 76px 0px rgba(0, 0, 0, 0.05);

                    &:hover {
                        opacity: 1;
                        pointer-events: all;
                    }

                    &--active {
                        opacity: 1;
                        pointer-events: all;
                    }

                    &__text {
                        color: #212121;
                    }

                    &__link {
                        color: #3b755f;
                        text-decoration: none;
                        font-weight: bold;
                    }
                }
            }

            &__colour {
                display: flex;
                justify-content: space-between;

                &__options {
                    display: flex;
                    gap: 2px;
                    margin-bottom: 12px;
                    .cards-container__item__body__colour__option {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .colour-option {
                            height: 18px;
                            width: 18px;
                            visibility: none;
                            cursor: pointer;
                            transition: opacity 200ms ease;

                            &:hover {
                                opacity: 0.8;
                            }

                            &:checked {
                                &:hover {
                                    opacity: 1;
                                }
                                &::before {
                                    border: 2px solid #b0b0b0;
                                }
                            }

                            &--green {
                                &::before {
                                    background-color: #3b755f;
                                    border: 2px solid #3b755f;
                                }
                            }
                            &--blue {
                                &::before {
                                    background-color: #2e3a8c;
                                    border: 2px solid #2e3a8c;
                                }
                            }

                            &--beige {
                                &::before {
                                    background-color: #f2ebdb;
                                    border: 2px solid #f2ebdb;
                                }
                            }

                            &--white {
                                &::before {
                                    background-color: #ffffff;
                                    border: 2px solid #ffffff;
                                }
                            }

                            &--black {
                                &::before {
                                    background-color: #212121;
                                    border: 2px solid #212121;
                                }
                            }

                            &::before {
                                content: '';
                                height: 100%;
                                width: 100%;
                                display: flex;

                                visibility: visible;
                            }
                        }
                    }
                }
            }
        }

        &__active {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #3b755f;

            &__toggle {
                height: 20px;
                width: 40px;
                position: relative;

                &:checked {
                    &::before {
                        transform: translateX(100%);
                        border: 1px solid #3b755f;
                    }

                    &::after {
                        background: #3b755f;
                    }
                }

                &::after {
                    content: '';
                    border-radius: 29px;
                    border: 1px solid #afc6bd;
                    background: #f9f9f9;
                    box-shadow: 0px 0.88467px 5.8978px 0px rgba(0, 0, 0, 0.15) inset;
                    height: 100%;
                    width: 100%;
                    display: flex;
                }

                &::before {
                    content: '';
                    border: 1px solid #f2ebdb;
                    background: #f9f9f9;
                    box-shadow: 0px 0px 1.17956px 0px rgba(0, 0, 0, 0.35);
                    height: 20px;
                    width: 20px;
                    position: absolute;
                    border-radius: 100%;
                    transform: translateX(0);
                    transition: transform 200ms ease;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    data() {
        return {
            hoveredCard: null
        }
    },
    methods: {
        setHoveredCard(cardId, isHovered) {
            this.hoveredCard = isHovered ? cardId : null
        }
    },
    setup() {
        const store = useStore()
        const cards = ref([])
        const activeCard = ref(null)

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

        const selectColor = (card, color) => {
            card.selectedColor = color
            store.dispatch('updateCardColor', { cardId: card.id, selectedColor: color })
        }

        const toggleActive = (cardId) => {
            activeCard.value = cardId
            store.dispatch('updateCardActive', { cardId, isActive: true })
            console.log(activeCard.value)
        }

        const isActiveRadio = (cardId) => {
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
