



export namespace BBPacker
{
  export type Conf = {
                   index? : number
                   littleEndian? : boolean,
                   bitIndexReverse? : boolean,
                   throwAtRangeOverflow? : boolean
              }

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
export class BBPacker {

  /**
  *  Byte packing order
  *         
  */ 
  littleEndian : boolean = true;
  
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
  bitIndexReverse : boolean = false;

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
  throwAtRangeOverflow : boolean = false;
  

  static readonly SIZE8 = 1; 
  static readonly SIZE16 = 2;
  static readonly SIZE32 = 4;
  static readonly SIZE64 = 8;

  static readonly MAX_UINT_ARG : number = 9007199254740991;

  static readonly MAX_UINT8 = 0xFF;
  static readonly MIN_UINT8 = 0;
  

  static readonly MAX_INT8 = 127;
  static readonly MIN_INT8 = -128;
  

  static readonly MAX_UINT16 = 0xFFFF;
  static readonly MIN_UINT16 = 0;
  

  static readonly MAX_INT16 = 32767;
  static readonly MIN_INT16 = -32768;
  

  static readonly MAX_UINT32 = 0xFFFF_FFFF;
  static readonly MIN_UINT32 = 0;
  

  static readonly MAX_INT32 = 2147483647;
  static readonly MIN_INT32 =-2147483648;
  

  static readonly MAX_UINT64_HI = BBPacker.MAX_UINT32;
  static readonly MAX_UINT64_LO = BBPacker.MAX_UINT32;

  static readonly MIN_UINT64_HI = BBPacker.MIN_UINT32;
  static readonly MIN_UINT64_LO = BBPacker.MIN_UINT32;
  
  

  static readonly MAX_INT64_HI = BBPacker.MAX_INT32;
  static readonly MAX_INT64_LO = BBPacker.MAX_UINT32;

  static readonly MIN_INT64_HI = BBPacker.MIN_INT32;
  static readonly MIN_INT64_LO = BBPacker.MIN_UINT32;
  
  
 static readonly MAX_BITS_NUMBER = 32;




  constructor( size : number , conf?:BBPacker.Conf );
  constructor( buffer : BBPacker , conf?:BBPacker.Conf  );
  constructor( buffer : ArrayBuffer , conf?:BBPacker.Conf  );

  constructor( arg : BBPacker | ArrayBuffer | number , conf?:BBPacker.Conf )
  {

    if( typeof(arg) == 'number' )
    {

       arg = BBPacker.checkUI(arg);   

      this.arrayBuffer =  new ArrayBuffer( arg );
     

   }
   else if( arg instanceof BBPacker )
   {

     this.$buffer = arg.$buffer;
     this.$data = arg.$data;
     this.$index = arg.index;
    

     this.littleEndian = arg.littleEndian;
     this.bitIndexReverse = arg.bitIndexReverse;
     this.throwAtRangeOverflow = arg.throwAtRangeOverflow;
     

   }
   else if( arg instanceof ArrayBuffer )
   {
    this.arrayBuffer =  arg;

    
  }          
  else {
    throw new Error("Contructor argument");
  }           

  this._setConf( conf ); 


 }

  
  /**
   *  Create an instance of the class
   *  @param {number} num - Number of UINT8 elements
   *  @param {BBPacker.Conf} [conf] - Class config
   *  @return {BBPacker} - Instance
   */
  static build8( num : number , conf?:BBPacker.Conf ) : BBPacker
  {
     num = BBPacker.checkUI(num);
     const packer = new BBPacker(num);
     packer._setConf( conf ); 
     return packer; 
  }

  /**
   *  Create an instance of the class
   *  @param {number} num - Number of UINT16 elements
   *  @param {BBPacker.Conf} [conf] - Class config
   *  @return {BBPacker} - Instance
   */
  static build16( num : number , conf?:BBPacker.Conf ) : BBPacker
  {
     num = BBPacker.checkUI(num);
     const packer = new BBPacker(num * BBPacker.SIZE16);
     packer._setConf( conf );
     return packer; 
  }

  /**
   *  Create an instance of the class
   *  @param {number} num - Number of UINT32 elements
   *  @param {BBPacker.Conf} [conf] - Class config
   *  @return {BBPacker} - Instance
   */
  static build32( num : number , conf?:BBPacker.Conf ) : BBPacker
  {
     num = BBPacker.checkUI(num);
     const packer = new BBPacker(num * BBPacker.SIZE32);
     packer._setConf( conf );
     return packer; 
  }

  /**
   *  Create an instance of the class
   *  @param {number} num - Number of UINT64 elements
   *  @param {BBPacker.Conf} [conf] - Class config
   *  @return {BBPacker} - Instance
   */
  static build64( num : number , conf?:BBPacker.Conf ) : BBPacker
  {
     num = BBPacker.checkUI(num);
     const packer = new BBPacker(num * BBPacker.SIZE64);
     packer._setConf( conf );
     return packer; 
  }

  static copyFrom( arg : ArrayBuffer  , conf?:BBPacker.Conf ) : BBPacker
  static copyFrom( arg : BBPacker , conf?:BBPacker.Conf ) : BBPacker

 /**
  * Create an instance of a class from
  * @param {BBPacker | ArrayBuffer} arg - What to create a class from
  * @param {BBPacker.Conf} [conf] - Class config
  * @return {BBPacker} - Instance
  */
  static copyFrom( arg : BBPacker | ArrayBuffer  , conf?:BBPacker.Conf ) : BBPacker
  {
    let packer : BBPacker;
 

   if( arg instanceof BBPacker )
   {
      const newArrayBuffer = arg.arrayBuffer.slice(0);
      packer = new  BBPacker(newArrayBuffer);

     packer.$buffer = arg.$buffer;
     packer.$data = arg.$data;
     packer.$index = arg.index;
    
     packer.littleEndian = arg.littleEndian;
     packer.bitIndexReverse = arg.bitIndexReverse;
     packer.throwAtRangeOverflow = arg.throwAtRangeOverflow;
          

   }
   else if( arg instanceof ArrayBuffer )
   {
      const newArrayBuffer = arg.slice(0);

      packer = new BBPacker(newArrayBuffer);
    
  }          
  else {
    throw new Error("Contructor argument");
  }           

     packer._setConf(conf);
     return packer;
  }

  /**
   * Create an instance of a class from UINT8 elements.
   * @param {number[]} arr - Array of elements.
   * @param {BBPacker.Conf} [conf] - Class config.
   * @return {BBPacker} - Instance
  */
  static fromUint8( arr : number[] , conf?:BBPacker.Conf ): BBPacker
  {
    const packer = BBPacker.build8( arr.length , conf );
    packer.writeArrU8( 0 , arr  );    
    return packer;
  }

  /**
   * Create an instance of a class from INT8 elements.
   * @param {number[]} arr - Array of elements.
   * @param {BBPacker.Conf} [conf] - Class config.
   * @return {BBPacker} - Instance
  */
  static fromInt8( arr : number[] , conf?:BBPacker.Conf ): BBPacker
  {
    const packer = BBPacker.build8( arr.length , conf );
    packer.writeArrI8( 0 , arr  );    
    return packer;
  }

  /**
   * Create an instance of a class from UINT16 elements.
   * @param {number[]} arr - Array of elements.
   * @param {BBPacker.Conf} [conf] - Class config.
   * @return {BBPacker} - Instance
  */
  static fromUint16( arr : number[] , conf?:BBPacker.Conf ): BBPacker
  {
    const packer = BBPacker.build16( arr.length , conf );
    packer.writeArrU16( 0 , arr  );    
    return packer;
  }

  /**
   * Create an instance of a class from INT16 elements.
   * @param {number[]} arr - Array of elements.
   * @param {BBPacker.Conf} [conf] - Class config.
   * @return {BBPacker} - Instance 
  */
  static fromInt16( arr : number[] , conf?:BBPacker.Conf ): BBPacker
  {
    const packer = BBPacker.build16( arr.length , conf );
    packer.writeArrI16( 0 , arr  );    
    return packer;
  }



  /**
   * Create an instance of a class from UINT32 elements.
   * @param {number[]} arr - Array of elements.
   * @param {BBPacker.Conf} [conf] - Class config.
   * @return {BBPacker} - Instance 
  */
  static fromUint32( arr : number[] , conf?:BBPacker.Conf ): BBPacker
  {
    const packer = BBPacker.build32( arr.length , conf );
    packer.writeArrU32( 0 , arr  );    
    return packer;
  }

  /**
   * Create an instance of a class from INT32 elements.
   * @param {number[]} arr - Array of elements.
   * @param {BBPacker.Conf} [conf] - Class config.
   * @return {BBPacker} - Instance 
  */
  static fromInt32( arr : number[] , conf?:BBPacker.Conf ): BBPacker
  {
    const packer = BBPacker.build32( arr.length , conf );
    packer.writeArrI32( 0 , arr  );    
    return packer;
  }

  /**
   * Create an instance of a class from UINT64 elements.
   * @param {{hi:number,lo:number}[]} arr - Array of elements.
   * @param {BBPacker.Conf} [conf] - Class config.
   * @return {BBPacker} - Instance 
  */
  static fromUint64( arr : {hi:number,lo:number}[] , conf?:BBPacker.Conf ): BBPacker
  {
    const packer = BBPacker.build64( arr.length , conf );
    packer.writeArrU64( 0 , arr  );    
    return packer;
  }

  /**
   * Create an instance of a class from INT64 elements.
   * @param {{hi:number,lo:number}[]} arr - Array of elements.
   * @param {BBPacker.Conf} [conf] - Class config.
   * @return {BBPacker} - Instance 
  */
  static fromInt64( arr : {hi:number,lo:number}[] , conf?:BBPacker.Conf ): BBPacker
  {
    const packer = BBPacker.build64( arr.length , conf );
    packer.writeArrI64( 0 , arr  );    
    return packer;
  }


  /**
   * Create an instance of a class from FLOAT32 elements.
   * @param {number[]} arr - Array of elements.
   * @param {BBPacker.Conf} [conf] - Class config.
   * @return {BBPacker} - Instance 
  */
  static fromFloat32( arr : number[] , conf?:BBPacker.Conf ): BBPacker
  {
    const packer = BBPacker.build32( arr.length , conf );
    packer.writeArrF32( 0 , arr  );    
    return packer;
  }

  /**
   * Create an instance of a class from FLOAT64 elements.
   * @param {number[]} arr - Array of elements.
   * @param {BBPacker.Conf} [conf] - Class config.
   * @return {BBPacker} - Instance 
  */
  static fromFloat64( arr : number[] , conf?:BBPacker.Conf ): BBPacker
  {
    const packer = BBPacker.build64( arr.length , conf );
    packer.writeArrF64( 0 , arr  );    
    return packer;
  }


get conf() : BBPacker.Conf
{
   return  {
             index : this.$index,
             littleEndian : this.littleEndian,
             bitIndexReverse : this.bitIndexReverse,
             throwAtRangeOverflow : this.throwAtRangeOverflow
           }


}

set conf( conf : BBPacker.Conf  )
{
   this._setConf( conf );  
}

 

get arrayBufferSize() : number {

  return this.$buffer.byteLength;
} 


get arrayBuffer() : ArrayBuffer
{
  return this.$buffer;
}

set arrayBuffer( buffer : ArrayBuffer )
{
 this.$buffer =  buffer;  
 this.$data = new DataView(this.$buffer);
 this.$index = 0;

}

/**
 *   Сreate a ArrayBuffer , resize.
 *   @param {number} size - Buffer size.
 *   @param {boolean} [copyOld] - true Copy the contents of the old buffer. 
 */
createArrayBuffer( size : number , copyOld ? : boolean ) : void
 {
      
    const oldArrayBuffer =  this.arrayBuffer; 

    this.arrayBuffer =  new ArrayBuffer( size );


        if( typeof copyOld == 'boolean'  )
        {
           if( copyOld == true )
           {
              const newArrayBufferSize = this.arrayBufferSize;
              const oldArrayBufferSize = oldArrayBuffer.byteLength;
              let _size = 0;

              if(  newArrayBufferSize >= oldArrayBufferSize )
              {
                 _size = oldArrayBufferSize; 
              }
              else {
                      _size = newArrayBufferSize;  
              }

              this.setCopyOfArrayBuffer( 0 , oldArrayBuffer ,  _size  );               
           } 

        } 


 }

/**
 *  Get a copy of the buffer 
 *  @param {number} index - Offset in buffer
 *  @param {number} [size] - Data size , (Default:All data starting from offset)
 *  @return {ArrayBuffer} -  Copy of data
*/
getCopyOfArrayBuffer( index : number , size ? : number  ) : ArrayBuffer
{

    index = BBPacker.checkUI(index);

    let _size = this.$buffer.byteLength;

    if( _size )  
    {
        if( index >= _size  )
        {
            throw new RangeError("Index >= Buffer size");        
        }
    }else if( index > _size  )
    {
        throw new RangeError("Index > Buffer size");
    }

   _size = _size - index;


    if( typeof size == 'number'  )
    {
       size = BBPacker.checkUI(size);

       if( size == 0  )
       {
          return new ArrayBuffer(0);
       }   

       if( size > _size )
       {
          throw new RangeError(" Size > Buffer size"); 
       }


       return this.$buffer.slice( index , index + size );   

    }

   if(_size == 0)
    return new ArrayBuffer(0);


    return this.$buffer.slice( index );

}


/**
 *  Set a copy of the buffer 
 *  @param {number} index - Offset in class buffer
 *  @param {ArrayBuffer} buffer - What to copy
 *  @param {number} [bufferSize] - The size of the buffer to copy (Default:buffer.byteLength)
 *  @param {number} [bufferOffset] - Offset of the buffer to copy (Default:0) 
 *  @return {number} - Size of copied data
*/
setCopyOfArrayBuffer( index : number , buffer : ArrayBuffer ,  bufferSize ? : number , bufferOffset ? : number ) : number
{
  index = BBPacker.checkUI(index);

  let _size = this.$buffer.byteLength;

  let _bufferSize = buffer.byteLength;
  let _bufferOffset = 0;


    if( _size )  
    {
        if( index >= _size  )
        {
            throw new RangeError("Index >= Buffer size");        
        }

    }else if( index > _size  )
    {
        throw new RangeError("Index > Buffer size");
    }

   _size = _size - index;


    if( typeof bufferSize == 'number'  )
    {
       _bufferSize = BBPacker.checkUI(bufferSize);

 

       if( typeof bufferOffset == "number" )
       {
  
          _bufferOffset = BBPacker.checkUI(bufferOffset);
       } 
         


       if( _bufferSize > _size )
       {
          throw new RangeError("Size > Buffer size"); 
       }  
       else {
               _size = _bufferSize;
       }


    }
    else {

            if( _bufferSize > _size  )
            {
               throw new RangeError("Size > Buffer size");
            }  
            else {
                    _size = _bufferSize;
            }  

    }


  if( _size == 0 )
    return 0;



   
 const dst = new Uint8Array(this.$buffer);
 const src = new Uint8Array(buffer,_bufferOffset, _bufferSize);

 for( let i = 0 ; i < _size ; i++ )
 {
    dst[i + index] = src[i];
 }

 return _size;
 
}

