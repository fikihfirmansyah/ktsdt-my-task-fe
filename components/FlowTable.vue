<!-- components/FlowTable.vue -->

<template>
  <table class="table-auto w-full whitespace-nowrap">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key" class="px-4 py-2 text-left">{{ column.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td v-for="column in columns" :key="column.key" class="border px-4 py-2">
          <template v-if="column.formatter">
            {{ column.formatter(item[column.key]) }}
          </template>
          <template v-else>
            {{ item[column.key] }}
          </template>
        </td>
        <td class="border px-4 py-2">
          <slot name="action" :item="item"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  data: Array,
  columns: Array,
});
</script>

<style>
/* Add any custom styles here */
</style>
