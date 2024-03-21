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
exports.PolicyController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const microservices_1 = require("@nestjs/microservices");
const roles_decorator_1 = require("../decorators/roles.decorator");
const auth_guard_1 = require("../gaurds/auth.guard");
const role_gaurd_1 = require("../gaurds/role.gaurd");
const authorization_decorator_1 = require("../decorators/authorization.decorator");
let PolicyController = exports.PolicyController = class PolicyController {
    constructor(policyServiceClient) {
        this.policyServiceClient = policyServiceClient;
    }
    addNewPolicy(body) {
        return this.policyServiceClient.send('add_new_policy', body);
    }
    getPolicies() {
        return this.policyServiceClient.send('get_all_policies', {});
    }
    getFilteredPolicies(query) {
        return this.policyServiceClient.send('search_policy', query);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_gaurd_1.RolesGuard),
    (0, authorization_decorator_1.Authorization)(true),
    (0, common_1.Post)('add-policy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PolicyController.prototype, "addNewPolicy", null);
__decorate([
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, common_1.Get)('all-policies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PolicyController.prototype, "getPolicies", null);
__decorate([
    (0, common_1.Get)('search-policies'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PolicyController.prototype, "getFilteredPolicies", null);
exports.PolicyController = PolicyController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)('POLICY_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], PolicyController);
//# sourceMappingURL=policy.controller.js.map