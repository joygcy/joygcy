import request from "./index";
console.log('===== ~ request:', request);

// export const queryList = async () => mpserverless.function.invoke(
//   'getThingsList', 
// );

export const queryList = () => request('things');