# Test Application

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint

```

## Overview

This project aims to provide users with an optional card that can be set on the product displayed on the home page. There are options to choose between 3 potential environmental benefits, with their respective customisations. The information will then be visible on the home page. VueX is used to create a store to get/set the card states.

## Component structure

## Style structure

The component's styles are written in SCSS and organized based on the BEM (Block, Element, Modifier) methodology. Key style components include:

product-widget: Styles for the main container.
cards-container: Styles for the container of individual cards.
cards-container**item: Styles for an individual card.
cards-container**item**title: Styles for the title section of a card.
cards-container**item**body: Styles for the body section of a card.
cards-container**item**body**link: Styles for the link section of a card.
cards-container**item**body**colour: Styles for the color selection section.
cards-container**item\_\_active: Styles for the activation toggle sec

## Vue 3 Component Logic

The component logic is written in TypeScript using the Composition API. Key features and methods include:

data: Contains a hoveredCard variable to track the currently hovered card.
methods: Includes a setHoveredCard method to update the hovered card state.
setup function: Utilizes the Vue 3 Composition API to manage component logic.
Uses Vuex (useStore) for state management.
Defines reactive variables such as cards, activeCard, and colorOptions.
Utilizes lifecycle hooks (onMounted, watchEffect) for initialization and fetching data.
Provides methods for color selection (selectColor), toggling card activation (toggleActive), and checking if a card is active (isActiveRadio).
