"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_module_1 = require("../src/app.module");
describe('ApiGatewayController (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.ApiGatewayModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
});
//# sourceMappingURL=app.e2e-spec.js.map