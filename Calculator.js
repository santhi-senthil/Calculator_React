import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonPress = (value) => {
    setActiveButton(value);
    setTimeout(() => setActiveButton(null), 150);
  };

  const inputDigit = (digit) => {
    handleButtonPress(digit);
    
    if (waitingForOperand) {
      setInput(String(digit));
      setWaitingForOperand(false);
    } else {
      setInput(input === '0' ? String(digit) : input + digit);
    }
  };

  const inputDot = () => {
    handleButtonPress('.');
    
    if (waitingForOperand) {
      setInput('0.');
      setWaitingForOperand(false);
      return;
    }

    if (input.indexOf('.') === -1) {
      setInput(input + '.');
    }
  };

  const clearAll = () => {
    handleButtonPress('AC');
    setInput('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    handleButtonPress('+/-');
    setInput(input.charAt(0) === '-' ? input.substr(1) : '-' + input);
  };

  const inputPercent = () => {
    handleButtonPress('%');
    const value = parseFloat(input);
    setInput(String(value / 100));
  };

  const performOperation = (nextOperator) => {
    handleButtonPress(nextOperator);
    
    const inputValue = parseFloat(input);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      let newValue = 0;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          break;
      }

      setPreviousValue(newValue);
      setInput(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleKeyDown = (e) => {
    if (/[0-9]/.test(e.key)) {
      inputDigit(parseInt(e.key, 10));
    } else if (e.key === '.') {
      inputDot();
    } else if (e.key === '+') {
      performOperation('+');
    } else if (e.key === '-') {
      performOperation('-');
    } else if (e.key === '*') {
      performOperation('×');
    } else if (e.key === '/') {
      performOperation('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
      performOperation('=');
    } else if (e.key === 'Escape') {
      clearAll();
    } else if (e.key === '%') {
      inputPercent();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <div className="display-content">
            <div className="previous-operation">
              {previousValue !== null && `${previousValue} ${operator || ''}`}
            </div>
            <div className="current-value">{input}</div>
          </div>
        </div>
        
        <div className="buttons">
          <button 
            className={`function-button ${activeButton === 'AC' ? 'active' : ''}`}
            onClick={clearAll}
          >
            AC
          </button>
          <button 
            className={`function-button ${activeButton === '+/-' ? 'active' : ''}`}
            onClick={toggleSign}
          >
            +/-
          </button>
          <button 
            className={`function-button ${activeButton === '%' ? 'active' : ''}`}
            onClick={inputPercent}
          >
            %
          </button>
          <button 
            className={`operator-button ${operator === '÷' ? 'active-operator' : ''} ${activeButton === '÷' ? 'active' : ''}`}
            onClick={() => performOperation('÷')}
          >
            ÷
          </button>
          
          <button 
            className={`digit-button ${activeButton === '7' ? 'active' : ''}`}
            onClick={() => inputDigit(7)}
          >
            7
          </button>
          <button 
            className={`digit-button ${activeButton === '8' ? 'active' : ''}`}
            onClick={() => inputDigit(8)}
          >
            8
          </button>
          <button 
            className={`digit-button ${activeButton === '9' ? 'active' : ''}`}
            onClick={() => inputDigit(9)}
          >
            9
          </button>
          <button 
            className={`operator-button ${operator === '×' ? 'active-operator' : ''} ${activeButton === '×' ? 'active' : ''}`}
            onClick={() => performOperation('×')}
          >
            ×
          </button>
          
          <button 
            className={`digit-button ${activeButton === '4' ? 'active' : ''}`}
            onClick={() => inputDigit(4)}
          >
            4
          </button>
          <button 
            className={`digit-button ${activeButton === '5' ? 'active' : ''}`}
            onClick={() => inputDigit(5)}
          >
            5
          </button>
          <button 
            className={`digit-button ${activeButton === '6' ? 'active' : ''}`}
            onClick={() => inputDigit(6)}
          >
            6
          </button>
          <button 
            className={`operator-button ${operator === '-' ? 'active-operator' : ''} ${activeButton === '-' ? 'active' : ''}`}
            onClick={() => performOperation('-')}
          >
            -
          </button>
          
          <button 
            className={`digit-button ${activeButton === '1' ? 'active' : ''}`}
            onClick={() => inputDigit(1)}
          >
            1
          </button>
          <button 
            className={`digit-button ${activeButton === '2' ? 'active' : ''}`}
            onClick={() => inputDigit(2)}
          >
            2
          </button>
          <button 
            className={`digit-button ${activeButton === '3' ? 'active' : ''}`}
            onClick={() => inputDigit(3)}
          >
            3
          </button>
          <button 
            className={`operator-button ${operator === '+' ? 'active-operator' : ''} ${activeButton === '+' ? 'active' : ''}`}
            onClick={() => performOperation('+')}
          >
            +
          </button>
          
          <button 
            className={`digit-button zero ${activeButton === '0' ? 'active' : ''}`}
            onClick={() => inputDigit(0)}
          >
            0
          </button>
          <button 
            className={`digit-button ${activeButton === '.' ? 'active' : ''}`}
            onClick={inputDot}
          >
            .
          </button>
          <button 
            className={`equals-button ${activeButton === '=' ? 'active' : ''}`}
            onClick={() => performOperation('=')}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;