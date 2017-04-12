import EventTargetImplementation from 'eventtarget';
import { PresentationAvailability as PresentationAvailabilityInterface } from '../../interfaces/presentation-availability';

export class PresentationAvailability extends EventTargetImplementation implements PresentationAvailabilityInterface {

    onchange: Function;
    value: boolean;
    _instance: cast.framework.CastContext

    constructor(applicationId: string) {
        super();

        this.castStateChanged = this.castStateChanged.bind(this);

        this._instance = cast.framework.CastContext.getInstance();

        this._instance.setOptions({
            receiverApplicationId: applicationId,
            autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        });

        this._instance.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, this.castStateChanged);

        this.value = this._instance.getCastState() !== cast.framework.CastState.NO_DEVICES_AVAILABLE;
    }

    private castStateChanged(e: cast.framework.CastStateEventData) {
        let newValue = e.castState !== cast.framework.CastState.NO_DEVICES_AVAILABLE;

        if (newValue == this.value) {
            return;
        }

        this.value = newValue;
        this.dispatchEvent({
            type: 'change'
        });
    }



}