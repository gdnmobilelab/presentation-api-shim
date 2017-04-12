/// <reference types="core-js" />
import { PresentationAvailability } from './presentation-availability';
import { PresentationConnection } from './presentation-connection';
export interface PresentationRequest extends EventTarget {
    getAvailability(): Promise<PresentationAvailability>;
    start(): Promise<PresentationConnection>;
    reconnect(presentationId: string): Promise<PresentationConnection>;
    onconnectionavailable: Function;
}
