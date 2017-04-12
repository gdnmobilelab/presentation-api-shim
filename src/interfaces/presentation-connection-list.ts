import { PresentationConnection } from './presentation-connection';

export interface PresentationConnectionList extends EventTarget {
    connections: PresentationConnection[];
    onconnectionavailable: Function;
}