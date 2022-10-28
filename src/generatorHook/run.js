import { useEffect } from 'react';

function* generator() {
  while (true) {
    yield false;
    yield true;
  }
}



function run(gen) {
  var state = gen();
  var result = state.next();
  const setResult = () => {
    var value = state.next()
    console.log('只能在原本函数触发', value)
  }
  return [result, setResult]
}

export  function useRun() {
  const [value, setValue] = run(generator);
  
  return [value, setValue]
}
