export class BBPacker {
    littleEndian = true;
    bitIndexReverse = false;
    throwAtRangeOverflow = false;
    static SIZE8 = 1;
    static SIZE16 = 2;
    static SIZE32 = 4;
    static SIZE64 = 8;
    static MAX_UINT_ARG = 9007199254740991;
    static MAX_UINT8 = 0xFF;
    static MIN_UINT8 = 0;
    static MAX_INT8 = 127;
    static MIN_INT8 = -128;
    static MAX_UINT16 = 0xFFFF;
    static MIN_UINT16 = 0;
    static MAX_INT16 = 32767;
    static MIN_INT16 = -32768;
    static MAX_UINT32 = 0xFFFF_FFFF;
    static MIN_UINT32 = 0;
    static MAX_INT32 = 2147483647;
    static MIN_INT32 = -2147483648;
    static MAX_UINT64_HI = BBPacker.MAX_UINT32;
    static MAX_UINT64_LO = BBPacker.MAX_UINT32;
    static MIN_UINT64_HI = BBPacker.MIN_UINT32;
    static MIN_UINT64_LO = BBPacker.MIN_UINT32;
    static MAX_INT64_HI = BBPacker.MAX_INT32;
    static MAX_INT64_LO = BBPacker.MAX_UINT32;
    static MIN_INT64_HI = BBPacker.MIN_INT32;
    static MIN_INT64_LO = BBPacker.MIN_UINT32;
    static MAX_BITS_NUMBER = 32;
    constructor(arg, conf) {
        if (typeof (arg) == 'number') {
            arg = BBPacker.checkUI(arg);
            this.arrayBuffer = new ArrayBuffer(arg);
        }
        else if (arg instanceof BBPacker) {
            this.$buffer = arg.$buffer;
            this.$data = arg.$data;
            this.$index = arg.index;
            this.littleEndian = arg.littleEndian;
            this.bitIndexReverse = arg.bitIndexReverse;
            this.throwAtRangeOverflow = arg.throwAtRangeOverflow;
        }
        else if (arg instanceof ArrayBuffer) {
            this.arrayBuffer = arg;
        }
        else {
            throw new Error("Contructor argument");
        }
        this._setConf(conf);
    }
    static build8(num, conf) {
        num = BBPacker.checkUI(num);
        const packer = new BBPacker(num);
        packer._setConf(conf);
        return packer;
    }
    static build16(num, conf) {
        num = BBPacker.checkUI(num);
        const packer = new BBPacker(num * BBPacker.SIZE16);
        packer._setConf(conf);
        return packer;
    }
    static build32(num, conf) {
        num = BBPacker.checkUI(num);
        const packer = new BBPacker(num * BBPacker.SIZE32);
        packer._setConf(conf);
        return packer;
    }
    static build64(num, conf) {
        num = BBPacker.checkUI(num);
        const packer = new BBPacker(num * BBPacker.SIZE64);
        packer._setConf(conf);
        return packer;
    }
    static copyFrom(arg, conf) {
        let packer;
        if (arg instanceof BBPacker) {
            const newArrayBuffer = arg.arrayBuffer.slice(0);
            packer = new BBPacker(newArrayBuffer);
            packer.$buffer = arg.$buffer;
            packer.$data = arg.$data;
            packer.$index = arg.index;
            packer.littleEndian = arg.littleEndian;
            packer.bitIndexReverse = arg.bitIndexReverse;
            packer.throwAtRangeOverflow = arg.throwAtRangeOverflow;
        }
        else if (arg instanceof ArrayBuffer) {
            const newArrayBuffer = arg.slice(0);
            packer = new BBPacker(newArrayBuffer);
        }
        else {
            throw new Error("Contructor argument");
        }
        packer._setConf(conf);
        return packer;
    }
    static fromUint8(arr, conf) {
        const packer = BBPacker.build8(arr.length, conf);
        packer.writeArrU8(0, arr);
        return packer;
    }
    static fromInt8(arr, conf) {
        const packer = BBPacker.build8(arr.length, conf);
        packer.writeArrI8(0, arr);
        return packer;
    }
    static fromUint16(arr, conf) {
        const packer = BBPacker.build16(arr.length, conf);
        packer.writeArrU16(0, arr);
        return packer;
    }
    static fromInt16(arr, conf) {
        const packer = BBPacker.build16(arr.length, conf);
        packer.writeArrI16(0, arr);
        return packer;
    }
    static fromUint32(arr, conf) {
        const packer = BBPacker.build32(arr.length, conf);
        packer.writeArrU32(0, arr);
        return packer;
    }
    static fromInt32(arr, conf) {
        const packer = BBPacker.build32(arr.length, conf);
        packer.writeArrI32(0, arr);
        return packer;
    }
    static fromUint64(arr, conf) {
        const packer = BBPacker.build64(arr.length, conf);
        packer.writeArrU64(0, arr);
        return packer;
    }
    static fromInt64(arr, conf) {
        const packer = BBPacker.build64(arr.length, conf);
        packer.writeArrI64(0, arr);
        return packer;
    }
    static fromFloat32(arr, conf) {
        const packer = BBPacker.build32(arr.length, conf);
        packer.writeArrF32(0, arr);
        return packer;
    }
    static fromFloat64(arr, conf) {
        const packer = BBPacker.build64(arr.length, conf);
        packer.writeArrF64(0, arr);
        return packer;
    }
    get conf() {
        return {
            index: this.$index,
            littleEndian: this.littleEndian,
            bitIndexReverse: this.bitIndexReverse,
            throwAtRangeOverflow: this.throwAtRangeOverflow
        };
    }
    set conf(conf) {
        this._setConf(conf);
    }
    get arrayBufferSize() {
        return this.$buffer.byteLength;
    }
    get arrayBuffer() {
        return this.$buffer;
    }
    set arrayBuffer(buffer) {
        this.$buffer = buffer;
        this.$data = new DataView(this.$buffer);
        this.$index = 0;
    }
    createArrayBuffer(size, copyOld) {
        const oldArrayBuffer = this.arrayBuffer;
        this.arrayBuffer = new ArrayBuffer(size);
        if (typeof copyOld == 'boolean') {
            if (copyOld == true) {
                const newArrayBufferSize = this.arrayBufferSize;
                const oldArrayBufferSize = oldArrayBuffer.byteLength;
                let _size = 0;
                if (newArrayBufferSize >= oldArrayBufferSize) {
                    _size = oldArrayBufferSize;
                }
                else {
                    _size = newArrayBufferSize;
                }
                this.setCopyOfArrayBuffer(0, oldArrayBuffer, _size);
            }
        }
    }
    getCopyOfArrayBuffer(index, size) {
        index = BBPacker.checkUI(index);
        let _size = this.$buffer.byteLength;
        if (_size) {
            if (index >= _size) {
                throw new RangeError("Index >= Buffer size");
            }
        }
        else if (index > _size) {
            throw new RangeError("Index > Buffer size");
        }
        _size = _size - index;
        if (typeof size == 'number') {
            size = BBPacker.checkUI(size);
            if (size == 0) {
                return new ArrayBuffer(0);
            }
            if (size > _size) {
                throw new RangeError(" Size > Buffer size");
            }
            return this.$buffer.slice(index, index + size);
        }
        if (_size == 0)
            return new ArrayBuffer(0);
        return this.$buffer.slice(index);
    }
    setCopyOfArrayBuffer(index, buffer, bufferSize, bufferOffset) {
        index = BBPacker.checkUI(index);
        let _size = this.$buffer.byteLength;
        let _bufferSize = buffer.byteLength;
        let _bufferOffset = 0;
        if (_size) {
            if (index >= _size) {
                throw new RangeError("Index >= Buffer size");
            }
        }
        else if (index > _size) {
            throw new RangeError("Index > Buffer size");
        }
        _size = _size - index;
        if (typeof bufferSize == 'number') {
            _bufferSize = BBPacker.checkUI(bufferSize);
            if (typeof bufferOffset == "number") {
                _bufferOffset = BBPacker.checkUI(bufferOffset);
            }
            if (_bufferSize > _size) {
                throw new RangeError("Size > Buffer size");
            }
            else {
                _size = _bufferSize;
            }
        }
        else {
            if (_bufferSize > _size) {
                throw new RangeError("Size > Buffer size");
            }
            else {
                _size = _bufferSize;
            }
        }
        if (_size == 0)
            return 0;
        const dst = new Uint8Array(this.$buffer);
        const src = new Uint8Array(buffer, _bufferOffset, _bufferSize);
        for (let i = 0; i < _size; i++) {
            dst[i + index] = src[i];
        }
        return _size;
    }
    pushArrayBuffer(buffer, bufferSize, bufferOffset) {
        const size = this.setCopyOfArrayBuffer(this.$index, buffer, bufferSize, bufferOffset);
        this.$index += size;
        return size;
    }
    getCopyOfBBPacker(index, size) {
        const buffer = this.getCopyOfArrayBuffer(index, size);
        return new BBPacker(buffer, this.conf);
    }
    static U32toI32(value) {
        return (value >>> 0) >> 0;
    }
    static U16toI16(value) {
        return (((value & 0xFFFF) << 16) >> 0) >> 16;
    }
    static U8toI8(value) {
        return (((value & 0xFF) << 24) >> 0) >> 24;
    }
    get index() {
        return this.$index;
    }
    set index(index) {
        this.$index = this._validateSetupIndex(index, BBPacker.SIZE8);
    }
    resetIndex() {
        this.$index = 0;
    }
    set index16(index) {
        this.$index = this._validateSetupIndex(index, BBPacker.SIZE16);
    }
    set index32(index) {
        this.$index = this._validateSetupIndex(index, BBPacker.SIZE32);
    }
    set index64(index) {
        this.$index = this._validateSetupIndex(index, BBPacker.SIZE64);
    }
    getIndex16(index) {
        return this._validateSetupIndex(index, BBPacker.SIZE16);
    }
    getIndex32(index) {
        return this._validateSetupIndex(index, BBPacker.SIZE32);
    }
    getIndex64(index) {
        return this._validateSetupIndex(index, BBPacker.SIZE64);
    }
    get indexRestSize() {
        if (this.$index > this.$buffer.byteLength)
            return 0;
        return this.$buffer.byteLength - this.$index;
    }
    get indexFullSize() {
        return this.$index;
    }
    isAlign16(index, size) {
        if (this.$buffer.byteLength == 0)
            return false;
        const count = this._getNItems(BBPacker.SIZE8, index, size);
        if (count == 0)
            return false;
        if ((count % 2) === 0)
            return true;
        return false;
    }
    isAlign32(index, size) {
        if (this.$buffer.byteLength == 0)
            return false;
        const count = this._getNItems(BBPacker.SIZE8, index, size);
        if (count == 0)
            return false;
        if ((count % 4) === 0)
            return true;
        return false;
    }
    isAlign64(index, size) {
        if (this.$buffer.byteLength == 0)
            return false;
        const count = this._getNItems(BBPacker.SIZE8, index, size);
        if (count == 0)
            return false;
        if ((count % 8) === 0)
            return true;
        return false;
    }
    getNumber16(index, size) {
        return this._getNItems(BBPacker.SIZE16, index, size);
    }
    getNumber32(index, size) {
        return this._getNItems(BBPacker.SIZE32, index, size);
    }
    getNumber64(index, size) {
        return this._getNItems(BBPacker.SIZE64, index, size);
    }
    allZerro() {
        let len = this.$buffer.byteLength;
        let i = 0;
        while (len--) {
            this.$data.setUint8(i++, 0);
        }
    }
    forAllUint8(func, index, count) {
        const size = this._forAllNItems(BBPacker.SIZE8, index, count);
        let _index = size.index;
        let _count = size.count;
        let rc = true;
        let inc = 0;
        while (_count--) {
            if (func(inc++, this.$data.getUint8(_index)) === false) {
                rc = false;
                break;
            }
            _index += BBPacker.SIZE8;
        }
        return rc;
    }
    forAllInt8(func, index, count) {
        const size = this._forAllNItems(BBPacker.SIZE8, index, count);
        let _index = size.index;
        let _count = size.count;
        let rc = true;
        let inc = 0;
        while (_count--) {
            if (func(inc++, this.$data.getInt8(_index)) === false) {
                rc = false;
                break;
            }
            _index += BBPacker.SIZE8;
        }
        return rc;
    }
    forAllUint16(func, index, count, littleEndian) {
        const size = this._forAllNItems(BBPacker.SIZE16, index, count, littleEndian);
        let _index = size.index;
        let _count = size.count;
        const _littleEndian = size.littleEndian;
        let rc = true;
        let inc = 0;
        while (_count--) {
            if (func(inc++, this.$data.getUint16(_index, _littleEndian)) === false) {
                rc = false;
                break;
            }
            _index += BBPacker.SIZE16;
        }
        return rc;
    }
    forAllInt16(func, index, count, littleEndian) {
        const size = this._forAllNItems(BBPacker.SIZE16, index, count, littleEndian);
        let _index = size.index;
        let _count = size.count;
        const _littleEndian = size.littleEndian;
        let rc = true;
        let inc = 0;
        while (_count--) {
            if (func(inc++, this.$data.getInt16(_index, _littleEndian)) === false) {
                rc = false;
                break;
            }
            _index += BBPacker.SIZE16;
        }
        return rc;
    }
    forAllUint32(func, index, count, littleEndian) {
        const size = this._forAllNItems(BBPacker.SIZE32, index, count, littleEndian);
        let _index = size.index;
        let _count = size.count;
        const _littleEndian = size.littleEndian;
        let rc = true;
        let inc = 0;
        while (_count--) {
            if (func(inc++, this.$data.getUint32(_index, _littleEndian)) === false) {
                rc = false;
                break;
            }
            _index += BBPacker.SIZE32;
        }
        return rc;
    }
    forAllInt32(func, index, count, littleEndian) {
        const size = this._forAllNItems(BBPacker.SIZE32, index, count, littleEndian);
        let _index = size.index;
        let _count = size.count;
        const _littleEndian = size.littleEndian;
        let rc = true;
        let inc = 0;
        while (_count--) {
            if (func(inc++, this.$data.getInt32(_index, _littleEndian)) === false) {
                rc = false;
                break;
            }
            _index += BBPacker.SIZE32;
        }
        return rc;
    }
    forAllUint64(func, index, count, littleEndian) {
        const size = this._forAllNItems(BBPacker.SIZE64, index, count, littleEndian);
        let _index = size.index;
        let _count = size.count;
        const _littleEndian = size.littleEndian;
        let rc = true;
        let inc = 0;
        while (_count--) {
            if (func(inc++, this.readU64(_index, _littleEndian)) === false) {
                rc = false;
                break;
            }
            _index += BBPacker.SIZE64;
        }
        return rc;
    }
    forAllInt64(func, index, count, littleEndian) {
        const size = this._forAllNItems(BBPacker.SIZE64, index, count, littleEndian);
        let _index = size.index;
        let _count = size.count;
        const _littleEndian = size.littleEndian;
        let rc = true;
        let inc = 0;
        while (_count--) {
            if (func(inc++, this.readI64(_index, _littleEndian)) === false) {
                rc = false;
                break;
            }
            _index += BBPacker.SIZE64;
        }
        return rc;
    }
    forAllFloat32(func, index, count, littleEndian) {
        const size = this._forAllNItems(BBPacker.SIZE32, index, count, littleEndian);
        let _index = size.index;
        let _count = size.count;
        const _littleEndian = size.littleEndian;
        let rc = true;
        let inc = 0;
        while (_count--) {
            if (func(inc++, this.$data.getFloat32(_index, _littleEndian)) === false) {
                rc = false;
                break;
            }
            _index += BBPacker.SIZE32;
        }
        return rc;
    }
    forAllFloat64(func, index, count, littleEndian) {
        const size = this._forAllNItems(BBPacker.SIZE64, index, count, littleEndian);
        let _index = size.index;
        let _count = size.count;
        const _littleEndian = size.littleEndian;
        let rc = true;
        let inc = 0;
        while (_count--) {
            if (func(inc++, this.$data.getFloat64(_index, _littleEndian)) === false) {
                rc = false;
                break;
            }
            _index += BBPacker.SIZE64;
        }
        return rc;
    }
    static nBits2nBytes(nBits) {
        nBits = BBPacker.checkUI(nBits);
        if (nBits == 0)
            return 0;
        return Math.floor((nBits - 1) / 8) + 1;
    }
    writeBit(bitIndex, bitValue, byteIndex, bitIndexReverse) {
        bitIndex = BBPacker.checkUI(bitIndex);
        let _bitIndexReverse = this.bitIndexReverse;
        let _byteIndex = 0;
        if (typeof byteIndex == "number") {
            _byteIndex = BBPacker.checkUI(byteIndex);
            if (typeof bitIndexReverse == 'boolean') {
                _bitIndexReverse = bitIndexReverse;
            }
        }
        else if (typeof byteIndex == "boolean") {
            _bitIndexReverse = byteIndex;
        }
        this.__writeBit(bitIndex, bitValue, _byteIndex, _bitIndexReverse);
    }
    writeBits(bitIndex, bitsValue, byteIndex, bitIndexReverse) {
        if (bitsValue.length == 0)
            return;
        bitIndex = BBPacker.checkUI(bitIndex);
        let _bitIndexReverse = this.bitIndexReverse;
        let _byteIndex = 0;
        if (typeof byteIndex == "number") {
            _byteIndex = BBPacker.checkUI(byteIndex);
            if (typeof bitIndexReverse == 'boolean') {
                _bitIndexReverse = bitIndexReverse;
            }
        }
        else if (typeof byteIndex == "boolean") {
            _bitIndexReverse = byteIndex;
        }
        this.__valiateBitIndex(bitIndex + (bitsValue.length - 1), _byteIndex);
        for (let bitValue of bitsValue) {
            this.__writeBit(bitIndex, bitValue, _byteIndex, _bitIndexReverse);
            bitIndex++;
        }
    }
    readBit(bitIndex, byteIndex, bitIndexReverse) {
        bitIndex = BBPacker.checkUI(bitIndex);
        let _bitIndexReverse = this.bitIndexReverse;
        let _byteIndex = 0;
        if (typeof byteIndex == "number") {
            _byteIndex = BBPacker.checkUI(byteIndex);
            if (typeof bitIndexReverse == 'boolean') {
                _bitIndexReverse = bitIndexReverse;
            }
        }
        else if (typeof byteIndex == "boolean") {
            _bitIndexReverse = byteIndex;
        }
        return this.__readBit(bitIndex, _byteIndex, _bitIndexReverse);
    }
    readBits(bitIndex, nBits, byteIndex, bitIndexReverse) {
        bitIndex = BBPacker.checkUI(bitIndex);
        nBits = BBPacker.checkUI(nBits);
        let _bitIndexReverse = this.bitIndexReverse;
        let _byteIndex = 0;
        if (typeof byteIndex == "number") {
            _byteIndex = BBPacker.checkUI(byteIndex);
            if (typeof bitIndexReverse == 'boolean') {
                _bitIndexReverse = bitIndexReverse;
            }
        }
        else if (typeof byteIndex == "boolean") {
            _bitIndexReverse = byteIndex;
        }
        if (nBits == 0) {
            return [];
        }
        let arr = new Array(nBits);
        for (let i = 0; i < nBits; i++, bitIndex++) {
            arr[i] = this.__readBit(bitIndex, _byteIndex, _bitIndexReverse);
        }
        return arr;
    }
    toBits(word, bitIndex, nBits, byteIndex, bitIndexReverse) {
        bitIndex = BBPacker.checkUI(bitIndex);
        nBits = BBPacker.checkUI(nBits);
        if (nBits == 0) {
            return;
        }
        if (nBits > BBPacker.MAX_BITS_NUMBER) {
            throw new RangeError("Overflow bitNumber");
        }
        let _bitIndexReverse = this.bitIndexReverse;
        let _byteIndex = 0;
        let _fromMSB = (_bitIndexReverse) ? true : false;
        if (typeof byteIndex == "number") {
            _byteIndex = BBPacker.checkUI(byteIndex);
            if (typeof bitIndexReverse == 'boolean') {
                _bitIndexReverse = bitIndexReverse;
                _fromMSB = (_bitIndexReverse) ? true : false;
            }
            else if (typeof bitIndexReverse?.fromMSB == 'boolean') {
                _fromMSB = bitIndexReverse.fromMSB;
                if (typeof bitIndexReverse.bitIndexReverse == 'boolean') {
                    _bitIndexReverse = bitIndexReverse.bitIndexReverse;
                }
            }
        }
        else if (typeof byteIndex == "boolean") {
            _bitIndexReverse = byteIndex;
            _fromMSB = (_bitIndexReverse) ? true : false;
        }
        else if (typeof byteIndex?.fromMSB == 'boolean') {
            _fromMSB = byteIndex.fromMSB;
            if (typeof byteIndex.bitIndexReverse == 'boolean') {
                _bitIndexReverse = byteIndex.bitIndexReverse;
            }
        }
        this.__valiateBitIndex(bitIndex + (nBits - 1), _byteIndex);
        let mask;
        if (_fromMSB) {
            mask = 1 << (nBits - 1);
            while (nBits--) {
                if ((word & mask) >>> 0) {
                    this.__writeBit(bitIndex, true, _byteIndex, _bitIndexReverse);
                }
                else {
                    this.__writeBit(bitIndex, false, _byteIndex, _bitIndexReverse);
                }
                bitIndex++;
                mask >>>= 1;
            }
            return;
        }
        mask = 1;
        while (nBits--) {
            if ((word & mask) >>> 0) {
                this.__writeBit(bitIndex, true, _byteIndex, _bitIndexReverse);
            }
            else {
                this.__writeBit(bitIndex, false, _byteIndex, _bitIndexReverse);
            }
            bitIndex++;
            mask <<= 1;
        }
    }
    fromBits(bitIndex, nBits, byteIndex, bitIndexReverse) {
        bitIndex = BBPacker.checkUI(bitIndex);
        nBits = BBPacker.checkUI(nBits);
        if (nBits == 0) {
            return 0;
        }
        if (nBits > BBPacker.MAX_BITS_NUMBER) {
            throw new RangeError("Overflow bitNumber");
        }
        let _bitIndexReverse = this.bitIndexReverse;
        let _byteIndex = 0;
        let _fromMSB = (_bitIndexReverse) ? true : false;
        if (typeof byteIndex == "number") {
            _byteIndex = BBPacker.checkUI(byteIndex);
            if (typeof bitIndexReverse == 'boolean') {
                _bitIndexReverse = bitIndexReverse;
                _fromMSB = (_bitIndexReverse) ? true : false;
            }
            else if (typeof bitIndexReverse?.fromMSB == 'boolean') {
                _fromMSB = bitIndexReverse.fromMSB;
                if (typeof bitIndexReverse.bitIndexReverse == 'boolean') {
                    _bitIndexReverse = bitIndexReverse.bitIndexReverse;
                }
            }
        }
        else if (typeof byteIndex == "boolean") {
            _bitIndexReverse = byteIndex;
            _fromMSB = (_bitIndexReverse) ? true : false;
        }
        else if (typeof byteIndex?.fromMSB == 'boolean') {
            _fromMSB = byteIndex.fromMSB;
            if (typeof byteIndex.bitIndexReverse == 'boolean') {
                _bitIndexReverse = byteIndex.bitIndexReverse;
            }
        }
        let mask;
        let word = 0;
        let value;
        if (_fromMSB) {
            mask = 1 << (nBits - 1);
            while (nBits--) {
                value = this.__readBit(bitIndex, _byteIndex, _bitIndexReverse);
                if (value) {
                    word |= mask;
                }
                bitIndex++;
                mask >>>= 1;
            }
            return word >>> 0;
        }
        mask = 1;
        while (nBits--) {
            value = this.__readBit(bitIndex, _byteIndex, _bitIndexReverse);
            if (value) {
                word |= mask;
            }
            bitIndex++;
            mask <<= 1;
        }
        return word >>> 0;
    }
    writeU8(index, value) {
        if (this.throwAtRangeOverflow) {
            BBPacker.validateU8(value, true);
        }
        this.$data.setUint8(index, value & 0xFF);
    }
    writeArrU8(index, value) {
        index = BBPacker.checkUI(index);
        this._validateIndex(index + value.length);
        if (this.throwAtRangeOverflow) {
            for (let item of value) {
                BBPacker.validateU8(item, true);
            }
        }
        for (let item of value) {
            this.$data.setUint8(index, item & 0xFF);
            index += BBPacker.SIZE8;
        }
    }
    putU8(value) {
        this.writeU8(this.$index, value);
        this.$index += BBPacker.SIZE8;
    }
    putArrU8(value) {
        this.writeArrU8(this.$index, value);
        this.$index += value.length * BBPacker.SIZE8;
    }
    readU8(index) {
        return this.$data.getUint8(index);
    }
    readArrU8(index, N) {
        index = BBPacker.checkUI(index);
        let n;
        if (typeof N == 'number') {
            n = BBPacker.checkUI(N);
        }
        else {
            n = this._getNItems(BBPacker.SIZE8, index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        const arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = this.$data.getUint8(index);
            index += BBPacker.SIZE8;
        }
        return arr;
    }
    getU8() {
        const value = this.readU8(this.$index);
        this.$index += BBPacker.SIZE8;
        return value;
    }
    getArrU8(N) {
        const value = this.readArrU8(this.$index, N);
        this.$index += value.length * BBPacker.SIZE8;
        return value;
    }
    writeI8(index, value) {
        if (this.throwAtRangeOverflow) {
            BBPacker.validateI8(value, true);
        }
        this.$data.setInt8(index, value & 0xFF);
    }
    writeArrI8(index, value) {
        index = BBPacker.checkUI(index);
        this._validateIndex(index + value.length);
        if (this.throwAtRangeOverflow) {
            for (let item of value) {
                BBPacker.validateI8(item, true);
            }
        }
        for (let item of value) {
            this.$data.setInt8(index, item & 0xFF);
            index += BBPacker.SIZE8;
        }
    }
    putI8(value) {
        this.writeI8(this.$index, value);
        this.$index += BBPacker.SIZE8;
    }
    putArrI8(value) {
        this.writeArrI8(this.$index, value);
        this.$index += value.length * BBPacker.SIZE8;
    }
    readI8(index) {
        return this.$data.getInt8(index);
    }
    readArrI8(index, N) {
        index = BBPacker.checkUI(index);
        let n;
        if (typeof N == 'number') {
            n = BBPacker.checkUI(N);
        }
        else {
            n = this._getNItems(BBPacker.SIZE8, index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        const arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = this.$data.getInt8(index);
            index += BBPacker.SIZE8;
        }
        return arr;
    }
    getI8() {
        const value = this.readI8(this.$index);
        this.$index += BBPacker.SIZE8;
        return value;
    }
    getArrI8(N) {
        const value = this.readArrI8(this.$index, N);
        this.$index += value.length * BBPacker.SIZE8;
        return value;
    }
    writeU16(index, value, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        if (this.throwAtRangeOverflow) {
            BBPacker.validateU16(value, true);
        }
        this.$data.setUint16(index, value & 0xFFFF, _littleEndian);
    }
    writeArrU16(index, value, littleEndian) {
        index = BBPacker.checkUI(index);
        this._validateIndex(index + (value.length * BBPacker.SIZE16));
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        if (this.throwAtRangeOverflow) {
            for (let item of value) {
                BBPacker.validateU16(item, true);
            }
        }
        for (let item of value) {
            this.$data.setUint16(index, item & 0xFFFF, _littleEndian);
            index += BBPacker.SIZE16;
        }
    }
    putU16(value, littleEndian) {
        this.writeU16(this.$index, value, littleEndian);
        this.$index += BBPacker.SIZE16;
    }
    putArrU16(value, littleEndian) {
        this.writeArrU16(this.$index, value, littleEndian);
        this.$index += value.length * BBPacker.SIZE16;
    }
    readU16(index, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        return this.$data.getUint16(index, _littleEndian);
    }
    readArrU16(index, N, littleEndian) {
        index = BBPacker.checkUI(index);
        let _littleEndian = this.littleEndian;
        let n;
        if (typeof N == 'number') {
            n = BBPacker.checkUI(N);
            if (typeof littleEndian == 'boolean') {
                _littleEndian = littleEndian;
            }
        }
        else if (typeof N == 'boolean') {
            _littleEndian = N;
            n = this.getNumber16(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        else {
            n = this.getNumber16(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        const arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = this.$data.getUint16(index, _littleEndian);
            index += BBPacker.SIZE16;
        }
        return arr;
    }
    getU16(littleEndian) {
        const value = this.readU16(this.$index, littleEndian);
        this.$index += BBPacker.SIZE16;
        return value;
    }
    getArrU16(N, littleEndian) {
        const value = this.readArrU16(this.$index, N, littleEndian);
        this.$index += value.length * BBPacker.SIZE16;
        return value;
    }
    writeI16(index, value, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        if (this.throwAtRangeOverflow) {
            BBPacker.validateI16(value, true);
        }
        this.$data.setInt16(index, value & 0xFFFF, _littleEndian);
    }
    writeArrI16(index, value, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        index = BBPacker.checkUI(index);
        this._validateIndex(index + (value.length * BBPacker.SIZE16));
        if (this.throwAtRangeOverflow) {
            for (let item of value) {
                BBPacker.validateI16(item, true);
            }
        }
        for (let item of value) {
            this.$data.setInt16(index, item & 0xFFFF, _littleEndian);
            index += BBPacker.SIZE16;
        }
    }
    putI16(value, littleEndian) {
        this.writeI16(this.$index, value, littleEndian);
        this.$index += BBPacker.SIZE16;
    }
    putArrI16(value, littleEndian) {
        this.writeArrI16(this.$index, value, littleEndian);
        this.$index += value.length * BBPacker.SIZE16;
    }
    readI16(index, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        return this.$data.getInt16(index, _littleEndian);
    }
    readArrI16(index, N, littleEndian) {
        index = BBPacker.checkUI(index);
        let n;
        let _littleEndian = this.littleEndian;
        if (typeof N == 'number') {
            n = BBPacker.checkUI(N);
            if (typeof littleEndian == 'boolean') {
                _littleEndian = littleEndian;
            }
        }
        else if (typeof N == 'boolean') {
            _littleEndian = N;
            n = this.getNumber16(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        else {
            n = this.getNumber16(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        const arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = this.$data.getInt16(index, _littleEndian);
            index += BBPacker.SIZE16;
        }
        return arr;
    }
    getI16(littleEndian) {
        const value = this.readI16(this.$index, littleEndian);
        this.$index += BBPacker.SIZE16;
        return value;
    }
    getArrI16(N, littleEndian) {
        const value = this.readArrI16(this.$index, N, littleEndian);
        this.$index += BBPacker.SIZE16;
        return value;
    }
    writeU32(index, value, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        if (this.throwAtRangeOverflow) {
            BBPacker.validateU32(value, true);
        }
        this.$data.setUint32(index, value >>> 0, _littleEndian);
    }
    writeArrU32(index, value, littleEndian) {
        index = BBPacker.checkUI(index);
        this._validateIndex(index + (value.length * BBPacker.SIZE32));
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        if (this.throwAtRangeOverflow) {
            for (let item of value) {
                BBPacker.validateU32(item, true);
            }
        }
        for (let item of value) {
            this.$data.setUint32(index, item >>> 0, _littleEndian);
            index += BBPacker.SIZE32;
        }
    }
    putU32(value, littleEndian) {
        this.writeU32(this.$index, value, littleEndian);
        this.$index += BBPacker.SIZE32;
    }
    putArrU32(value, littleEndian) {
        this.writeArrU32(this.$index, value, littleEndian);
        this.$index += value.length * BBPacker.SIZE32;
    }
    readU32(index, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        index = BBPacker.checkUI(index);
        return this.$data.getUint32(index, _littleEndian);
    }
    readArrU32(index, N, littleEndian) {
        index = BBPacker.checkUI(index);
        let n;
        let _littleEndian = this.littleEndian;
        if (typeof N == 'number') {
            n = BBPacker.checkUI(N);
            if (typeof littleEndian == 'boolean') {
                _littleEndian = littleEndian;
            }
        }
        else if (typeof N == 'boolean') {
            _littleEndian = N;
            n = this.getNumber32(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        else {
            n = this.getNumber32(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        const arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = this.$data.getUint32(index, _littleEndian);
            index += BBPacker.SIZE32;
        }
        return arr;
    }
    getU32(littleEndian) {
        const value = this.readU32(this.$index, littleEndian);
        this.$index += BBPacker.SIZE32;
        return value;
    }
    getArrU32(N, littleEndian) {
        const value = this.readArrU32(this.$index, N, littleEndian);
        this.$index += value.length * BBPacker.SIZE32;
        return value;
    }
    writeI32(index, value, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        if (this.throwAtRangeOverflow) {
            BBPacker.validateI32(value, true);
        }
        this.$data.setInt32(index, value >>> 0, _littleEndian);
    }
    writeArrI32(index, value, littleEndian) {
        index = BBPacker.checkUI(index);
        this._validateIndex(index + (value.length * BBPacker.SIZE32));
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        if (this.throwAtRangeOverflow) {
            for (let item of value) {
                BBPacker.validateI32(item, true);
            }
        }
        for (let item of value) {
            this.$data.setInt32(index, item >>> 0, _littleEndian);
            index += BBPacker.SIZE32;
        }
    }
    putI32(value, littleEndian) {
        this.writeI32(this.$index, value, littleEndian);
        this.$index += BBPacker.SIZE32;
    }
    putArrI32(value, littleEndian) {
        this.writeArrI32(this.$index, value, littleEndian);
        this.$index += value.length * BBPacker.SIZE32;
    }
    readI32(index, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        return this.$data.getInt32(index, _littleEndian);
    }
    readArrI32(index, N, littleEndian) {
        index = BBPacker.checkUI(index);
        let n;
        let _littleEndian = this.littleEndian;
        if (typeof N == 'number') {
            n = BBPacker.checkUI(N);
            if (typeof littleEndian == 'boolean') {
                _littleEndian = littleEndian;
            }
        }
        else if (typeof N == 'boolean') {
            _littleEndian = N;
            n = this.getNumber32(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        else {
            n = this.getNumber32(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        const arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = this.$data.getInt32(index, _littleEndian);
            index += BBPacker.SIZE32;
        }
        return arr;
    }
    getI32(littleEndian) {
        const value = this.readI32(this.$index, littleEndian);
        this.$index += BBPacker.SIZE32;
        return value;
    }
    getArrI32(N, littleEndian) {
        const value = this.readArrI32(this.$index, N, littleEndian);
        this.$index += value.length * BBPacker.SIZE32;
        return value;
    }
    writeU64(index, value, littleEndian) {
        index = BBPacker.checkUI(index);
        this._validateIndex(index + BBPacker.SIZE64);
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        if (this.throwAtRangeOverflow) {
            BBPacker.validateU64(value, true);
        }
        if (_littleEndian == true) {
            this.$data.setUint32(index, value.lo >>> 0, _littleEndian);
            this.$data.setUint32(index + BBPacker.SIZE32, value.hi >>> 0, _littleEndian);
        }
        else {
            this.$data.setUint32(index, value.hi >>> 0, _littleEndian);
            this.$data.setUint32(index + BBPacker.SIZE32, value.lo >>> 0, _littleEndian);
        }
    }
    writeArrU64(index, value, littleEndian) {
        index = BBPacker.checkUI(index);
        this._validateIndex(index + (value.length * BBPacker.SIZE64));
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        if (this.throwAtRangeOverflow) {
            for (let item of value) {
                BBPacker.validateU64(item, true);
            }
        }
        for (let item of value) {
            if (_littleEndian == true) {
                this.$data.setUint32(index, item.lo >>> 0, _littleEndian);
                this.$data.setUint32(index + BBPacker.SIZE32, item.hi >>> 0, _littleEndian);
            }
            else {
                this.$data.setUint32(index, item.hi >>> 0, _littleEndian);
                this.$data.setUint32(index + BBPacker.SIZE32, item.lo >>> 0, _littleEndian);
            }
            index += BBPacker.SIZE64;
        }
    }
    putU64(value, littleEndian) {
        this.writeU64(this.$index, value, littleEndian);
        this.$index += BBPacker.SIZE64;
    }
    putArrU64(value, littleEndian) {
        this.writeArrU64(this.$index, value, littleEndian);
        this.$index += value.length * BBPacker.SIZE64;
    }
    readU64(index, littleEndian) {
        index = BBPacker.checkUI(index);
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        let value = { hi: 0, lo: 0 };
        if (_littleEndian == true) {
            value.lo = this.$data.getUint32(index, _littleEndian);
            value.hi = this.$data.getUint32(index + BBPacker.SIZE32, _littleEndian);
        }
        else {
            value.hi = this.$data.getUint32(index, littleEndian);
            value.lo = this.$data.getUint32(index + BBPacker.SIZE32, littleEndian);
        }
        return value;
    }
    readArrU64(index, N, littleEndian) {
        index = BBPacker.checkUI(index);
        let _littleEndian = this.littleEndian;
        let n;
        if (typeof N == 'number') {
            n = BBPacker.checkUI(N);
            if (typeof littleEndian == 'boolean') {
                _littleEndian = littleEndian;
            }
        }
        else if (typeof N == 'boolean') {
            _littleEndian = N;
            n = this.getNumber64(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        else {
            n = this.getNumber64(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        const arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = this.readU64(index, _littleEndian);
            index += BBPacker.SIZE64;
        }
        return arr;
    }
    getU64(littleEndian) {
        const value = this.readU64(this.$index, littleEndian);
        this.$index += BBPacker.SIZE64;
        return value;
    }
    getArrU64(N, littleEndian) {
        const value = this.readArrU64(this.$index, N, littleEndian);
        this.$index += value.length * BBPacker.SIZE64;
        return value;
    }
    writeI64(index, value, littleEndian) {
        index = BBPacker.checkUI(index);
        this._validateIndex(index + BBPacker.SIZE64);
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        if (this.throwAtRangeOverflow) {
            BBPacker.validateI64(value, true);
        }
        if (_littleEndian == true) {
            this.$data.setUint32(index, value.lo >>> 0, _littleEndian);
            this.$data.setInt32(index + BBPacker.SIZE32, value.hi >>> 0, _littleEndian);
        }
        else {
            this.$data.setInt32(index, value.hi >>> 0, _littleEndian);
            this.$data.setUint32(index + BBPacker.SIZE32, value.lo >>> 0, _littleEndian);
        }
    }
    writeArrI64(index, value, littleEndian) {
        index = BBPacker.checkUI(index);
        this._validateIndex(index + (value.length * BBPacker.SIZE64));
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        if (this.throwAtRangeOverflow) {
            for (let item of value) {
                BBPacker.validateI64(item, true);
            }
        }
        for (let item of value) {
            if (_littleEndian == true) {
                this.$data.setUint32(index, item.lo >>> 0, _littleEndian);
                this.$data.setInt32(index + BBPacker.SIZE32, item.hi >>> 0, _littleEndian);
            }
            else {
                this.$data.setInt32(index, item.hi >>> 0, _littleEndian);
                this.$data.setUint32(index + BBPacker.SIZE32, item.lo >>> 0, _littleEndian);
            }
            index += BBPacker.SIZE64;
        }
    }
    putI64(value, littleEndian) {
        this.writeI64(this.$index, value, littleEndian);
        this.$index += BBPacker.SIZE64;
    }
    putArrI64(value, littleEndian) {
        this.writeArrI64(this.$index, value, littleEndian);
        this.$index += value.length * BBPacker.SIZE64;
    }
    readI64(index, littleEndian) {
        index = BBPacker.checkUI(index);
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        let value = { hi: 0, lo: 0 };
        if (_littleEndian == true) {
            value.lo = this.$data.getUint32(index, _littleEndian);
            value.hi = this.$data.getInt32(index + BBPacker.SIZE32, _littleEndian);
        }
        else {
            value.hi = this.$data.getInt32(index, littleEndian);
            value.lo = this.$data.getUint32(index + BBPacker.SIZE32, littleEndian);
        }
        return value;
    }
    readArrI64(index, N, littleEndian) {
        index = BBPacker.checkUI(index);
        let _littleEndian = this.littleEndian;
        let n;
        if (typeof N == 'number') {
            n = BBPacker.checkUI(N);
            if (typeof littleEndian == 'boolean') {
                _littleEndian = littleEndian;
            }
        }
        else if (typeof N == 'boolean') {
            _littleEndian = N;
            n = this.getNumber64(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        else {
            n = this.getNumber64(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        const arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = this.readI64(index, _littleEndian);
            index += BBPacker.SIZE64;
        }
        return arr;
    }
    getI64(littleEndian) {
        const value = this.readI64(this.$index, littleEndian);
        this.$index += BBPacker.SIZE64;
        return value;
    }
    getArrI64(N, littleEndian) {
        const value = this.readArrI64(this.$index, N, littleEndian);
        this.$index += value.length * BBPacker.SIZE64;
        return value;
    }
    writeF32(index, value, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        this.$data.setFloat32(index, value, _littleEndian);
    }
    writeArrF32(index, value, littleEndian) {
        index = BBPacker.checkUI(index);
        this._validateIndex(index + (value.length * BBPacker.SIZE32));
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        for (let item of value) {
            this.$data.setFloat32(index, item, _littleEndian);
            index += BBPacker.SIZE32;
        }
    }
    putF32(value, littleEndian) {
        this.writeF32(this.$index, value, littleEndian);
        this.$index += BBPacker.SIZE32;
    }
    putArrF32(value, littleEndian) {
        this.writeArrF32(this.$index, value, littleEndian);
        this.$index += value.length * BBPacker.SIZE32;
    }
    readF32(index, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        return this.$data.getFloat32(index, _littleEndian);
    }
    readArrF32(index, N, littleEndian) {
        index = BBPacker.checkUI(index);
        let n;
        let _littleEndian = this.littleEndian;
        if (typeof N == 'number') {
            n = BBPacker.checkUI(N);
            if (typeof littleEndian == 'boolean') {
                _littleEndian = littleEndian;
            }
        }
        else if (typeof N == 'boolean') {
            _littleEndian = N;
            n = this.getNumber32(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        else {
            n = this.getNumber32(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        const arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = this.$data.getFloat32(index, _littleEndian);
            index += BBPacker.SIZE32;
        }
        return arr;
    }
    getF32(littleEndian) {
        const value = this.readF32(this.$index, littleEndian);
        this.$index += BBPacker.SIZE32;
        return value;
    }
    getArrF32(N, littleEndian) {
        const value = this.readArrF32(this.$index, N, littleEndian);
        this.$index += value.length * BBPacker.SIZE32;
        return value;
    }
    writeF64(index, value, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        this.$data.setFloat64(index, value, _littleEndian);
    }
    writeArrF64(index, value, littleEndian) {
        index = BBPacker.checkUI(index);
        this._validateIndex(index + (value.length * BBPacker.SIZE64));
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        for (let item of value) {
            this.$data.setFloat64(index, item, _littleEndian);
            index += BBPacker.SIZE64;
        }
    }
    putF64(value, littleEndian) {
        this.writeF64(this.$index, value, littleEndian);
        this.$index += BBPacker.SIZE64;
    }
    putArrF64(value, littleEndian) {
        this.writeArrF64(this.$index, value, littleEndian);
        this.$index += value.length * BBPacker.SIZE64;
    }
    readF64(index, littleEndian) {
        let _littleEndian = this.littleEndian;
        if (typeof littleEndian == 'boolean') {
            _littleEndian = littleEndian;
        }
        return this.$data.getFloat64(index, _littleEndian);
    }
    readArrF64(index, N, littleEndian) {
        index = BBPacker.checkUI(index);
        let n;
        let _littleEndian = this.littleEndian;
        if (typeof N == 'number') {
            n = BBPacker.checkUI(N);
            if (typeof littleEndian == 'boolean') {
                _littleEndian = littleEndian;
            }
        }
        else if (typeof N == 'boolean') {
            _littleEndian = N;
            n = this.getNumber64(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        else {
            n = this.getNumber64(index);
            if (n == 0) {
                throw new RangeError("Number of elements = 0");
            }
        }
        const arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = this.$data.getFloat64(index, _littleEndian);
            index += BBPacker.SIZE64;
        }
        return arr;
    }
    getF64(littleEndian) {
        const value = this.readF64(this.$index, littleEndian);
        this.$index += BBPacker.SIZE64;
        return value;
    }
    getArrF64(N, littleEndian) {
        const value = this.readArrF64(this.$index, N, littleEndian);
        this.$index += value.length * BBPacker.SIZE64;
        return value;
    }
    static validateU8(value, throwAtRangeOverflow) {
        if (value > BBPacker.MAX_UINT8) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("UINT8 upper value range");
                }
            }
            return false;
        }
        else if (value < BBPacker.MIN_UINT8) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("UINT8 lower value range");
                }
            }
            return false;
        }
        return true;
    }
    static validateI8(value, throwAtRangeOverflow) {
        if (value > BBPacker.MAX_INT8) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("INT8 upper value range");
                }
            }
            return false;
        }
        else if (value < BBPacker.MIN_INT8) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("INT8 lower value range");
                }
            }
            return false;
        }
        return true;
    }
    static validateU16(value, throwAtRangeOverflow) {
        if (value > BBPacker.MAX_UINT16) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("UINT16 upper value range");
                }
            }
            return false;
        }
        else if (value < BBPacker.MIN_UINT16) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("UINT16 lower value range");
                }
            }
            return false;
        }
        return true;
    }
    static validateI16(value, throwAtRangeOverflow) {
        if (value > BBPacker.MAX_INT16) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("INT16 upper value range");
                }
            }
            return false;
        }
        else if (value < BBPacker.MIN_INT16) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("INT16 lower value range");
                }
            }
            return false;
        }
        return true;
    }
    static validateU32(value, throwAtRangeOverflow) {
        if (value > BBPacker.MAX_UINT32) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("UINT32 upper value range");
                }
            }
            return false;
        }
        else if (value < BBPacker.MIN_UINT32) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("UINT32 lower value range");
                }
            }
            return false;
        }
        return true;
    }
    static validateI32(value, throwAtRangeOverflow) {
        if (value > BBPacker.MAX_INT32) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("INT32 upper value range");
                }
            }
            return false;
        }
        else if (value < BBPacker.MIN_INT32) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("INT32 lower value range");
                }
            }
            return false;
        }
        return true;
    }
    static validateU64(value, throwAtRangeOverflow) {
        if (value.hi > BBPacker.MAX_UINT64_HI) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("UINT64 hi upper value range");
                }
            }
            return false;
        }
        else if (value.hi < BBPacker.MIN_UINT64_HI) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("UINT64 hi lower value range");
                }
            }
            return false;
        }
        if (value.lo > BBPacker.MAX_UINT64_LO) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("UINT64 lo upper value range");
                }
            }
            return false;
        }
        else if (value.lo < BBPacker.MIN_UINT64_LO) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("UINT64 lo lower value range");
                }
            }
            return false;
        }
        return true;
    }
    static validateI64(value, throwAtRangeOverflow) {
        if (value.hi > BBPacker.MAX_INT64_HI) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("INT64 hi upper value range");
                }
            }
            return false;
        }
        else if (value.hi < BBPacker.MIN_INT64_HI) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("INT64 hi lower value range");
                }
            }
            return false;
        }
        if (value.lo > BBPacker.MAX_INT64_LO) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("INT64 lo upper value range");
                }
            }
            return false;
        }
        else if (value.lo < BBPacker.MIN_INT64_LO) {
            if (typeof throwAtRangeOverflow == 'boolean') {
                if (throwAtRangeOverflow == true) {
                    throw new RangeError("INT64 lo lower value range");
                }
            }
            return false;
        }
        return true;
    }
    static checkUI(arg) {
        if (arg > BBPacker.MAX_UINT_ARG) {
            throw new RangeError(`Integer argument > 0x${BBPacker.MAX_UINT_ARG.toString(16)}`);
        }
        arg = Math.floor(arg);
        if (arg < 0) {
            throw new RangeError("Negative integer argument");
        }
        return arg;
    }
    $buffer;
    $data;
    $index = 0;
    _setConf(conf) {
        if (typeof (conf?.index) == 'number') {
            let index = conf.index;
            index = BBPacker.checkUI(index);
            this.$index = index;
        }
        if (typeof (conf?.littleEndian) == 'boolean') {
            this.littleEndian = conf.littleEndian;
        }
        if (typeof (conf?.bitIndexReverse) == 'boolean') {
            this.bitIndexReverse = conf.bitIndexReverse;
        }
        if (typeof (conf?.throwAtRangeOverflow) == 'boolean') {
            this.throwAtRangeOverflow = conf.throwAtRangeOverflow;
        }
    }
    _validateSetupIndex(index, itemSize) {
        index = BBPacker.checkUI(index);
        index = (index * itemSize);
        if ((index + itemSize) > this.$buffer.byteLength) {
            throw new RangeError("Index out of range");
        }
        return index;
    }
    _validateIndex(index) {
        index = BBPacker.checkUI(index);
        if (index > this.$buffer.byteLength) {
            throw new RangeError("Index out of range");
        }
        return index;
    }
    _getNItems(itemSize, index, size) {
        let _size = this.$buffer.byteLength;
        let _index = 0;
        let nitems = Math.floor(_size / itemSize);
        if (typeof index == 'number') {
            _index = BBPacker.checkUI(index);
            if (_size) {
                if (_index >= _size) {
                    throw new RangeError(" Index > Buffer size");
                }
            }
            else if (_index > _size) {
                throw new RangeError(" Index > Buffer size");
            }
            _size = _size - _index;
            if (typeof size == 'number') {
                size = Math.floor(size);
                if (size > _size) {
                    throw new RangeError(" Size > Buffer size");
                }
                nitems = Math.floor(size / itemSize);
            }
            else {
                nitems = Math.floor(_size / itemSize);
            }
        }
        return nitems;
    }
    _forAllNItems(itemSize, index, count, littleEndian) {
        let size = this.$buffer.byteLength;
        let rc = { index: 0, count: Math.floor(size / itemSize), littleEndian: this.littleEndian };
        if (typeof index == 'number') {
            rc.index = BBPacker.checkUI(index);
            if (size) {
                if (rc.index >= size) {
                    throw new RangeError(" Index > Buffer size");
                }
            }
            else if (rc.index > size) {
                throw new RangeError(" Index > Buffer size");
            }
            size = size - rc.index;
            rc.count = Math.floor(size / itemSize);
            if (typeof count == 'number') {
                count = BBPacker.checkUI(count);
                if (count > rc.count) {
                    throw new RangeError(" Size > Buffer size");
                }
                rc.count = count;
                if (typeof littleEndian == 'boolean') {
                    rc.littleEndian = littleEndian;
                }
            }
            else if (typeof count == 'boolean') {
                rc.littleEndian = count;
            }
        }
        else if (typeof index == 'boolean') {
            rc.littleEndian = index;
        }
        return rc;
    }
    __writeBit(bitIndex, bitValue, byteIndex, bitIndexReverse) {
        let bitPos = bitIndex % 8;
        const bIndex = Math.floor(bitIndex / 8) + byteIndex;
        let value = this.$data.getUint8(bIndex);
        if (bitIndexReverse) {
            bitPos = 7 - bitPos;
        }
        if (bitValue) {
            value |= 1 << bitPos;
        }
        else {
            value &= ~(1 << bitPos);
        }
        this.$data.setUint8(bIndex, value);
    }
    __readBit(bitIndex, byteIndex, bitIndexReverse) {
        let bitPos = bitIndex % 8;
        const bIndex = Math.floor(bitIndex / 8) + byteIndex;
        let bitValue = false;
        if (bitIndexReverse) {
            bitPos = 7 - bitPos;
        }
        if (this.$data.getUint8(bIndex) & (1 << bitPos)) {
            bitValue = true;
        }
        return bitValue;
    }
    __valiateBitIndex(bitIndex, byteIndex) {
        if ((Math.floor(bitIndex / 8) + byteIndex) >= this.$buffer.byteLength) {
            throw new RangeError("Index out of range");
        }
    }
}
