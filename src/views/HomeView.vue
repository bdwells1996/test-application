<script setup lang="ts"></script>

<template>
    <div class="dashboard">
        <h2>Active Cards Dashboard</h2>
        <div v-for="card in activeCards" :key="card.id" class="dashboard-card">
            <div :style="{ backgroundColor: card.color }" class="dashboard-card-color"></div>
            <div class="dashboard-card-info">
                <div class="cards-container__item__title__content">
                    <p class="cards-container__item__title__tagline">
                        This product {{ card.action }}
                    </p>
                    <p class="cards-container__item__title__text">
                        {{ card.amount }} {{ card.type }}
                    </p>
                </div>
                <p>{{ card.active ? 'Active' : 'Inactive' }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { type Card } from '@/store/modules/cards'

export default defineComponent({
    computed: {
        activeCards(): Card[] {
            // Use Vuex store to get active cards
            return this.$store.getters.activeCards
        }
    }
})
</script>
