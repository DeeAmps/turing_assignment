// Write code to generate all subsets of a set of integers(assuming the size of the set is
// reasonably small, say less than 20 elements).Note that you must enumerate all 2 ^ n
// subsets, with each subset listed exactly once.

const generateSubsets = (set) => {
  const subsets = [];
  const generateSubsetsHelper = (set, subset, index) => {
    subsets.push(subset);
    for (let i = index; i < set.length; i++) {
      generateSubsetsHelper(set, subset.concat(set[i]), i + 1);
    }
  };
  generateSubsetsHelper(set, [], 0);
  return subsets;
};

console.log(generateSubsets([1, 2, 3, 4, 5]));