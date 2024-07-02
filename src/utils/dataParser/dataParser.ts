const dataParser = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
export default dataParser;
