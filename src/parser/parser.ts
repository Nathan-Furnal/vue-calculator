type Operator = "+" | "-" | "x" | "÷";

export type Op = {
  leftOperand: number;
  rightOperand: number;  
  operator: Operator;
  next?: Op;
}

const ops = ['-', '+', 'x', '÷'];

const nextOpHasPriority = (op: Op): boolean => {
  return (op.next !== undefined) && 
  (op.operator === "+" || op.operator === "-") &&
  (op.next.operator === "x" || op.next.operator === "÷")
}

export function toOperations(str: string[]): Op{
  let i = 0;
  let firstOp = undefined;
  while(firstOp === undefined && i < str.length){
    if(ops.includes(str[i])){
      firstOp = {leftOperand: Number(str[i-1]), operator: str[i] as Operator, rightOperand: Number(str[i+1])}
    }
    i++
  }
  let currOp = firstOp as Op;
  while(i < str.length){
    if(ops.includes(str[i])){
      currOp.next = {leftOperand: Number(str[i-1]), operator: str[i] as Operator, rightOperand: Number(str[i+1])}
      currOp = currOp.next;
    }
    i++
  }
  return firstOp as Op;
}

export function solveOperations(op: Op): number {
  const {left, right} = {left: op.leftOperand, right: op.rightOperand}
  switch(op.operator){
    case "+":
      if(nextOpHasPriority(op)){
        return left + solveOperations(op.next!)
      }
      else if(op.next !== undefined){
        op.next.leftOperand = left + right
        return solveOperations(op.next)
      }
      else {return left + right}
    case "-":
      if (nextOpHasPriority(op)){
        return left - solveOperations(op.next!)
      }
      else if(op.next !== undefined){
        op.next.leftOperand = left - right
        return solveOperations(op.next)
      }
      else {return left - right}
    case "x":
      if(op.next !== undefined){
        op.next.leftOperand = left * right
        return solveOperations(op.next)
      }
      return left * right
    case "÷":
      if (op.next !== undefined){
        op.next.leftOperand = left / right
        return solveOperations(op.next)
      }
      return left / right
  }
}