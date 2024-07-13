const state = {
  display: "",
  first: 0,
  second: 0,
  operator: "",
};

const operation = {
  complete: false,
  inProgress: false,
  selected: false,
};


function sum(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b == 0) {
    return "ERROR";
  } else return parseInt(a / b);
}
function percent(a) {
  return parseInt((a * 100) / 100);
}

function operate(a, b, oper) {
  switch (oper) {
    case "+":
      return sum(a, b);
    case "-":
      return substract(a, b);
    case "X":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    case "%":
      return percent(a);
    default:
      return undefined;
  }
}



const updateFirst = () => (state.first = parseInt(state.display));
const updateSecond = () => (state.second = parseInt(state.display));
const clearDisplay = () => (state.display = "");

const displayArea = document.querySelector("#displaytext");
displayArea.textContent = '0'
const updateDisplayArea = () => (displayArea.textContent = state.display);



const operButtons = document.querySelectorAll(".operand");
operButtons.forEach((oper) => {
  oper.addEventListener("click", function () {
    if (state.display && !operation.selected) {
      if (operation.inProgress) {
        updateSecond();
        state.display = operate(state.first, state.second, state.operator);
        state.operator = oper.textContent;
        updateDisplayArea();
      }
      updateFirst();
      operation.inProgress = true;
      operation.selected = true;
      state.operator = oper.textContent;
    }

  });
});

const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => {
  digit.addEventListener("click", function () {
    if (operation.selected || operation.complete) {
      clearDisplay();
      operation.selected = false;
      operation.complete = false;
    }
    if(state.display == '0')
    {
      state.display = digit.id;
      updateDisplayArea();
    }
    else{state.display += digit.id;
    updateDisplayArea();
    }
  });
});


const toggle = document.querySelector(".toggle");
toggle.addEventListener('click',function()
{
  
    if (state.display && !operation.selected) {
      if (state.display.startsWith("-"))
        state.display = state.display.substring(1);
      else state.display = "-" + state.display;
    }
  updateDisplayArea();
})

const clear = document.querySelector('.clear');
clear.addEventListener('click',function(){
  state.display = "0";
  state.first = 0;
  state.second= 0;
  state.operator= "";
  
  
  operation.complete = false;
  operation.inProgress = false;
  operation.selected = false;
updateDisplayArea();  

})

const equal = document.querySelector('.equal');
equal.addEventListener('click',function(){
  updateSecond();
  state.display = operate(state.first, state.second, state.operator);
  
  updateDisplayArea();
  operation.inProgress = false;
  operation.complete = true;

})