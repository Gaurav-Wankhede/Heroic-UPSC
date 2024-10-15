declare module 'quill' {
  export interface QuillOptions {
    modules?: any;
    theme?: string;
    formats?: string[];
    bounds?: string | HTMLElement;
    placeholder?: string;
    readOnly?: boolean;
    scrollingContainer?: HTMLElement | null;
    debug?: string | boolean;
  }

  export interface Delta {
    ops?: Array<any>;
    retain?: number;
    delete?: number;
    insert?: any;
  }

  export default class Quill {
    constructor(container: string | Element, options?: QuillOptions);
    deleteText(index: number, length: number, source?: string): Delta;
    disable(): void;
    enable(enabled?: boolean): void;
    getContents(index?: number, length?: number): Delta;
    getLength(): number;
    getText(index?: number, length?: number): string;
    insertEmbed(index: number, type: string, value: any, source?: string): Delta;
    insertText(index: number, text: string, source?: string): Delta;
    insertText(index: number, text: string, format: string, value: any, source?: string): Delta;
    insertText(index: number, text: string, formats: { [key: string]: any }, source?: string): Delta;
    pasteHTML(index: number, html: string, source?: string): string;
    pasteHTML(html: string, source?: string): string;
    setContents(delta: Delta, source?: string): Delta;
    setText(text: string, source?: string): Delta;
    update(source?: string): void;
    updateContents(delta: Delta, source?: string): Delta;

    format(name: string, value: any, source?: string): Delta;
    formatLine(index: number, length: number, source?: string): Delta;
    formatLine(index: number, length: number, format: string, value: any, source?: string): Delta;
    formatLine(index: number, length: number, formats: { [key: string]: any }, source?: string): Delta;
    formatText(index: number, length: number, source?: string): Delta;
    formatText(index: number, length: number, format: string, value: any, source?: string): Delta;
    formatText(index: number, length: number, formats: { [key: string]: any }, source?: string): Delta;
    getFormat(range?: Range): { [key: string]: any };
    getFormat(index: number, length?: number): { [key: string]: any };
    removeFormat(index: number, length: number, source?: string): Delta;

    blur(): void;
    focus(): void;
    getBounds(index: number, length?: number): Bounds;
    getSelection(focus?: boolean): Range;
    hasFocus(): boolean;
    setSelection(index: number, length: number, source?: string): void;
    setSelection(range: Range, source?: string): void;

    on(eventName: string, handler: Function): Quill;
    once(eventName: string, handler: Function): Quill;
    off(eventName: string, handler: Function): Quill;

    debug(level: string | boolean): void;
    import(path: string): any;
    register(path: string, def: any, suppressWarning?: boolean): void;
    addContainer(className: string, refNode?: HTMLElement): HTMLElement;
    addContainer(domNode: HTMLElement, refNode?: HTMLElement): HTMLElement;
    getModule(name: string): any;

    static register(path: string, def: any, suppressWarning?: boolean): void;
    static import(path: string): any;
    static find(domNode: Node | string): Quill | null;
    static overload(func: (...args: any[]) => any, ...paramters: any[]): (...args: any[]) => any;
    static sources: { USER: string, SILENT: string, API: string };

    static version: string;
  }
}
