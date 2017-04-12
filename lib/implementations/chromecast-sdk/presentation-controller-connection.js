"use strict";
const presentation_connection_state_events_1 = require('../../partial/presentation-connection-state-events');
const shared_1 = require('./shared');
class PresentationControllerConnection extends presentation_connection_state_events_1.PresentationConnectionStateEvents {
    constructor(id, url) {
        super();
        this.id = id;
        this.url = url;
        this.sessionChange = this.sessionChange.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this._instance = cast.framework.CastContext.getInstance();
        this._instance.addEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED, this.sessionChange);
        this.state = "connecting";
        this._instance.requestSession();
    }
    tidyup() {
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
    send(msg) {
        if (!this._session) {
            throw new Error("Cannot send message without an active session");
        }
        this._session.sendMessage(shared_1.MESSAGE_NAMESPACE, msg);
    }
    sessionChange(e) {
        if (e.sessionState === cast.framework.SessionState.SESSION_STARTING) {
            this._session = null;
            this.state = "connecting";
        }
        else if (e.sessionState === cast.framework.SessionState.SESSION_STARTED) {
            this._session = e.session;
            this._session.addMessageListener(shared_1.MESSAGE_NAMESPACE, this.receiveMessage);
            this.state = "connected";
        }
        else if (e.sessionState === cast.framework.SessionState.SESSION_START_FAILED) {
            this._session = null;
            this.state = "terminated";
        }
    }
    receiveMessage(namespace, message) {
        this.dispatchEvent({
            type: 'message',
            data: message
        });
    }
    catchConnectError(err) {
        this.state = "terminated";
        throw err;
    }
}
exports.PresentationControllerConnection = PresentationControllerConnection;
