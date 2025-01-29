<template>
  <div class="inventory">
    <grid-layout
      class="inventory__cells"
      :layout="layout"
      :col-num="colsQty"
      :max-rows="rowsQty"
      :row-height="100"
      :margin="[0, 0]"
      :is-draggable="true"
      :is-resizable="false"
      :vertical-compact="false"
      :prevent-collision="true"
      :useStyleCursor="false"
      @layout-updated="updateLayout"
    >
      <grid-item
        v-for="item in items"
        :key="item.id"
        :x="item.x"
        :y="item.y"
        :w="1"
        :h="1"
        :i="item.id"
        @click="selectItem(item, $event)"
      >
        <div class="inventory-item">
          <div class="inventory-item__image">
            <img :src="`/${item.image}`" :alt="item.name" />
          </div>
          <div class="inventory-item__quantity">{{ item.quantity }}</div>
        </div>
      </grid-item>
    </grid-layout>
    <div class="inventory__grid">
      <div
        v-for="i in rowsQty * colsQty"
        :key="i"
        class="inventory__grid-cell"
      />
    </div>

    <ItemDetailsPanel
      v-if="selectedItem"
      :item="selectedItem"
      @close="closeItemDetails"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useInventoryStore } from '../stores/inventoryStorage';
import { GridLayout, GridItem } from 'vue-grid-layout-v3';
import ItemDetailsPanel from './ItemDetailsPanel.vue';

const inventoryStore = useInventoryStore();
const items = inventoryStore.items;

const layout = ref(
  items.map((item) => ({
    x: item.x,
    y: item.y,
    w: 1,
    h: 1,
    i: item.id,
  }))
);

const colsQty = 5;
const rowsQty = 5;

const selectedItem = ref(null);

let isDragging = false;

const updateLayout = (newLayout: any) => {
  newLayout.forEach((layoutItem: any) => {
    const item = items.find((item) => item.id === layoutItem.i);
    if (item) {
      item.x = layoutItem.x;
      item.y = layoutItem.y;
    }
  });
  inventoryStore.saveToLocalStorage();
};

const handleMouseDown = (event: MouseEvent) => {
  isDragging = false;
  event.preventDefault();
};

const handleMouseMove = () => {
  if (isDragging) return;
  isDragging = true;
};

const selectItem = (item: any, event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (!isDragging && target.closest('.inventory-item')) {
    selectedItem.value = item;
    nextTick(() => {
      console.log('Элемент выбран:', selectedItem.value);
    });
  }
};

const closeItemDetails = () => {
  selectedItem.value = null;
};

watch(
  () => inventoryStore.items,
  (newItems) => {
    layout.value = newItems.map((item) => ({
      x: item.x,
      y: item.y,
      w: 1,
      h: 1,
      i: item.id,
    }));
  }
);

onMounted(() => {
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleMouseDown);
  document.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped lang="scss">
.inventory {
  min-height: 500px;
  position: relative;

  &__cells {
    position: relative;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 0;
    position: absolute;
    left: 0;
    right: -1px;
    top: 0;
    bottom: -2px;
    pointer-events: none;

    &-cell {
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
}

.inventory-item {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 5px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2f2f2f;
  }

  &__image {
    display: flex;
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  &__quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 18px;
    padding: 0 5px;
    border: 1px solid $primary-border-color;
    border-right-color: transparent;
    border-bottom-color: transparent;
    position: absolute;
    right: 10px;
    bottom: 10px;
    border-radius: 6px 0 0 0;
    background-color: $secondary-background-color;
    font-size: 10px;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    color: rgba(255, 255, 255, 0.4);
  }
}

.vue-draggable-dragging {
  .inventory-item {
    background: $secondary-background-color;

    &__quantity {
      opacity: 0;
    }
  }
}
</style>
