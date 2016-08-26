export function removeByKey(obj, toDelete){
  return Object.keys(obj)
    .filter(key => key !== toDelete)
    .reduce((result, current) => {
      result[current] = obj[current];
      console.log(result);
      return result;
    }, {});
}
