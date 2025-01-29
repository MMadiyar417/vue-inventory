<template>
    <div class="input-group">
      <label class="label" v-if="label" :for="id">{{ label }}</label>
      <input
        :id="id"
        class="input"
        :type="type"
        v-model="inputValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', inputValue)"
        :min="min"
        :max="max"
        :required="required"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const props = defineProps<{
    modelValue: string | number;
    id?: string;
    type?: string;
    label?: string;
    placeholder?: string;
    min?: number | string;
    max?: number | string;
    required?: boolean;
  }>();
  
  const inputValue = ref(props.modelValue);
  </script>
  
  <style scoped lang="scss">
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .label {
    font-size: 14px;
  }
  
  .input {
    display: block;
    width: 100%;
    height: 40px;
    padding: 5px 12px;
    border: 1px solid $primary-border-color;
    border-radius: $small-border-radius;
    font-size: 14px;
    transition: 0.3s;
    background: $secondary-background-color;
    color: rgba(255, 255, 255, 0.4);
    font-family: inherit;
  
    &:focus {
      box-shadow: 0 0 5px 0 $primary-color;
      outline: none;
    }
  
    &[type='number'] {
      appearance: textfield;
  
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
  

  </style>
  