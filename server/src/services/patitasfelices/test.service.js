import { TestRepository } from '../../repositories/index.js';

const TestService = {
    createTest: async (testData) => {
        return TestRepository.createTest(testData);
    },

    getAllTests: async () => {
        return TestRepository.getAllTests();
    },

    getTestById: async (id) => {
        return TestRepository.getTestById(id);
    },

    updateTest: async (id, testData) => {
        return TestRepository.updateTest(id, testData);
    },

    deleteTest: async (id) => {
        return TestRepository.deleteTest(id);
    }
};

export default TestService;