 /**
  *  Set a copy of the buffer at the current internal index
  *  and then increment the index.
  *  @param {ArrayBuffer} buffer - What to copy
  *  @param {number} [bufferSize] - The size of the buffer to copy (Default:buffer.byteLength)
  *  @param {number} [bufferOffset] - Offset of the buffer to copy (Default:0) 
  *  @return {number} - Size of copied data
 */
 pushArrayBuffer( buffer : ArrayBuffer ,  bufferSize ? : number , bufferOffset ? : number  ) : number
 {

    const size = this.setCopyOfArrayBuffer( this.$index , buffer ,  bufferSize ,  bufferOffset   );
    
    this.$index += size;
   
    return size;
 }


/**
 *  Get a copy of the class
 *  @param {number} index - Offset in class buffer
 *  @param {number} [size] - Data size
 *  @return {BBPacker}
 * 
*/
getCopyOfBBPacker( index : number , size ? : number  ) : BBPacker
{
   const buffer : ArrayBuffer = this.getCopyOfArrayBuffer(index, size);
   
   return new BBPacker( buffer , this.conf  );
}


/**
 *  Convert unsigned representation of signed number to signed number
 *  @param {number} value
 *  @raturn {number} 0xFFFF_FF9C == -100
 */
static U32toI32( value : number ) : number
{
   return (value >>> 0 ) >> 0;     
}

/**
 *  Convert unsigned representation of signed number to signed number
 *  @param {number} value
 *  @raturn {number} 0xFF9C == -100
 */
static  U16toI16( value : number ) : number
{

   return (((value & 0xFFFF) << 16) >> 0) >> 16;   

}

/**
 *  Convert unsigned representation of signed number to signed number
 *  @param {number} value
 *  @raturn {number} 0x9C == -100
 */
static  U8toI8( value : number ) : number
{

   return (((value & 0xFF) << 24) >> 0) >> 24;   

}




 /**
  * Get byte index
  * @return {number} - byte index
 */
 get index(  ) : number 
  {
     return this.$index;
  }
         
 /**
  * Set byte index
  * @param {number} index - byte index 
 */         
  set index(  index : number  )
  {

    this.$index = this._validateSetupIndex( index , BBPacker.SIZE8 );

  }

  /**
   * Set index = 0 
  */
  resetIndex() : void
  {
    this.$index = 0;
  }

  /**
   * Set index in 16 bit array
   *  bytes  = 4
   *  [0]  
   *  [1] 
   *  [2] <= index = 1
   *  [3] 
   * @param {number} - word16 index 
   */
  set index16(  index : number  )
  {

     this.$index = this._validateSetupIndex( index , BBPacker.SIZE16 );
  }

  /**
   * Set index in 32 bit array
   * @param {number}  - word32 index 
   */
  set index32(  index : number  )
  {
     this.$index = this._validateSetupIndex( index , BBPacker.SIZE32 );
  }

  /**
   * Set index in 64 bit array
   * @param {number} - word64 index 
   */
  set index64(  index : number  )
  {
     this.$index = this._validateSetupIndex( index , BBPacker.SIZE64 );
  }


  /**
   * Get the index of a byte in a 16-bit array
   * @param {number} - word16 index 
  */
  getIndex16( index : number ) : number
  {
    return this._validateSetupIndex( index , BBPacker.SIZE16 );
  }

  /**
   * Get the index of a byte in a 32-bit array
   * @param {number} - word32 index
  */
  getIndex32( index : number ) : number
  {
    return this._validateSetupIndex( index , BBPacker.SIZE32 );
  }

  /**
   * Get the index of a byte in a 64-bit array
   * @param {number} - word64 index
  */
  getIndex64( index : number ) : number
  {
    return this._validateSetupIndex( index , BBPacker.SIZE64 );
  }




  /**
   *  Get free (not written) number of bytes.
   * 
   *  size  = 4
   *  [0] <= X 
   *  [1] <= Y
   *  [2] | rest  <= current index
   *  [3] | rest
   */
  get indexRestSize() : number
  {
     if( this.$index > this.$buffer.byteLength )
       return 0;
     
     return this.$buffer.byteLength - this.$index;
  }

  /**
   *  Get full (written) number of bytes.
   * 
   *  size  = 4
   *  [0] <= X  | full 
   *  [1] <= Y  | full
   *  [2] <= current index
   *  [3] 
   */
  get indexFullSize() : number
  {
     return this.$index;
  }

  /**
   * Check that the byte array contains an integer number of 16-bit words. 
   * 
   * @param {number} [index] - offset in array , default = 0
   * @param {number} [size] - array size , default array size
   * @return {boolean} - true
  */
  isAlign16( index ? : number , size ?: number ) : boolean
  {
      if( this.$buffer.byteLength == 0 )
        return false;

      const count = this._getNItems(BBPacker.SIZE8,index,size);  
 
      if( count == 0 )
         return false;

      if( (count % 2) === 0 )
       return true;  

     return false;
  }

  /**
   * Check that the byte array contains an integer number of 32-bit words. 
   * 
   * @param {number} [index] - offset in array , default = 0
   * @param {number} [size] - array size , default array size
   * @return {boolean} - true
  */
  isAlign32(index ? : number , size ?: number) : boolean
  {
      if( this.$buffer.byteLength == 0 )
        return false;

      const count = this._getNItems(BBPacker.SIZE8,index,size);      

      if( count == 0 )
         return false;

      if( (count % 4) === 0 )
       return true;  

     return false;
  }

  /**
   * Check that the byte array contains an integer number of 64-bit words. 
   * 
   * @param {number} [index] - offset in array , default = 0
   * @param {number} [size] - array size , default array size
   * @return {boolean} - true
  */
  isAlign64(index ? : number , size ?: number) : boolean
  {
      if( this.$buffer.byteLength == 0 )
        return false;

      const count = this._getNItems(BBPacker.SIZE8,index,size);

      if( count == 0 )
         return false;


      if( (count % 8) === 0 )
       return true;  

     return false;
  }

  

  /**
   * Get integer number 16 bit words in array
   * @param {number} [index] - offset in array , default = 0
   * @param {number} [size] - array size , default array size
   * @return {number} - Number
   */
  getNumber16(index ? : number , size ?: number) : number
  {
     return  this._getNItems(BBPacker.SIZE16,index,size); 
  }

  /**
   * Get integer number 32 bit words in array
   * @param {number} [index] - offset in array , default = 0
   * @param {number} [size] - array size , default array size
   * @return {number} - Number
   */
  getNumber32(index ? : number , size ?: number) : number
  {
    return  this._getNItems(BBPacker.SIZE32,index,size);
  }

  /**
   * Get integer number 64 bit words in array
   * @param {number} [index] - offset in array , default = 0
   * @param {number} [size] - array size , default array size
   * @return {number} - Number
   */
  getNumber64(index ? : number , size ?: number) : number
  {
    return  this._getNItems(BBPacker.SIZE64,index,size);
  }

  /**
   * Set all bytes to 0
   */ 
  allZerro( )
  {
    let len = this.$buffer.byteLength;   
    let i = 0; 

    while(len--)
    {
       this.$data.setUint8( i++ , 0 );
         
    } 

  }

   

  /**
   * Call callback for all UINT8 elements 
   * @param {( index : number ,  data : number ) => boolean} func - index : element index , data : UINT8 value , return false : stop process 
   * @param {number} [index] - byte offset (Default:0)
   * @param {number} [count] - number of elements (Default:All)
   * @return {boolean} - false The callback returned false
   * 
  */
  forAllUint8( func : ( index : number ,  data : number ) => boolean , index ?:number , count ?:number ) : boolean  
  {

     const size =  this._forAllNItems(  BBPacker.SIZE8 ,  index , count ); 

     let _index = size.index;
     let _count = size.count; 
     let rc  = true;    
     let inc = 0;   

     while(_count--)
     {
        if( func( inc++ , this.$data.getUint8( _index  ) ) === false )
        {
           rc = false; 
           break;  
        } 
        _index += BBPacker.SIZE8;

     }

    return rc; 
  }

  /**
   * Call callback for all INT8 elements 
   * @param {( index : number ,  data : number ) => boolean} func - index : element index , data : INT8 value , return false : stop process 
   * @param {number} [index] - byte offset (Default:0)
   * @param {number} [count] - number of elements (Default:All)
   * @return {boolean} - false The callback returned false
   * 
  */
  forAllInt8( func : ( index : number ,data : number ) => void | boolean , index ?:number , count ?:number ) : boolean
  {
     const size =  this._forAllNItems(  BBPacker.SIZE8 ,  index , count ); 

     let _index = size.index;
     let _count = size.count; 
     let rc  = true;   
     let inc = 0;

     while(_count--)
     {
        if( func(inc++, this.$data.getInt8( _index  ) ) === false )
        {
           rc = false;
           break; 
        }  


        _index += BBPacker.SIZE8;
     }


     return rc;
  }


  forAllUint16( func : ( index : number ,data : number ) => boolean , index ? : number ):boolean;  
  forAllUint16( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number ):boolean;  
  forAllUint16( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number , littleEndian ? : boolean ):boolean;  
  forAllUint16( func : ( index : number ,data : number ) => boolean , littleEndian ? : boolean ):boolean;  
  forAllUint16( func : ( index : number ,data : number ) => boolean ,  index ? : number , littleEndian ? : boolean ):boolean;  



  /**
   * Call callback for all UINT16 elements 
   * @param {( index : number ,  data : number ) => boolean} func - index : element index , data : UINT16 value , return false : stop process 
   * @param { number | boolean} index - byte offset (Default:0) or littleEndian
   * @param {number | boolean} count - number of elements (Default:All) or littleEndian
   * @param {boolean} [littleEndian]
   * @return {boolean} - false The callback returned false
   * 
  */
  forAllUint16( func : ( index : number ,data : number ) => boolean , index ? : number | boolean , count ?: number | boolean , littleEndian ? : boolean ):boolean  
  {
     const size =  this._forAllNItems(  BBPacker.SIZE16 ,  index , count , littleEndian ); 

     let _index = size.index;
     let _count = size.count; 
     const _littleEndian = size.littleEndian;
     let rc = true;   
     let inc = 0;

 

     while(_count--)
     {
        if( func(inc++, this.$data.getUint16( _index , _littleEndian  ) ) === false )
        {
            rc = false;
            break;
        }  
        
  
        _index += BBPacker.SIZE16;

     }

    return rc;  
  }

  forAllInt16( func : ( index : number ,data : number ) => boolean , index ? : number ):boolean;  
  forAllInt16( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number ):boolean;  
  forAllInt16( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number , littleEndian ? : boolean ):boolean;  
  forAllInt16( func : ( index : number ,data : number ) => boolean , littleEndian ? : boolean ):boolean;  
  forAllInt16( func : ( index : number ,data : number ) => boolean ,  index ? : number , littleEndian ? : boolean ):boolean;  

