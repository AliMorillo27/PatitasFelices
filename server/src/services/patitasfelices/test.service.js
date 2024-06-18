import { sequelize } from "../../database/database.js";
import { TestRepository } from "../../repositories/index.js";

const TestService = {
  createTest: async (testData) => {
    const t = await sequelize.transaction();
    try {
      const newTest = await TestRepository.createTest(testData, t);
      await t.commit();
      return newTest;
    } catch (error) {
      await t.rollback();
      throw error;
    }
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
  },
};

export default TestService;
