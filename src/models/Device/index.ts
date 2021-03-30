import { Device } from "../../entities/Device";
import { IDevice } from '../../types/entities';

export type TDeviceCreateInput = Omit<IDevice, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export async function createForSession(params: TDeviceCreateInput): Promise<Device> {
    return await Device.create(params);
}