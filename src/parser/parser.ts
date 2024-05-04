type Operator = '+' | '-' | 'x' | '÷';
type UnaryOperator =  Extract<Operator, '+' | '-'>;

const isNumber = (s: string): boolean => {return !isNaN(Number(s))}

interface Op{
    operator: Operator;
    next?: Op;
}

interface UnaryOp extends Op {
    operator: UnaryOperator;
    operand: string;
}
interface BinaryOp extends Op{
    leftOperand: string;
    rightOperand: string;
}


class MathParser {
    text: string;
    operations: Op[] = [];

    constructor(text: string){
        this.text = text;
    }
}

