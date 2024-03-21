"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.ApiGatewayModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API GATEWAY')
        .setDescription('The API gatewaydescription')
        .setVersion('1.0')
        .addTag('api-gateway')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3003);
}
bootstrap();
//# sourceMappingURL=main.js.map