import { PresentationConnection as PresentationConnectionInterface } from '../../interfaces/presentation-connection';
import { PresentationConnectionStateEvents } from '../../partial/presentation-connection-state-events';
import { MESSAGE_NAMESPACE } from './shared';

export class PresentationControllerConnection extends PresentationConnectionStateEvents implements PresentationConnectionInterface {

    id: string;
    url: string;

    private _instance: cast.framework.CastContext;
    private _session: cast.framework.CastSession;

    constructor(id: string, url: string) {
        super();
        this.id = id;
        this.url = url;

        this.sessionChange = this.sessionChange.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);

        this._instance = cast.framework.CastContext.getInstance();

        this._instance.addEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED, this.sessionChange)

        this.state = "connecting";

        this._instance.requestSession();
    }

    private tidyup() {
        this._instance.removeEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED, this.sessionChange);
    }

    close() {
        this._instance.endCurrentSession(true);
        this.tidyup();
    }

    terminate() {
        this._instance.endCurrentSession(true);
        this.tidyup();
    }

    send(msg: string) {
        if (!this._session) {
            throw new Error("Cannot send message without an active session");
        }

        this._session.sendMessage(MESSAGE_NAMESPACE, msg);
    }

    private sessionChange(e: cast.framework.SessionStateEventData) {
        if (e.sessionState === cast.framework.SessionState.SESSION_STARTING) {
            this._session = null;
            this.state = "connecting";
        }
        else if (e.sessionState === cast.framework.SessionState.SESSION_STARTED) {
            this._session = e.session;
            this._session.addMessageListener(MESSAGE_NAMESPACE, this.receiveMessage);
            this.state = "connected";
        } else if (e.sessionState === cast.framework.SessionState.SESSION_START_FAILED) {
            this._session = null;
            this.state = "terminated";
        }
    }

    private receiveMessage(namespace: string, message: string) {
        this.dispatchEvent({
            type: 'message',
            data: message
        })
    }

    catchConnectError(err: Error) {
        this.state = "terminated";
        throw err;
    }

}