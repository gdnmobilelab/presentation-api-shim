/// <reference types="core-js" />
import EventTargetImplementation from 'eventtarget';
import { PresentationAvailability as PresentationAvailabilityInterface } from '../../interfaces/presentation-availability';
export declare class PresentationAvailability extends EventTargetImplementation implements PresentationAvailabilityInterface {
    onchange: Function;
    readonly value: boolean;
}
