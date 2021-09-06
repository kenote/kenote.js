
declare class ExBuffer {

  constructor (bufferLength?: number)

  public uint32Head (): this

  public ushortHead (): this

  public littleEndian (): this

  public bigEndian (): this

  public once (e: string, cb: (buffer: Buffer) => void): void

  public on (e: string, cb: (buffer: Buffer) => void): void

  public off (e: string, cb: (buffer: Buffer) => void): void

  public emit (e: string, ...args: any[]): void

  public put (buffer: Buffer, offset?: number, len?: number): void
}

export default ExBuffer