import EventTargetImplementation from 'eventtarget';
import { PresentationRequest as PresentationRequestInterface } from '../../interfaces/presentation-request';

import { PresentationConnectionState } from '../../enums/presentation-connection-state';
import { PresentationControllerConnection } from './presentation-controller-connection';
import { PresentationAvailability } from './presentation-availability';
import createGUID from '../../util/create-guid';
import { getCastAPI } from './cast-api';


export class PresentationRequest extends EventTargetImplementation implements PresentationRequestInterface {

    private _targetAppID: string;
    private _targetURL: string;

    onconnectionavailable: Function;

    constructor(urls: string | string[]) {

        super();

        let urlArray = urls instanceof Array ? urls : [urls];

        let castAppID = urlArray
            .map((u) => /__castAppId__=(\w*)/.exec(u))
            .filter((u) => u != null && u[1])
        [0];
        if (!castAppID) {
            throw new Error("Must provide a Cast URL to constructor");
        }

        this._targetAppID = castAppID[1];
        this._targetURL = castAppID.input;

        // Don't strictly speaking have to do it here, but might as well
        // preload to get ahead of the getAvailability() call.
        getCastAPI();
    }

    getAvailability(): Promise<PresentationAvailability> {
        return getCastAPI()
            .then(() => {
                return new PresentationAvailability(this._targetAppID);
            })
    }

    start(): Promise<PresentationControllerConnection> {
        return getCastAPI()
            .then(() => {
                return new PresentationControllerConnection(createGUID(), this._targetURL);
            })

    }

    reconnect(): Promise<PresentationControllerConnection> {
        throw new Error("Not implemented yet");
    }

}