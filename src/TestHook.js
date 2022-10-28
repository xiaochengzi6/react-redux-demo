import * as React from 'react';
import {useRun} from './generatorHook/run';

export default function TestHook() {
  const [value, setValue] = useRun();

  console.log('value:', value)

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <h1>{value.value}</h1>
      <button onClick={() => setValue()}>摁扭</button>
    </div>
  );
}
