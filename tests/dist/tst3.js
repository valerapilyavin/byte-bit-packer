import { it } from 'node:test';
import assert from 'node:assert/strict';
import { BBPacker } from "../../dist/BBPacker.js";
export async function tst3() {
    it('ReadWriteU32', async (ctx) => {
        await ctx.test("writeU32", () => {
            let packer = new BBPacker(4, { littleEndian: true });
            packer.writeU32(0, 0x11223344);
            if (packer.readU8(0) != 0x44) {
                throw new Error("packer.readU8(0) != 0x44");
            }
            if (packer.readU8(1) != 0x33) {
                throw new Error("packer.readU8(1) != 0x33");
            }
            if (packer.readU8(2) != 0x22) {
                throw new Error("packer.readU8(2) != 0x22");
            }
            if (packer.readU8(3) != 0x11) {
                throw new Error("packer.readU8(3) != 0x11");
            }
            packer.writeU32(0, 0x11223344, false);
            if (packer.readU8(0) != 0x11) {
                throw new Error("packer.readU8(0) != 0x11");
            }
            if (packer.readU8(1) != 0x22) {
                throw new Error("packer.readU8(1) != 0x22");
            }
            if (packer.readU8(2) != 0x33) {
                throw new Error("packer.readU8(2) != 0x33");
            }
            if (packer.readU8(3) != 0x44) {
                throw new Error("packer.readU8(3) != 0x44");
            }
            packer = new BBPacker(4, { littleEndian: false });
            packer.writeU32(0, 0x11223344);
            if (packer.readU8(0) != 0x11) {
                throw new Error("packer.readU8(0) != 0x11");
            }
            if (packer.readU8(1) != 0x22) {
                throw new Error("packer.readU8(1) != 0x22");
            }
            if (packer.readU8(2) != 0x33) {
                throw new Error("packer.readU8(2) != 0x33");
            }
            if (packer.readU8(3) != 0x44) {
                throw new Error("packer.readU8(3) != 0x44");
            }
            packer.writeU32(0, 0x11223344, true);
            if (packer.readU8(0) != 0x44) {
                throw new Error("packer.readU8(0) != 0x44");
            }
            if (packer.readU8(1) != 0x33) {
                throw new Error("packer.readU8(1) != 0x33");
            }
            if (packer.readU8(2) != 0x22) {
                throw new Error("packer.readU8(2) != 0x22");
            }
            if (packer.readU8(3) != 0x11) {
                throw new Error("packer.readU8(3) != 0x11");
            }
            assert.throws(() => {
                packer.writeU32(1, 0x11220000);
            }, () => true, "packer.writeU32( 1 , 0x11220000 );");
            return assert.ok(true);
        });
        await ctx.test("readU32", () => {
            let packer = new BBPacker(4, { littleEndian: true });
            packer.writeU32(0, 0x11223344);
            if (packer.readU32(0) != 0x11223344) {
                throw new Error("packer.readU32(0) != 0x11223344");
            }
            if (packer.readU32(0, false) != 0x44332211) {
                throw new Error("packer.readU32(0,false) != 0x44332211");
            }
            packer.writeU32(0, 0x33122244);
            if (packer.readU32(0) != 0x33122244) {
                throw new Error("packer.readU32( 0 ) != 0x33122244");
            }
            assert.throws(() => {
                packer.readU32(1);
            }, () => true, "packer.readU32( 1 );");
            return assert.ok(true);
        });
        await ctx.test("writeArrU32,readArrU32", () => {
            let packer = new BBPacker(9, { littleEndian: true });
            packer.writeArrU32(0, [0x11223344, 0x33440000]);
            assert.throws(() => {
                packer.writeArrU32(2, [0x0000_0000, 0x1111_0000]);
            }, () => true, "packer.writeArrU32( 2 ,  [ 0x0000_0000 , 0x1111_0000 ] );");
            assert.throws(() => {
                packer.writeArrU32(0, [0x0000, 0x1111, 0x2222]);
            }, () => true, "packer.writeArrU32( 0 ,  [ 0x0000 , 0x1111 , 0x2222 ] );");
            assert.throws(() => {
                packer.readArrU32(0, 3);
            }, () => true, "packer.readArrU32( 0 ,  3 );");
            assert.throws(() => {
                packer.readArrU32(9);
            }, () => true, "packer.readArrU32( 9 );");
            const arr1 = packer.readArrU32(0);
            if (arr1.length != 2) {
                throw new Error("arr1.length != 2");
            }
            if (arr1[0] != 0x11223344) {
                throw new Error("arr1[0] != 0x11223344");
            }
            if (arr1[1] != 0x33440000) {
                throw new Error("arr1[1] != 0x33440000");
            }
            const arr2 = packer.readArrU32(0, 1);
            if (arr2.length != 1) {
                throw new Error("arr2.length != 1");
            }
            if (arr2[0] != 0x11223344) {
                throw new Error("arr2[0] != 0x1122");
            }
            const arr3 = packer.readArrU32(0, false);
            if (arr3.length != 2) {
                throw new Error("arr3.length != 2");
            }
            if (arr3[0] != 0x44332211) {
                throw new Error("arr3[0] != 0x44332211");
            }
            if (arr3[1] != 0x00004433) {
                throw new Error("arr3[1] != 0x00004433");
            }
            const arr4 = packer.readArrU32(0, 1, false);
            if (arr4.length != 1) {
                throw new Error("arr4.length != 1");
            }
            if (arr4[0] != 0x44332211) {
                throw new Error("arr4[0] != 0x44332211");
            }
            packer.writeArrU32(0, [0x11223344, 0x3344_0000], false);
            const arr5 = packer.readArrU32(0, 1);
            if (arr5.length != 1) {
                throw new Error("arr5.length != 1");
            }
            if (arr5[0] != 0x44332211) {
                throw new Error("arr5[0] != 0x44332211");
            }
            return assert.ok(true);
        });
        await ctx.test("putU32,getU32", () => {
            let packer = new BBPacker(8, { littleEndian: true });
            packer.putU32(0x11223344);
            packer.putU32(0x44556677);
            packer.resetIndex();
            if (packer.getU32() != 0x11223344) {
                throw new Error("packer.getU32() != 0x11223344");
            }
            if (packer.getU32() != 0x44556677) {
                throw new Error("packer.getU32() != 0x44556677");
            }
            packer.resetIndex();
            packer.putU32(0x11223344, false);
            packer.putU32(0x44556677, false);
            packer.resetIndex();
            if (packer.getU32() != 0x44332211) {
                throw new Error("packer.getU32() != 0x44332211");
            }
            if (packer.getU32() != 0x77665544) {
                throw new Error("packer.getU32() != 0x77665544");
            }
            packer.resetIndex();
            packer.putU32(0x11223344);
            packer.putU32(0x44556677);
            packer.resetIndex();
            if (packer.getU32(false) != 0x44332211) {
                throw new Error("packer.getU32(false) != 0x44332211");
            }
            if (packer.getU32(false) != 0x77665544) {
                throw new Error("packer.getU32(false) != 0x77665544");
            }
            assert.throws(() => {
                packer.putU32(0x0000_0000);
            }, () => true, "packer.putU32( 0x0000_0000  );");
            assert.throws(() => {
                packer.getU32();
            }, () => true, "packer.getU32(  );");
            return assert.ok(true);
        });
        await ctx.test("putArrU32,getArrU32", () => {
            let packer = new BBPacker(9, { littleEndian: true });
            packer.putArrU32([0x11223344, 0x33445566]);
            assert.throws(() => {
                packer.putArrU32([0x0000]);
            }, () => true, "packer.putArrU32( [ 0x0000 ] );");
            assert.throws(() => {
                packer.getArrU32();
            }, () => true, "packer.getArrU32( );");
            packer.resetIndex();
            const arr1 = packer.getArrU32();
            if (arr1.length != 2) {
                throw new Error("arr1.length != 2");
            }
            if (arr1[0] != 0x11223344) {
                throw new Error("arr1[0] != 0x11223344");
            }
            if (arr1[1] != 0x33445566) {
                throw new Error("arr1[1] != 0x33445566");
            }
            packer.resetIndex();
            const arr2 = packer.getArrU32(1);
            if (arr2.length != 1) {
                throw new Error("arr2.length != 1");
            }
            if (arr2[0] != 0x11223344) {
                throw new Error("arr2[0] != 0x11223344");
            }
            packer.resetIndex();
            const arr3 = packer.getArrU32(false);
            if (arr3.length != 2) {
                throw new Error("arr3.length != 2");
            }
            if (arr3[0] != 0x44332211) {
                throw new Error("arr3[0] != 0x44332211");
            }
            if (arr3[1] != 0x66554433) {
                throw new Error("arr3[1] != 0x66554433");
            }
            packer.resetIndex();
            const arr4 = packer.getArrU32(1, false);
            if (arr4.length != 1) {
                throw new Error("arr4.length != 1");
            }
            if (arr4[0] != 0x44332211) {
                throw new Error("arr4[0] != 0x44332211");
            }
            packer.resetIndex();
            packer.putArrU32([0x11223344, 0x33445566], false);
            packer.resetIndex();
            const arr5 = packer.getArrU32(1);
            if (arr5.length != 1) {
                throw new Error("arr5.length != 1");
            }
            if (arr5[0] != 0x44332211) {
                throw new Error("arr5[0] != 0x44332211");
            }
            return assert.ok(true);
        });
        return assert.ok(true);
    });
    it('ReadWriteOvfU32', () => {
        const packer = new BBPacker(4, { throwAtRangeOverflow: true });
        packer.writeU32(0, BBPacker.MAX_UINT32);
        packer.writeU32(0, BBPacker.MIN_UINT32);
        packer.writeArrU32(0, [BBPacker.MAX_UINT32]);
        packer.writeArrU32(0, [BBPacker.MIN_UINT32]);
        packer.resetIndex();
        packer.putU32(BBPacker.MAX_UINT32);
        packer.resetIndex();
        packer.putU32(BBPacker.MIN_UINT32);
        packer.resetIndex();
        packer.putArrU32([BBPacker.MAX_UINT32]);
        packer.resetIndex();
        packer.putArrU32([BBPacker.MIN_UINT32]);
        assert.throws(() => {
            packer.writeU32(0, BBPacker.MAX_UINT32 + 1);
        }, () => true, "packer.writeU32( 0 , BBPacker.MAX_UINT32 + 1 );");
        assert.throws(() => {
            packer.writeU32(0, BBPacker.MIN_UINT32 - 1);
        }, () => true, "packer.writeU32( 0 , BBPacker.MIN_UINT32 - 1 );");
        assert.throws(() => {
            packer.writeArrU32(0, [BBPacker.MAX_UINT32 + 1]);
        }, () => true, "packer.writeArrU32( 0 , [ BBPacker.MAX_UINT32 + 1 ]  );");
        assert.throws(() => {
            packer.writeArrU32(0, [BBPacker.MIN_UINT32 - 1]);
        }, () => true, "packer.writeArrU32( 0 , [ BBPacker.MIN_UINT32 - 1 ]  );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putU32(BBPacker.MAX_UINT32 + 1);
        }, () => true, "packer.putU32( BBPacker.MAX_UINT32 + 1  );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putU32(BBPacker.MIN_UINT32 - 1);
        }, () => true, "packer.putU32( BBPacker.MIN_UINT32 - 1 );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putArrU32([BBPacker.MAX_UINT32 + 1]);
        }, () => true, "packer.putArrU32( [BBPacker.MAX_UINT32 + 1]  );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putArrU32([BBPacker.MIN_UINT32 - 1]);
        }, () => true, "packer.putArrU32( [BBPacker.MIN_UINT32 - 1] );");
        return assert.ok(true);
    });
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    it('ReadWriteI32', async (ctx) => {
        await ctx.test("writeU32", () => {
            let packer = new BBPacker(4, { littleEndian: true });
            packer.writeI32(0, 0x11223344);
            if (packer.readU8(0) != 0x44) {
                throw new Error("packer.readU8(0) != 0x44");
            }
            if (packer.readU8(1) != 0x33) {
                throw new Error("packer.readU8(1) != 0x33");
            }
            if (packer.readU8(2) != 0x22) {
                throw new Error("packer.readU8(2) != 0x22");
            }
            if (packer.readU8(3) != 0x11) {
                throw new Error("packer.readU8(3) != 0x11");
            }
            packer.writeI32(0, 0x11223344, false);
            if (packer.readU8(0) != 0x11) {
                throw new Error("packer.readU8(0) != 0x11");
            }
            if (packer.readU8(1) != 0x22) {
                throw new Error("packer.readU8(1) != 0x22");
            }
            if (packer.readU8(2) != 0x33) {
                throw new Error("packer.readU8(2) != 0x33");
            }
            if (packer.readU8(3) != 0x44) {
                throw new Error("packer.readU8(3) != 0x44");
            }
            packer = new BBPacker(4, { littleEndian: false });
            packer.writeI32(0, 0x11223344);
            if (packer.readU8(0) != 0x11) {
                throw new Error("packer.readU8(0) != 0x11");
            }
            if (packer.readU8(1) != 0x22) {
                throw new Error("packer.readU8(1) != 0x22");
            }
            if (packer.readU8(2) != 0x33) {
                throw new Error("packer.readU8(2) != 0x33");
            }
            if (packer.readU8(3) != 0x44) {
                throw new Error("packer.readU8(3) != 0x44");
            }
            packer.writeI32(0, 0x11223344, true);
            if (packer.readU8(0) != 0x44) {
                throw new Error("packer.readU8(0) != 0x44");
            }
            if (packer.readU8(1) != 0x33) {
                throw new Error("packer.readU8(1) != 0x33");
            }
            if (packer.readU8(2) != 0x22) {
                throw new Error("packer.readU8(2) != 0x22");
            }
            if (packer.readU8(3) != 0x11) {
                throw new Error("packer.readU8(3) != 0x11");
            }
            assert.throws(() => {
                packer.writeI32(1, 0x11220000);
            }, () => true, "packer.writeI32( 1 , 0x11220000 );");
            return assert.ok(true);
        });
        await ctx.test("readI32", () => {
            let packer = new BBPacker(4, { littleEndian: true });
            packer.writeI32(0, 0x11223344);
            if (packer.readI32(0) != 0x11223344) {
                throw new Error("packer.readI32(0) != 0x11223344");
            }
            if (packer.readI32(0, false) != 0x44332211) {
                throw new Error("packer.readI32(0,false) != 0x44332211");
            }
            packer.writeI32(0, -12345678);
            if (packer.readI32(0) != -12345678) {
                throw new Error("packer.readI32( 0 ) != -12345678");
            }
            assert.throws(() => {
                packer.readI32(1);
            }, () => true, "packer.readI32( 1 );");
            return assert.ok(true);
        });
        await ctx.test("writeArrI32,readArrI32", () => {
            let packer = new BBPacker(9, { littleEndian: true });
            packer.writeArrI32(0, [0x11223344, 0x33440000]);
            assert.throws(() => {
                packer.writeArrI32(2, [0x0000_0000, 0x1111_0000]);
            }, () => true, "packer.writeArrI32( 2 ,  [ 0x0000_0000 , 0x1111_0000 ] );");
            assert.throws(() => {
                packer.writeArrI32(0, [0x0000, 0x1111, 0x2222]);
            }, () => true, "packer.writeArrI32( 0 ,  [ 0x0000 , 0x1111 , 0x2222 ] );");
            assert.throws(() => {
                packer.readArrI32(0, 3);
            }, () => true, "packer.readArrI32( 0 ,  3 );");
            assert.throws(() => {
                packer.readArrI32(9);
            }, () => true, "packer.readArrI32( 9 );");
            const arr1 = packer.readArrI32(0);
            if (arr1.length != 2) {
                throw new Error("arr1.length != 2");
            }
            if (arr1[0] != 0x11223344) {
                throw new Error("arr1[0] != 0x11223344");
            }
            if (arr1[1] != 0x33440000) {
                throw new Error("arr1[1] != 0x33440000");
            }
            const arr2 = packer.readArrI32(0, 1);
            if (arr2.length != 1) {
                throw new Error("arr2.length != 1");
            }
            if (arr2[0] != 0x11223344) {
                throw new Error("arr2[0] != 0x1122");
            }
            const arr3 = packer.readArrI32(0, false);
            if (arr3.length != 2) {
                throw new Error("arr3.length != 2");
            }
            if (arr3[0] != 0x44332211) {
                throw new Error("arr3[0] != 0x44332211");
            }
            if (arr3[1] != 0x00004433) {
                throw new Error("arr3[1] != 0x00004433");
            }
            const arr4 = packer.readArrI32(0, 1, false);
            if (arr4.length != 1) {
                throw new Error("arr4.length != 1");
            }
            if (arr4[0] != 0x44332211) {
                throw new Error("arr4[0] != 0x44332211");
            }
            packer.writeArrI32(0, [0x11223344, 0x3344_0000], false);
            const arr5 = packer.readArrI32(0, 1);
            if (arr5.length != 1) {
                throw new Error("arr5.length != 1");
            }
            if (arr5[0] != 0x44332211) {
                throw new Error("arr5[0] != 0x44332211");
            }
            packer.writeArrI32(0, [-88667755, -22337788]);
            const arr6 = packer.readArrI32(0);
            if (arr6.length != 2) {
                throw new Error("arr6.length != 2");
            }
            if (arr6[0] != -88667755) {
                throw new Error("arr6[0] != -88667755");
            }
            if (arr6[1] != -22337788) {
                throw new Error("arr6[1] != -22337788");
            }
            return assert.ok(true);
        });
        await ctx.test("putI32,getI32", () => {
            let packer = new BBPacker(8, { littleEndian: true });
            packer.putI32(0x11223344);
            packer.putI32(0x44556677);
            packer.resetIndex();
            if (packer.getI32() != 0x11223344) {
                throw new Error("packer.getI32() != 0x11223344");
            }
            if (packer.getI32() != 0x44556677) {
                throw new Error("packer.getI32() != 0x44556677");
            }
            packer.resetIndex();
            packer.putI32(0x11223344, false);
            packer.putI32(0x44556677, false);
            packer.resetIndex();
            if (packer.getI32() != 0x44332211) {
                throw new Error("packer.getI32() != 0x44332211");
            }
            if (packer.getI32() != 0x77665544) {
                throw new Error("packer.getI32() != 0x77665544");
            }
            packer.resetIndex();
            packer.putI32(0x11223344);
            packer.putI32(0x44556677);
            packer.resetIndex();
            if (packer.getI32(false) != 0x44332211) {
                throw new Error("packer.getI32(false) != 0x44332211");
            }
            if (packer.getI32(false) != 0x77665544) {
                throw new Error("packer.getI32(false) != 0x77665544");
            }
            assert.throws(() => {
                packer.putI32(0x0000_0000);
            }, () => true, "packer.putI32( 0x0000_0000  );");
            assert.throws(() => {
                packer.getI32();
            }, () => true, "packer.getI32(  );");
            packer.resetIndex();
            packer.putI32(-8836406);
            packer.putI32(-120054);
            packer.resetIndex();
            if (packer.getI32() != -8836406) {
                throw new Error("packer.getI32() != -8836406");
            }
            if (packer.getI32() != -120054) {
                throw new Error("packer.getI32() != -120054");
            }
            return assert.ok(true);
        });
        await ctx.test("putArrI32,getArrI32", () => {
            let packer = new BBPacker(9, { littleEndian: true });
            packer.putArrI32([0x11223344, 0x33445566]);
            assert.throws(() => {
                packer.putArrI32([0x0000]);
            }, () => true, "packer.putArrI32( [ 0x0000 ] );");
            assert.throws(() => {
                packer.getArrI32();
            }, () => true, "packer.getArrI32( );");
            packer.resetIndex();
            const arr1 = packer.getArrI32();
            if (arr1.length != 2) {
                throw new Error("arr1.length != 2");
            }
            if (arr1[0] != 0x11223344) {
                throw new Error("arr1[0] != 0x11223344");
            }
            if (arr1[1] != 0x33445566) {
                throw new Error("arr1[1] != 0x33445566");
            }
            packer.resetIndex();
            const arr2 = packer.getArrI32(1);
            if (arr2.length != 1) {
                throw new Error("arr2.length != 1");
            }
            if (arr2[0] != 0x11223344) {
                throw new Error("arr2[0] != 0x11223344");
            }
            packer.resetIndex();
            const arr3 = packer.getArrI32(false);
            if (arr3.length != 2) {
                throw new Error("arr3.length != 2");
            }
            if (arr3[0] != 0x44332211) {
                throw new Error("arr3[0] != 0x44332211");
            }
            if (arr3[1] != 0x66554433) {
                throw new Error("arr3[1] != 0x66554433");
            }
            packer.resetIndex();
            const arr4 = packer.getArrI32(1, false);
            if (arr4.length != 1) {
                throw new Error("arr4.length != 1");
            }
            if (arr4[0] != 0x44332211) {
                throw new Error("arr4[0] != 0x44332211");
            }
            packer.resetIndex();
            packer.putArrI32([0x11223344, 0x33445566], false);
            packer.resetIndex();
            const arr5 = packer.getArrI32(1);
            if (arr5.length != 1) {
                throw new Error("arr5.length != 1");
            }
            if (arr5[0] != 0x44332211) {
                throw new Error("arr5[0] != 0x44332211");
            }
            packer.resetIndex();
            packer.putArrI32([-1200764, -19275472]);
            packer.resetIndex();
            const arr6 = packer.getArrI32();
            if (arr6.length != 2) {
                throw new Error("arr6.length != 2");
            }
            if (arr6[0] != -1200764) {
                throw new Error("arr6[0] != -1200764");
            }
            if (arr6[1] != -19275472) {
                throw new Error("arr6[0] != -19275472");
            }
            return assert.ok(true);
        });
        return assert.ok(true);
    });
    it('ReadWriteOvfI32', () => {
        const packer = new BBPacker(4, { throwAtRangeOverflow: true });
        packer.writeI32(0, BBPacker.MAX_INT32);
        packer.writeI32(0, BBPacker.MIN_INT32);
        packer.writeArrI32(0, [BBPacker.MAX_INT32]);
        packer.writeArrI32(0, [BBPacker.MIN_INT32]);
        packer.resetIndex();
        packer.putI32(BBPacker.MAX_INT32);
        packer.resetIndex();
        packer.putI32(BBPacker.MIN_INT32);
        packer.resetIndex();
        packer.putArrI32([BBPacker.MAX_INT32]);
        packer.resetIndex();
        packer.putArrI32([BBPacker.MIN_INT32]);
        assert.throws(() => {
            packer.writeI32(0, BBPacker.MAX_INT32 + 1);
        }, () => true, "packer.writeI32( 0 , BBPacker.MAX_INT32 + 1 );");
        assert.throws(() => {
            packer.writeI32(0, BBPacker.MIN_INT32 - 1);
        }, () => true, "packer.writeI32( 0 , BBPacker.MIN_INT32 - 1 );");
        assert.throws(() => {
            packer.writeArrI32(0, [BBPacker.MAX_INT32 + 1]);
        }, () => true, "packer.writeArrI32( 0 , [ BBPacker.MAX_INT32 + 1 ]  );");
        assert.throws(() => {
            packer.writeArrI32(0, [BBPacker.MIN_INT32 - 1]);
        }, () => true, "packer.writeArrI32( 0 , [ BBPacker.MIN_INT32 - 1 ]  );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putI32(BBPacker.MAX_INT32 + 1);
        }, () => true, "packer.putI32( BBPacker.MAX_INT32 + 1  );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putI32(BBPacker.MIN_INT32 - 1);
        }, () => true, "packer.putI32( BBPacker.MIN_INT32 - 1 );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putArrI32([BBPacker.MAX_INT32 + 1]);
        }, () => true, "packer.putArrI32( [BBPacker.MAX_INT32 + 1]  );");
        assert.throws(() => {
            packer.resetIndex();
            packer.putArrI32([BBPacker.MIN_INT32 - 1]);
        }, () => true, "packer.putArrI32( [BBPacker.MIN_INT32 - 1] );");
        return assert.ok(true);
    });
    return assert.ok(true);
}
