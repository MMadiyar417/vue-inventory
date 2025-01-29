<template>
  <div class="profile">
    <aside class="profile__aside">
      <picture class="profile__avatar">
        <img
          src="@/assets/images/avatar.webp"
          srcset="
            @/assets/images/avatar.webp    1x,
            @/assets/images/avatar@2x.webp 2x
          "
          alt="avatar"
        />
      </picture>
      <div class="profile__details">
        <Skeletor class="profile__name" height="26" />
        <div class="profile__params">
          <Skeletor class="profile__param" width="83%" height="10" />
          <Skeletor class="profile__param" width="100%" height="10" />
          <Skeletor class="profile__param" width="90%" height="10" />
          <Skeletor class="profile__param" width="85%" height="10" />
          <Skeletor class="profile__param" width="75%" height="10" />
        </div>
        <Skeletor class="profile__note" width="40%" height="10" />
      </div>
    </aside>
    <main class="profile__main">
        <inventory-board />
    </main>
    <footer class="profile__footer" v-if="isFooterOpen">
      <Skeletor height="36px" />
      <my-button
        class="profile__footer-close"
        styling="icon"
        @click="closeFooter"
      >
        <my-icon name="close" />
      </my-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Skeletor } from 'vue-skeletor';
import 'vue-skeletor/dist/vue-skeletor.css';
import MyButton from './ui/MyButton.vue';
import MyIcon from './ui/MyIcon.vue';
import InventoryBoard from './InventoryBoard.vue';
const isFooterOpen = ref(true);
const closeFooter = () => {
  isFooterOpen.value = false;
};
</script>

<style scoped lang="scss">
.profile {
  display: grid;
  grid-template-columns: 236px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 24px;
  max-width: 785px;
  margin: 0 auto;

  &__main,
  &__aside,
  &__footer {
    border: 1px solid $primary-border-color;
    background: $secondary-background-color;
    border-radius: $primary-border-radius;
  }

  &__aside {
    display: flex;
    flex-direction: column;
    grid-column: 1 / 2;
    grid-row: 1 / span 2;
    gap: 20px;
    padding: 17px 13px 23px;
    text-align: center;
  }

  &__avatar {
    display: block;
    position: relative;
    padding-bottom: 115.5%;
    border-radius: $secondary-border-radius;
    overflow: hidden;
    background: $primary-background-color;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 0 9px;
  }

  &__name {
    border-radius: $secondary-border-radius;
  }

  &__params {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  &__param {
    border-radius: $small-border-radius;
  }

  &__note {
    align-self: center;
    border-radius: $small-border-radius;
  }

  &__main {
    grid-column: 2 / -1;
    grid-row: 1 / span 2;
    overflow: hidden;
  }

  &__footer {
    grid-column: span 2;
    padding: 17px 67px 17px 17px;
    position: relative;

    &-close {
      position: absolute;
      top: 13px;
      right: 13px;

      &:before {
        content: '';
        position: absolute;
        left: -10px;
        right: -10px;
        top: -10px;
        bottom: -10px;
      }

      svg {
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>