  /**
   * Call callback for all INT16 elements 
   * @param {( index : number ,  data : number ) => boolean} func - index : element index , data : INT16 value , return false : stop process 
   * @param { number | boolean} index - byte offset (Default:0) or littleEndian
   * @param {number | boolean} count - number of elements (Default:All) or littleEndian
   * @param {boolean} [littleEndian]
   * @return {boolean} - false The callback returned false
   * 
  */
  forAllInt16( func : ( index : number ,data : number ) => boolean ,index ? : number | boolean , count ?: number | boolean , littleEndian ? : boolean ):boolean  
  {
     const size =  this._forAllNItems(  BBPacker.SIZE16 ,  index , count , littleEndian ); 

     let _index = size.index;
     let _count = size.count; 
     const _littleEndian = size.littleEndian;
     let rc  = true;
     let inc = 0;

     while(_count--)
     {
        if( func(inc++, this.$data.getInt16( _index , _littleEndian ) ) === false )  
        {
           rc = false;
           break; 
        }


        _index += BBPacker.SIZE16;
     }

     return rc;  
  }

  forAllUint32( func : ( index : number ,data : number ) => boolean , index ? : number ):boolean;  
  forAllUint32( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number ):boolean;  
  forAllUint32( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number , littleEndian ? : boolean ):boolean;  
  forAllUint32( func : ( index : number ,data : number ) => boolean , littleEndian ? : boolean ):boolean;  
  forAllUint32( func : ( index : number ,data : number ) => boolean ,  index ? : number , littleEndian ? : boolean ):boolean;  

  /**
   * Call callback for all UINT32 elements 
   * @param {( index : number ,  data : number ) => boolean} func - index : element index , data : UINT32 value , return false : stop process 
   * @param { number | boolean} index - byte offset (Default:0) or littleEndian
   * @param {number | boolean} count - number of elements (Default:All) or littleEndian
   * @param {boolean} [littleEndian]
   * @return {boolean} - false The callback returned false
   * 
  */
  forAllUint32( func : ( index : number ,data : number ) => boolean , index ? : number | boolean , count ?: number | boolean , littleEndian ? : boolean ):boolean  
  {
      const size =  this._forAllNItems(  BBPacker.SIZE32 ,  index , count , littleEndian ); 

     let _index = size.index;
     let _count = size.count; 
     const _littleEndian = size.littleEndian;
     let rc = true;
     let inc = 0;

     while(_count--)
     {
        if(func(inc++, this.$data.getUint32( _index , _littleEndian ) ) === false )
        {
            rc = false;
            break;
        }  

        
        _index += BBPacker.SIZE32;
     }

     return rc;
  }

  forAllInt32( func : ( index : number ,data : number ) => boolean , index ? : number ):boolean;  
  forAllInt32( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number ):boolean;  
  forAllInt32( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number , littleEndian ? : boolean ):boolean;  
  forAllInt32( func : ( index : number ,data : number ) => boolean , littleEndian ? : boolean ):boolean;  
  forAllInt32( func : ( index : number ,data : number ) => boolean ,  index ? : number , littleEndian ? : boolean ):boolean;  


  /**
   * Call callback for all INT32 elements 
   * @param {( index : number ,  data : number ) => boolean} func - index : element index , data : INT32 value , return false : stop process 
   * @param { number | boolean} index - byte offset (Default:0) or littleEndian
   * @param {number | boolean} count - number of elements (Default:All) or littleEndian
   * @param {boolean} [littleEndian]
   * @return {boolean} - false The callback returned false
   * 
  */
  forAllInt32( func : ( index : number ,data : number ) => boolean , index ? : number | boolean , count ?: number | boolean , littleEndian ? : boolean ):boolean  
  {
     const size =  this._forAllNItems(  BBPacker.SIZE32 ,  index , count , littleEndian); 

     let _index = size.index;
     let _count = size.count; 
     const _littleEndian = size.littleEndian;
     let rc = true;
     let inc = 0;

     while(_count--)
     {
       if(func(inc++, this.$data.getInt32( _index , _littleEndian ) ) === false )  
       {
          rc = false;
          break;
       } 


        _index += BBPacker.SIZE32; 
     }

     return rc;
  }

  forAllUint64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean , index ? : number ):boolean;  
  forAllUint64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean , index ? : number ,  count ?: number ):boolean;  
  forAllUint64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean , index ? : number ,  count ?: number , littleEndian ? : boolean ):boolean;  
  forAllUint64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean , littleEndian ? : boolean ):boolean;  
  forAllUint64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean ,  index ? : number , littleEndian ? : boolean ):boolean;  

  /**
   * Call callback for all UINT64 elements 
   * @param {( index : number ,data : {hi:number,lo:number} ) => boolean} func - index : element index , data : UINT64 value , return false : stop process 
   * @param { number | boolean} index - byte offset (Default:0) or littleEndian
   * @param {number | boolean} count - number of elements (Default:All) or littleEndian
   * @param {boolean} [littleEndian]
   * @return {boolean} - false The callback returned false
   * 
  */
forAllUint64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean , index ? : number | boolean , count ?: number | boolean , littleEndian ? : boolean ) :boolean 
  {
      const size =  this._forAllNItems(  BBPacker.SIZE64 ,  index , count , littleEndian); 

     let _index = size.index;
     let _count = size.count; 
     const _littleEndian = size.littleEndian;
     let rc = true;
     let inc = 0;

     while(_count--)
     {
        if(func(inc++, this.readU64( _index , _littleEndian ) ) === false )
        {
            rc = false;
            break;
        }  

        
        _index += BBPacker.SIZE64;
     }

    return rc;
  }

  forAllInt64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean , index ? : number ):boolean;  
  forAllInt64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean , index ? : number ,  count ?: number ):boolean;  
  forAllInt64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean , index ? : number ,  count ?: number , littleEndian ? : boolean ):boolean;  
  forAllInt64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean , littleEndian ? : boolean ):boolean;  
  forAllInt64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean ,  index ? : number , littleEndian ? : boolean ):boolean;  


  /**
   * Call callback for all INT64 elements 
   * @param {( index : number ,data : {hi:number,lo:number} ) => boolean} func - index : element index , data : INT64 value , return false : stop process 
   * @param { number | boolean} index - byte offset (Default:0) or littleEndian
   * @param {number | boolean} count - number of elements (Default:All) or littleEndian
   * @param {boolean} [littleEndian]
   * @return {boolean} - false The callback returned false
   * 
  */
  forAllInt64( func : ( index : number ,data : {hi:number,lo:number} ) => boolean , index ? : number | boolean , count ?: number | boolean , littleEndian ? : boolean ):boolean  
  {
     const size =  this._forAllNItems(  BBPacker.SIZE64 ,  index , count,littleEndian ); 

     let _index = size.index;
     let _count = size.count;
     const _littleEndian = size.littleEndian; 
     let rc = true;
     let inc = 0;

     while(_count--) 
     {
       if(func(inc++, this.readI64( _index , _littleEndian ) ) === false) 
       {
          rc = false;
          break;
       } 
        
        _index += BBPacker.SIZE64;
     }

    return rc;
  }

  forAllFloat32( func : ( index : number ,data : number ) => boolean , index ? : number ):boolean;  
  forAllFloat32( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number ):boolean;  
  forAllFloat32( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number , littleEndian ? : boolean ):boolean;  
  forAllFloat32( func : ( index : number ,data : number ) => boolean , littleEndian ? : boolean ):boolean;  
  forAllFloat32( func : ( index : number ,data : number ) => boolean ,  index ? : number , littleEndian ? : boolean ):boolean;  
  
  /**
   * Call callback for all FLOAT32 elements 
   * @param {( index : number ,  data : number ) => boolean} func - index : element index , data : FLOAT32 value , return false : stop process 
   * @param { number | boolean} index - byte offset (Default:0) or littleEndian
   * @param {number | boolean} count - number of elements (Default:All) or littleEndian
   * @param {boolean} [littleEndian]
   * @return {boolean} - false The callback returned false
   * 
  */
  forAllFloat32( func : ( index : number ,data : number ) => boolean , index ? : number | boolean , count ?: number | boolean , littleEndian ? : boolean ):boolean  
  {
     const size =  this._forAllNItems(  BBPacker.SIZE32 ,  index , count,littleEndian ); 

     let _index = size.index;
     let _count = size.count;
     const _littleEndian = size.littleEndian;  
     let rc  = true;
     let inc = 0;

     while(_count--)
     {
       if(func(inc++ ,this.$data.getFloat32( _index , _littleEndian ) ) === false )
       {
          rc = false;
          break;
       }  

        
        _index += BBPacker.SIZE32;
     }

     return rc;
  }

  forAllFloat64( func : ( index : number ,data : number ) => boolean , index ? : number ):boolean;  
  forAllFloat64( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number ):boolean;  
  forAllFloat64( func : ( index : number ,data : number ) => boolean , index ? : number ,  count ?: number , littleEndian ? : boolean ):boolean;  
  forAllFloat64( func : ( index : number ,data : number ) => boolean , littleEndian ? : boolean ):boolean;  
  forAllFloat64( func : ( index : number ,data : number ) => boolean ,  index ? : number , littleEndian ? : boolean ):boolean;  


  /**
   * Call callback for all FLOAT64 elements 
   * @param {( index : number ,  data : number ) => boolean} func - index : element index , data : FLOAT64 value , return false : stop process 
   * @param { number | boolean} index - byte offset (Default:0) or littleEndian
   * @param {number | boolean} count - number of elements (Default:All) or littleEndian
   * @param {boolean} [littleEndian]
   * @return {boolean} - false The callback returned false
   * 
  */
  forAllFloat64( func : ( index : number ,data : number ) => boolean , index ? : number | boolean , count ?: number | boolean , littleEndian ? : boolean ):boolean  
  {
     const size =  this._forAllNItems(  BBPacker.SIZE64 ,  index , count,littleEndian ); 

     let _index = size.index;
     let _count = size.count; 
     const _littleEndian = size.littleEndian;
     let rc = true;
     let inc = 0;

     while(_count--)
     {
        if(func( inc++ , this.$data.getFloat64( _index , _littleEndian  ) ) === false)
        {
            rc = false;
            break;
        }  
        

        _index += BBPacker.SIZE64;
     }

    return rc;
  }







 /**
  * Get number of bytes from number of bits
  * @param  {number} nBits - Number of bits
  * @return {number}  Number of bytes  
 */
 static nBits2nBytes( nBits : number ) : number
 {
     nBits = BBPacker.checkUI(nBits);

     if( nBits == 0 )
      return 0;  

     return Math.floor( (nBits - 1) / 8) + 1; 
 } 



writeBit( bitIndex : number , bitValue : boolean ) : void;
writeBit( bitIndex : number , bitValue : boolean , byteIndex ? : number) : void;
writeBit( bitIndex : number , bitValue : boolean , bitIndexReverse ?  : boolean ) : void;
writeBit( bitIndex : number , bitValue : boolean , byteIndex ? : number , bitIndexReverse ?  : boolean ) : void;

/**
 *  Set the value of a bit in a byte array.
 *  @param {number} bitIndex - Index of a bit in a byte array 0,1,2..
 *  @param {boolean}  bitValue
 *  @param {number|boolean}  [byteIndex] - Index index of the starting byte(Default:0) or bitIndexReverse
 *  @param {boolean} [bitIndexReverse] - Bit numbering order (Default:this.bitIndexReverse)
 *  @example 
 * //     
 * //  bitIndexReverse = false:  
 * //  Before: 
 * //            [7]  [6]  [5]  [4]  [3]  [2]  [1] [0]
 * //             0    0    0    0    0    0    0   0        
 * //            [15] [14] [13] [12] [11] [10] [9] [8]
 * //              0   0    0    0    0    0    0   0
 * //
 * //  After: writeBit( 9 , true );
 * //
 * //            [7]  [6]  [5]  [4]  [3]  [2]  [1] [0]
 * //             0    0    0    0    0    0    0   0        
 * //            [15] [14] [13] [12] [11] [10] [9] [8]
 * //              0   0    0    0    0    0    1   0
 * 
 * // bitIndexReverse = true:
 * // Before:
 * //            [0] [1] [2]  [3]  [4]  [5]  [6]  [7] 
 * //             0   0   0    0    0    0    0    0
 * //            [8] [9] [10] [11] [12] [13] [14] [15]
 * //             0   0   0    0    0    0    0    0
 * //
 * // After: writeBit( 9 , true );
 * //  
 * //            [0] [1] [2]  [3]  [4]  [5]  [6]  [7] 
 * //             0   0   0    0    0    0    0    0
 * //            [8] [9] [10] [11] [12] [13] [14] [15]
 * //             0   1   0    0    0    0    0    0 
*/
writeBit( bitIndex : number , bitValue : boolean , byteIndex ? : number | boolean , bitIndexReverse ?  : boolean ) : void
{

  bitIndex = BBPacker.checkUI(bitIndex);
 
  
  let _bitIndexReverse = this.bitIndexReverse;
  let _byteIndex = 0;

  if( typeof byteIndex == "number" )
  {
      _byteIndex = BBPacker.checkUI(byteIndex);
     
      if( typeof  bitIndexReverse == 'boolean' )
      {
         _bitIndexReverse = bitIndexReverse;
      }   
  }
  else if( typeof byteIndex == "boolean" )
  {
     _bitIndexReverse = byteIndex;
  }

  

  this.__writeBit( bitIndex , bitValue  , _byteIndex , _bitIndexReverse );

  
}


