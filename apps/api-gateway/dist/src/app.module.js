"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const microservices_1 = require("@nestjs/microservices");
const app_service_1 = require("./app.service");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./gaurds/auth.guard");
const policy_controller_1 = require("./controllers/policy.controller");
let ApiGatewayModule = exports.ApiGatewayModule = class ApiGatewayModule {
};
exports.ApiGatewayModule = ApiGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'AUTH_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: 3000,
                    },
                },
                {
                    name: 'POLICY_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: 3001,
                    },
                },
                {
                    name: 'USER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: 3002,
                    },
                },
            ]),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [{
                        ttl: 60000,
                        limit: 5
                    }],
            })
        ],
        controllers: [app_controller_1.AppController, policy_controller_1.PolicyController],
        providers: [app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }],
    })
], ApiGatewayModule);
//# sourceMappingURL=app.module.js.map