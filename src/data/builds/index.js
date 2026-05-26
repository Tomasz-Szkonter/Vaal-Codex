// Build registry. Adding a new build = create a file in this directory and
// add it here. Order in the array = order on the Home grid.

import twisterSpiritWalker from './twister-spirit-walker.js';
import explosiveWitchhunter from './explosive-witchhunter.js';
import placeholderBuild2 from './placeholder-build-2.js';

export const builds = [twisterSpiritWalker, explosiveWitchhunter, placeholderBuild2];

export function findBuild(id) {
  return builds.find((b) => b.meta.id === id) || null;
}