writeBits( bitIndex : number , bitsValue : boolean[]  ) : void;
writeBits( bitIndex : number , bitsValue : boolean[] , byteIndex ? : number ) : void;
writeBits( bitIndex : number , bitsValue : boolean[] , bitIndexReverse ?  : boolean ) : void;
writeBits( bitIndex : number , bitsValue : boolean[] , byteIndex ? : number , bitIndexReverse ?  : boolean ) : void;

/**
 *  Set the value of a bits in a byte array.
 *  @param {number} bitIndex - Index of a bit in a byte array 0,1,2..
 *  @param {boolean[]} bitsValue 
 *  @param {number|boolean}  [byteIndex] - Index index of the starting byte(Default:0) or bitIndexReverse
 *  @param {boolean} [bitIndexReverse] - Bit numbering order (Default:this.bitIndexReverse)
 *  @see {@link writeBit}
*/
writeBits( bitIndex : number , bitsValue : boolean[] , byteIndex ? : number | boolean , bitIndexReverse ?  : boolean ) : void
{

  if( bitsValue.length == 0 )
   return;

  bitIndex = BBPacker.checkUI(bitIndex); 

 
  
  let _bitIndexReverse = this.bitIndexReverse;
  let _byteIndex = 0;

  if( typeof byteIndex == "number" )
  {
      _byteIndex = BBPacker.checkUI(byteIndex);
     
      if( typeof  bitIndexReverse == 'boolean' )
      {
         _bitIndexReverse = bitIndexReverse;
      }   
  }
  else if( typeof byteIndex == "boolean" )
  {
     _bitIndexReverse = byteIndex;
  }

  this.__valiateBitIndex(  bitIndex + ( bitsValue.length - 1 ) , _byteIndex  );   


  for( let bitValue of bitsValue  )
  {
    this.__writeBit( bitIndex , bitValue  , _byteIndex , _bitIndexReverse );
    bitIndex++;  
  }


}


readBit( bitIndex : number  ) : boolean;  
readBit( bitIndex : number , byteIndex ? : number ) : boolean;  
readBit( bitIndex : number , bitIndexReverse ?  : boolean  ) : boolean;  
readBit( bitIndex : number , byteIndex ? : number  , bitIndexReverse ?  : boolean  ) : boolean;  

/**
 *  Get the value of a bit in a byte array.
 *  @param {number} bitIndex - Index of a bit in a byte array 0,1,2..
 *  @param {number|boolean}  [byteIndex] - Index index of the starting byte(Default:0) or bitIndexReverse
 *  @param {boolean} [bitIndexReverse] - Bit numbering order (Default:this.bitIndexReverse)
 *  @return {boolean} - value
 *  @see {@link writeBit} 
*/
readBit( bitIndex : number , byteIndex ? : number | boolean , bitIndexReverse ?  : boolean  ) : boolean  
{

 
  bitIndex = BBPacker.checkUI(bitIndex);

  
  let _bitIndexReverse = this.bitIndexReverse;
  let _byteIndex = 0;

  if( typeof byteIndex == "number" )
  {
      _byteIndex = BBPacker.checkUI(byteIndex);
 
      if( typeof bitIndexReverse == 'boolean' )
      {
         _bitIndexReverse = bitIndexReverse;
      }
  }
  else if( typeof byteIndex == "boolean" )
  {
     _bitIndexReverse = byteIndex;
  }


 return this.__readBit( bitIndex  , _byteIndex , _bitIndexReverse );


}


readBits( bitIndex : number , bitsNumber : number  ) : boolean[];  
readBits( bitIndex : number , bitsNumber : number , byteIndex ? : number ) : boolean[];  
readBits( bitIndex : number , bitsNumber : number , bitIndexReverse ?  : boolean ) : boolean[];  
readBits( bitIndex : number , bitsNumber : number , byteIndex ? : number  , bitIndexReverse ?  : boolean ) : boolean[];  

/**
 *  Get the value of a bits in a byte array.
 *  @param {number} bitIndex - Index of a bit in a byte array 0,1,2..
 *  @param {number}  nBits - Number of bits to read
 *  @param {number|boolean}  [byteIndex] - Index index of the starting byte(Default:0) or bitIndexReverse
 *  @param {boolean} [bitIndexReverse] - Bit numbering order (Default:this.bitIndexReverse)
 *  @return {boolean[]} - Array of bit values  
 *  @see {@link writeBit} 
*/
readBits( bitIndex : number , nBits : number , byteIndex ? : number | boolean , bitIndexReverse ?  : boolean ) : boolean[]  
{

  bitIndex = BBPacker.checkUI(bitIndex);
  nBits = BBPacker.checkUI(nBits);

  let _bitIndexReverse = this.bitIndexReverse;
  let _byteIndex = 0;

  if( typeof byteIndex == "number" )
  {
      _byteIndex = BBPacker.checkUI(byteIndex);
 
      if( typeof bitIndexReverse == 'boolean' )
      {
         _bitIndexReverse = bitIndexReverse;
      }
  }
  else if( typeof byteIndex == "boolean" )
  {
     _bitIndexReverse = byteIndex;
  }


  if( nBits == 0 )
  {
     return [];
  }   

   let arr : boolean[] = new Array<boolean>(nBits);  

   for( let i = 0; i < nBits ; i++ , bitIndex++  )
   {
      arr[i] = this.__readBit( bitIndex  , _byteIndex , _bitIndexReverse ); 
   }

   return arr;
}


toBits(  word : number , bitIndex : number , nBits : number  ) : void;
toBits(  word : number , bitIndex : number , nBits : number , byteIndex ? : number ) : void;
toBits(  word : number , bitIndex : number , nBits : number , bitIndexReverse ?  : boolean ) : void;
toBits(  word : number , bitIndex : number , nBits : number , conf ? : { fromMSB : boolean , bitIndexReverse ?  : boolean  } ) : void;
toBits(  word : number , bitIndex : number , nBits : number , byteIndex ? : number , conf ? : { fromMSB : boolean , bitIndexReverse ?  : boolean  }) : void;
toBits(  word : number , bitIndex : number , nBits : number , byteIndex ? : number , bitIndexReverse ?  : boolean) : void;
/**
 *  Write a number to a bit field
 *  @param {number} word - Number to write 
 *  @param {number} bitIndex - Index of a bit in a byte array 0,1,2..
 *  @param {number} nBits - Number of  bits , MAX BBPacker.MAX_BITS_NUMBER
 *  @param {number|boolean|{fromMSB:boolean,bitIndexReverse?:boolean}}  [byteIndex] - Index index of the starting byte(Default:0) 
 *  or bitIndexReverse(boolean) or fromMSB(object) - true Write the parameter starting from the most significant bits 
 *  (Default : fromMSB = (bitIndexReverse) ? true : false )
 *  @param {boolean|{fromMSB:boolean,bitIndexReverse?:boolean}} [bitIndexReverse] - Bit numbering order (Default:this.bitIndexReverse)
 *  @example 
 * //     
 * //  bitIndexReverse = false:
 * //  fromMSB = false (Default):   
 * //  Before: 
 * //            [7]  [6]  [5]  [4]  [3]  [2]  [1] [0]
 * //             0    0    0    0    0    0    0   0        
 * //            [15] [14] [13] [12] [11] [10] [9] [8]
 * //              0   0    0    0    0    0    0   0
 * //
 * //  After: toBits(  0b1011 , 7 , 4 ) , fromBits(7 , 4) == 0b1011
 * //
 * //            [7]  [6]  [5]  [4]  [3]  [2]  [1] [0]
 * //             1    0    0    0    0    0    0   0        
 * //            [15] [14] [13] [12] [11] [10] [9] [8]
 * //              0   0    0    0    0    1    0   1
 * 
 * //  bitIndexReverse = false:
 * //  fromMSB = true:   
 * //  Before: 
 * //            [7]  [6]  [5]  [4]  [3]  [2]  [1] [0]
 * //             0    0    0    0    0    0    0   0        
 * //            [15] [14] [13] [12] [11] [10] [9] [8]
 * //              0   0    0    0    0    0    0   0
 * //
 * //  After: toBits(  0b1011 , 7 , 4 , { fromMSB : true } ) , fromBits(7 , 4 , { fromMSB : true }) == 0b1011
 * //
 * //            [7]  [6]  [5]  [4]  [3]  [2]  [1] [0]
 * //             1    0    0    0    0    0    0   0        
 * //            [15] [14] [13] [12] [11] [10] [9] [8]
 * //              0   0    0    0    0    1    1   0
 * 
 * // bitIndexReverse = true:
 * // fromMSB = true (Default):
 * // Before:
 * //            [0] [1] [2]  [3]  [4]  [5]  [6]  [7] 
 * //             0   0   0    0    0    0    0    0
 * //            [8] [9] [10] [11] [12] [13] [14] [15]
 * //             0   0   0    0    0    0    0    0
 * //
 * // After: toBits(  0b1011 , 7 , 4 ) , fromBits(7 , 4) == 0b1011
 * //  
 * //            [0] [1] [2]  [3]  [4]  [5]  [6]  [7] 
 * //             0   0   0    0    0    0    0    1
 * //            [8] [9] [10] [11] [12] [13] [14] [15]
 * //             0   1   1    0    0    0    0    0 
 *
 * // bitIndexReverse = true:
 * // fromMSB = false:
 * // Before:
 * //            [0] [1] [2]  [3]  [4]  [5]  [6]  [7] 
 * //             0   0   0    0    0    0    0    0
 * //            [8] [9] [10] [11] [12] [13] [14] [15]
 * //             0   0   0    0    0    0    0    0
 * //
 * // After: toBits(  0b1011 , 7 , 4 ,  { fromMSB : false } ) , fromBits(7 , 4 , { fromMSB : false }) == 0b1011
 * //  
 * //            [0] [1] [2]  [3]  [4]  [5]  [6]  [7] 
 * //             0   0   0    0    0    0    0    1
 * //            [8] [9] [10] [11] [12] [13] [14] [15]
 * //             1   0   1    0    0    0    0    0 
 *
 *
*/
toBits(  word : number , bitIndex : number , nBits : number , byteIndex ? : number | boolean | { fromMSB : boolean , bitIndexReverse ?  : boolean  } , bitIndexReverse ?  : boolean | { fromMSB : boolean , bitIndexReverse ?  : boolean  } ) : void
{

 
    bitIndex = BBPacker.checkUI(bitIndex);  
    nBits = BBPacker.checkUI(nBits); 

   if( nBits == 0 ) 
   {
     return;
   }


   if( nBits > BBPacker.MAX_BITS_NUMBER ) {
     throw new RangeError( "Overflow bitNumber" );
   } 


  let _bitIndexReverse = this.bitIndexReverse;
  let _byteIndex = 0;
  let _fromMSB = (_bitIndexReverse) ? true : false;

  if( typeof byteIndex == "number" )
  {
      _byteIndex = BBPacker.checkUI(byteIndex);
 
      if( typeof bitIndexReverse == 'boolean' )
      {
         _bitIndexReverse = bitIndexReverse;
         _fromMSB = (_bitIndexReverse) ? true : false;
      }
      else if( typeof bitIndexReverse?.fromMSB == 'boolean' )
      {
         _fromMSB = bitIndexReverse.fromMSB;

         if(  typeof bitIndexReverse.bitIndexReverse == 'boolean' )
         {
             _bitIndexReverse = bitIndexReverse.bitIndexReverse;            
         } 


      } 
  }
  else if( typeof byteIndex == "boolean" )
  {
     _bitIndexReverse = byteIndex;
     _fromMSB = (_bitIndexReverse) ? true : false;
  }
  else if( typeof byteIndex?.fromMSB == 'boolean' )
  {

         _fromMSB = byteIndex.fromMSB;

         if(  typeof byteIndex.bitIndexReverse == 'boolean' )
         {
             _bitIndexReverse = byteIndex.bitIndexReverse;
         } 

  }


   this.__valiateBitIndex(  bitIndex + ( nBits - 1 ) , _byteIndex  ); 
   
   
   let mask : number;
   
   if( _fromMSB ) 
   {
     
    mask = 1 << (nBits - 1);
   
    while(  nBits-- )
    {
      if( (word & mask) >>> 0  ) {

         this.__writeBit( bitIndex , true  , _byteIndex , _bitIndexReverse );
         
      }else {
        
        this.__writeBit( bitIndex , false  , _byteIndex , _bitIndexReverse );
      }
      
      bitIndex++;
      mask >>>= 1;
    }
     
     
     return;
   }
   
   
   mask = 1; 
   
    while(  nBits-- )
    {
      if( (word & mask) >>> 0  ) {
           this.__writeBit( bitIndex , true  , _byteIndex , _bitIndexReverse );
      }else {
           this.__writeBit( bitIndex , false  , _byteIndex , _bitIndexReverse );
      }
      
      bitIndex++;
      mask <<= 1;
    }
    
  
}


