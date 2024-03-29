import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPolicy } from './interface/policy.interface';

@Injectable()
export class PolicyService {

  constructor(
    @InjectModel('Policy')
    private readonly policyModel: Model<IPolicy>,
  ) {}

  async findAll(): Promise<IPolicy[]> {
    return this.policyModel.find();
  }
  async filterPolicy(payload): Promise<any> {
    return this.policyModel.find(payload);
  }

  async addPolicy(payload: IPolicy): Promise<IPolicy> {
    const newPolicy = await this.policyModel.create(payload);
    newPolicy.save();
    return newPolicy;
  }

  async updatePolicy(payload: IPolicy): Promise<IPolicy> {
    const updatedPolicy = await this.policyModel.findOneAndUpdate(
      { policyId: payload.policyId },
      payload,
      { new: true },
    );
    return updatedPolicy;
  }
}
