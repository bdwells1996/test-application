<script setup lang="ts"></script>

<template>
    <div class="dashboard">
        <div class="dashboard__img">
            <img class="dashboard__img__image" src="../assets/apple-watch.jpg" alt="Apple Watch" />
            <div v-for="card in activeCards" :key="card.id" class="dashboard__img__card">
                <div
                    class="dashboard__img__card__info"
                    :class="`dashboard__img__card__info--${card.color}`"
                >
                    <GreenSparkLogo class="dashboard__img__card__info__logo" />
                    <div class="dashboard__img__card__info__content">
                        <p class="dashboard__img__card__info__content__tagline">
                            This product {{ card.action }}
                        </p>
                        <p class="dashboard__img__card__info__content__text">
                            {{ card.amount }} {{ card.type }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="dashboard__content">
            <h2 class="dashboard__content__title">Apple Watch - Space Grey</h2>
            <p class="dashboard__content__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eos odit laborum
                pariatur quia nostrum ea veniam excepturi corporis perferendis magnam assumenda
                molestias obcaecati beatae unde numquam distinctio quos, sint dolorem labore
                ducimus? Nihil ullam eligendi laborum ex ipsa at provident recusandae facilis unde,
                eveniet a id itaque maiores corporis error odit repellendus architecto. Eum
                distinctio explicabo molestias odio quaerat aut numquam, totam iste corrupti earum
                nulla perspiciatis soluta tempore, mollitia accusamus quia autem saepe illo iusto
                eaque assumenda, aliquam corporis? Dignissimos quidem accusamus natus quae, debitis
                veniam, modi ipsum commodi soluta possimus tenetur nam eaque. Dignissimos
                repellendus dolor quas.
            </p>
            <button class="dashboard__content__btn">Add to cart</button>
        </div>
    </div>
</template>

<style lang="scss">
.dashboard {
    display: grid;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 42px;
    }
    &__img {
        &__image {
            max-width: 360px;
            border-radius: 8px;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

            @media (max-width: 768px) {
                max-width: 100%;
            }
        }

        &__card {
            &__info {
                max-width: 360px;
                border-radius: 6px;
                padding: 12px 24px;
                margin-top: 14px;
                display: flex;
                align-items: center;
                &--green {
                    background-color: #3b755f; // make these colours variables so we only have to update them in one place
                }

                &--blue {
                    background-color: #2e3a8c;
                }

                &--beige {
                    background-color: #f2ebdb;
                    color: #3b755f;
                    .dashboard__img__card__info__logo {
                        fill: #3b755f;
                    }
                    .dashboard__img__card__info__content {
                        color: #3b755f;
                    }
                }

                &--white {
                    background-color: #ffffff;
                    color: #3b755f;

                    .dashboard__img__card__info__logo {
                        fill: #3b755f;
                    }

                    .dashboard__img__card__info__content {
                        color: #3b755f;
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
                    color: #ffffff;

                    &__tagline {
                        font-size: 12px;
                        margin: 0;
                    }

                    &__text {
                        font-size: 18px;
                        font-weight: bold;
                        margin: 4px 0 0 0;
                    }
                }
            }
        }
    }

    &__content {
        &__btn {
            border: none;
            padding: 12px 32px;
            font-size: 16px;
            background-color: #2e3a8c;
            color: #ffffff;
            border-radius: 4px;
        }
    }
}
</style>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { type Card } from '@/store/modules/cards'
import GreenSparkLogo from '../components/GreenSparkLogo.vue'

export default defineComponent({
    components: { GreenSparkLogo },
    computed: {
        activeCards(): Card[] {
            // Use Vuex store to get active cards
            return this.$store.getters.activeCards
        }
    }
})
</script>
