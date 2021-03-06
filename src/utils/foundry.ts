import { HotbarData } from '../flags/hotbarFlags';
import { UpdateMsg } from '../controller';

export function duplicate<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}

/**
 * This module contains only interfaces as they occur in Foundry
 */
export interface Notifier {
    info: (string) => void;
    warn: (string) => void;
    error: (string) => void;
}

export interface User extends Identifiable {
    update(data: unknown): unknown;
    isGM: boolean;
}

export interface Identifiable {
    id: string;
}

export interface Macro {
    macro: Identifiable;
    slot: number;
}

export interface Flaggable extends Identifiable {
    getFlag(scope: string, key: string): HotbarData | undefined;
    setFlag(scope: string, key: string, data?: HotbarData): Promise<Flaggable>;
    unsetFlag(scope: string, key: string): Promise<Flaggable>;
}

export type IActor = Flaggable

export interface IToken extends Flaggable {
    data: { actorLink: boolean };
    actor?: IActor;
}

export interface Game {
    actors: Map<string, IActor>;
    user: Flaggable;
}

export interface Canvas {
    tokens: Map<string, IToken>;
}

export interface FoundryUiHotbar {
    page: number;
    _getMacrosByPage: (page: number) => Macro[];
    render: (force?: boolean) => void;
    expand: () => Promise<unknown>;
    collapse: () => Promise<unknown>;
}

export interface Socket {
    emit: (scope: 'module.TokenHotbar', msg: UpdateMsg) => void;
    on: (scope: 'module.TokenHotbar', callback: ((msg: UpdateMsg) => void)) => void;
}
