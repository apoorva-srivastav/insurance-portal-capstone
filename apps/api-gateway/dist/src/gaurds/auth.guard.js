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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
let AuthGuard = exports.AuthGuard = class AuthGuard {
    constructor(reflector, authServiceClient, userServiceClient) {
        this.reflector = reflector;
        this.authServiceClient = authServiceClient;
        this.userServiceClient = userServiceClient;
    }
    async canActivate(context) {
        const secured = this.reflector.get('secured', context.getHandler());
        if (!secured) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return false;
        }
        const userTokenInfo = await (0, rxjs_1.firstValueFrom)(this.authServiceClient.send('token_decode', {
            token: this.extractTokenFromHeader(request)
        }));
        const userInfo = await (0, rxjs_1.firstValueFrom)(this.userServiceClient.send('user_search_by_id', userTokenInfo.data.payload.userId));
        request.user = userInfo;
        return true;
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('AUTH_SERVICE')),
    __param(2, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [core_1.Reflector,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map