export { PresentationRequest } from './open-window/presentation-request';
import { PresentationReceiver } from './open-window/presentation-receiver';

export function getReceiver() {
    return new PresentationReceiver();
}