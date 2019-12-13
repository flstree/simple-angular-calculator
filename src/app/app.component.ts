import { Component } from '@angular/core';
import { calculations } from '../shared/calculations'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
  }

  private _constructor(){
    
  }

  handleInput(el){
    let digit = el.getAttribute('data-value');
    const { displayValue, waitingForSecondOperand } = this.calculator;

    if(waitingForSecondOperand === true){
      this.calculator.displayValue = digit;
      this.calculator.waitingForSecondOperand = false;
    }else{
      this.calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(this.calculator);
  }

  handleDecimal(dot){
    if(this.calculator.waitingForSecondOperand === true) return;
    
    if(!this.calculator.displayValue.includes(dot.value)){
      this.calculator.displayValue += dot.value;
    }
  }

  handleClear(){
    this.calculator = {
      displayValue: '0',
      firstOperand: null,
      waitingForSecondOperand: false,
      operator: null
    }
  }

  handleOperator(nextOperator){
    const { firstOperand, displayValue, operator } = this.calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && this.calculator.waitingForSecondOperand){
      this.calculator.operator = nextOperator.value;
      console.log(this.calculator);
      return;
    }

    if(firstOperand === null){
      this.calculator.firstOperand = inputValue;
    }else if (operator){
      const currentValue = firstOperand || 0;
      const result = calculations[operator](currentValue, inputValue);

      this.calculator.displayValue = String(result);
      this.calculator.firstOperand = result;
    }

    this.calculator.waitingForSecondOperand = true;
    this.calculator.operator = nextOperator.value;
    console.log(this.calculator);
  }
}
