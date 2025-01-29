import { defineStore } from 'pinia';

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  image: string;
  x: number;
  y: number;
}

const defaultItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Item 1',
    description: 'Description 1',
    quantity: 4,
    image: 'item-1.svg',
    x: 0,
    y: 0,
  },
  {
    id: '2',
    name: 'Item 2',
    description: 'Description 2',
    quantity: 2,
    image: 'item-2.svg',
    x: 1,
    y: 0,
  },
  {
    id: '3',
    name: 'Item 3',
    description: 'Description 3',
    quantity: 5,
    image: 'item-3.svg',
    x: 2,
    y: 0,
  },
];

export const useInventoryStore = defineStore('inventory', {
  state: () => {
    const storedItems = localStorage.getItem('inventory');
    return {
      items: storedItems
        ? (JSON.parse(storedItems) as InventoryItem[])
        : defaultItems,
    };
  },
  actions: {
    removeItem(itemId: string, quantity: number) {
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        if (this.items[index].quantity > quantity) {
          this.items[index].quantity -= quantity;
        } else {
          this.items.splice(index, 1);
        }
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('inventory', JSON.stringify(this.items));
    },
  },
});
