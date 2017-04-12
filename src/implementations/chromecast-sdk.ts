export { PresentationRequest } from './chromecast-sdk/presentation-request';
import { PresentationReceiver } from './chromecast-sdk/presentation-receiver';

export function getReceiver() {
    return new PresentationReceiver();
}