import { Test } from '../models/patitasfelices/test.model.js';

export class TestRepository {
    async getAllTests() {
        return await Test.findAll();
    }

    async getTestById(id) {
        return await Test.findByPk(id);
    }

    async createTest(test) {
        return await Test.create(test);
    }

    async updateTest(id, test) {
        const existingTest = await Test.findByPk(id);
        if (existingTest) {
            return await existingTest.update(test);
        }
        return null;
    }

    async deleteTest(id) {
        const test = await Test.findByPk(id);
        if (test) {
            await test.destroy();
            return true;
        }
        return false;
    }
}
