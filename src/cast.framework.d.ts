declare namespace cast.framework {

    export interface CastOptions {
        autoJoinPolicy: chrome.cast.AutoJoinPolicy,
        receiverApplicationId: string
    }

    export enum CastContextEventType {
        CAST_STATE_CHANGED,
        SESSION_STATE_CHANGED
    }

    export enum CastState {
        NO_DEVICES_AVAILABLE,
        NOT_CONNECTED,
        CONNECTING,
        CONNECTED
    }

    export interface CastStateEventData {
        castState: CastState
    }

    export enum SessionState {
        NO_SESSION,
        SESSION_STARTING,
        SESSION_STARTED,
        SESSION_START_FAILED,
        SESSION_ENDING,
        SESSION_ENDED,
        SESSION_RESUMED
    }

    export interface SessionStateEventData {
        session: CastSession;
        sessionState: SessionState;
        opt_errorCode: any;
    }

    type CastStateEventDataCallback = (n: CastStateEventData | SessionStateEventData) => any;
    // type SessionStateEventDataCallback = (n: SessionStateEventData) => any;

    export class CastSession {
        sendMessage(namespace: string, message: string);
        addMessageListener(namespace: string, handler: Function);
        endSession(stopCasting: boolean);
    }

    export class CastContext {
        static getInstance(): CastContext;
        setOptions(opts: CastOptions);
        addEventListener(ev: CastContextEventType, CastStateEventDataCallback);
        removeEventListener(ev: CastContextEventType, CastStateEventDataCallback);
        getCastState(): CastState;
        requestSession(): Promise<void>;
        endCurrentSession(stop: boolean);
    }
}

declare namespace cast.receiver {

    export class CastMessageBus {
        onMessage: Function;
        senders: string[];
        broadcast(message: string);
        send(senderId: string, message: string);
        addEventListener(eventType: CastMessageBus.EventType, func: Function);
    }

    module CastMessageBus {
        enum EventType {
            MESSAGE
        }

        interface Event {
            senderId: string;
            data: string;
        }
    }

    export class CastReceiverManager {
        static getInstance(): CastReceiverManager;
        getCastMessageBus(namespace: string): CastMessageBus;
        start();
        addEventListener(EventType, Function);
    }

    export module CastReceiverManager {
        class Config {
            maxInactivity?: number;
            statusText?: string;
        }

        enum EventType {
            ERROR,
            FEEDBACK_STARTED,
            MAX_VIDEO_RESOLUTION_CHANGED,
            READY,
            SENDER_CONNECTED,
            SENDER_DISCONNECTED,
            SHUTDOWN,
            STANDBY_CHANGED,
            SYSTEM_VOLUME_CHANGED,
            VISIBILITY_CHANGED
        }
    }

    export interface SenderConnectedEvent {
        senderId: string;
        userAgent: string;
    }

}


declare namespace chrome.cast {
    /**
     * @enum {string}
     * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.AutoJoinPolicy
     */
    export enum AutoJoinPolicy {
        TAB_AND_ORIGIN_SCOPED,
        ORIGIN_SCOPED,
        PAGE_SCOPED
    }
}