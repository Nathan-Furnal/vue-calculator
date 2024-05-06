<script setup lang="ts">
import { ref } from 'vue';
import { solveOperations, toOperations } from "../src/parser/parser";

const symbols = [
  '7', '8', '9', '÷',
  '4', '5', '6', 'x',
  '1', '2', '3', '-',
  '0', '.', '=', '+'
]

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const ops = ['-', '+', 'x', '÷'];

const isNumber = (s: string): boolean => {return !isNaN(Number(s))}
let currInput: string[] = []
let numbersAndOps: string[] = []
const calcDisplay = ref<string[]>([]);

function updateNumbersAndDisplay(btn: string) {
  const last = calcDisplay.value[calcDisplay.value.length - 1]
  const isDigitThenOp = digits.includes(last) && ops.includes(btn)
  const isFirstInput = (last === undefined) && digits.concat(['+', '-']).includes(btn)
  const isDigitOrDot = digits.concat('.').includes(btn)
  const isValidNumber = isDigitOrDot && isNumber(currInput.concat(btn).join(''))
  if(btn === "=" && !ops.includes(last)){
    if (currInput.length > 0){ numbersAndOps.push(currInput.join(''))}
    currInput = [];
    computeResult()
  }
  else if (isFirstInput || isValidNumber){
    currInput.push(btn)
    calcDisplay.value.push(btn)    
  }
  else if (isDigitThenOp){
    numbersAndOps.push(currInput.join(''))
    numbersAndOps.push(btn)
    currInput = [];
    calcDisplay.value.push(btn)
  }
}
function computeResult(){
  let res = 0;
  calcDisplay.value = []
  if(numbersAndOps.length > 1){
    res = solveOperations(toOperations(numbersAndOps))
    numbersAndOps = []
  }
  else if (numbersAndOps.length === 1){
    res = Number(numbersAndOps[0]);
    numbersAndOps = []    
  }
  currInput.push(...String(res))
  calcDisplay.value.push(...String(res))  
}

function clear(){
  calcDisplay.value = []  
  currInput = []
  numbersAndOps = []
}

</script>

<template>
  <header class="m-2">
    <h2>Use the calculator for intensive maths (⌐⊙_⊙)</h2>
  </header>
  <main class="center">
    <button class="nes-btn is-warning" @click="clear()">Clear</button>
    <section class="center m-2 text-center">
      <div class="m-2 reader nes-container">
        <p>{{ calcDisplay.join('') }}</p>
      </div>
      <div class="machine-buttons nes-container">
        <button v-for="s of symbols" class="nes-btn" @click="updateNumbersAndDisplay(s)">
          {{ s }}
        </button>
      </div>
    </section>
  </main>
  <footer>
  </footer>
</template>
