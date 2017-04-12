import { PresentationConnectionList } from './presentation-connection-list';
export interface PresentationReceiver {
    connectionList: Promise<PresentationConnectionList>;
}
