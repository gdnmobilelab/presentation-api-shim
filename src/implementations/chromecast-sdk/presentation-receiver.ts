import { PresentationReceiver as PresentationReceiverInterface } from '../../interfaces/presentation-receiver';
import { PresentationConnectionList } from './presentation-connection-list';
import { getReceiverAPI } from './receiver-api';


export class PresentationReceiver implements PresentationReceiverInterface {

    connectionList: Promise<PresentationConnectionList>;

    constructor() {

        this.connectionList = getReceiverAPI()
            .then(() => {
                return new PresentationConnectionList();
            })

    }

}