function constructEntries(
  inputs: readonly number[],
  outputs: readonly number[],
): [number, number][] {
  const l1 = inputs.length;
  const l2 = outputs.length;
  if (l1 === 0 || l2 === 0) {
    throw new Error('One of these arrays is empty');
  }
  if (l1 !== l2) {
    throw new Error('The lengths are differents');
  }
  const _inputs = (inputs as number[]).sort((a, b) => a - b);
  const _outputs = (outputs as number[]).sort((a, b) => a - b);
  return _outputs.map((output, index) => [_inputs[index], output]);
}

export function createInterpolate<
  T extends readonly number[],
  S extends readonly number[],
>(inputs: T, outputs: S) {
  const entries = constructEntries(inputs, outputs);

  const fn = (value: T[number]) => {
    const len = entries.length - 1;
    const firstInput = entries[0][0];
    const firstOutput = entries[0][1];
    const lastInput = entries[len][0];
    const lastOutput = entries[len][1];

    if (value <= firstInput) return firstOutput;
    if (value >= lastInput) return lastOutput;

    let out = 0;

    for (let index = 1; index <= len; index++) {
      const [input, output] = entries[index];
      if (value === input) {
        out = output;
        break;
      }

      if (value < input) {
        const behind = entries[index - 1];
        const outputRange = output - behind[1];
        const inputRange = input - behind[0];
        const diff = value - behind[0];
        out = behind[1] + outputRange * (diff / inputRange);
        break;
      }
    }
    return out;
  };
  return fn;
}
