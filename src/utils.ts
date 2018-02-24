export function isArray(object: any){
  if(Array.isArray){
    return Array.isArray(object);
  }
  return Object.prototype.toString.call(object) === '[object Array]';
}