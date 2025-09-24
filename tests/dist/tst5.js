import { it } from 'node:test';
import assert from 'node:assert/strict';
import { BBPacker } from "../../dist/BBPacker.js";
export async function tst5() {
    it('ReadWriteF64', async (ctx) => {
        await ctx.test("readF64", () => {
            let packer = new BBPacker(8, { littleEndian: true });
            const dig = -1123423.2345;
            packer.writeF64(0, dig);
            if (packer.readF64(0) != dig) {
                throw new Error("packer.readF64(0) != dig");
            }
            packer.writeF64(0, dig, false);
            if (packer.readF64(0, false) != dig) {
                throw new Error("packer.readF64(0,false) != dig");
            }
            assert.throws(() => {
                packer.readF64(1);
            }, () => true, " packer.readF64( 1 );");
            return assert.ok(true);
        });
        await ctx.test("writeArrF64,readArrF64", () => {
            let packer = new BBPacker(17, { littleEndian: true });
            const dig1 = -123456.23435;
            const dig2 = 87654.987765;
            packer.writeArrF64(0, [dig1, dig2]);
            assert.throws(() => {
                packer.writeArrF64(2, [0.0, 0.0]);
            }, () => true, "packer.writeArrF64( 2 ,  [ 0.0 , 0.0 ] );");
            assert.throws(() => {
                packer.writeArrF64(0, [0.0, 0.0, 0.0]);
            }, () => true, "packer.writeArrF64( 0 ,  [ 0.0 , 0.0 , 0.0 ] );");
            assert.throws(() => {
                packer.readArrF64(0, 3);
            }, () => true, "packer.readArrF64( 0 ,  3 );");
            assert.throws(() => {
                packer.readArrF64(17);
            }, () => true, "packer.readArrF64( 17 );");
            const arr1 = packer.readArrF64(0);
            if (arr1.length != 2) {
                throw new Error("arr1.length != 2");
            }
            if (arr1[0] != dig1) {
                throw new Error("arr1[0] != dig1");
            }
            if (arr1[1] != dig2) {
                throw new Error("arr1[1] !=dig2");
            }
            const arr2 = packer.readArrF64(0, 1);
            if (arr2.length != 1) {
                throw new Error("arr2.length != 1");
            }
            if (arr2[0] != dig1) {
                throw new Error("arr2[0] != dig1");
            }
            packer.writeArrF64(0, [dig1, dig2], false);
            const arr3 = packer.readArrF64(0, false);
            if (arr3.length != 2) {
                throw new Error("arr3.length != 2");
            }
            if (arr3[0] != dig1) {
                throw new Error("arr3[0] != dig1");
            }
            if (arr3[1] != dig2) {
                throw new Error("arr3[1] != dig2");
            }
            const arr4 = packer.readArrF64(0, 1, false);
            if (arr4.length != 1) {
                throw new Error("arr4.length != 1");
            }
            if (arr4[0] != dig1) {
                throw new Error("arr4[0] != dig1");
            }
            return assert.ok(true);
        });
        await ctx.test("putF64,getF64", () => {
            let packer = new BBPacker(16, { littleEndian: true });
            const dig1 = -123456.23435;
            const dig2 = 87654.987765;
            packer.putF64(dig1);
            packer.putF64(dig2);
            packer.resetIndex();
            if (packer.getF64() != dig1) {
                throw new Error("packer.getF64() != dig1");
            }
            if (packer.getF64() != dig2) {
                throw new Error("packer.getF64() != dig2");
            }
            packer.resetIndex();
            packer.putF64(dig1, false);
            packer.putF64(dig2, false);
            packer.resetIndex();
            if (packer.getF64(false) != dig1) {
                throw new Error("packer.getF64(false) !=  dig1");
            }
            if (packer.getF64(false) != dig2) {
                throw new Error("packer.getF64(false) != dig2");
            }
            assert.throws(() => {
                packer.putF64(0.0);
            }, () => true, "packer.putF64( 0.0  );");
            assert.throws(() => {
                packer.getF64();
            }, () => true, "packer.getF64(  );");
            return assert.ok(true);
        });
        await ctx.test("putArrF64,getArrF64", () => {
            let packer = new BBPacker(17, { littleEndian: true });
            const dig1 = -123456.23435;
            const dig2 = 87654.987765;
            packer.putArrF64([dig1, dig2]);
            assert.throws(() => {
                packer.putArrF64([0.0]);
            }, () => true, "packer.putArrF64( [ 0.0 ] );");
            assert.throws(() => {
                packer.getArrF64();
            }, () => true, "packer.getArrF64( );");
            packer.resetIndex();
            const arr1 = packer.getArrF64();
            if (arr1.length != 2) {
                throw new Error("arr1.length != 2");
            }
            if (arr1[0] != dig1) {
                throw new Error("arr1[0] != dig1");
            }
            if (arr1[1] != dig2) {
                throw new Error("arr1[1] != dig2");
            }
            packer.resetIndex();
            const arr2 = packer.getArrF64(1);
            if (arr2.length != 1) {
                throw new Error("arr2.length != 1");
            }
            if (arr2[0] != dig1) {
                throw new Error("arr2[0] != dig1");
            }
            packer.resetIndex();
            packer.putArrF64([dig1, dig2], false);
            packer.resetIndex();
            const arr3 = packer.getArrF64(false);
            if (arr3.length != 2) {
                throw new Error("arr3.length != 2");
            }
            if (arr3[0] != dig1) {
                throw new Error("arr3[0] != dig1");
            }
            if (arr3[1] != dig2) {
                throw new Error("arr3[1] != dig2");
            }
            packer.resetIndex();
            const arr4 = packer.getArrF64(1, false);
            if (arr4.length != 1) {
                throw new Error("arr4.length != 1");
            }
            if (arr4[0] != dig1) {
                throw new Error("arr4[0] != dig1");
            }
            return assert.ok(true);
        });
        return assert.ok(true);
    });
    return assert.ok(true);
}