fromBits(  bitIndex : number , nBits : number  ) : number;
fromBits(  bitIndex : number , nBits : number  , byteIndex ? : number ) : number;
fromBits(  bitIndex : number , nBits : number  , bitIndexReverse ?  : boolean ) : number;
fromBits(  bitIndex : number , nBits : number  , byteIndex ? : number , bitIndexReverse ?  : boolean ) : number;
fromBits(  bitIndex : number , nBits : number  , conf ? : { fromMSB : boolean , bitIndexReverse ?  : boolean  } ) : number;
fromBits(  bitIndex : number , nBits : number  , byteIndex ? : number  , conf ? : { fromMSB : boolean , bitIndexReverse ?  : boolean  } ) : number;



/**
 *  Read a number from a bit field 
 *  @param {number} bitIndex - Index of a bit in a byte array 0,1,2..
 *  @param {number} nBits - Number of bits , MAX BBPacker.MAX_BITS_NUMBER
 *  @param {number|boolean|{fromMSB:boolean,bitIndexReverse?:boolean}}  [byteIndex] - Index index of the starting byte(Default:0) 
 *  or bitIndexReverse(boolean) or fromMSB(object) - true Read the parameter starting from the most significant bits
 * (Default : fromMSB = (bitIndexReverse) ? true : false )
 *  @param {boolean|{fromMSB:boolean,bitIndexReverse?:boolean}} [bitIndexReverse] - Bit numbering order (Default:this.bitIndexReverse)
 *  @return {number} - Bit sequence
 *  @see {@link toBits}  
*/
fromBits(  bitIndex : number , nBits : number  , byteIndex ? : number | boolean | { fromMSB : boolean , bitIndexReverse ?  : boolean  } , bitIndexReverse ?  : boolean | { fromMSB : boolean , bitIndexReverse ?  : boolean  } ) : number
{

  bitIndex = BBPacker.checkUI(bitIndex);
  nBits = BBPacker.checkUI(nBits);


   if( nBits == 0 ) 
   {
      return 0;
   }

   if( nBits > BBPacker.MAX_BITS_NUMBER ) {
     throw new RangeError( "Overflow bitNumber" );
   } 
 
  let _bitIndexReverse = this.bitIndexReverse;
  let _byteIndex = 0;
  let _fromMSB = (_bitIndexReverse) ? true : false;

  if( typeof byteIndex == "number" )
  {
      _byteIndex = BBPacker.checkUI(byteIndex);
 
      if( typeof bitIndexReverse == 'boolean' )
      {
         _bitIndexReverse = bitIndexReverse;
         _fromMSB = (_bitIndexReverse) ? true : false;
      }
      else if( typeof bitIndexReverse?.fromMSB == 'boolean' )
      {
         _fromMSB = bitIndexReverse.fromMSB;

         if(  typeof bitIndexReverse.bitIndexReverse == 'boolean' )
         {
             _bitIndexReverse = bitIndexReverse.bitIndexReverse;            
         } 


      } 
  }
  else if( typeof byteIndex == "boolean" )
  {
     _bitIndexReverse = byteIndex;
     _fromMSB = (_bitIndexReverse) ? true : false;
  }
  else if( typeof byteIndex?.fromMSB == 'boolean' )
  {

         _fromMSB = byteIndex.fromMSB;

         if(  typeof byteIndex.bitIndexReverse == 'boolean' )
         {
             _bitIndexReverse = byteIndex.bitIndexReverse;
         } 

  }


   let mask : number;
   let word : number = 0;
   let value: boolean; 
   
   if( _fromMSB  )
   {
   
     mask = 1 << (nBits - 1);
   
    while(  nBits-- )
    {
      
      value = this.__readBit( bitIndex  , _byteIndex , _bitIndexReverse );   

      if( value ) {
          word |= mask;        
      }      
      
      bitIndex++;
      mask >>>= 1;
    }
    
     return word >>> 0;
   }  

   
    
   mask = 1 ;
   
    while(  nBits-- )
    {
            
        
      value = this.__readBit( bitIndex  , _byteIndex , _bitIndexReverse );


      if( value ) {
          word |= mask;        
      }      
      
      bitIndex++;
     
        mask <<= 1;
    }
   
    
   return word >>> 0;  
}

/**
 *  Write UINT8 to array
 *  @param {number} index - Byte offset
 *  @param {number} value - UINT8 value
 */
writeU8( index : number , value: number   ) : void
{

   if( this.throwAtRangeOverflow )
   {
         BBPacker.validateU8( value , true );
   }

    this.$data.setUint8( index , value & 0xFF );

}

/**
 *  Write UINT8[] to array
 *  @param {number} index - Byte offset
 *  @param {number[]} value - UINT8[] value
 */
writeArrU8( index : number , value: number[]  ) : void
{

   index = BBPacker.checkUI( index ); 

   this._validateIndex( index + value.length );
   

   if( this.throwAtRangeOverflow )
   {
      for( let item of value   ) {
         BBPacker.validateU8( item , true );
      }

   }

       for( let item of value   ) {
         this.$data.setUint8( index , item & 0xFF );
         index += BBPacker.SIZE8;
       }

    
}

/**
 *  Write UINT8 to array by internal index with index post increment
 *  @param {number} value - UINT8 value
 */
putU8( value: number   ) : void
{
  this.writeU8( this.$index , value  );
  this.$index += BBPacker.SIZE8;
}

/**
 *  Write UINT8[] to array by internal index with index post increment
 *  @param {number[]} value - UINT8[] value
 */
putArrU8( value: number[]  )  : void
{
  this.writeArrU8( this.$index , value  );
  this.$index += value.length * BBPacker.SIZE8;

}


/**
 *  Read UINT8 from array
 *  @param {number} index - Byte offset
 *  @return {number} - UINT8 value
 */
readU8( index : number   ) : number
{  
   return this.$data.getUint8( index  );  
}

/**
 *  Read UINT8[] from array
 *  @param {number} index - Nyte offset
 *  @param {number} [N] - Number of elements , Default all elements 
 *  @return {number[]} - UINT8[] value
 */
readArrU8( index : number , N ? : number ) : number[]
{ 
   index = BBPacker.checkUI( index );

   let n : number; 
 
   if( typeof N == 'number'  )
   {
      n = BBPacker.checkUI(N);    
   }
   else {
          n = this._getNItems(BBPacker.SIZE8,index);

          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }
   } 



  
  const arr = new Array<number>(n);

 for( let i = 0; i < n ; i++   ) {
   arr[i] =  this.$data.getUint8( index );
   index += BBPacker.SIZE8;
 }

return arr; 

}


/**
 *  Read UINT8 from array by internal index with index post increment
 *  @return {number} - UINT8 value
 */
getU8( ) : number
{
  const value = this.readU8( this.$index  );
  this.$index += BBPacker.SIZE8;
  return value;
}

/**
 *  Read UINT8[] from array by internal index with index post increment
 *  @param {number} [N] - Number of elements , Default all elements
 *  @return {number[]} - UINT8[] value
 */
getArrU8( N ? : number ) : number[]
{
  const value = this.readArrU8( this.$index , N );
  this.$index += value.length * BBPacker.SIZE8;
  return value;
}


/**
 *  Write INT8 to array
 *  @param {number} index - Byte offset
 *  @param {number} value - INT8 value
 */
writeI8(  index : number , value: number   )  : void
{
   if( this.throwAtRangeOverflow )
   {
         BBPacker.validateI8( value , true );
   }

    this.$data.setInt8( index , value & 0xFF );

}

/**
 *  Write INT8[] to array
 *  @param {number} index - Byte offset
 *  @param {number[]} value - INT8[] value
 */
writeArrI8(  index : number , value:  number[]  )  : void
{

   index = BBPacker.checkUI( index );
   
   this._validateIndex( index + value.length );

  
   if( this.throwAtRangeOverflow )
   {

     for( let item of value   ) {
         BBPacker.validateI8(item,true);  
     }

   }


   for( let item of value   ) {
     this.$data.setInt8( index , item & 0xFF );
     index += BBPacker.SIZE8;
   }

}


/**
 *  Write INT8 to array by internal index with index post increment
 *  @param {number} value - INT8 value
 */
putI8( value: number   )  : void
{
  this.writeI8( this.$index , value  );
  this.$index += BBPacker.SIZE8;
}

/**
 *  Write INT8[] to array by internal index with index post increment
 *  @param {number[]} value - INT8[] value
 */
putArrI8( value:  number[]  )  : void
{
  this.writeArrI8( this.$index , value  );
  this.$index += value.length * BBPacker.SIZE8;
}


/**
 *  Read INT8 from array
 *  @param {number} index - Byte offset
 *  @return {number} - INT8 value
 */
readI8( index : number   ) : number
{     
   return this.$data.getInt8( index  );  
}

/**
 *  Read INT8[] from array
 *  @param {number} index - Nyte offset
 *  @param {number} [N] - Number of elements , Default all elements 
 *  @return {number[]} - INT8[] value
 */
