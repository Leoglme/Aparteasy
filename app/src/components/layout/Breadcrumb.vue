<template>
  <nav aria-label="breadcrumb">
    <ol class="pl-0 text-base flex items-center flex-wrap gap-3">
      <li
        v-for="(item, index) in props.items"
        :key="index"
        class="sm:text-base text-sm"
        :class="['flex items-center gap-2', { 'text-primary-300': item.active }]"
      >
        <template v-if="item.active">
          <Icon
            v-if="item.icon"
            stroke="#ff7097"
            :width="20"
            :height="20"
            :name="item.icon"
            style="margin-bottom: 0;"
          />
          <span>{{ item.text }}</span>
        </template>
        <template v-else>
          <router-link v-if="item.to" :to="item.to" class="flex items-center gap-2 hover:underline">
            <Icon
              v-if="item.icon"
              class="mb-0"
              stroke="#f5f4fb"
              :width="20"
              :height="20"
              style="margin-bottom: 0"
              :name="item.icon"
            />
            <span>{{ item.text }}</span>
          </router-link>
          <a v-else :href="item.href" class="flex items-center gap-2 hover:underline">
            <Icon
              v-if="item.icon"
              class="mb-0"
              stroke="#f5f4fb"
              :width="20"
              :height="20"
              style="margin-bottom: 0"
              :name="item.icon"
            />
            <span>{{ item.text }}</span>
          </a>
        </template>
        <span v-if="index < props.items.length - 1">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Icon from '@/components/ui/Icon.vue'

interface BreadcrumbItem {
  active?: boolean
  to?: string | { name: string }
  href?: string
  text: string
  icon?: string
}

const props = defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
