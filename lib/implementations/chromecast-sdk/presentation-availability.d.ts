/// <reference types="core-js" />
import EventTargetImplementation from 'eventtarget';
import { PresentationAvailability as PresentationAvailabilityInterface } from '../../interfaces/presentation-availability';
export declare class PresentationAvailability extends EventTargetImplementation implements PresentationAvailabilityInterface {
    onchange: Function;
    value: boolean;
    _instance: cast.framework.CastContext;
    constructor(applicationId: string);
    private castStateChanged(e);
}