readArrI8( index : number , N ? : number ) : number[]
{   
   index = BBPacker.checkUI( index );

   let n : number;

   if( typeof N == 'number' )
   {
       n = BBPacker.checkUI(N);
   }
   else {
           n = this._getNItems(BBPacker.SIZE8,index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

   }

  

  const arr = new Array<number>(n);

 for( let i = 0; i < n ; i++   ) {
   arr[i] =  this.$data.getInt8( index );
   index += BBPacker.SIZE8;
 }

return arr; 

}

/**
 *  Read INT8 from array by internal index with index post increment
 *  @return {number} - INT8 value
 */
getI8( ) : number
{
  const value = this.readI8( this.$index  );
  this.$index += BBPacker.SIZE8;
  return value;
}

/**
 *  Read INT8[] from array by internal index with index post increment
 *  @param {number} [N] - Number of elements , Default all elements
 *  @return {number[]} - UINT8[] value
 */
getArrI8( N ? : number ) : number[]
{
  const value = this.readArrI8( this.$index , N );
  this.$index += value.length * BBPacker.SIZE8;
  return value;
}


/**
 *  Write UINT16 to array
 *  @param {number} index - Byte offset
 *  @param {number} value - UINT16 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeU16( index : number , value: number , littleEndian ? : boolean )  : void
{

   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

  if( this.throwAtRangeOverflow )
   {
         BBPacker.validateU16( value , true );
   }

   this.$data.setUint16( index  , value & 0xFFFF , _littleEndian );

}

/**
 *  Write UINT16[] to array
 *  @param {number} index - Byte offset
 *  @param {number[]} value - UINT16[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeArrU16( index : number , value: number[] , littleEndian ? : boolean  )  : void
{
 
   index = BBPacker.checkUI( index );

   this._validateIndex( index + (value.length*BBPacker.SIZE16) );

   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   if( this.throwAtRangeOverflow )
   {
      for( let item of value   ) {
         BBPacker.validateU16(item,true); 
      }


   }


   for( let item of value   ) {
     this.$data.setUint16( index , item & 0xFFFF , _littleEndian );
     index += BBPacker.SIZE16;
   }


}

/**
 *  Write UINT16 to array by internal index with index post increment
 *  @param {number} value - UINT16 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putU16( value: number , littleEndian ? : boolean  )  : void
{
  this.writeU16( this.$index , value , littleEndian  );
  this.$index += BBPacker.SIZE16;
}

/**
 *  Write UINT16[] to array by internal index with index post increment
 *  @param {number[]} value - UINT16[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putArrU16( value:  number[] , littleEndian ? : boolean ) : void 
{
  this.writeArrU16( this.$index , value , littleEndian  );
  this.$index += value.length * BBPacker.SIZE16;
}

/**
 *  Read UINT16 from array
 *  @param {number} index - Byte offset
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - UINT16 value
 */
readU16( index : number , littleEndian ? : boolean  ) : number
{
   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 
     

   return this.$data.getUint16( index , _littleEndian );  
}


readArrU16( index : number , littleEndian ? : boolean ) : number[];
readArrU16( index : number , N ? : number ) : number[];
readArrU16( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]

/**
 *  Read UINT16[] from array
 *  @param {number} index - Nyte offset
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - UINT16[] value
 */
readArrU16( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]
{   
  index = BBPacker.checkUI( index );

  let _littleEndian = this.littleEndian;
  let n : number;

  if( typeof N == 'number' )
  {
     n = BBPacker.checkUI(N);

     if( typeof littleEndian == 'boolean' )
     {
        _littleEndian = littleEndian;
     }   

  }
  else if( typeof N == 'boolean' )
  {

        _littleEndian = N;

     n = this.getNumber16(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }
  else {
          n = this.getNumber16(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }



  const arr = new Array<number>(n);

 for( let i = 0; i < n ; i++   ) {
   arr[i] =  this.$data.getUint16( index ,_littleEndian);
   index += BBPacker.SIZE16;
 }

return arr; 

}

/**
 *  Read UINT16 from array by internal index with index post increment
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - UINT16 value
 */
getU16( littleEndian ? : boolean ) : number
{
  const value = this.readU16( this.$index , littleEndian  );
  this.$index += BBPacker.SIZE16;
  return value;
}

getArrU16( N ? : number ) : number[]
getArrU16( littleEndian ? : boolean ) : number[];
getArrU16( N ? : number | boolean  , littleEndian ? : boolean ) : number[];

/**
 *  Read UINT16[] from array by internal index with index post increment
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - UINT16[] value
 */
getArrU16( N ? : number | boolean  , littleEndian ? : boolean ) : number[]
{
  const value = this.readArrU16( this.$index , N , littleEndian );
  this.$index += value.length * BBPacker.SIZE16;
  return value;
}


/**
 *  Write INT16 to array
 *  @param {number} index - Byte offset
 *  @param {number} value - INT16 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeI16(  index : number , value: number , littleEndian ? : boolean  )  : void
{ 
   let _littleEndian = this.littleEndian;

     if( typeof littleEndian == 'boolean' )
     {
        _littleEndian = littleEndian;
     }   

   if( this.throwAtRangeOverflow )
   {
         BBPacker.validateI16( value , true );
   }

   this.$data.setInt16( index  , value & 0xFFFF , _littleEndian );

}

/**
 *  Write INT16[] to array
 *  @param {number} index - Byte offset
 *  @param {number[]} value - INT16[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeArrI16(  index : number , value: number[] , littleEndian ? : boolean )  : void
{

   let _littleEndian = this.littleEndian;

     if( typeof littleEndian == 'boolean' )
     {
        _littleEndian = littleEndian;
     }   

   index = BBPacker.checkUI( index );
   this._validateIndex( index + (value.length*BBPacker.SIZE16) );

  if( this.throwAtRangeOverflow )
  {
     for( let item of value   ) {
       BBPacker.validateI16(item,true);  
     }

  }


   for( let item of value   ) {
     this.$data.setInt16( index , item & 0xFFFF ,_littleEndian);
     index += BBPacker.SIZE16;
   }


}

/**
 *  Write INT16 to array by internal index with index post increment
 *  @param {number} value - INT16 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putI16( value: number  , littleEndian ? : boolean  )  : void
{
  this.writeI16( this.$index , value , littleEndian );
  this.$index += BBPacker.SIZE16;
}

/**
 *  Write INT16[] to array by internal index with index post increment
 *  @param {number[]} value - INT16[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putArrI16( value:  number[] , littleEndian ? : boolean  )  : void
{
  this.writeArrI16( this.$index , value , littleEndian );
  this.$index += value.length * BBPacker.SIZE16;
}

/**
 *  Read INT16 from array
 *  @param {number} index - Byte offset
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - INT16 value
 */
readI16( index : number , littleEndian ? : boolean  ) : number
{
   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   return this.$data.getInt16( index ,_littleEndian );  
}

readArrI16( index : number , littleEndian ? : boolean ) : number[];
readArrI16( index : number , N ? : number ) : number[];
readArrI16( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]

/**
 *  Read INT16[] from array
 *  @param {number} index - Nyte offset
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - INT16[] value
 */
readArrI16( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]
{   
 
  index = BBPacker.checkUI( index );

  let n : number;
  let _littleEndian = this.littleEndian;

  if( typeof N == 'number' )
  {
     n = BBPacker.checkUI(N);

     if( typeof littleEndian == 'boolean' )
     {
        _littleEndian = littleEndian;
     }   

  }
  else if( typeof N == 'boolean' )
  {

        _littleEndian = N;

     n = this.getNumber16(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }
  else {
          n = this.getNumber16(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }

  const arr = new Array<number>(n);

 for( let i = 0; i < n ; i++   ) {
   arr[i] =  this.$data.getInt16( index ,_littleEndian);
   index += BBPacker.SIZE16;
 }

return arr; 

}

/**
 *  Read INT16 from array by internal index with index post increment
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - INT16 value
 */
getI16(  littleEndian ? : boolean ) : number
{
  const value = this.readI16( this.$index , littleEndian  );
  this.$index += BBPacker.SIZE16;
  return value;
}

getArrI16( N ? : number ) : number[]
getArrI16( littleEndian ? : boolean ) : number[];
getArrI16( N ? : number | boolean  , littleEndian ? : boolean ) : number[];

/**
 *  Read INT16[] from array by internal index with index post increment
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - INT16[] value
 */
getArrI16(  N ? : number | boolean  , littleEndian ? : boolean ) : number[]
{
  const value = this.readArrI16( this.$index , N , littleEndian);
  this.$index += BBPacker.SIZE16;
  return value;
}


/**
 *  Write UINT32 to array
 *  @param {number} index - Byte offset
 *  @param {number} value - UINT32 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeU32(index : number , value: number , littleEndian ? : boolean) : void 
{
 let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   if( this.throwAtRangeOverflow )
   {
         BBPacker.validateU32( value , true );
   }

   this.$data.setUint32( index  , value >>> 0 , _littleEndian );

}

/**
 *  Write UINT32[] to array
 *  @param {number} index - Byte offset
 *  @param {number[]} value - UINT32[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeArrU32(index : number , value: number[], littleEndian ? : boolean) : void 
{

   index = BBPacker.checkUI( index );
   this._validateIndex( index + (value.length*BBPacker.SIZE32) );
 
   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   if( this.throwAtRangeOverflow  )
   {
     for( let item of value   ) {
        BBPacker.validateU32(item,true);
     }

   }

   for( let item of value   ) {
     this.$data.setUint32( index , item >>> 0 ,_littleEndian);
     index += BBPacker.SIZE32;
   }


}

/**
 *  Write UINT32 to array by internal index with index post increment
 *  @param {number} value - UINT32 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putU32( value: number  , littleEndian ? : boolean) : void 
{
  this.writeU32( this.$index , value , littleEndian );
  this.$index += BBPacker.SIZE32;
}

/**
 *  Write UINT32[] to array by internal index with index post increment
 *  @param {number[]} value - UINT32[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putArrU32( value:  number[] , littleEndian ? : boolean ) : void 
{
  this.writeArrU32( this.$index , value , littleEndian );
  this.$index += value.length * BBPacker.SIZE32;
}


/**
 *  Read UINT32 from array
 *  @param {number} index - Byte offset
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - UINT32 value
 */
readU32( index : number , littleEndian ? : boolean  ) : number
{
   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   index = BBPacker.checkUI( index );
   return this.$data.getUint32( index  ,_littleEndian);  
}

readArrU32( index : number , littleEndian ? : boolean ) : number[];
readArrU32( index : number , N ? : number ) : number[];
readArrU32( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]

/**
 *  Read UINT32[] from array
 *  @param {number} index - Nyte offset
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - UINT32[] value
 */
readArrU32( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]
{   
 
  index = BBPacker.checkUI( index );

  let n : number;
  let _littleEndian = this.littleEndian;

 if( typeof N == 'number' )
  {
     n = BBPacker.checkUI(N);

     if( typeof littleEndian == 'boolean' )
     {
        _littleEndian = littleEndian;
     }   

  }
  else if( typeof N == 'boolean' )
  {

        _littleEndian = N;

     n = this.getNumber32(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }
  else {
          n = this.getNumber32(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }


  const arr = new Array<number>(n);

 for( let i = 0; i < n ; i++   ) {
   arr[i] =  this.$data.getUint32( index ,_littleEndian);
   index += BBPacker.SIZE32;
 }

return arr; 

}

/**
 *  Read UINT32 from array by internal index with index post increment
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - UINT32 value
 */
getU32( littleEndian ? : boolean ) : number
{
  const value = this.readU32( this.$index , littleEndian );
  this.$index += BBPacker.SIZE32;
  return  value;
}

getArrU32( N ? : number ) : number[]
getArrU32( littleEndian ? : boolean ) : number[];
getArrU32( N ? : number | boolean  , littleEndian ? : boolean ) : number[];

/**
 *  Read UINT32[] from array by internal index with index post increment
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - UINT32[] value
 */
getArrU32( N ? : number | boolean  , littleEndian ? : boolean ) : number[]
{
  const value = this.readArrU32( this.$index , N , littleEndian );
  this.$index += value.length * BBPacker.SIZE32;
  return value;
}

/**
 *  Write INT32 to array
 *  @param {number} index - Byte offset
 *  @param {number} value - INT32 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeI32(index : number , value: number , littleEndian ? : boolean) : void 
{
   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   if( this.throwAtRangeOverflow )
   {
         BBPacker.validateI32( value , true );
   }

   this.$data.setInt32( index  , value >>> 0 , _littleEndian );

}

/**
 *  Write INT32[] to array
 *  @param {number} index - Byte offset
 *  @param {number[]} value - UINT32[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */

writeArrI32(index : number , value: number[] , littleEndian ? : boolean) : void 
{

   index = BBPacker.checkUI( index );
   this._validateIndex( index + (value.length*BBPacker.SIZE32) );

   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   if( this.throwAtRangeOverflow )
   {
     for( let item of value   ) {
       BBPacker.validateI32(item,true);
     }

   }

   for( let item of value   ) {
     
     this.$data.setInt32( index , item >>> 0 ,_littleEndian);
     index += BBPacker.SIZE32;
   }


}

/**
 *  Write INT32 to array by internal index with index post increment
 *  @param {number} value - INT32 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putI32( value: number , littleEndian ? : boolean  ) : void 
{
  this.writeI32( this.$index , value , littleEndian );
  this.$index += BBPacker.SIZE32;
}


/**
 *  Write INT32[] to array by internal index with index post increment
 *  @param {number[]} value - INT32[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putArrI32( value: number[] , littleEndian ? : boolean ) : void 
{
  this.writeArrI32( this.$index , value , littleEndian );
  this.$index += value.length * BBPacker.SIZE32;
}


/**
 *  Read INT32 from array
 *  @param {number} index - Byte offset
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - INT32 value
 */
readI32( index : number , littleEndian ? : boolean   ) : number
{
   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   return this.$data.getInt32( index  ,_littleEndian);  
}


readArrI32( index : number , littleEndian ? : boolean ) : number[];
readArrI32( index : number , N ? : number ) : number[];
readArrI32( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]

/**
 *  Read INT32[] from array
 *  @param {number} index - Nyte offset
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - INT32[] value
 */
readArrI32( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]
{   

  index = BBPacker.checkUI( index );

  let n : number;
  let _littleEndian = this.littleEndian;

  if( typeof N == 'number' )
  {
     n = BBPacker.checkUI(N);

     if( typeof littleEndian == 'boolean' )
     {
        _littleEndian = littleEndian;
     }   

  }
  else if( typeof N == 'boolean' )
  {

        _littleEndian = N;

     n = this.getNumber32(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }
  else {
          n = this.getNumber32(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }

  const arr = new Array<number>(n);

 for( let i = 0; i < n ; i++   ) {
   arr[i] =  this.$data.getInt32( index ,_littleEndian);
   index += BBPacker.SIZE32;
 }

return arr; 

}

/**
 *  Read INT32 from array by internal index with index post increment
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - INT32 value
 */
getI32(littleEndian ? : boolean ) : number
{
  const value = this.readI32( this.$index , littleEndian );
  this.$index += BBPacker.SIZE32;
  return value;
}

getArrI32( N ? : number ) : number[]
getArrI32( littleEndian ? : boolean ) : number[];
getArrI32( N ? : number | boolean  , littleEndian ? : boolean ) : number[];

/**
 *  Read INT32[] from array by internal index with index post increment
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - INT32[] value
 */
getArrI32( N ? : number | boolean  , littleEndian ? : boolean ) : number[]
{
  const value = this.readArrI32( this.$index , N , littleEndian);
  this.$index += value.length * BBPacker.SIZE32;
  return value;
}


//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/**
 *  Write UINT64 to array
 *  @param {number} index - Byte offset
 *  @param {{ hi : number , lo : number }} value - UINT64 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */

writeU64( index : number , value: { hi : number , lo : number } , littleEndian ? : boolean )  : void
{

   index = BBPacker.checkUI( index );

   this._validateIndex( index + BBPacker.SIZE64 );

   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 
 
   if( this.throwAtRangeOverflow )
   {
         BBPacker.validateU64( value , true );
   }
  

   if( _littleEndian == true )
   {
        this.$data.setUint32( index  , value.lo >>> 0 , _littleEndian );
        this.$data.setUint32( index + BBPacker.SIZE32  , value.hi >>> 0, _littleEndian );
   }
   else {
        this.$data.setUint32( index  , value.hi >>> 0 , _littleEndian );
        this.$data.setUint32( index + BBPacker.SIZE32  , value.lo >>> 0 , _littleEndian );
   }



}

/**
 *  Write UINT64[] to array
 *  @param {number} index - Byte offset
 *  @param {{ hi : number , lo : number }[]} value - UINT64[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeArrU64( index : number , value: { hi : number , lo : number }[] , littleEndian ? : boolean  )  : void
{
 
   index = BBPacker.checkUI( index );
   this._validateIndex( index + (value.length*BBPacker.SIZE64) );

   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   if( this.throwAtRangeOverflow )
   {
     for( let item of value   ) {
         BBPacker.validateU64(item,true); 
     }

   }

   for( let item of value   ) {

      if( _littleEndian == true )
      {
           this.$data.setUint32( index  , item.lo >>> 0 , _littleEndian );
           this.$data.setUint32( index + BBPacker.SIZE32  , item.hi >>> 0 , _littleEndian );
      }
      else {
              this.$data.setUint32( index  , item.hi >>> 0 , _littleEndian );
              this.$data.setUint32( index + BBPacker.SIZE32  , item.lo >>> 0 , _littleEndian );
           }

      index += BBPacker.SIZE64;
   }


}

/**
 *  Write UINT64 to array by internal index with index post increment
 *  @param {{ hi : number , lo : number }} value - UINT64 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putU64( value: { hi : number , lo : number } , littleEndian ? : boolean  )  : void
{
  this.writeU64( this.$index , value , littleEndian  );
  this.$index += BBPacker.SIZE64;
}

/**
 *  Write UINT64[] to array by internal index with index post increment
 *  @param {{ hi : number , lo : number }[]} value - UINT64[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putArrU64( value:  { hi : number , lo : number }[] , littleEndian ? : boolean ) : void 
{
  this.writeArrU64( this.$index , value , littleEndian  );
  this.$index += value.length * BBPacker.SIZE64;
}

/**
 *  Read UINT64 from array
 *  @param {number} index - Byte offset
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {{ hi : number , lo : number }} - UINT64 value
 */
readU64( index : number , littleEndian ? : boolean  ) : { hi : number , lo : number }
{

   index = BBPacker.checkUI( index );

   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 
     
   let value = { hi : 0 , lo : 0  }

   if( _littleEndian == true )
   {
       value.lo = this.$data.getUint32( index  , _littleEndian );
       value.hi = this.$data.getUint32( index + BBPacker.SIZE32  , _littleEndian );
   }
   else {
       value.hi = this.$data.getUint32( index  , littleEndian );
       value.lo = this.$data.getUint32( index + BBPacker.SIZE32  , littleEndian );
   }


   return value;  
}


readArrU64( index : number , littleEndian ? : boolean ) : { hi : number , lo : number }[];
readArrU64( index : number , N ? : number ) : { hi : number , lo : number }[];
readArrU64( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : { hi : number , lo : number }[]

/**
 *  Read UINT64[] from array
 *  @param {number} index - Nyte offset
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {{ hi : number , lo : number }[]} - UINT64[] value
 */
readArrU64( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : { hi : number , lo : number }[]
{   
  index = BBPacker.checkUI( index );

  let _littleEndian = this.littleEndian;
  let n : number;

  if( typeof N == 'number' )
  {
     n = BBPacker.checkUI(N);

     if( typeof littleEndian == 'boolean' )
     {
        _littleEndian = littleEndian;
     }   

  }
  else if( typeof N == 'boolean' )
  {

        _littleEndian = N;

     n = this.getNumber64(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }
  else {
          n = this.getNumber64(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }



  const arr = new Array<{ hi : number , lo : number }>(n);

 for( let i = 0; i < n ; i++   ) {
   arr[i] = this.readU64( index , _littleEndian  );
   index += BBPacker.SIZE64;
 }

return arr; 

}

/**
 *  Read UINT64 from array by internal index with index post increment
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {{ hi : number , lo : number }} - UINT64 value
 */
getU64( littleEndian ? : boolean ) : { hi : number , lo : number }
{
  const value = this.readU64( this.$index , littleEndian  );
  this.$index += BBPacker.SIZE64;
  return value;
}

getArrU64( N ? : number ) : { hi : number , lo : number }[]
getArrU64( littleEndian ? : boolean ) : { hi : number , lo : number }[];
getArrU64( N ? : number | boolean  , littleEndian ? : boolean ) : { hi : number , lo : number }[];

/**
 *  Read UINT64[] from array by internal index with index post increment
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {{ hi : number , lo : number }[]} - UINT64[] value
 */
getArrU64( N ? : number | boolean  , littleEndian ? : boolean ) : { hi : number , lo : number }[]
{
  const value = this.readArrU64( this.$index , N , littleEndian );
  this.$index += value.length * BBPacker.SIZE64;
  return value;
}



/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/**
 *  Write INT64 to array
 *  @param {number} index - Byte offset
 *  @param {{ hi : number , lo : number }} value - INT64 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeI64( index : number , value: { hi : number , lo : number } , littleEndian ? : boolean )  : void
{

   index = BBPacker.checkUI( index );
   
   this._validateIndex( index + BBPacker.SIZE64 );

   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 
 
   if( this.throwAtRangeOverflow )
   {
         BBPacker.validateI64( value , true );
   }
  

   if( _littleEndian == true )
   {
        this.$data.setUint32( index  , value.lo >>> 0 , _littleEndian );
        this.$data.setInt32( index + BBPacker.SIZE32  , value.hi >>> 0 , _littleEndian );
   }
   else {
        this.$data.setInt32( index  , value.hi >>> 0 , _littleEndian );
        this.$data.setUint32( index + BBPacker.SIZE32 , value.lo >>> 0 , _littleEndian );
   }



}

/**
 *  Write INT64[] to array
 *  @param {number} index - Byte offset
 *  @param {{ hi : number , lo : number }[]} value - INT64[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeArrI64( index : number , value: { hi : number , lo : number }[] , littleEndian ? : boolean  )  : void
{
 
   index = BBPacker.checkUI( index );
   this._validateIndex( index + (value.length*BBPacker.SIZE64) );

   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 


   if( this.throwAtRangeOverflow )
   {
      for( let item of value   ) {
         BBPacker.validateI64(item,true);
     }

   }

   for( let item of value   ) {

      if( _littleEndian == true )
      {
           this.$data.setUint32( index  , item.lo >>> 0, _littleEndian );
           this.$data.setInt32( index + BBPacker.SIZE32  , item.hi >>> 0 , _littleEndian );
      }
      else {
            this.$data.setInt32( index  , item.hi >>> 0 , _littleEndian );
            this.$data.setUint32( index + BBPacker.SIZE32 , item.lo >>> 0 , _littleEndian );
           }

      index += BBPacker.SIZE64;
   }


}

/**
 *  Write INT64 to array by internal index with index post increment
 *  @param {{ hi : number , lo : number }} value - INT64 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putI64( value: { hi : number , lo : number } , littleEndian ? : boolean  )  : void
{
  this.writeI64( this.$index , value , littleEndian  );
  this.$index += BBPacker.SIZE64;
}


/**
 *  Write INT64[] to array by internal index with index post increment
 *  @param {{ hi : number , lo : number }[]} value - INT64[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putArrI64( value:  { hi : number , lo : number }[] , littleEndian ? : boolean ) : void 
{
  this.writeArrI64( this.$index , value , littleEndian  );
  this.$index += value.length * BBPacker.SIZE64;
}

/**
 *  Read INT64 from array
 *  @param {number} index - Byte offset
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {{ hi : number , lo : number }} - INT64 value
 */
readI64( index : number , littleEndian ? : boolean  ) : { hi : number , lo : number }
{

   index = BBPacker.checkUI( index );

   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 
     
   let value = { hi : 0 , lo : 0  }

   if( _littleEndian == true )
   {
       value.lo = this.$data.getUint32( index  , _littleEndian );
       value.hi = this.$data.getInt32( index + BBPacker.SIZE32  , _littleEndian );
   }
   else {
       value.hi = this.$data.getInt32( index  , littleEndian );
       value.lo = this.$data.getUint32( index + BBPacker.SIZE32  , littleEndian );
   }


   return value;  
}


readArrI64( index : number , littleEndian ? : boolean ) : { hi : number , lo : number }[];
readArrI64( index : number , N ? : number ) : { hi : number , lo : number }[];
readArrI64( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : { hi : number , lo : number }[]

/**
 *  Read INT64[] from array
 *  @param {number} index - Nyte offset
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {{ hi : number , lo : number }[]} - INT64[] value
 */
readArrI64( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : { hi : number , lo : number }[]
{   
  index = BBPacker.checkUI( index );

  let _littleEndian = this.littleEndian;
  let n : number;

  if( typeof N == 'number' )
  {
     n = BBPacker.checkUI(N);

     if( typeof littleEndian == 'boolean' )
     {
        _littleEndian = littleEndian;
     }   

  }
  else if( typeof N == 'boolean' )
  {

        _littleEndian = N;

     n = this.getNumber64(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }
  else {
          n = this.getNumber64(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }



  const arr = new Array<{ hi : number , lo : number }>(n);

 for( let i = 0; i < n ; i++   ) {
   arr[i] = this.readI64( index , _littleEndian  );
   index += BBPacker.SIZE64;
 }

return arr; 

}

/**
 *  Read INT64 from array by internal index with index post increment
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {{ hi : number , lo : number }} - INT64 value
 */
getI64( littleEndian ? : boolean ) : { hi : number , lo : number }
{
  const value = this.readI64( this.$index , littleEndian  );
  this.$index += BBPacker.SIZE64;
  return value;
}

getArrI64( N ? : number ) : { hi : number , lo : number }[]
getArrI64( littleEndian ? : boolean ) : { hi : number , lo : number }[];
getArrI64( N ? : number | boolean  , littleEndian ? : boolean ) : { hi : number , lo : number }[];

/**
 *  Read INT64[] from array by internal index with index post increment
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {{ hi : number , lo : number }[]} - INT64[] value
 */
getArrI64( N ? : number | boolean  , littleEndian ? : boolean ) : { hi : number , lo : number }[]
{
  const value = this.readArrI64( this.$index , N , littleEndian );
  this.$index += value.length * BBPacker.SIZE64;
  return value;
}



//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/**
 *  Write FLOAT32 to array
 *  @param {number} index - Byte offset
 *  @param {number} value - FLOAT32 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeF32(index : number , value: number , littleEndian ? : boolean) : void 
{
   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   this.$data.setFloat32( index  , value , _littleEndian );

}

/**
 *  Write FLOAT32[] to array
 *  @param {number} index - Byte offset
 *  @param {number[]} value - FLOAT32[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeArrF32(index : number , value:  number[], littleEndian ? : boolean) : void 
{
   index = BBPacker.checkUI( index );
   this._validateIndex( index + (value.length*BBPacker.SIZE32) );
   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   for( let item of value   ) {
     
     this.$data.setFloat32( index , item ,_littleEndian);
     index += BBPacker.SIZE32;
   }

}

/**
 *  Write FLOAT32 to array by internal index with index post increment
 *  @param {number} value - FLOAT32 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putF32( value: number , littleEndian ? : boolean  ) : void 
{
  this.writeF32( this.$index , value , littleEndian );
  this.$index += BBPacker.SIZE32;
}

/**
 *  Write FLOAT32[] to array by internal index with index post increment
 *  @param {number[]} value - FLOAT32[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putArrF32( value:  number[] , littleEndian ? : boolean ) : void 
{
  this.writeArrF32( this.$index , value , littleEndian  );
  this.$index += value.length * BBPacker.SIZE32;
}

/**
 *  Read FLOAT32 from array
 *  @param {number} index - Byte offset
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - FLOAT32 value
 */
readF32( index : number  , littleEndian ? : boolean ) : number
{
   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   return this.$data.getFloat32( index ,_littleEndian );  
}

readArrF32( index : number , littleEndian ? : boolean ) : number[];
readArrF32( index : number , N ? : number ) : number[];
readArrF32( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]

/**
 *  Read FLOAT32[] from array
 *  @param {number} index - Nyte offset
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - FLOAT32[] value
 */
readArrF32( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]
{   

  index = BBPacker.checkUI( index );

  let n : number;
  let _littleEndian = this.littleEndian;

 if( typeof N == 'number' )
  {
     n = BBPacker.checkUI(N);

     if( typeof littleEndian == 'boolean' )
     {
        _littleEndian = littleEndian;
     }   

  }
  else if( typeof N == 'boolean' )
  {

        _littleEndian = N;

     n = this.getNumber32(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }
  else {
          n = this.getNumber32(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }

  const arr = new Array<number>(n);

 for( let i = 0; i < n ; i++   ) {
   arr[i] =  this.$data.getFloat32( index ,_littleEndian);
   index += BBPacker.SIZE32;
 }

return arr; 

}

/**
 *  Read FLOAT32 from array by internal index with index post increment
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - FLOAT32 value
 */
getF32(  littleEndian ? : boolean ) : number
{
  const value = this.readF32( this.$index , littleEndian );
  this.$index += BBPacker.SIZE32;
  return value;
}

getArrF32( N ? : number ) : number[]
getArrF32( littleEndian ? : boolean ) : number[];
getArrF32( N ? : number | boolean  , littleEndian ? : boolean ) : number[];

/**
 *  Read FLOAT32[] from array by internal index with index post increment
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - FLOAT32[] value
 */
getArrF32( N ? : number | boolean  , littleEndian ? : boolean ) : number[]
{
  const value = this.readArrF32( this.$index , N , littleEndian);
  this.$index += value.length * BBPacker.SIZE32;
  return value;
}


/**
 *  Write FLOAT64 to array
 *  @param {number} index - Byte offset
 *  @param {number} value - FLOAT64 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */

writeF64(index : number , value: number , littleEndian ? : boolean) : void  
{
   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   this.$data.setFloat64( index  , value , _littleEndian );

}

/**
 *  Write FLOAT64[] to array
 *  @param {number} index - Byte offset
 *  @param {number[]} value - FLOAT64[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
writeArrF64(index : number , value: number[], littleEndian ? : boolean) : void  
{

   index = BBPacker.checkUI( index );
   this._validateIndex( index + (value.length*BBPacker.SIZE64) );

   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   for( let item of value   ) {
     this.$data.setFloat64( index , item ,_littleEndian);
     index += BBPacker.SIZE64;
   }


}

/**
 *  Write FLOAT64 to array by internal index with index post increment
 *  @param {number} value - FLOAT64 value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putF64( value: number , littleEndian ? : boolean )  : void
{
  this.writeF64( this.$index , value , littleEndian );
  this.$index += BBPacker.SIZE64;
}

/**
 *  Write FLOAT64[] to array by internal index with index post increment
 *  @param {number[]} value - FLOAT64[] value
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 */
putArrF64( value:  number[] , littleEndian ? : boolean ) : void 
{
  this.writeArrF64( this.$index , value , littleEndian );
  this.$index += value.length * BBPacker.SIZE64;
}

/**
 *  Read FLOAT64 from array
 *  @param {number} index - Byte offset
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - FLOAT64 value
 */
readF64( index : number , littleEndian ? : boolean  ) : number
{
   let _littleEndian = this.littleEndian;

   if( typeof littleEndian == 'boolean' )
   {
      _littleEndian = littleEndian;
   } 

   return this.$data.getFloat64( index ,_littleEndian );  
}

readArrF64( index : number , littleEndian ? : boolean ) : number[];
readArrF64( index : number , N ? : number ) : number[];
readArrF64( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]

/**
 *  Read FLOAT64[] from array
 *  @param {number} index - Nyte offset
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - FLOAT64[] value
 */
readArrF64( index : number , N ? : number | boolean ,  littleEndian ? : boolean ) : number[]
{   


  index = BBPacker.checkUI( index );

  let n : number;
  let _littleEndian = this.littleEndian;

  if( typeof N == 'number' )
  {
     n = BBPacker.checkUI(N);

     if( typeof littleEndian == 'boolean' )
     {
        _littleEndian = littleEndian;
     }   

  }
  else if( typeof N == 'boolean' )
  {

        _littleEndian = N;

     n = this.getNumber64(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }
  else {
          n = this.getNumber64(index);
          if( n == 0)
          {
             throw new RangeError("Number of elements = 0");
          }

  }

  const arr = new Array<number>(n);

 for( let i = 0; i < n ; i++   ) {
   arr[i] =  this.$data.getFloat64( index ,_littleEndian);
   index += BBPacker.SIZE64;
 }

return arr; 

}

/**
 *  Read FLOAT64 from array by internal index with index post increment
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian)
 *  @return {number} - FLOAT64 value
 */
getF64( littleEndian ? : boolean ) : number
{
  const value = this.readF64( this.$index , littleEndian );
  this.$index += BBPacker.SIZE64;
  return value;
}

getArrF64( N ? : number ) : number[]
getArrF64( littleEndian ? : boolean ) : number[];
getArrF64( N ? : number | boolean  , littleEndian ? : boolean ) : number[];

/**
 *  Read FLOAT64[] from array by internal index with index post increment
 *  @param {number|boolean} [N] - Number of elements (Default all elements)  or pack order (Default this.littleEndian) 
 *  @param {boolean} [littleEndian] - Pack order(Default this.littleEndian) 
 *  @return {number[]} - FLOAT64[] value
 */
getArrF64( N ? : number | boolean  , littleEndian ? : boolean ) : number[]
{
  const value = this.readArrF64( this.$index , N , littleEndian);
  this.$index += value.length * BBPacker.SIZE64;
  return value;
}

static validateU8(  value : number , throwAtRangeOverflow ? : boolean ) : boolean
{
 
  if( value > BBPacker.MAX_UINT8 ) {

       if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
             throw new RangeError("UINT8 upper value range");
          }   
       }    

      return false; 
  }
  else if( value < BBPacker.MIN_UINT8 ) {
       if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
                  throw new RangeError("UINT8 lower value range");
          }   
       }    

    return false;  
 }

 return true; 

} 

static validateI8(  value : number , throwAtRangeOverflow ? : boolean  ) : boolean
{

 if( value > BBPacker.MAX_INT8 ){
      if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
             throw new RangeError("INT8 upper value range");
          }   
       }    

    return false;

 }else if( value < BBPacker.MIN_INT8 ){

     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
             throw new RangeError("INT8 lower value range");
          }   
       }    

    return false; 
    
 }

 return true;

}



static validateU16( value : number , throwAtRangeOverflow ? : boolean ) : boolean
{

 if( value > BBPacker.MAX_UINT16 ){
      if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
              throw new RangeError("UINT16 upper value range");
          }   
       }    

   return false; 
 }else if( value < BBPacker.MIN_UINT16 ) {
      if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
              throw new RangeError("UINT16 lower value range");
          }   
       }    

   return false; 
   
 }

  return true;
}


static validateI16( value : number, throwAtRangeOverflow ? : boolean ) : boolean
{

 if( value > BBPacker.MAX_INT16 ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
              throw new RangeError("INT16 upper value range");
          }   
       }    

    return false;
 }else if( value < BBPacker.MIN_INT16 ) {
      if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
               throw new RangeError("INT16 lower value range");
          }   
       }    

    return false;
 }


  return true;
}



static validateU32( value : number , throwAtRangeOverflow ? : boolean ) : boolean
{



 if( value > BBPacker.MAX_UINT32 ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
               throw new RangeError("UINT32 upper value range");
          }   
       }    

    return false;   
 }else if( value < BBPacker.MIN_UINT32 ) {

     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
             throw new RangeError("UINT32 lower value range");
          }   
       }    
  
    return false;
 }

   return true;
}


