<script setup lang="ts">
import { ref } from 'vue';

const symbols = [
  '7', '8', '9', '÷',
  '4', '5', '6', '×',
  '1', '2', '3', '-',
  '0', '.', '=', '+'
]

function addToDisplay(btn: string){
  calcDisplay.value.push(btn);
}

const calcDisplay = ref<string[]>([]);
</script>

<template>
<header class="m-2">
  <h2>Use the calculator for intensive maths (⌐⊙_⊙)</h2>
</header>    
<main class="center">
  <button class="nes-btn is-warning" @click="calcDisplay.length=0">Clear</button>
  <section class="center m-2 text-center">
    <div class="m-2 reader nes-container">
      <p>{{ calcDisplay.join('') }}</p>
    </div>
    <div class="machine-buttons nes-container">
      <button v-for="s in symbols" class="nes-btn" @click="addToDisplay(s)">
        {{ s }}
      </button>
    </div>
  </section>
</main>
  <footer>
  </footer>
</template>
