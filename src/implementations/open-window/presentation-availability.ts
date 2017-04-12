import EventTargetImplementation from 'eventtarget';
import { PresentationAvailability as PresentationAvailabilityInterface } from '../../interfaces/presentation-availability';

export class PresentationAvailability extends EventTargetImplementation implements PresentationAvailabilityInterface {

    onchange: Function;

    get value(): boolean {
        return true;
    }

}