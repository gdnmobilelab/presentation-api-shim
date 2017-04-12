import { PresentationAvailability } from './presentation-availability';
import { PresentationConnection } from './presentation-connection';

export interface PresentationRequest extends EventTarget {
    // constructor(urls: string | string[])
    getAvailability(): Promise<PresentationAvailability>
    start(): Promise<PresentationConnection>
    reconnect(presentationId: string): Promise<PresentationConnection>
    onconnectionavailable: Function
}