<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
    </nav>

    <RouterView />
</template>

<style scoped lang="scss">
body * {
    font-family:;
}
</style>
