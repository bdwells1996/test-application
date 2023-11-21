<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav class="nav">
        <RouterLink class="nav__item" to="/">Home</RouterLink>
        <RouterLink class="nav__item" to="/settings">Settings</RouterLink>
    </nav>

    <RouterView />
</template>

<style scoped lang="scss">
.nav {
    padding: 24px 0;
    &__item {
        text-decoration: none;
        color: #212121;
        &:not(:first-of-type) {
            margin-left: 14px;
        }

        &.router-link-exact-active {
            font-weight: bold;
        }
    }
}
</style>
