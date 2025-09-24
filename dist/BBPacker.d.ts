export declare namespace BBPacker {
    type Conf = {
        index?: number;
        littleEndian?: boolean;
        bitIndexReverse?: boolean;
        throwAtRangeOverflow?: boolean;
    };
}
/**
*   Byte and Bit Packer for ArrayBuffer
*
*
*
*@example
*function toBigInt( value : { hi : number , lo : number  }  ) : bigint
*{
*  const _hi : bigint = BigInt(value.hi);
*  const _lo : bigint = BigInt(value.lo);
*  return (_hi << 32n) | _lo;
*}
*
*function fromBigInt(  value : bigint   ) : { hi : number , lo : number  }
*{
*  let rc = { hi : 0 , lo : 0  };
*  rc.lo = Number( BigInt.asUintN(32, value) );
*  rc.hi = Number( BigInt.asUintN(32, value >> 32n) );
*  return rc;
*}
*
* let packer = new  BBPacker( 8 , {littleEndian : true} );
* const dig = -125;
* packer.writeU8( 0 , dig );
* packer.readI8( 0 ); //-125
* BBPacker.U8toI8(packer.readU8( 0 )); //-125
*
* const buffer = Buffer.alloc(2);
* packer.pushArrayBuffer( buffer.buffer ,   buffer.length , buffer.byteOffset );
*
*
*/
export declare class BBPacker {
    /**
    *  Byte packing order
    *
    */
    littleEndian: boolean;
    /**
    *  Bit numbering order for bit methods
    *  bitIndexReverse = false:
    *             7  6  5  4  3  2  1 0
    *             15 14 13 12 11 10 9 8
    *
    *  bitIndexReverse = true:
    *             0 1 2  3  4  5  6  7
    *             8 9 10 11 12 13 14 15
    *
    */
    bitIndexReverse: boolean;
    /**
    *  Throw an error when the input data exceeds the given range.
    *  Use  for manual check:
    *     BBPacker.validateU8(  value : number  ) : boolean
    *     BBPacker.validateI8(  value : number   ) : boolean
    *     BBPacker.validateU16( value : number  ) : boolean
    *     BBPacker.validateI16( value : number  ) : boolean
    *     BBPacker.validateU32( value : number  ) : boolean
    *     BBPacker.validateI32( value : number ) : boolean
    *     BBPacker.validateU64( value : {hi:number,lo:number}  ) : boolean
    *     BBPacker.validateI64( value : {hi:number,lo:number}  ) : boolean
    */
    throwAtRangeOverflow: boolean;
    static readonly SIZE8 = 1;
    static readonly SIZE16 = 2;
    static readonly SIZE32 = 4;
    static readonly SIZE64 = 8;
    static readonly MAX_UINT_ARG: number;
    static readonly MAX_UINT8 = 255;
    static readonly MIN_UINT8 = 0;
    static readonly MAX_INT8 = 127;
    static readonly MIN_INT8 = -128;
    static readonly MAX_UINT16 = 65535;
    static readonly MIN_UINT16 = 0;
    static readonly MAX_INT16 = 32767;
    static readonly MIN_INT16 = -32768;
    static readonly MAX_UINT32 = 4294967295;
    static readonly MIN_UINT32 = 0;
    static readonly MAX_INT32 = 2147483647;
    static readonly MIN_INT32 = -2147483648;
    static readonly MAX_UINT64_HI = 4294967295;
    static readonly MAX_UINT64_LO = 4294967295;
    static readonly MIN_UINT64_HI = 0;
    static readonly MIN_UINT64_LO = 0;
    static readonly MAX_INT64_HI = 2147483647;
    static readonly MAX_INT64_LO = 4294967295;
    static readonly MIN_INT64_HI = -2147483648;
    static readonly MIN_INT64_LO = 0;
    static readonly MAX_BITS_NUMBER = 32;
    constructor(size: number, conf?: BBPacker.Conf);
    constructor(buffer: BBPacker, conf?: BBPacker.Conf);
    constructor(buffer: ArrayBuffer, conf?: BBPacker.Conf);
    /**
     *  Create an instance of the class
     *  @param {number} num - Number of UINT8 elements
     *  @param {BBPacker.Conf} [conf] - Class config
     *  @return {BBPacker} - Instance
     */
    static build8(num: number, conf?: BBPacker.Conf): BBPacker;
    /**
     *  Create an instance of the class
     *  @param {number} num - Number of UINT16 elements
     *  @param {BBPacker.Conf} [conf] - Class config
     *  @return {BBPacker} - Instance
     */
    static build16(num: number, conf?: BBPacker.Conf): BBPacker;
    /**
     *  Create an instance of the class
     *  @param {number} num - Number of UINT32 elements
     *  @param {BBPacker.Conf} [conf] - Class config
     *  @return {BBPacker} - Instance
     */
    static build32(num: number, conf?: BBPacker.Conf): BBPacker;
    /**
     *  Create an instance of the class
     *  @param {number} num - Number of UINT64 elements
     *  @param {BBPacker.Conf} [conf] - Class config
     *  @return {BBPacker} - Instance
     */
    static build64(num: number, conf?: BBPacker.Conf): BBPacker;
    static copyFrom(arg: ArrayBuffer, conf?: BBPacker.Conf): BBPacker;
    static copyFrom(arg: BBPacker, conf?: BBPacker.Conf): BBPacker;
    /**
     * Create an instance of a class from UINT8 elements.
     * @param {number[]} arr - Array of elements.
     * @param {BBPacker.Conf} [conf] - Class config.
     * @return {BBPacker} - Instance
    */
    static fromUint8(arr: number[], conf?: BBPacker.Conf): BBPacker;
    /**
     * Create an instance of a class from INT8 elements.
     * @param {number[]} arr - Array of elements.
     * @param {BBPacker.Conf} [conf] - Class config.
     * @return {BBPacker} - Instance
    */
    static fromInt8(arr: number[], conf?: BBPacker.Conf): BBPacker;
    /**
     * Create an instance of a class from UINT16 elements.
     * @param {number[]} arr - Array of elements.
     * @param {BBPacker.Conf} [conf] - Class config.
     * @return {BBPacker} - Instance
    */
    static fromUint16(arr: number[], conf?: BBPacker.Conf): BBPacker;
    /**
     * Create an instance of a class from INT16 elements.
     * @param {number[]} arr - Array of elements.
     * @param {BBPacker.Conf} [conf] - Class config.
     * @return {BBPacker} - Instance
    */
    static fromInt16(arr: number[], conf?: BBPacker.Conf): BBPacker;
    /**
     * Create an instance of a class from UINT32 elements.
     * @param {number[]} arr - Array of elements.
     * @param {BBPacker.Conf} [conf] - Class config.
     * @return {BBPacker} - Instance
    */
    static fromUint32(arr: number[], conf?: BBPacker.Conf): BBPacker;
    /**
     * Create an instance of a class from INT32 elements.
     * @param {number[]} arr - Array of elements.
     * @param {BBPacker.Conf} [conf] - Class config.
     * @return {BBPacker} - Instance
    */
    static fromInt32(arr: number[], conf?: BBPacker.Conf): BBPacker;
    /**
     * Create an instance of a class from UINT64 elements.
     * @param {{hi:number,lo:number}[]} arr - Array of elements.
     * @param {BBPacker.Conf} [conf] - Class config.
     * @return {BBPacker} - Instance
    */
    static fromUint64(arr: {
        hi: number;
        lo: number;
    }[], conf?: BBPacker.Conf): BBPacker;
    /**
     * Create an instance of a class from INT64 elements.
     * @param {{hi:number,lo:number}[]} arr - Array of elements.
     * @param {BBPacker.Conf} [conf] - Class config.
     * @return {BBPacker} - Instance
    */
    static fromInt64(arr: {
        hi: number;
        lo: number;
    }[], conf?: BBPacker.Conf): BBPacker;
    /**
     * Create an instance of a class from FLOAT32 elements.
     * @param {number[]} arr - Array of elements.
     * @param {BBPacker.Conf} [conf] - Class config.
     * @return {BBPacker} - Instance
    */
    static fromFloat32(arr: number[], conf?: BBPacker.Conf): BBPacker;
    /**
     * Create an instance of a class from FLOAT64 elements.
     * @param {number[]} arr - Array of elements.
     * @param {BBPacker.Conf} [conf] - Class config.
     * @return {BBPacker} - Instance
    */
    static fromFloat64(arr: number[], conf?: BBPacker.Conf): BBPacker;
    get conf(): BBPacker.Conf;
    set conf(conf: BBPacker.Conf);
    get arrayBufferSize(): number;
    get arrayBuffer(): ArrayBuffer;
    set arrayBuffer(buffer: ArrayBuffer);
    /**
     *   Сreate a ArrayBuffer , resize.
     *   @param {number} size - Buffer size.
     *   @param {boolean} [copyOld] - true Copy the contents of the old buffer.
     */
    createArrayBuffer(size: number, copyOld?: boolean): void;
    /**
     *  Get a copy of the buffer
     *  @param {number} index - Offset in buffer
     *  @param {number} [size] - Data size , (Default:All data starting from offset)
     *  @return {ArrayBuffer} -  Copy of data
    */
    getCopyOfArrayBuffer(index: number, size?: number): ArrayBuffer;
    /**
     *  Set a copy of the buffer
     *  @param {number} index - Offset in class buffer
     *  @param {ArrayBuffer} buffer - What to copy
     *  @param {number} [bufferSize] - The size of the buffer to copy (Default:buffer.byteLength)
     *  @param {number} [bufferOffset] - Offset of the buffer to copy (Default:0)
     *  @return {number} - Size of copied data
    */
    setCopyOfArrayBuffer(index: number, buffer: ArrayBuffer, bufferSize?: number, bufferOffset?: number): number;
    /**
     *  Set a copy of the buffer at the current internal index
     *  and then increment the index.
     *  @param {ArrayBuffer} buffer - What to copy
     *  @param {number} [bufferSize] - The size of the buffer to copy (Default:buffer.byteLength)
     *  @param {number} [bufferOffset] - Offset of the buffer to copy (Default:0)
     *  @return {number} - Size of copied data
    */
    pushArrayBuffer(buffer: ArrayBuffer, bufferSize?: number, bufferOffset?: number): number;
    /**
     *  Get a copy of the class
     *  @param {number} index - Offset in class buffer
     *  @param {number} [size] - Data size
     *  @return {BBPacker}
     *
    */
    getCopyOfBBPacker(index: number, size?: number): BBPacker;
    /**
     *  Convert unsigned representation of signed number to signed number
     *  @param {number} value
     *  @raturn {number} 0xFFFF_FF9C == -100
     */
    static U32toI32(value: number): number;
    /**
     *  Convert unsigned representation of signed number to signed number
     *  @param {number} value
     *  @raturn {number} 0xFF9C == -100
     */
    static U16toI16(value: number): number;
    /**
     *  Convert unsigned representation of signed number to signed number
     *  @param {number} value
     *  @raturn {number} 0x9C == -100
     */
    static U8toI8(value: number): number;
    /**
     * Get byte index
     * @return {number} - byte index
    */
    get index(): number;
    /**
     * Set byte index
     * @param {number} index - byte index
    */
    set index(index: number);
    /**
     * Set index = 0
    */
    resetIndex(): void;
    /**
     * Set index in 16 bit array
     *  bytes  = 4
     *  [0]
     *  [1]
     *  [2] <= index = 1
     *  [3]
     * @param {number} - word16 index
     */
    set index16(index: number);
    /**
     * Set index in 32 bit array
     * @param {number}  - word32 index
     */
    set index32(index: number);
    /**
     * Set index in 64 bit array
     * @param {number} - word64 index
     */
    set index64(index: number);
    /**
     * Get the index of a byte in a 16-bit array
     * @param {number} - word16 index
    */
    getIndex16(index: number): number;
    /**
     * Get the index of a byte in a 32-bit array
     * @param {number} - word32 index
    */
    getIndex32(index: number): number;
    /**
     * Get the index of a byte in a 64-bit array
     * @param {number} - word64 index
    */
    getIndex64(index: number): number;
    /**
     *  Get free (not written) number of bytes.
     *
     *  size  = 4
     *  [0] <= X
     *  [1] <= Y
     *  [2] | rest  <= current index
     *  [3] | rest
     */
    get indexRestSize(): number;
    /**
     *  Get full (written) number of bytes.
     *
     *  size  = 4
     *  [0] <= X  | full
     *  [1] <= Y  | full
     *  [2] <= current index
     *  [3]
     */
    get indexFullSize(): number;
    /**
     * Check that the byte array contains an integer number of 16-bit words.
     *
     * @param {number} [index] - offset in array , default = 0
     * @param {number} [size] - array size , default array size
     * @return {boolean} - true
    */
    isAlign16(index?: number, size?: number): boolean;
    /**
     * Check that the byte array contains an integer number of 32-bit words.
     *
     * @param {number} [index] - offset in array , default = 0
     * @param {number} [size] - array size , default array size
     * @return {boolean} - true
    */
    isAlign32(index?: number, size?: number): boolean;
    /**
     * Check that the byte array contains an integer number of 64-bit words.
     *
     * @param {number} [index] - offset in array , default = 0
     * @param {number} [size] - array size , default array size
     * @return {boolean} - true
    */
    isAlign64(index?: number, size?: number): boolean;
    /**
     * Get integer number 16 bit words in array
     * @param {number} [index] - offset in array , default = 0
     * @param {number} [size] - array size , default array size
     * @return {number} - Number
     */
    getNumber16(index?: number, size?: number): number;
    /**
     * Get integer number 32 bit words in array
     * @param {number} [index] - offset in array , default = 0
     * @param {number} [size] - array size , default array size
     * @return {number} - Number
     */
    getNumber32(index?: number, size?: number): number;
    /**
     * Get integer number 64 bit words in array
     * @param {number} [index] - offset in array , default = 0
     * @param {number} [size] - array size , default array size
     * @return {number} - Number
     */
    getNumber64(index?: number, size?: number): number;
    /**
     * Set all bytes to 0
     */
    allZerro(): void;
    /**
     * Call callback for all UINT8 elements
     * @param {( index : number ,  data : number ) => boolean} func - index : element index , data : UINT8 value , return false : stop process
     * @param {number} [index] - byte offset (Default:0)
     * @param {number} [count] - number of elements (Default:All)
     * @return {boolean} - false The callback returned false
     *
    */
    forAllUint8(func: (index: number, data: number) => boolean, index?: number, count?: number): boolean;
    /**
     * Call callback for all INT8 elements
     * @param {( index : number ,  data : number ) => boolean} func - index : element index , data : INT8 value , return false : stop process
     * @param {number} [index] - byte offset (Default:0)
     * @param {number} [count] - number of elements (Default:All)
     * @return {boolean} - false The callback returned false
     *
    */
    forAllInt8(func: (index: number, data: number) => void | boolean, index?: number, count?: number): boolean;
    forAllUint16(func: (index: number, data: number) => boolean, index?: number): boolean;
    forAllUint16(func: (index: number, data: number) => boolean, index?: number, count?: number): boolean;
    forAllUint16(func: (index: number, data: number) => boolean, index?: number, count?: number, littleEndian?: boolean): boolean;
    forAllUint16(func: (index: number, data: number) => boolean, littleEndian?: boolean): boolean;
    forAllUint16(func: (index: number, data: number) => boolean, index?: number, littleEndian?: boolean): boolean;
    forAllInt16(func: (index: number, data: number) => boolean, index?: number): boolean;
    forAllInt16(func: (index: number, data: number) => boolean, index?: number, count?: number): boolean;
    forAllInt16(func: (index: number, data: number) => boolean, index?: number, count?: number, littleEndian?: boolean): boolean;
    forAllInt16(func: (index: number, data: number) => boolean, littleEndian?: boolean): boolean;
    forAllInt16(func: (index: number, data: number) => boolean, index?: number, littleEndian?: boolean): boolean;
    forAllUint32(func: (index: number, data: number) => boolean, index?: number): boolean;
    forAllUint32(func: (index: number, data: number) => boolean, index?: number, count?: number): boolean;
    forAllUint32(func: (index: number, data: number) => boolean, index?: number, count?: number, littleEndian?: boolean): boolean;
    forAllUint32(func: (index: number, data: number) => boolean, littleEndian?: boolean): boolean;
    forAllUint32(func: (index: number, data: number) => boolean, index?: number, littleEndian?: boolean): boolean;
    forAllInt32(func: (index: number, data: number) => boolean, index?: number): boolean;
    forAllInt32(func: (index: number, data: number) => boolean, index?: number, count?: number): boolean;
    forAllInt32(func: (index: number, data: number) => boolean, index?: number, count?: number, littleEndian?: boolean): boolean;
    forAllInt32(func: (index: number, data: number) => boolean, littleEndian?: boolean): boolean;
    forAllInt32(func: (index: number, data: number) => boolean, index?: number, littleEndian?: boolean): boolean;
    forAllUint64(func: (index: number, data: {
        hi: number;
        lo: number;
    }) => boolean, index?: number): boolean;
    forAllUint64(func: (index: number, data: {
        hi: number;
        lo: number;
    }) => boolean, index?: number, count?: number): boolean;
    forAllUint64(func: (index: number, data: {
        hi: number;
        lo: number;
    }) => boolean, index?: number, count?: number, littleEndian?: boolean): boolean;
    forAllUint64(func: (index: number, data: {
        hi: number;
        lo: number;
    }) => boolean, littleEndian?: boolean): boolean;
    forAllUint64(func: (index: number, data: {
        hi: number;
        lo: number;
    }) => boolean, index?: number, littleEndian?: boolean): boolean;
    forAllInt64(func: (index: number, data: {
        hi: number;
        lo: number;
    }) => boolean, index?: number): boolean;
    forAllInt64(func: (index: number, data: {
        hi: number;
        lo: number;
    }) => boolean, index?: number, count?: number): boolean;
    forAllInt64(func: (index: number, data: {
        hi: number;
        lo: number;
    }) => boolean, index?: number, count?: number, littleEndian?: boolean): boolean;
    forAllInt64(func: (index: number, data: {
        hi: number;
        lo: number;
    }) => boolean, littleEndian?: boolean): boolean;
    forAllInt64(func: (index: number, data: {
        hi: number;
        lo: number;
    }) => boolean, index?: number, littleEndian?: boolean): boolean;
    forAllFloat32(func: (index: number, data: number) => boolean, index?: number): boolean;
    forAllFloat32(func: (index: number, data: number) => boolean, index?: number, count?: number): boolean;
    forAllFloat32(func: (index: number, data: number) => boolean, index?: number, count?: number, littleEndian?: boolean): boolean;
    forAllFloat32(func: (index: number, data: number) => boolean, littleEndian?: boolean): boolean;
    forAllFloat32(func: (index: number, data: number) => boolean, index?: number, littleEndian?: boolean): boolean;
    forAllFloat64(func: (index: number, data: number) => boolean, index?: number): boolean;
    forAllFloat64(func: (index: number, data: number) => boolean, index?: number, count?: number): boolean;
    forAllFloat64(func: (index: number, data: number) => boolean, index?: number, count?: number, littleEndian?: boolean): boolean;
    forAllFloat64(func: (index: number, data: number) => boolean, littleEndian?: boolean): boolean;
    forAllFloat64(func: (index: number, data: number) => boolean, index?: number, littleEndian?: boolean): boolean;
    /**
     * Get number of bytes from number of bits
     * @param  {number} nBits - Number of bits
     * @return {number}  Number of bytes
    */
    static nBits2nBytes(nBits: number): number;
    writeBit(bitIndex: number, bitValue: boolean): void;
    writeBit(bitIndex: number, bitValue: boolean, byteIndex?: number): void;
    writeBit(bitIndex: number, bitValue: boolean, bitIndexReverse?: boolean): void;
    writeBit(bitIndex: number, bitValue: boolean, byteIndex?: number, bitIndexReverse?: boolean): void;
    writeBits(bitIndex: number, bitsValue: boolean[]): void;
    writeBits(bitIndex: number, bitsValue: boolean[], byteIndex?: number): void;
    writeBits(bitIndex: number, bitsValue: boolean[], bitIndexReverse?: boolean): void;
    writeBits(bitIndex: number, bitsValue: boolean[], byteIndex?: number, bitIndexReverse?: boolean): void;
    readBit(bitIndex: number): boolean;
    readBit(bitIndex: number, byteIndex?: number): boolean;
    readBit(bitIndex: number, bitIndexReverse?: boolean): boolean;
    readBit(bitIndex: number, byteIndex?: number, bitIndexReverse?: boolean): boolean;
    readBits(bitIndex: number, bitsNumber: number): boolean[];
    readBits(bitIndex: number, bitsNumber: number, byteIndex?: number): boolean[];
    readBits(bitIndex: number, bitsNumber: number, bitIndexReverse?: boolean): boolean[];
    readBits(bitIndex: number, bitsNumber: number, byteIndex?: number, bitIndexReverse?: boolean): boolean[];
    toBits(word: number, bitIndex: number, nBits: number): void;
    toBits(word: number, bitIndex: number, nBits: number, byteIndex?: number): void;
    toBits(word: number, bitIndex: number, nBits: number, bitIndexReverse?: boolean): void;
    toBits(word: number, bitIndex: number, nBits: number, conf?: {
        fromMSB: boolean;
        bitIndexReverse?: boolean;
    }): void;
    toBits(word: number, bitIndex: number, nBits: number, byteIndex?: number, conf?: {
        fromMSB: boolean;
        bitIndexReverse?: boolean;
    }): void;
    toBits(word: number, bitIndex: number, nBits: number, byteIndex?: number, bitIndexReverse?: boolean): void;
    fromBits(bitIndex: number, nBits: number): number;
    fromBits(bitIndex: number, nBits: number, byteIndex?: number): number;
    fromBits(bitIndex: number, nBits: number, bitIndexReverse?: boolean): number;
    fromBits(bitIndex: number, nBits: number, byteIndex?: number, bitIndexReverse?: boolean): number;
    fromBits(bitIndex: number, nBits: number, conf?: {
        fromMSB: boolean;
        bitIndexReverse?: boolean;
    }): number;
    fromBits(bitIndex: number, nBits: number, byteIndex?: number, conf?: {
        fromMSB: boolean;
        bitIndexReverse?: boolean;
    }): number;
    /**
     *  Write UINT8 to array
     *  @param {number} index - Byte offset
     *  @param {number} value - UINT8 value
     */
    writeU8(index: number, value: number): void;
    /**
     *  Write UINT8[] to array
     *  @param {number} index - Byte offset
     *  @param {number[]} value - UINT8[] value
     */
    writeArrU8(index: number, value: number[]): void;
    /**
     *  Write UINT8 to array by internal index with index post increment
     *  @param {number} value - UINT8 value
     */
    putU8(value: number): void;
    /**
     *  Write UINT8[] to array by internal index with index post increment
     *  @param {number[]} value - UINT8[] value
     */
    putArrU8(value: number[]): void;
    /**
     *  Read UINT8 from array
     *  @param {number} index - Byte offset
     *  @return {number} - UINT8 value
     */
    readU8(index: number): number;
    /**
     *  Read UINT8[] from array
     *  @param {number} index - Nyte offset
     *  @param {number} [N] - Number of elements , Default all elements
     *  @return {number[]} - UINT8[] value
     */
    readArrU8(index: number, N?: number): number[];
    /**
     *  Read UINT8 from array by internal index with index post increment
     *  @return {number} - UINT8 value
     */
    getU8(): number;
    /**
     *  Read UINT8[] from array by internal index with index post increment
     *  @param {number} [N] - Number of elements , Default all elements
     *  @return {number[]} - UINT8[] value
     */
    getArrU8(N?: number): number[];
    /**
     *  Write INT8 to array
     *  @param {number} index - Byte offset
     *  @param {number} value - INT8 value
     */
    writeI8(index: number, value: number): void;
    /**
     *  Write INT8[] to array
     *  @param {number} index - Byte offset
     *  @param {number[]} value - INT8[] value
     */
    writeArrI8(index: number, value: number[]): void;
    /**
     *  Write INT8 to array by internal index with index post increment
     *  @param {number} value - INT8 value
     */
    putI8(value: number): void;
    /**
     *  Write INT8[] to array by internal index with index post increment
     *  @param {number[]} value - INT8[] value
     */
    putArrI8(value: number[]): void;
    /**
     *  Read INT8 from array
     *  @param {number} index - Byte offset
     *  @return {number} - INT8 value
     */
    readI8(index: number): number;
    /**
     *  Read INT8[] from array
     *  @param {number} index - Nyte offset
     *  @param {number} [N] - Number of elements , Default all elements
     *  @return {number[]} - INT8[] value
     */
    readArrI8(index: number, N?: number): number[];
    /**
     *  Read INT8 from array by internal index with index post increment
     *  @return {number} - INT8 value
     */
    getI8(): number;
    /**
     *  Read INT8[] from array by internal index with index post increment
     *  @param {number} [N] - Number of elements , Default all elements
     *  @return {number[]} - UINT8[] value
     */
    getArrI8(N?: number): number[];
    /**
     *  Write UINT16 to array
     *  @param {number} index - Byte offset
     *  @param {number} value - UINT16 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeU16(index: number, value: number, littleEndian?: boolean): void;
    /**
     *  Write UINT16[] to array
     *  @param {number} index - Byte offset
     *  @param {number[]} value - UINT16[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeArrU16(index: number, value: number[], littleEndian?: boolean): void;
    /**
     *  Write UINT16 to array by internal index with index post increment
     *  @param {number} value - UINT16 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putU16(value: number, littleEndian?: boolean): void;
    /**
     *  Write UINT16[] to array by internal index with index post increment
     *  @param {number[]} value - UINT16[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putArrU16(value: number[], littleEndian?: boolean): void;
    /**
     *  Read UINT16 from array
     *  @param {number} index - Byte offset
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - UINT16 value
     */
    readU16(index: number, littleEndian?: boolean): number;
    readArrU16(index: number, littleEndian?: boolean): number[];
    readArrU16(index: number, N?: number): number[];
    readArrU16(index: number, N?: number | boolean, littleEndian?: boolean): number[];
    /**
     *  Read UINT16 from array by internal index with index post increment
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - UINT16 value
     */
    getU16(littleEndian?: boolean): number;
    getArrU16(N?: number): number[];
    getArrU16(littleEndian?: boolean): number[];
    getArrU16(N?: number | boolean, littleEndian?: boolean): number[];
    /**
     *  Write INT16 to array
     *  @param {number} index - Byte offset
     *  @param {number} value - INT16 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeI16(index: number, value: number, littleEndian?: boolean): void;
    /**
     *  Write INT16[] to array
     *  @param {number} index - Byte offset
     *  @param {number[]} value - INT16[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeArrI16(index: number, value: number[], littleEndian?: boolean): void;
    /**
     *  Write INT16 to array by internal index with index post increment
     *  @param {number} value - INT16 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putI16(value: number, littleEndian?: boolean): void;
    /**
     *  Write INT16[] to array by internal index with index post increment
     *  @param {number[]} value - INT16[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putArrI16(value: number[], littleEndian?: boolean): void;
    /**
     *  Read INT16 from array
     *  @param {number} index - Byte offset
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - INT16 value
     */
    readI16(index: number, littleEndian?: boolean): number;
    readArrI16(index: number, littleEndian?: boolean): number[];
    readArrI16(index: number, N?: number): number[];
    readArrI16(index: number, N?: number | boolean, littleEndian?: boolean): number[];
    /**
     *  Read INT16 from array by internal index with index post increment
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - INT16 value
     */
    getI16(littleEndian?: boolean): number;
    getArrI16(N?: number): number[];
    getArrI16(littleEndian?: boolean): number[];
    getArrI16(N?: number | boolean, littleEndian?: boolean): number[];
    /**
     *  Write UINT32 to array
     *  @param {number} index - Byte offset
     *  @param {number} value - UINT32 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeU32(index: number, value: number, littleEndian?: boolean): void;
    /**
     *  Write UINT32[] to array
     *  @param {number} index - Byte offset
     *  @param {number[]} value - UINT32[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeArrU32(index: number, value: number[], littleEndian?: boolean): void;
    /**
     *  Write UINT32 to array by internal index with index post increment
     *  @param {number} value - UINT32 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putU32(value: number, littleEndian?: boolean): void;
    /**
     *  Write UINT32[] to array by internal index with index post increment
     *  @param {number[]} value - UINT32[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putArrU32(value: number[], littleEndian?: boolean): void;
    /**
     *  Read UINT32 from array
     *  @param {number} index - Byte offset
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - UINT32 value
     */
    readU32(index: number, littleEndian?: boolean): number;
    readArrU32(index: number, littleEndian?: boolean): number[];
    readArrU32(index: number, N?: number): number[];
    readArrU32(index: number, N?: number | boolean, littleEndian?: boolean): number[];
    /**
     *  Read UINT32 from array by internal index with index post increment
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - UINT32 value
     */
    getU32(littleEndian?: boolean): number;
    getArrU32(N?: number): number[];
    getArrU32(littleEndian?: boolean): number[];
    getArrU32(N?: number | boolean, littleEndian?: boolean): number[];
    /**
     *  Write INT32 to array
     *  @param {number} index - Byte offset
     *  @param {number} value - INT32 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeI32(index: number, value: number, littleEndian?: boolean): void;
    /**
     *  Write INT32[] to array
     *  @param {number} index - Byte offset
     *  @param {number[]} value - UINT32[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeArrI32(index: number, value: number[], littleEndian?: boolean): void;
    /**
     *  Write INT32 to array by internal index with index post increment
     *  @param {number} value - INT32 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putI32(value: number, littleEndian?: boolean): void;
    /**
     *  Write INT32[] to array by internal index with index post increment
     *  @param {number[]} value - INT32[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putArrI32(value: number[], littleEndian?: boolean): void;
    /**
     *  Read INT32 from array
     *  @param {number} index - Byte offset
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - INT32 value
     */
    readI32(index: number, littleEndian?: boolean): number;
    readArrI32(index: number, littleEndian?: boolean): number[];
    readArrI32(index: number, N?: number): number[];
    readArrI32(index: number, N?: number | boolean, littleEndian?: boolean): number[];
    /**
     *  Read INT32 from array by internal index with index post increment
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - INT32 value
     */
    getI32(littleEndian?: boolean): number;
    getArrI32(N?: number): number[];
    getArrI32(littleEndian?: boolean): number[];
    getArrI32(N?: number | boolean, littleEndian?: boolean): number[];
    /**
     *  Write UINT64 to array
     *  @param {number} index - Byte offset
     *  @param {{ hi : number , lo : number }} value - UINT64 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeU64(index: number, value: {
        hi: number;
        lo: number;
    }, littleEndian?: boolean): void;
    /**
     *  Write UINT64[] to array
     *  @param {number} index - Byte offset
     *  @param {{ hi : number , lo : number }[]} value - UINT64[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeArrU64(index: number, value: {
        hi: number;
        lo: number;
    }[], littleEndian?: boolean): void;
    /**
     *  Write UINT64 to array by internal index with index post increment
     *  @param {{ hi : number , lo : number }} value - UINT64 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putU64(value: {
        hi: number;
        lo: number;
    }, littleEndian?: boolean): void;
    /**
     *  Write UINT64[] to array by internal index with index post increment
     *  @param {{ hi : number , lo : number }[]} value - UINT64[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putArrU64(value: {
        hi: number;
        lo: number;
    }[], littleEndian?: boolean): void;
    /**
     *  Read UINT64 from array
     *  @param {number} index - Byte offset
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {{ hi : number , lo : number }} - UINT64 value
     */
    readU64(index: number, littleEndian?: boolean): {
        hi: number;
        lo: number;
    };
    readArrU64(index: number, littleEndian?: boolean): {
        hi: number;
        lo: number;
    }[];
    readArrU64(index: number, N?: number): {
        hi: number;
        lo: number;
    }[];
    readArrU64(index: number, N?: number | boolean, littleEndian?: boolean): {
        hi: number;
        lo: number;
    }[];
    /**
     *  Read UINT64 from array by internal index with index post increment
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {{ hi : number , lo : number }} - UINT64 value
     */
    getU64(littleEndian?: boolean): {
        hi: number;
        lo: number;
    };
    getArrU64(N?: number): {
        hi: number;
        lo: number;
    }[];
    getArrU64(littleEndian?: boolean): {
        hi: number;
        lo: number;
    }[];
    getArrU64(N?: number | boolean, littleEndian?: boolean): {
        hi: number;
        lo: number;
    }[];
    /**
     *  Write INT64 to array
     *  @param {number} index - Byte offset
     *  @param {{ hi : number , lo : number }} value - INT64 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeI64(index: number, value: {
        hi: number;
        lo: number;
    }, littleEndian?: boolean): void;
    /**
     *  Write INT64[] to array
     *  @param {number} index - Byte offset
     *  @param {{ hi : number , lo : number }[]} value - INT64[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeArrI64(index: number, value: {
        hi: number;
        lo: number;
    }[], littleEndian?: boolean): void;
    /**
     *  Write INT64 to array by internal index with index post increment
     *  @param {{ hi : number , lo : number }} value - INT64 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putI64(value: {
        hi: number;
        lo: number;
    }, littleEndian?: boolean): void;
    /**
     *  Write INT64[] to array by internal index with index post increment
     *  @param {{ hi : number , lo : number }[]} value - INT64[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putArrI64(value: {
        hi: number;
        lo: number;
    }[], littleEndian?: boolean): void;
    /**
     *  Read INT64 from array
     *  @param {number} index - Byte offset
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {{ hi : number , lo : number }} - INT64 value
     */
    readI64(index: number, littleEndian?: boolean): {
        hi: number;
        lo: number;
    };
    readArrI64(index: number, littleEndian?: boolean): {
        hi: number;
        lo: number;
    }[];
    readArrI64(index: number, N?: number): {
        hi: number;
        lo: number;
    }[];
    readArrI64(index: number, N?: number | boolean, littleEndian?: boolean): {
        hi: number;
        lo: number;
    }[];
    /**
     *  Read INT64 from array by internal index with index post increment
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {{ hi : number , lo : number }} - INT64 value
     */
    getI64(littleEndian?: boolean): {
        hi: number;
        lo: number;
    };
    getArrI64(N?: number): {
        hi: number;
        lo: number;
    }[];
    getArrI64(littleEndian?: boolean): {
        hi: number;
        lo: number;
    }[];
    getArrI64(N?: number | boolean, littleEndian?: boolean): {
        hi: number;
        lo: number;
    }[];
    /**
     *  Write FLOAT32 to array
     *  @param {number} index - Byte offset
     *  @param {number} value - FLOAT32 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeF32(index: number, value: number, littleEndian?: boolean): void;
    /**
     *  Write FLOAT32[] to array
     *  @param {number} index - Byte offset
     *  @param {number[]} value - FLOAT32[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeArrF32(index: number, value: number[], littleEndian?: boolean): void;
    /**
     *  Write FLOAT32 to array by internal index with index post increment
     *  @param {number} value - FLOAT32 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putF32(value: number, littleEndian?: boolean): void;
    /**
     *  Write FLOAT32[] to array by internal index with index post increment
     *  @param {number[]} value - FLOAT32[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putArrF32(value: number[], littleEndian?: boolean): void;
    /**
     *  Read FLOAT32 from array
     *  @param {number} index - Byte offset
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - FLOAT32 value
     */
    readF32(index: number, littleEndian?: boolean): number;
    readArrF32(index: number, littleEndian?: boolean): number[];
    readArrF32(index: number, N?: number): number[];
    readArrF32(index: number, N?: number | boolean, littleEndian?: boolean): number[];
    /**
     *  Read FLOAT32 from array by internal index with index post increment
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - FLOAT32 value
     */
    getF32(littleEndian?: boolean): number;
    getArrF32(N?: number): number[];
    getArrF32(littleEndian?: boolean): number[];
    getArrF32(N?: number | boolean, littleEndian?: boolean): number[];
    /**
     *  Write FLOAT64 to array
     *  @param {number} index - Byte offset
     *  @param {number} value - FLOAT64 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeF64(index: number, value: number, littleEndian?: boolean): void;
    /**
     *  Write FLOAT64[] to array
     *  @param {number} index - Byte offset
     *  @param {number[]} value - FLOAT64[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    writeArrF64(index: number, value: number[], littleEndian?: boolean): void;
    /**
     *  Write FLOAT64 to array by internal index with index post increment
     *  @param {number} value - FLOAT64 value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putF64(value: number, littleEndian?: boolean): void;
    /**
     *  Write FLOAT64[] to array by internal index with index post increment
     *  @param {number[]} value - FLOAT64[] value
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     */
    putArrF64(value: number[], littleEndian?: boolean): void;
    /**
     *  Read FLOAT64 from array
     *  @param {number} index - Byte offset
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - FLOAT64 value
     */
    readF64(index: number, littleEndian?: boolean): number;
    readArrF64(index: number, littleEndian?: boolean): number[];
    readArrF64(index: number, N?: number): number[];
    readArrF64(index: number, N?: number | boolean, littleEndian?: boolean): number[];
    /**
     *  Read FLOAT64 from array by internal index with index post increment
     *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
     *  @return {number} - FLOAT64 value
     */
    getF64(littleEndian?: boolean): number;
    getArrF64(N?: number): number[];
    getArrF64(littleEndian?: boolean): number[];
    getArrF64(N?: number | boolean, littleEndian?: boolean): number[];
    static validateU8(value: number, throwAtRangeOverflow?: boolean): boolean;
    static validateI8(value: number, throwAtRangeOverflow?: boolean): boolean;
    static validateU16(value: number, throwAtRangeOverflow?: boolean): boolean;
    static validateI16(value: number, throwAtRangeOverflow?: boolean): boolean;
    static validateU32(value: number, throwAtRangeOverflow?: boolean): boolean;
    static validateI32(value: number, throwAtRangeOverflow?: boolean): boolean;
    static validateU64(value: {
        hi: number;
        lo: number;
    }, throwAtRangeOverflow?: boolean): boolean;
    static validateI64(value: {
        hi: number;
        lo: number;
    }, throwAtRangeOverflow?: boolean): boolean;
    static checkUI(arg: number): number;
    private $buffer;
    private $data;
    private $index;
    private _setConf;
    private _validateSetupIndex;
    private _validateIndex;
    private _getNItems;
    private _forAllNItems;
    private __writeBit;
    private __readBit;
    private __valiateBitIndex;
}
