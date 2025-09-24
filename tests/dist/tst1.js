import { it } from 'node:test';
import assert from 'node:assert/strict';
import { BBPacker } from "../../dist/BBPacker.js";
export async function tst1() {
    it('BBPacker constructor( size : number  )', () => {
        const packer = new BBPacker(3);
        return assert.ok(true);
    });
    it('BBPacker.checkUI( arg : number ) ', () => {
        if (BBPacker.checkUI(0) != 0) {
            throw new Error("BBPacker.checkUI(0)");
        }
        if (BBPacker.checkUI(10.8) != 10) {
            throw new Error("BBPacker.checkUI(0)");
        }
        assert.throws(() => {
            BBPacker.checkUI(-1);
        }, () => true, 'BBPacker.checkUI(-1)');
        assert.throws(() => {
            BBPacker.checkUI(BBPacker.MAX_UINT_ARG + 1);
        }, () => true, 'BBPacker.checkUI(BBPacker.MAX_UINT_ARG + 1)');
        return assert.ok(true);
    });
    it('allZerro( )', () => {
        const packer = new BBPacker(3);
        packer.allZerro();
        return assert.ok(true);
    });
    it('arrayBufferSize', () => {
        const packer = new BBPacker(3);
        if (packer.arrayBufferSize != 3) {
            throw new Error("packer.arrayBufferSize");
        }
        return assert.ok(true);
    });
    it('index', () => {
        const packer = new BBPacker(3);
        packer.index = 0;
        packer.index = 1;
        packer.index = 2;
        if (packer.index != 2) {
            throw new Error("packer.index != 2");
        }
        assert.throws(() => {
            packer.index = 3;
        }, () => true, 'packer.index = 3');
        return assert.ok(true);
    });
    it('index16', () => {
        const packer = new BBPacker(5);
        packer.index16 = 0;
        packer.index16 = 1;
        if (packer.index != 2) {
            throw new Error("packer.index != 2");
        }
        assert.throws(() => {
            packer.index16 = 2;
        }, () => true, 'packer.index16 = 2');
        return assert.ok(true);
    });
    it('index32', () => {
        const packer = new BBPacker(9);
        packer.index32 = 0;
        packer.index32 = 1;
        if (packer.index != 4) {
            throw new Error("packer.index != 4");
        }
        assert.throws(() => {
            packer.index32 = 2;
        }, () => true, 'packer.index32 = 2');
        return assert.ok(true);
    });
    it('index64', () => {
        const packer = new BBPacker(17);
        packer.index64 = 0;
        packer.index64 = 1;
        if (packer.index != 8) {
            throw new Error("packer.index != 8");
        }
        assert.throws(() => {
            packer.index64 = 2;
        }, () => true, 'packer.index64 = 2;');
        return assert.ok(true);
    });
    it('isAlign16', () => {
        let packer1 = new BBPacker(1);
        if (packer1.isAlign16() == true) {
            throw new Error("packer1.isAlign16() != true");
        }
        let packer2 = new BBPacker(2);
        if (packer2.isAlign16() != true) {
            throw new Error("packer2.isAlign16() != true");
        }
        let packer4 = new BBPacker(4);
        if (packer4.isAlign16() != true) {
            throw new Error("packer4.isAlign16() != true");
        }
        if (packer4.isAlign16(0) != true) {
            throw new Error("packer4.isAlign16(0) != true");
        }
        if (packer4.isAlign16(1) == true) {
            throw new Error("packer4.isAlign16(1) == true");
        }
        if (packer4.isAlign16(2) != true) {
            throw new Error("packer4.isAlign16(2) == true");
        }
        if (packer4.isAlign16(3) == true) {
            throw new Error("packer4.isAlign16(2) == true");
        }
        assert.throws(() => {
            packer4.isAlign16(4);
        }, () => true, 'packer4.isAlign16(4);');
        if (packer4.isAlign16(0, 1) == true) {
            throw new Error("packer4.isAlign16(0,1) == true");
        }
        if (packer4.isAlign16(3, 1) == true) {
            throw new Error("packer4.isAlign16(3,1) == true");
        }
        if (packer4.isAlign16(2, 2) != true) {
            throw new Error("packer4.isAlign16(2,2) == true");
        }
        assert.throws(() => {
            packer4.isAlign16(3, 2);
        }, () => true, 'packer4.isAlign16(3,2);');
        let packer5 = new BBPacker(5);
        if (packer5.isAlign16() == true) {
            throw new Error("packer4.isAlign16(0,1) == true");
        }
        if (packer5.isAlign16(1) != true) {
            throw new Error("packer5.isAlign16(1) != true");
        }
        if (packer5.isAlign16(0, 4) != true) {
            throw new Error("packer5.isAlign16(1) != true");
        }
        return assert.ok(true);
    });
    it('isAlign32', () => {
        let packer5 = new BBPacker(5);
        if (packer5.isAlign32() == true) {
            throw new Error("packer5.isAlign32() == true");
        }
        if (packer5.isAlign32(1) != true) {
            throw new Error("packer.isAlign32(1) != true");
        }
        if (packer5.isAlign32(0, 4) != true) {
            throw new Error("packer.isAlign32(1) != true");
        }
        if (packer5.isAlign32(1, 0) != false) {
            throw new Error("packer5.isAlign32(1,0) != false");
        }
        assert.throws(() => {
            packer5.isAlign32(1, 5);
        }, () => true, 'packer5.isAlign32(1,5);');
        assert.throws(() => {
            packer5.isAlign32(5);
        }, () => true, 'packer5.isAlign32(5);');
        return assert.ok(true);
    });
    it('isAlign64', () => {
        let packer9 = new BBPacker(9);
        if (packer9.isAlign64() == true) {
            throw new Error("packer9.isAlign64() == true");
        }
        if (packer9.isAlign64(1) != true) {
            throw new Error("packer9.isAlign64(1) != true");
        }
        if (packer9.isAlign64(0, 8) != true) {
            throw new Error("packer9.isAlign64(0,8) != true");
        }
        assert.throws(() => {
            packer9.isAlign32(1, 9);
        }, () => true, 'packer9.isAlign32(1,9);');
        assert.throws(() => {
            packer9.isAlign32(9);
        }, () => true, 'packer9.isAlign32(9);');
        return assert.ok(true);
    });
    it('getNumber16', () => {
        const packer5 = new BBPacker(5);
        if (packer5.getNumber16() != 2) {
            throw new Error("packer5.getNumber16( ) != 2");
        }
        if (packer5.getNumber16(1, 4) != 2) {
            throw new Error("packer5.getNumber16( 1 , 4 ) != 2");
        }
        if (packer5.getNumber16(1, 3) != 1) {
            throw new Error("packer5.getNumber16( 1 , 3 ) != 1");
        }
        if (packer5.getNumber16(1, 0) != 0) {
            throw new Error("packer5.getNumber16( 1 , 0 ) != 0");
        }
        assert.throws(() => {
            packer5.getNumber16(5);
        }, () => true, 'packer5.getNumber16( 5 );');
        assert.throws(() => {
            packer5.getNumber16(0, 6);
        }, () => true, 'packer5.getNumber16( 0 , 6 );');
        const packer17 = new BBPacker(17);
        if (packer17.getNumber16() != 8) {
            throw new Error("packer17.getNumber16(  ) != 8");
        }
        return assert.ok(true);
    });
    it('getNumber32', () => {
        const packer5 = new BBPacker(5);
        if (packer5.getNumber32() != 1) {
            throw new Error("packer5.getNumber32( ) != 1");
        }
        if (packer5.getNumber32(1, 4) != 1) {
            throw new Error("packer5.getNumber32( 1 , 4 ) != 1");
        }
        if (packer5.getNumber32(1, 3) != 0) {
            throw new Error("packer5.getNumber32( 1 , 3 ) != 0");
        }
        if (packer5.getNumber32(1, 0) != 0) {
            throw new Error("packer5.getNumber32( 1 , 0 ) != 0");
        }
        assert.throws(() => {
            packer5.getNumber32(5);
        }, () => true, 'packer5.getNumber32( 5 );');
        assert.throws(() => {
            packer5.getNumber32(0, 6);
        }, () => true, 'packer5.getNumber32( 0 , 6 );');
        const packer17 = new BBPacker(17);
        if (packer17.getNumber32() != 4) {
            throw new Error("packer17.getNumber32(  ) != 4");
        }
        return assert.ok(true);
    });
    it('getNumber64', () => {
        const packer9 = new BBPacker(9);
        if (packer9.getNumber64() != 1) {
            throw new Error("packer9.getNumber64( ) != 1");
        }
        if (packer9.getNumber64(1, 8) != 1) {
            throw new Error("packer9.getNumber64( 1 , 8 ) != 1");
        }
        if (packer9.getNumber64(1, 7) != 0) {
            throw new Error("packer9.getNumber64( 1 , 7 ) != 0");
        }
        if (packer9.getNumber64(1, 0) != 0) {
            throw new Error("packer9.getNumber64( 1 , 0 ) != 0");
        }
        assert.throws(() => {
            packer9.getNumber64(9);
        }, () => true, 'packer9.getNumber64( 9 );');
        assert.throws(() => {
            packer9.getNumber64(0, 10);
        }, () => true, 'packer9.getNumber64( 0 , 10 );');
        const packer17 = new BBPacker(17);
        if (packer17.getNumber64() != 2) {
            throw new Error("packer17.getNumber64(  ) != 2");
        }
        return assert.ok(true);
    });
    it('ReadWriteU8', () => {
        let packer = new BBPacker(3);
        packer.writeU8(0, 0x11);
        packer.writeU8(1, 0x22);
        packer.writeU8(2, 0x33);
        assert.throws(() => {
            packer.writeU8(3, 0x04);
        }, () => true, 'packer.writeU8( 3 , 0x04 );');
        assert.throws(() => {
            packer.readU8(3);
        }, () => true, 'packer.readU8( 3 );');
        if (packer.readU8(0) != 0x11) {
            throw new Error("packer.readU8( 0 ) != 0x11");
        }
        if (packer.readU8(1) != 0x22) {
            throw new Error("packer.readU8( 1 ) != 0x22");
        }
        if (packer.readU8(2) != 0x33) {
            throw new Error("packer.readU8( 2 ) != 0x33");
        }
        packer.writeArrU8(0, [0x51, 0x52, 0x53]);
        assert.throws(() => {
            packer.writeArrU8(0, [0x11, 0x22, 0x33, 0x00]);
        }, () => true, ' packer.writeArrU8( 0 , [ 0x11 , 0x22 , 0x33 , 0x00 ]  ); ');
        assert.throws(() => {
            packer.readArrU8(4);
        }, () => true, 'packer.readArrU8( 4 ); ');
        let arr = packer.readArrU8(0);
        if (arr.length != 3) {
            throw new Error("arr.length != 3");
        }
        if (arr[0] != 0x51) {
            throw new Error("arr[0] != 0x51");
        }
        if (arr[1] != 0x52) {
            throw new Error("arr[1] != 0x52");
        }
        if (arr[2] != 0x53) {
            throw new Error("arr[2] != 0x53");
        }
        arr = packer.readArrU8(0, 3);
        if (arr.length != 3) {
            throw new Error("arr.length != 3");
        }
        if (arr[0] != 0x51) {
            throw new Error("arr[0] != 0x51");
        }
        if (arr[1] != 0x52) {
            throw new Error("arr[1] != 0x52");
        }
        if (arr[2] != 0x53) {
            throw new Error("arr[2] != 0x53");
        }
        assert.throws(() => {
            packer.readArrU8(0, 4);
        }, () => true, 'packer.readArrU8( 0 , 4 );');
        packer.resetIndex();
        packer.putU8(0xA1);
        packer.putU8(0xA2);
        packer.putU8(0xA3);
        assert.throws(() => {
            packer.putU8(0);
        }, () => true, "packer.putU8( 0 );");
        packer.resetIndex();
        if (packer.getU8() != 0xA1) {
            throw new Error("packer.getU8() != 0xA1");
        }
        if (packer.getU8() != 0xA2) {
            throw new Error("packer.getU8() != 0xA2");
        }
        if (packer.getU8() != 0xA3) {
            throw new Error("packer.getU8() != 0xA3");
        }
        assert.throws(() => {
            packer.getU8();
        }, () => true, " packer.getU8();");
        packer.resetIndex();
        packer.putArrU8([0x11, 0x22, 0x33]);
        assert.throws(() => {
            packer.putU8(0);
        }, () => true, " packer.putU8( 0 );");
        packer.resetIndex();
        assert.throws(() => {
            packer.putArrU8([0x11, 0x22, 0x33, 0x00]);
        }, () => true, "packer.putArrU8( [ 0x11 , 0x22 , 0x33 , 0x00 ] );");
        arr = packer.getArrU8(3);
        if (arr[0] != 0x11) {
            throw new Error("arr[0] != 0x11");
        }
        if (arr[1] != 0x22) {
            throw new Error("arr[1] != 0x22");
        }
        if (arr[2] != 0x33) {
            throw new Error("arr[2] != 0x33");
        }
        packer.resetIndex();
        assert.throws(() => {
            packer.getArrU8(4);
        }, () => true, "packer.getArrU8( 4 );");
        packer = new BBPacker(1, { throwAtRangeOverflow: true });
        packer.writeU8(0, BBPacker.MAX_UINT8);
        packer.writeU8(0, BBPacker.MIN_UINT8);
        packer.writeArrU8(0, [BBPacker.MAX_UINT8]);
        packer.writeArrU8(0, [BBPacker.MIN_UINT8]);
        packer.resetIndex();
        packer.putU8(BBPacker.MAX_UINT8);
        packer.resetIndex();
        packer.putU8(BBPacker.MIN_UINT8);
        packer.resetIndex();
        packer.putArrU8([BBPacker.MAX_UINT8]);
        packer.resetIndex();
        packer.putArrU8([BBPacker.MIN_UINT8]);
        assert.throws(() => {
            packer.writeU8(0, BBPacker.MAX_UINT8 + 1);
        }, () => true, "packer.writeU8( 0 , BBPacker.MAX_UINT8 + 1 );");
        assert.throws(() => {
            packer.writeU8(0, BBPacker.MIN_UINT8 - 1);
        }, () => true, "packer.writeU8( 0 , BBPacker.MIN_UINT8 - 1 );");
        assert.throws(() => {
            packer.writeArrU8(0, [BBPacker.MAX_UINT8 + 1]);
        }, () => true, "packer.writeArrU8( 0 , [ BBPacker.MAX_UINT8 + 1 ]  );");
        assert.throws(() => {
            packer.writeArrU8(0, [BBPacker.MIN_UINT8 - 1]);
        }, () => true, "packer.writeArrU8( 0 , [ BBPacker.MIN_UINT8 - 1 ]  );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putU8(BBPacker.MAX_UINT8 + 1);
        }, () => true, "packer.putU8( BBPacker.MAX_UINT8 + 1  );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putU8(BBPacker.MIN_UINT8 - 1);
        }, () => true, "packer.putU8( BBPacker.MIN_UINT8 - 1 );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putArrU8([BBPacker.MAX_UINT8 + 1]);
        }, () => true, "packer.putArrU8( [BBPacker.MAX_UINT8 + 1]  );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putArrU8([BBPacker.MIN_UINT8 - 1]);
        }, () => true, "packer.putArrU8( [BBPacker.MIN_UINT8 - 1] );");
        return assert.ok(true);
    });
    it('BBPacker constructor( ArrayBuffer  )', () => {
        const packer = new BBPacker(new ArrayBuffer(8));
        if (packer.arrayBufferSize != 8) {
            throw new Error("packer.arrayBufferSize");
        }
        return assert.ok(true);
    });
    it('arrayBuffer getter', () => {
        const arr = new ArrayBuffer(4);
        const packer = new BBPacker(arr);
        if (packer.arrayBuffer !== arr) {
            throw new Error("packer.arrayBuffer");
        }
        return assert.ok(true);
    });
    it('arrayBuffer setter', () => {
        const arr = new ArrayBuffer(4);
        const packer = new BBPacker(3);
        packer.arrayBuffer = arr;
        if (packer.arrayBuffer !== arr) {
            throw new Error("packer.arrayBuffer");
        }
        return assert.ok(true);
    });
    it('BBPacker constructor( Conf  )', () => {
        let packer = new BBPacker(4, {
            index: 1,
            littleEndian: false,
            bitIndexReverse: true,
            throwAtRangeOverflow: true
        });
        if (packer.index != 1) {
            throw new Error("packer.index != 1");
        }
        if (packer.littleEndian != false) {
            throw new Error("packer.littleEndian != false");
        }
        if (packer.bitIndexReverse != true) {
            throw new Error("packer.bitIndexReverse != true");
        }
        if (packer.throwAtRangeOverflow != true) {
            throw new Error("packer.throwAtRangeOverflow != true");
        }
        packer = new BBPacker(4, {});
        if (packer.index != 0) {
            throw new Error("packer.index != 0");
        }
        if (packer.littleEndian != true) {
            throw new Error("packer.littleEndian != true");
        }
        if (packer.bitIndexReverse != false) {
            throw new Error("packer.bitIndexReverse != false");
        }
        if (packer.throwAtRangeOverflow != false) {
            throw new Error("packer.throwAtRangeOverflow != false");
        }
        return assert.ok(true);
    });
    it('BBPacker constructor( BBPacker  )', () => {
        const packerSrc = new BBPacker(4, {
            index: 1,
            littleEndian: false,
            bitIndexReverse: true,
            throwAtRangeOverflow: true
        });
        const packer = new BBPacker(packerSrc);
        if (packer.index != 1) {
            throw new Error("packer.index != 1");
        }
        if (packer.littleEndian != false) {
            throw new Error("packer.littleEndian != false");
        }
        if (packer.bitIndexReverse != true) {
            throw new Error("packer.bitIndexReverse != true");
        }
        if (packer.throwAtRangeOverflow != true) {
            throw new Error("packer.throwAtRangeOverflow != true");
        }
        if (packer.arrayBufferSize != 4) {
            throw new Error("packer.arrayBufferSize != 4");
        }
        if (packer.arrayBuffer != packerSrc.arrayBuffer) {
            throw new Error("packer.arrayBuffer != packerSrc.arrayBuffer");
        }
        return assert.ok(true);
    });
    return assert.ok(true);
}
