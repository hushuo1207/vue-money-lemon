function clone(data: any) {
    console.log(JSON.stringify(data))
    return JSON.parse(JSON.stringify(data));
  }
  
  export default clone;