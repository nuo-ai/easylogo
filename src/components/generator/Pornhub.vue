<template>
  <div class="flex flex-col items-center">
    <v-tooltip text="编辑文本创建你的Logo" location="top" model-value>
      <template v-slot:activator="{ props }">
        <div v-bind="props" class="border border-gray-700 rounded-lg p-10 m-10 max-w-full">
          <div
            class="p-5 text-center font-bold"
            id="logo"
            :style="{
              'font-size': `${fontSize}px`,
              'background-color': transparentBgColor,
              'font-family': store.font
            }"
          >
            <template v-if="!reverseHighlight">
              <span
                @input="prefixHandleInput"
                @compositionstart="prefixHandleCompositionStart"
                @compositionend="prefixHandleCompositionEnd"
                class="text-text-light px-1.5"
                :style="{ color: prefixColor }"
                :contenteditable="prefixEditable"
                spellcheck="false"
              >
                {{ prefixText }}
              </span>
              <!-- 分隔符 -->
              <span class="text-transparent">.</span>
              <span
                @input="suffixHandleInput"
                @compositionstart="suffixHandleCompositionStart"
                @compositionend="suffixHandleCompositionEnd"
                class="text-text-dark bg-primary px-2.5 rounded-logo"
                :style="{ color: suffixColor, 'background-color': bgColor }"
                :contenteditable="suffixEditable"
                spellcheck="false"
              >
                {{ suffixText }}
              </span>
            </template>
            <template v-else>
              <span
                @input="suffixHandleInput"
                @compositionstart="suffixHandleCompositionStart"
                @compositionend="suffixHandleCompositionEnd"
                class="text-text-dark bg-primary px-2.5 rounded-logo"
                :style="{ color: suffixColor, 'background-color': bgColor }"
                :contenteditable="suffixEditable"
                spellcheck="false"
              >
                {{ prefixText }}
              </span>
              <span
                @input="prefixHandleInput"
                @compositionstart="prefixHandleCompositionStart"
                @compositionend="prefixHandleCompositionEnd"
                class="text-text-light px-1.5"
                :style="{ color: prefixColor }"
                :contenteditable="prefixEditable"
                spellcheck="false"
              >
                {{ suffixText }}
              </span>
            </template>
          </div>
        </div>
      </template>
    </v-tooltip>

    <div class="flex flex-col md:flex-row justify-around w-full mb-12">
      <v-tooltip text="选择你喜欢的颜色" location="top" model-value>
        <template v-slot:activator="{ props }">
          <div v-bind="props" class="flex flex-col space-y-2" id="prefixColor">
            <div class="flex items-center">
              <span class="mr-2">前缀文本颜色:</span>
              <v-menu :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <button
                    v-bind="props"
                    class="w-12 h-6 rounded ml-1 border-2 border-solid border-white"
                    :style="{ 'background-color': prefixColor }"
                  ></button>
                </template>
                <v-color-picker mode="hex" hide-inputs v-model="prefixColor"></v-color-picker>
              </v-menu>
            </div>
            <div class="flex items-center">
              <span class="mr-2">后缀文本颜色:</span>
              <v-menu :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <button
                    v-bind="props"
                    class="w-12 h-6 rounded ml-1 border-2 border-solid border-white"
                    :style="{ 'background-color': suffixColor }"
                  ></button>
                </template>
                <v-color-picker mode="hex" hide-inputs v-model="suffixColor"></v-color-picker>
              </v-menu>
            </div>
            <div class="flex items-center">
              <span class="mr-2">后缀背景颜色:</span>
              <v-menu :close-on-content-click="false" location="end">
                <template v-slot:activator="{ props }">
                  <button
                    v-bind="props"
                    class="w-12 h-6 rounded ml-1 border-2 border-solid border-white"
                    :style="{ 'background-color': bgColor }"
                  ></button>
                </template>
                <v-color-picker mode="hex" hide-inputs v-model="bgColor"></v-color-picker>
              </v-menu>
            </div>
            <div class="flex items-center">
              <span class="mr-2">透明背景:</span>
              <v-checkbox-btn v-model="transparentBg"></v-checkbox-btn>
            </div>
          </div>
        </template>
      </v-tooltip>

      <div class="flex flex-col space-y-2">
        <div class="flex flex-col">
          <span class="mb-1">字体大小: {{ fontSize }}px</span>
          <div class="-ml-1">
            <v-slider
              hide-details
              min="30"
              max="200"
              step="1"
              color="primary"
              v-model="fontSize"
            ></v-slider>
          </div>
        </div>
        <FontSelector />
        <div class="flex items-center">
          <span class="mr-2">反向高亮:</span>
          <v-checkbox-btn v-model="reverseHighlight"></v-checkbox-btn>
        </div>
      </div>
    </div>

    <div class="flex justify-around w-4/5">
      <ExportBtn />
      <v-btn @click="twitter" color="#1da1f2">
        <v-icon icon="mdi-twitter" class="mr-0.5"></v-icon>分享到Twitter
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import FontSelector from '@/components/FontSelector.vue';
import { useStore } from '@/stores/store';
import ExportBtn from '@/components/ExportBtn.vue';
import { useLogoGenerator } from '@/composables/useLogoGenerator';

const store = useStore();

// 使用Logo生成逻辑
const {
  // 状态
  fontSize,
  transparentBg,
  reverseHighlight,
  transparentBgColor,
  
  // 前缀相关
  prefixText,
  prefixEditable,
  prefixIsComposing,
  prefixHandleInput,
  prefixHandleCompositionStart,
  prefixHandleCompositionEnd,
  prefixColor,
  
  // 后缀相关
  suffixText,
  suffixEditable,
  suffixIsComposing,
  suffixHandleInput,
  suffixHandleCompositionStart,
  suffixHandleCompositionEnd,
  suffixColor,
  
  // 背景颜色
  bgColor
} = useLogoGenerator({
  store,
  prefixInitial: 'edit',
  suffixInitial: 'me',
  prefixColorInitial: '#ffffff',
  suffixColorInitial: '#000000',
  bgColorInitial: '#ff9900'
});

// 分享到Twitter
const twitter = () => {
  const url = 'https://logoly.pro';
  const text = encodeURIComponent(`使用 #LogolyPro 创建，作者 @xiqingongzi ${url}`);
  window.open(`https://twitter.com/intent/tweet?text=${text}`);
};
</script>

<style lang="stylus" scoped>
.pornhub {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box {
  border: 1px solid #333;
  border-radius: 10px;
  padding: 40px;
  margin: 40px 10px;
  max-width: 100%;

  .editarea {
    padding: 20px;
    text-align: center;
    font-size: 60px;
    font-weight: 700;

    .prefix {
      color: #fff;
      padding: 5px 5px;
    }

    .postfix {
      color: #000;
      background-color: #f90;
      padding: 5px 10px;
      border-radius: 7px;
    }
  }
}

.customize {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 50px;

  .customize-color > div,
  .customize-misc > div {
    padding: 8px 0;
  }
}

.download-share {
  display: flex;
  justify-content: space-around;
  width: 80%;

  & > div {
    width: 100px;
    height: 40px;
    border-radius: 3px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }

  .download {
    color: black;
    background: #f90;
  }

  .share {
    color: #fff;
    background: #1da1f2;
  }
}
</style>
