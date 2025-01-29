<template>
    <component
      :is="props.tag"
      :class="['btn', `btn--${styling}`]"
      @click="$emit('click')"
    >
      <slot />
    </component>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    tag: {
      type: String,
      default: 'button',
    },
    styling: {
      type: String,
      default: 'primary',
    },
  });
  
  defineEmits(['click']);
  </script>
  
  <style scoped lang="scss">
  .btn {
    background-color: #fa7272;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 45px;
    padding: 10px 20px;
    font-weight: normal;
    font-size: 18px;
    line-height: 1.2;
    text-align: center;
    color: #fff;
    border-radius: $primary-border-radius;
    transition: 0.3s;
  
    &--icon {
      min-height: 0;
      padding: 0;
      background-color: transparent;
      border-radius: 0;
    }
  }
  </style>
  