import { it } from 'node:test';
import assert from 'node:assert/strict';
import { BBPacker } from "../../dist/BBPacker.js";
export async function tst8() {
    it('From', async (ctx) => {
        await ctx.test("fromUint8", () => {
            const packer = BBPacker.fromUint8([0x55, 0xAA]);
            if (packer.arrayBufferSize != (2 * BBPacker.SIZE8)) {
                throw new Error("packer.arrayBufferSize != (2*BBPacker.SIZE8)");
            }
            const arr = packer.readArrU8(0);
            if (arr[0] != 0x55) {
                throw new Error("arr[0] != 0x55");
            }
            if (arr[1] != 0xAA) {
                throw new Error("arr[1] != 0xAA");
            }
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
            const packer1 = BBPacker.fromUint8([0, 0], {
                index: 1,
                littleEndian: false,
                bitIndexReverse: true,
                throwAtRangeOverflow: true
            });
            if (packer1.index != 1) {
                throw new Error("packer1.index != 1");
            }
            if (packer1.littleEndian != false) {
                throw new Error("packer1.littleEndian != false");
            }
            if (packer1.bitIndexReverse != true) {
                throw new Error("packer1.bitIndexReverse != true");
            }
            if (packer1.throwAtRangeOverflow != true) {
                throw new Error("packer1.throwAtRangeOverflow != true");
            }
            return assert.ok(true);
        });
        await ctx.test("fromInt8", () => {
            const packer = BBPacker.fromInt8([-100, 123]);
            if (packer.arrayBufferSize != (2 * BBPacker.SIZE8)) {
                throw new Error("packer.arrayBufferSize != (2*BBPacker.SIZE8)");
            }
            const arr = packer.readArrI8(0);
            if (arr[0] != -100) {
                throw new Error("arr[0] != -100");
            }
            if (arr[1] != 123) {
                throw new Error("arr[1] != 123");
            }
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
            const packer1 = BBPacker.fromInt8([0, 0], {
                index: 1,
                littleEndian: false,
                bitIndexReverse: true,
                throwAtRangeOverflow: true
            });
            if (packer1.index != 1) {
                throw new Error("packer1.index != 1");
            }
            if (packer1.littleEndian != false) {
                throw new Error("packer1.littleEndian != false");
            }
            if (packer1.bitIndexReverse != true) {
                throw new Error("packer1.bitIndexReverse != true");
            }
            if (packer1.throwAtRangeOverflow != true) {
                throw new Error("packer1.throwAtRangeOverflow != true");
            }
            return assert.ok(true);
        });
        await ctx.test("fromUint16", () => {
            const packer = BBPacker.fromUint16([0x5555, 0xAAAA]);
            if (packer.arrayBufferSize != (2 * BBPacker.SIZE16)) {
                throw new Error("packer.arrayBufferSize != (2*BBPacker.SIZE16)");
            }
            const arr = packer.readArrU16(0);
            if (arr[0] != 0x5555) {
                throw new Error("arr[0] != 0x5555");
            }
            if (arr[1] != 0xAAAA) {
                throw new Error("arr[1] != 0xAAAA");
            }
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
            const packer1 = BBPacker.fromUint16([0, 0], {
                index: 1,
                littleEndian: false,
                bitIndexReverse: true,
                throwAtRangeOverflow: true
            });
            if (packer1.index != 1) {
                throw new Error("packer1.index != 1");
            }
            if (packer1.littleEndian != false) {
                throw new Error("packer1.littleEndian != false");
            }
            if (packer1.bitIndexReverse != true) {
                throw new Error("packer1.bitIndexReverse != true");
            }
            if (packer1.throwAtRangeOverflow != true) {
                throw new Error("packer1.throwAtRangeOverflow != true");
            }
            return assert.ok(true);
        });
        await ctx.test("fromInt16", () => {
            const packer = BBPacker.fromInt16([-1000, 1000]);
            if (packer.arrayBufferSize != (2 * BBPacker.SIZE16)) {
                throw new Error("packer.arrayBufferSize != (2*BBPacker.SIZE16)");
            }
            const arr = packer.readArrI16(0);
            if (arr[0] != -1000) {
                throw new Error("arr[0] != -1000");
            }
            if (arr[1] != 1000) {
                throw new Error("arr[1] != 1000");
            }
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
            const packer1 = BBPacker.fromInt16([0, 0], {
                index: 1,
                littleEndian: false,
                bitIndexReverse: true,
                throwAtRangeOverflow: true
            });
            if (packer1.index != 1) {
                throw new Error("packer1.index != 1");
            }
            if (packer1.littleEndian != false) {
                throw new Error("packer1.littleEndian != false");
            }
            if (packer1.bitIndexReverse != true) {
                throw new Error("packer1.bitIndexReverse != true");
            }
            if (packer1.throwAtRangeOverflow != true) {
                throw new Error("packer1.throwAtRangeOverflow != true");
            }
            return assert.ok(true);
        });
        await ctx.test("fromUint32", () => {
            const packer = BBPacker.fromUint32([0x5555_AAAA, 0xAAAA_AAAA]);
            if (packer.arrayBufferSize != (2 * BBPacker.SIZE32)) {
                throw new Error("packer.arrayBufferSize != (2*BBPacker.SIZE32)");
            }
            const arr = packer.readArrU32(0);
            if (arr[0] != 0x5555_AAAA) {
                throw new Error("arr[0] != 0x5555_AAAA");
            }
            if (arr[1] != 0xAAAA_AAAA) {
                throw new Error("arr[1] != 0xAAAA_AAAA");
            }
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
            const packer1 = BBPacker.fromUint32([0, 0], {
                index: 1,
                littleEndian: false,
                bitIndexReverse: true,
                throwAtRangeOverflow: true
            });
            if (packer1.index != 1) {
                throw new Error("packer1.index != 1");
            }
            if (packer1.littleEndian != false) {
                throw new Error("packer1.littleEndian != false");
            }
            if (packer1.bitIndexReverse != true) {
                throw new Error("packer1.bitIndexReverse != true");
            }
            if (packer1.throwAtRangeOverflow != true) {
                throw new Error("packer1.throwAtRangeOverflow != true");
            }
            return assert.ok(true);
        });
        await ctx.test("fromInt32", () => {
            const packer = BBPacker.fromInt32([-100000, 100000]);
            if (packer.arrayBufferSize != (2 * BBPacker.SIZE32)) {
                throw new Error("packer.arrayBufferSize != (2*BBPacker.SIZE32)");
            }
            const arr = packer.readArrI32(0);
            if (arr[0] != -100000) {
                throw new Error("arr[0] != -100000");
            }
            if (arr[1] != 100000) {
                throw new Error("arr[1] != 100000");
            }
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
            const packer1 = BBPacker.fromInt32([0, 0], {
                index: 1,
                littleEndian: false,
                bitIndexReverse: true,
                throwAtRangeOverflow: true
            });
            if (packer1.index != 1) {
                throw new Error("packer1.index != 1");
            }
            if (packer1.littleEndian != false) {
                throw new Error("packer1.littleEndian != false");
            }
            if (packer1.bitIndexReverse != true) {
                throw new Error("packer1.bitIndexReverse != true");
            }
            if (packer1.throwAtRangeOverflow != true) {
                throw new Error("packer1.throwAtRangeOverflow != true");
            }
            return assert.ok(true);
        });
        await ctx.test("fromUint64", () => {
            const packer = BBPacker.fromUint64([{ hi: 1, lo: 0x5555 }, { hi: 2, lo: 0xAAAA }]);
            if (packer.arrayBufferSize != (2 * BBPacker.SIZE64)) {
                throw new Error("packer.arrayBufferSize != (2*BBPacker.SIZE64)");
            }
            const arr = packer.readArrU64(0);
            if ((arr[0].hi != 1) || (arr[0].lo != 0x5555)) {
                throw new Error("(arr[0].hi != 1) || (arr[0].lo != 0x5555)");
            }
            if ((arr[1].hi != 2) || (arr[1].lo != 0xAAAA)) {
                throw new Error("(arr[1].hi != 2) || (arr[1].lo != 0xAAAA)");
            }
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
            const packer1 = BBPacker.fromUint64([{ hi: 1, lo: 0x5555 }, { hi: 2, lo: 0xAAAA }], {
                index: 1,
                littleEndian: false,
                bitIndexReverse: true,
                throwAtRangeOverflow: true
            });
            if (packer1.index != 1) {
                throw new Error("packer1.index != 1");
            }
            if (packer1.littleEndian != false) {
                throw new Error("packer1.littleEndian != false");
            }
            if (packer1.bitIndexReverse != true) {
                throw new Error("packer1.bitIndexReverse != true");
            }
            if (packer1.throwAtRangeOverflow != true) {
                throw new Error("packer1.throwAtRangeOverflow != true");
            }
            return assert.ok(true);
        });
        await ctx.test("fromInt64", () => {
            const packer = BBPacker.fromInt64([{ hi: -1, lo: 0x5555 }, { hi: 2, lo: 0xAAAA }]);
            if (packer.arrayBufferSize != (2 * BBPacker.SIZE64)) {
                throw new Error("packer.arrayBufferSize != (2*BBPacker.SIZE64)");
            }
            const arr = packer.readArrI64(0);
            if ((arr[0].hi != -1) || (arr[0].lo != 0x5555)) {
                throw new Error("(arr[0].hi != -1) || (arr[0].lo != 0x5555)");
            }
            if ((arr[1].hi != 2) || (arr[1].lo != 0xAAAA)) {
                throw new Error("(arr[1].hi != 2) || (arr[1].lo != 0xAAAA)");
            }
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
            const packer1 = BBPacker.fromInt64([{ hi: 1, lo: 0x5555 }, { hi: 2, lo: 0xAAAA }], {
                index: 1,
                littleEndian: false,
                bitIndexReverse: true,
                throwAtRangeOverflow: true
            });
            if (packer1.index != 1) {
                throw new Error("packer1.index != 1");
            }
            if (packer1.littleEndian != false) {
                throw new Error("packer1.littleEndian != false");
            }
            if (packer1.bitIndexReverse != true) {
                throw new Error("packer1.bitIndexReverse != true");
            }
            if (packer1.throwAtRangeOverflow != true) {
                throw new Error("packer1.throwAtRangeOverflow != true");
            }
            return assert.ok(true);
        });
        await ctx.test("fromFloat32", () => {
            const packer = BBPacker.fromFloat32([-123, 100]);
            if (packer.arrayBufferSize != (2 * BBPacker.SIZE32)) {
                throw new Error("packer.arrayBufferSize != (2*BBPacker.SIZE32)");
            }
            const arr = packer.readArrF32(0);
            if (Math.floor(arr[0]) != -123) {
                throw new Error("Math.floor(arr[0]) != -123");
            }
            if (Math.floor(arr[1]) != 100) {
                throw new Error("Math.floor(arr[1]) != 100");
            }
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
            const packer1 = BBPacker.fromFloat32([100, 100], {
                index: 1,
                littleEndian: false,
                bitIndexReverse: true,
                throwAtRangeOverflow: true
            });
            if (packer1.index != 1) {
                throw new Error("packer1.index != 1");
            }
            if (packer1.littleEndian != false) {
                throw new Error("packer1.littleEndian != false");
            }
            if (packer1.bitIndexReverse != true) {
                throw new Error("packer1.bitIndexReverse != true");
            }
            if (packer1.throwAtRangeOverflow != true) {
                throw new Error("packer1.throwAtRangeOverflow != true");
            }
            return assert.ok(true);
        });
        await ctx.test("fromFloat64", () => {
            const packer = BBPacker.fromFloat64([-123, 100]);
            if (packer.arrayBufferSize != (2 * BBPacker.SIZE64)) {
                throw new Error("packer.arrayBufferSize != (2*BBPacker.SIZE64)");
            }
            const arr = packer.readArrF64(0);
            if (Math.floor(arr[0]) != -123) {
                throw new Error("Math.floor(arr[0]) != -123");
            }
            if (Math.floor(arr[1]) != 100) {
                throw new Error("Math.floor(arr[1]) != 100");
            }
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
            const packer1 = BBPacker.fromFloat64([100, 100], {
                index: 1,
                littleEndian: false,
                bitIndexReverse: true,
                throwAtRangeOverflow: true
            });
            if (packer1.index != 1) {
                throw new Error("packer1.index != 1");
            }
            if (packer1.littleEndian != false) {
                throw new Error("packer1.littleEndian != false");
            }
            if (packer1.bitIndexReverse != true) {
                throw new Error("packer1.bitIndexReverse != true");
            }
            if (packer1.throwAtRangeOverflow != true) {
                throw new Error("packer1.throwAtRangeOverflow != true");
            }
            return assert.ok(true);
        });
        return assert.ok(true);
    });
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    return assert.ok(true);
}
