let calculator = {
  read(value1, value2) {
	 this.arg1 = value1;
	 this.arg2 = value2;
  },
  sum() {
	 return this.arg1 + this.arg2; 
  },
  mul() {
	  return this.arg1 * this.arg2;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
