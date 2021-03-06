module.exports = {
    entry:"./src/typeScript/index.ts",
    output: {
        filename:"./bundle.js"
    },
    devtool:"source-map",
    resolve: {
        extensions: ["*",".ts",".tsx",".js"]
    },
    module:{
        rules: [
            {test:/\.tsx?$/, loader:"ts-loader"}
        ]
    }
};