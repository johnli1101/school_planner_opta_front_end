module.exports = {
  devServer: {
      proxy: {
        "^/timeTable": {
        target: "http:/localhost:8080",
        ws: true,
        changeOrigin: true
      }
   }
},
}