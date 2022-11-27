/**
 *
 * @param inputs They will be sorted in ascending order
 * @param outputs The outputs must be sorted
 * @returns A tuple Array
 */
function constructEntries(
  inputs: readonly number[],
  outputs: readonly string[],
): [number, string][] {
  const l1 = inputs.length;
  const l2 = outputs.length;
  if (l1 === 0 || l2 === 0) {
    throw new Error('One of these arrays is empty');
  }
  if (l1 !== l2) {
    throw new Error('The lengths are differents');
  }
  const _inputs = (inputs as number[]).sort((a, b) => a - b);
  return outputs.map((output, index) => [_inputs[index], output]);
}

export function createInterpolateString<
  T extends readonly number[],
  S extends readonly string[],
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

    let out = '';

    for (let index = 1; index <= len; index++) {
      const [input, output] = entries[index];
      if (value === input) {
        out = output;
        break;
      }
      
      if (value < input) {
        const behind = entries[index - 1];
        const inputRange = input - behind[0];
        const diff = value - behind[0];
        const ratio = diff / inputRange;
        if (ratio < 0.5) {
          out = behind[1];
        } else {
          out = output;
        }
        break;
      }
    }
    return out;
  };
  return fn;
}
