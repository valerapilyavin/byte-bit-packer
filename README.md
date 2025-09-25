# byte-bit-packer

Typescript: Manipulating bytes and bits in a ArrayBuffer

## Installation

`npm i byte-bit-packer`

## Rebuld in node_modules
The package contains the source code and the tsconfig.json file.\
To change the target use:\
`tsc -p ./node_modules/byte-bit-packer --target es5 --removeComments --declaration false &&`\
`tsc -p ./node_modules/byte-bit-packer --target es5 --emitDeclarationOnly`
## Example
```js
import {BBPacker} from "byte-bit-packer"

let packer = new  BBPacker( 8 , {littleEndian : true} );
packer.writeU32( 0 , 0x11223344 ); 
let rdValue = packer.readU32(0);
packer.writeArrU8( 0 , [ 1 , 2, 3, 4 ]  );
packer.resetIndex();
 rdValue = packer.getU8(); // 1
 rdValue = packer.getU8(); // 2
 rdValue = packer.getU8(); // 3
 rdValue = packer.getU8(); // 4
 packer.allZerro();
 packer.writeBit( 0 , true );
 packer.writeBit( 1 , false );
 packer.writeBit( 2 , true );
 rdValue = packer.fromBits(  0 , 2 ); // 0b101
 
const buffer = Buffer.alloc(2);
packer.pushArrayBuffer( buffer.buffer ,   buffer.length , buffer.byteOffset );
```