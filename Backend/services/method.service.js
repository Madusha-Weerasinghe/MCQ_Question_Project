const methodModel = require("../models/method.model");

const storeMethod =  (methodType, mark, resouceName, discription,imageURL,resourceURL) => {
    try {
        if (!methodType || !mark || !resouceName || !discription ||!imageURL || !resourceURL) {
            throw new Error('Method is incomplete');
        }

        const newMethod =  methodModel.create({
            methodType: methodType,
            mark: mark,
            resouceName: resouceName,
            discription: discription,
            imageURL: imageURL,
            resourceURL: resourceURL
        });

        return newMethod;
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
};

// const getMethodById =  (id) => {
//     try {
//         const method =  methodModel.find({_id: id});
//         return method || null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Internal Server Error');
//     }
// };

module.exports = {
    storeMethod,
    // getMethodById
};
