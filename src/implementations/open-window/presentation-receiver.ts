import { PresentationReceiver as PresentationReceiverInterface } from '../../interfaces/presentation-receiver';
import { PresentationConnectionList } from './presentation-connection-list';

export class PresentationReceiver implements PresentationReceiverInterface {

    connectionList: Promise<PresentationConnectionList>;

    constructor() {
        if (window.opener) {
            this.connectionList = Promise.resolve(new PresentationConnectionList());
        } else {
            this.connectionList = Promise.reject(new Error("Not a manually opened window"))
        }
    }

}