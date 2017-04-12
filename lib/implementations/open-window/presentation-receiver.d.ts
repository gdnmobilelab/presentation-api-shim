import { PresentationReceiver as PresentationReceiverInterface } from '../../interfaces/presentation-receiver';
import { PresentationConnectionList } from './presentation-connection-list';
export declare class PresentationReceiver implements PresentationReceiverInterface {
    connectionList: Promise<PresentationConnectionList>;
    constructor();
}
