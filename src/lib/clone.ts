function clone<T>(data: T): T {
    // console.log(JSON.stringify(data))
    return JSON.parse(JSON.stringify(data));
  }
  
  export default clone;