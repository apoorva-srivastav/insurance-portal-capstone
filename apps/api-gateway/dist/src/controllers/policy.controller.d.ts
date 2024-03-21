import { ClientProxy } from '@nestjs/microservices';
export declare class PolicyController {
    private readonly policyServiceClient;
    constructor(policyServiceClient: ClientProxy);
    addNewPolicy(body: Record<string, any>): import("rxjs").Observable<any>;
    getPolicies(): import("rxjs").Observable<any>;
    getFilteredPolicies(query: any): import("rxjs").Observable<any>;
}
