import { EventType } from '../../shared/types/EventType';

export interface Event {
    type: EventType
    origin?: string
    destination?: string
    amount: number
}