const dataParser = (data: any) => {
  if(data==undefined || data == null) return
  return JSON.parse(JSON.stringify(data));
};
export default dataParser;
