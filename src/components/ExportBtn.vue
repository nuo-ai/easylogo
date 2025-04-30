<template>
  <div>
    <v-tooltip text="导出你的Logo" location="top" model-value>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props" :loading="isExporting">
          <v-icon icon="mdi-download" class="mr-1"></v-icon>导出
          <v-menu activator="parent">
            <v-list>
              <v-list-item key="png" value="png" @click="download('png')">
                <v-icon icon="mdi-file-image-outline" class="mr-2"></v-icon>PNG
              </v-list-item>
              <v-list-item key="svg" value="svg" @click="download('svg')">
                <v-icon icon="mdi-file-document-outline" class="mr-2"></v-icon>SVG
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

<script setup>
import { useStore } from '@/stores/store';
import { ref } from 'vue';
import { event } from 'vue-gtag';
import { onClickOutside } from '@vueuse/core';
import { exportAsPng, exportAsSvg } from '@/utils/exportUtils';

const store = useStore();
const showMenu = ref(false);
const btnRef = ref(null);
const isExporting = ref(false);

onClickOutside(btnRef, () => (showMenu.value = false));

const download = async (type) => {
  showMenu.value = false;
  store.editable = false;
  isExporting.value = true;
  
  try {
    event('download', { type });
    const node = document.getElementById('logo');
    
    if (type === 'png') {
      await exportAsPng(node, store.prefix, store.suffix);
    } else if (type === 'svg') {
      await exportAsSvg(node, store.prefix, store.suffix);
    }
  } catch (error) {
    console.error('导出失败:', error);
    // 这里可以添加错误提示
  } finally {
    isExporting.value = false;
    store.editable = true;
  }
};
</script>
