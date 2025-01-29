<template>
  <div class="inventory">
    <grid-layout
      class="inventory__cells"
      :layout="layout"
      :col-num="colsQty"
      :max-rows="rowsQty"
      :row-height="100"
      :margin="[0, 0]"
      :is-draggable="false"
      :is-resizable="false"
      :vertical-compact="false"
      :prevent-collision="true"
    >
      <grid-item
        v-for="(cell, index) in layout"
        :key="index"
        :x="cell.x"
        :y="cell.y"
        :w="cell.w"
        :h="cell.h"
      >
        <div class="inventory__grid-cell" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GridLayout, GridItem } from "vue-grid-layout-v3";

const colsQty = 5;
const rowsQty = 5;

const layout = ref(
  Array.from({ length: colsQty * rowsQty }, (_, i) => ({
    x: i % colsQty,
    y: Math.floor(i / colsQty),
    w: 1,
    h: 1,
    i: i.toString(),
  }))
);
</script>

<style scoped lang="scss">
.inventory {
  min-height: 500px;
  position: relative;

  &__cells {
    position: relative;
  }

  &__grid-cell {
    border: 1px solid #ccc;
    width: 100%;
    height: 100%;
  }
}
</style>
