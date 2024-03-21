"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const user_entity_1 = require("./dto/user.entity");
const rxjs_1 = require("rxjs");
let AppController = exports.AppController = class AppController {
    constructor(appService, userServiceClient, authServiceClient) {
        this.appService = appService;
        this.userServiceClient = userServiceClient;
        this.authServiceClient = authServiceClient;
    }
    async login(signInDto) {
        const newUser = await (0, rxjs_1.firstValueFrom)(this.userServiceClient.send('user_search_by_credentials', signInDto));
        const token = this.authServiceClient.send('generate_token', newUser);
        return token;
    }
    signIn(signInDto) {
        const newUser = this.userServiceClient.send('create_new_user', signInDto);
        return newUser;
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/signIn'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "signIn", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('USER_SERVICE')),
    __param(2, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], AppController);
//# sourceMappingURL=app.controller.js.map