static validateI32( value : number, throwAtRangeOverflow ? : boolean ) : boolean  
{

 if( value > BBPacker.MAX_INT32 ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
                throw new RangeError("INT32 upper value range");
          }   
       }    

    return false;   

   
 }else if( value < BBPacker.MIN_INT32 ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
              throw new RangeError("INT32 lower value range");
          }   
       }    

    return false;   

   
 }

  return true;
}

static validateU64( value : { hi : number , lo : number } , throwAtRangeOverflow ? : boolean ) : boolean
{



 if( value.hi > BBPacker.MAX_UINT64_HI ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
                 throw new RangeError("UINT64 hi upper value range");
          }   
       }    

    return false;   

 }else if( value.hi < BBPacker.MIN_UINT64_HI ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
               throw new RangeError("UINT64 hi lower value range");
          }   
       }    

    return false;   
  
 }

 if( value.lo > BBPacker.MAX_UINT64_LO ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
                 throw new RangeError("UINT64 lo upper value range");
          }   
       }    

    return false;   
   
 }else if( value.lo < BBPacker.MIN_UINT64_LO ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
                throw new RangeError("UINT64 lo lower value range");
          }   
       }    

    return false;   

  
 }

 return true;
   
}

static validateI64( value : { hi : number , lo : number } , throwAtRangeOverflow ? : boolean ) : boolean
{



 if( value.hi > BBPacker.MAX_INT64_HI ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
                 throw new RangeError("INT64 hi upper value range");
          }   
       }    

    return false;   

    
 }else if( value.hi < BBPacker.MIN_INT64_HI ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
                 throw new RangeError("INT64 hi lower value range");
          }   
       }    

    return false;   

  
 }

 if( value.lo > BBPacker.MAX_INT64_LO ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
                 throw new RangeError("INT64 lo upper value range");
          }   
       }    

    return false;   

    
 }else if( value.lo < BBPacker.MIN_INT64_LO ) {
     if( typeof throwAtRangeOverflow == 'boolean'  )
       {
          if( throwAtRangeOverflow == true  )
          {
                 throw new RangeError("INT64 lo lower value range");
          }   
       }    

    return false;   

 
 }

 return true;
   
}



 static checkUI( arg : number ) : number
  {

     if( arg > BBPacker.MAX_UINT_ARG )
     {

        throw new RangeError(`Integer argument > 0x${BBPacker.MAX_UINT_ARG.toString(16)}`);
     }  

     arg = Math.floor(arg); 

     if( arg < 0 )
     {
        throw new RangeError("Negative integer argument");
     }

     return arg;
  }



