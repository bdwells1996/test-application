<template>
    <div>
        <CardList />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CardList from '@/components/CardList.vue' // Adjust the path accordingly

export default defineComponent({
    components: {
        CardList
    }
})
</script>
