import { Test } from '../../models/index.js';

const TestRepository = {
    createTest: async (testData, transaction) => {
        return Test.create(testData, { transaction });
    },

    getAllTests: async () => {
        return Test.findAll();
    },

    getTestById: async (id) => {
        return Test.findByPk(id);
    },

    updateTest: async (id, testData) => {
        const test = await Test.findByPk(id);
        if (test) {
            return test.update(testData);
        }
        return null;
    },

    deleteTest: async (id) => {
        const test = await Test.findByPk(id);
        if (test) {
            await test.destroy();
            return true;
        }
        return false;
    }
};

export default TestRepository;
