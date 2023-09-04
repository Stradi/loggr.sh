import { cache } from 'react';

const createServerContext = <T>(defaultValue: T): [() => T, (v: T) => void] => {
  const ref = cache(() => ({ current: defaultValue }));

  const getValue = (): T => ref().current;

  const setValue = (value: T) => {
    ref().current = value;
  };

  return [getValue, setValue];
};

export default createServerContext;
