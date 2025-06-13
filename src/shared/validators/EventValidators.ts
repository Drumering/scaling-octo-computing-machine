export function isValidEvent(object: unknown) {
    const event = object as Record<string, unknown>;
    return (
        typeof event === 'object' &&
        event !== null &&
        typeof event.type === 'string' &&
        typeof event.amount === 'number' &&
        (event.destination === undefined || typeof event.destination === 'string') &&
        (event.origin === undefined || typeof event.origin === 'string')
    );
}