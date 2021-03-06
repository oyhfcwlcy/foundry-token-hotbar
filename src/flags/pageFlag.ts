import { CONSTANTS } from '../utils/constants';

export class PageFlag {
    public get(): number {
        const page = localStorage.getItem(`${CONSTANTS.module.name}.activePage`);
        if (page) return +page;
        return 1;
    }

    public set(page: number): void {
        localStorage.setItem(`${CONSTANTS.module.name}.activePage`, page + '');
    }
}