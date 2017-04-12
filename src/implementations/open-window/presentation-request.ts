import EventTargetImplementation from 'eventtarget';
import { PresentationRequest as PresentationRequestInterface } from '../../interfaces/presentation-request';

import { PresentationConnectionState } from '../../enums/presentation-connection-state';
import { PresentationConnection } from './presentation-connection';
import { PresentationAvailability } from './presentation-availability';
import createGUID from '../../util/create-guid';

export class PresentationRequest extends EventTargetImplementation implements PresentationRequestInterface {

    private _targetURL: string;
    private _castWindow: Window;

    onconnectionavailable: Function;

    constructor(urls: string | string[]) {
        super();

        let urlArray = urls instanceof Array ? urls : [urls];

        let notCastURL = urlArray.find((u) => u.indexOf('//google.com/cast/#') === -1);

        if (!notCastURL) {
            throw new Error("Must provide a non-Cast URL to constructor");
        }

        this._targetURL = notCastURL;

    }

    getAvailability(): Promise<PresentationAvailability> {
        return Promise.resolve(new PresentationAvailability());
    }

    start(): Promise<PresentationConnection> {

        this._castWindow = window.open(this._targetURL, "cast-target", "left=0,top=0,width=600,height=400,location=yes,status=yes,scrollbars=no");

        let newConnection = new PresentationConnection(this._targetURL, createGUID());
        newConnection.state = "connecting";

        // We now have to wait for our opened window to load, and post a message back to
        // us.
        let listener = (e: MessageEvent) => {

            if (e.source !== this._castWindow) {
                // ensure it is actually a message from our target window
                return;
            }

            if (!e.data || e.data.type !== 'connect') {
                // Shouldn't matter, but you never know what the external page is doing
                return;
            }

            // This only ever runs once, so remove the handler once we know it's valid
            window.removeEventListener('message', listener);

            // We send this back to confirm to the client that there is actually a
            // controller listening for messages
            e.ports[0].start();
            e.ports[0].postMessage({
                type: 'confirmation',
                id: newConnection.id,
                urlForConnection: window.location.href
            })

            newConnection.setMessagePort(e.ports[0]);
            newConnection.state = "connected";

            // feels like this should be stored elsewhere but this works for now

            newConnection.addEventListener('close', () => {
                this._castWindow.close();
            })
        }

        window.addEventListener('message', listener);

        return Promise.resolve(newConnection);
    }

    reconnect(): Promise<PresentationConnection> {
        // todo
        return Promise.resolve(null);
    }

}