
export default class ExBuffer {

  private _buffer: Buffer
  private _readOffset: number = 0
  private _putOffset: number = 0
  private _headLen: number = 2
  private _endian: string = 'B'
  private _readMethod: string = 'readUInt16BE'
  private _dlen: number = 0
  private listeners?: Record<string, any>
  private listeners_once?: Record<string, any>

  constructor (bufferLength?: number) {
    this._buffer = Buffer.alloc(bufferLength ?? 8192)
  }

  uint32Head () {
    this._headLen = 4
    this._readMethod = 'readUInt' + (8 * this._headLen) + '' + this._endian + 'E'
    return this
  }

  ushortHead () {
    this._headLen = 2
    this._readMethod = 'readUInt' + (8 * this._headLen) + '' + this._endian + 'E'
    return this
  }

  littleEndian () {
    this._endian = 'L'
    this._readMethod = 'readUInt' + (8 * this._headLen) + '' + this._endian + 'E'
    return this
  }

  bigEndian () {
    this._endian = 'B'
    this._readMethod = 'readUInt' + (8 * this._headLen) + '' + this._endian + 'E'
    return this
  }

  once (e: string, cb: (buffer: Buffer) => void) {
    if (!this.listeners_once) this.listeners_once = {}
    this.listeners_once[e] = this.listeners_once[e] ?? []
    if (this.listeners_once[e].indexOf(cb) == -1) this.listeners_once[e].push(cb)
  }

  on (e: string, cb: (buffer: Buffer) => void) {
    if (!this.listeners) this.listeners = {}
    this.listeners[e] = this.listeners[e] ?? []
    if (this.listeners[e].indexOf(cb) == -1) this.listeners[e].push(cb)
  }

  off (e: string, cb: (buffer: Buffer) => void) {
    let index: number = -1
    
    // tslint:disable-next-line: no-conditional-assignment
    if (this.listeners && this.listeners[e] && (index = this.listeners[e].indexOf(cb)) != -1)
      this.listeners[e].splice(index)
  }

  emit (e: string, ...args: any[]) {
    let other_parameters: any = this.slice.call(arguments, 1)
    if (this.listeners) {
      let list = this.listeners[e]
      if (list) {
        // tslint:disable-next-line: prefer-for-of
        for (let i: number = 0; i < list.length; ++i) {
          list[i].apply(this, other_parameters)
        }
      }
    }
    if (this.listeners_once) {
      let list = this.listeners_once[e]
      delete this.listeners_once[e]
      if (list) {
        // tslint:disable-next-line: prefer-for-of
        for (let i: number = 0; i < list.length; ++i) {
          list[i].apply(this, other_parameters)
        }
      }
    }
  }

  put (buffer: Buffer, offset?: number, len?: number) {
    if (offset == undefined) offset = 0
    if (len == undefined) len = buffer.length - offset

    if (len + this.getLen() > this._buffer.length - 1) {
      let ex = Math.ceil((len + this.getLen()) / (1024))
      let tmp = Buffer.alloc(ex * 1024)
      let exlen = tmp.length - this._buffer.length
      this._buffer.copy(tmp)
      // fix bug : superzheng
      if (this._putOffset < this._readOffset) {
        if (this._putOffset <= exlen) {
          tmp.copy(tmp, this._buffer.length, 0, this._putOffset)
          this._putOffset += this._buffer.length
        } else {
          // fix bug : superzheng
          tmp.copy(tmp, this._buffer.length, 0, exlen)
          tmp.copy(tmp, 0, exlen, this._putOffset)
          this._putOffset -= exlen
        }
      }
      this._buffer = tmp
    }
    if (this.getLen() == 0){
      this._putOffset = this._readOffset = 0
    }
    if ((this._putOffset + len) > this._buffer.length) {
        // 分两次存 一部分存在数据后面 一部分存在数据前面
        let len1 = this._buffer.length - this._putOffset
        if (len1 > 0) {
          buffer.copy(this._buffer, this._putOffset, offset, offset + len1)
          offset += len1
        }
        
        let len2 = len - len1
        buffer.copy(this._buffer, 0, offset, offset + len2)
        this._putOffset = len2
    }
    else {
      buffer.copy(this._buffer, this._putOffset, offset, offset + len)
      this._putOffset += len
    }
    
    let count = 0
    while (true) {
      count++
      if (count > 1000) break // 1000次还没读完??
      if (this._dlen == 0) {
        if (this.getLen() < this._headLen) {
          break // 连包头都读不了
        }
        if (this._buffer.length - this._readOffset >= this._headLen) {
          this._dlen = this._buffer[this._readMethod](this._readOffset)
          this._readOffset += this._headLen
        }
        else {//
          let hbuf = Buffer.alloc(this._headLen)
          let rlen = 0
          for (let i: number = 0; i < (this._buffer.length - this._readOffset); i++) {
            hbuf[i] = this._buffer[this._readOffset++]
            rlen++
          }
          this._readOffset = 0
          for (let i: number = 0; i < (this._headLen - rlen); i++) {
              hbuf[rlen + i] = this._buffer[this._readOffset++]
          }
          this._dlen = hbuf[this._readMethod](0)
        }
      }
      if (this.getLen() >= this._dlen) {
        let dbuff = Buffer.alloc(this._dlen)
        if (this._readOffset + this._dlen > this._buffer.length) {
          let len1 = this._buffer.length - this._readOffset
          if (len1 > 0) {
            this._buffer.copy(dbuff, 0, this._readOffset, this._readOffset + len1)
          }

          this._readOffset = 0
          let len2 = this._dlen - len1
          this._buffer.copy(dbuff, len1, this._readOffset, this._readOffset += len2)
        }
        else {
          this._buffer.copy(dbuff, 0, this._readOffset, this._readOffset += this._dlen)
        }
        try {
          this._dlen = 0
          this.emit('data', dbuff)
          if (this._readOffset === this._putOffset) {
            break
          }
        } catch (error) {
          this.emit('error', error)
        }
      }
      else {
        break
      }
    }
  }

  private getLen () {
    if (this._putOffset >= this._readOffset) {
      return this._putOffset -  this._readOffset
    }
    return this._buffer.length - this._readOffset + this._putOffset
  }


  private slice = Array.prototype.slice
  
}