private $buffer! : ArrayBuffer;
private $data!: DataView;
private $index: number = 0;


private _setConf( conf?:BBPacker.Conf ) : void
{
 

  if(  typeof(conf?.index) == 'number'  )
  {
     let index : number = conf.index;
       
     index = BBPacker.checkUI( index );

     this.$index = index; 
  }

  if( typeof(conf?.littleEndian) == 'boolean' )
  {
     this.littleEndian = conf.littleEndian;
  }

  if( typeof(conf?.bitIndexReverse) == 'boolean' )
  {
     this.bitIndexReverse = conf.bitIndexReverse;
  }

  if( typeof(conf?.throwAtRangeOverflow) == 'boolean' )
  {
     this.throwAtRangeOverflow = conf.throwAtRangeOverflow;
  }


}



private _validateSetupIndex( index : number , itemSize  : number ) : number
{

  index = BBPacker.checkUI( index );
 
  index =  (index * itemSize);

 

 if(  (index + itemSize) > this.$buffer.byteLength )
 {
   throw new RangeError("Index out of range");
 }  

 return index;


}


private _validateIndex( index : number  ) : number
{

  index = BBPacker.checkUI( index );
 


   if(  index > this.$buffer.byteLength )
   {
      throw new RangeError("Index out of range");
   }  


   return index;


}







private _getNItems(  itemSize : number ,  index ? : number , size ?: number ) : number
{
   let _size = this.$buffer.byteLength;
   let _index = 0;
   let nitems = Math.floor(_size / itemSize);

  

   if( typeof index == 'number' )
   {
      _index = BBPacker.checkUI(index); 

      if( _size ) 
      {
        if( _index >= _size )
        {
           throw new RangeError(" Index > Buffer size");
        }

      }else if( _index > _size )
      {
         throw new RangeError(" Index > Buffer size");
      }

      _size = _size - _index;
      
      
     

      if( typeof size == 'number' )
      {
          size =  Math.floor(size);     

          if( size > _size )
          {
             throw new RangeError(" Size > Buffer size");  
          }

          nitems = Math.floor(size / itemSize); 


      }else {

               nitems = Math.floor(_size / itemSize); 
      }
  
  }


   return nitems;
}



private _forAllNItems(  itemSize : number ,  index ? : number | boolean , count ?: number | boolean , littleEndian ? : boolean ) : { index : number , count : number , littleEndian : boolean }
{
   let size = this.$buffer.byteLength;
   let rc = { index : 0 , count : Math.floor(size / itemSize) , littleEndian : this.littleEndian };



   if( typeof index == 'number' )
   {
      rc.index = BBPacker.checkUI(index); 

      if( size  )  
      {
         if( rc.index >= size )
         {
             throw new RangeError(" Index > Buffer size");
         }

      }else if( rc.index > size  )
      {
         throw new RangeError(" Index > Buffer size");
      } 

      size = size - rc.index;
      
      
      rc.count = Math.floor(size / itemSize);

      if( typeof count == 'number' )
      {
         count = BBPacker.checkUI(count);



         if( count > rc.count ) 
         {
           throw new RangeError(" Size > Buffer size");
         }
        
         rc.count = count;

         if( typeof littleEndian == 'boolean')
         {
             rc.littleEndian =  littleEndian;  
         }   

           

      }else if(  typeof count == 'boolean' )
      {
         rc.littleEndian = count;
      }


  
  }else if(  typeof index == 'boolean' )
  {
     rc.littleEndian = index;
  }


   return rc;
}




private __writeBit( bitIndex : number , bitValue : boolean , byteIndex : number , bitIndexReverse : boolean ) : void
{


 
  let bitPos : number = bitIndex % 8;
  const bIndex : number = Math.floor( bitIndex / 8) + byteIndex; 
  

 
  
  let value : number = this.$data.getUint8( bIndex );  
  
 if( bitIndexReverse )
  {
     bitPos = 7 - bitPos;
  }
  

  if( bitValue  )
  {
     value |=  1 << bitPos;
  }
  else {
     value &=  ~(1 << bitPos);
  }
  
  this.$data.setUint8( bIndex , value );

  
}



private __readBit( bitIndex : number , byteIndex : number , bitIndexReverse : boolean  ) : boolean  
{

 
  let    bitPos : number = bitIndex % 8;
  const  bIndex : number = Math.floor(bitIndex / 8) + byteIndex; 
  
 

  let bitValue = false;
  
  if( bitIndexReverse )
  {
    bitPos = 7 - bitPos;
  }
    

  if( this.$data.getUint8( bIndex ) & (1 << bitPos)  ) {
    bitValue = true;  
  }

  return bitValue;
}

private __valiateBitIndex(  bitIndex : number , byteIndex : number  ) : void
{
   if(  (Math.floor(bitIndex / 8) + byteIndex) >= this.$buffer.byteLength )
   {
      throw new RangeError("Index out of range");
   }
}



}//class BBPacker






