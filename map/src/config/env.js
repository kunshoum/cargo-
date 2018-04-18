let env = process.env.NODE_ENV
// 'http://47.93.90.229/test'
console.log(env)
let baseUrl = env === "development" ? "http://192.168.1.110:8080/lxtd-cca-apis" : "http://47.93.90.229:8080/map"

export { baseUrl }