/** @internal */
function allocNativeParameter(value: any, type: Il2Cpp.Type) {
    switch (type.typeEnum) {
        case Il2Cpp.Type.enum.boolean:
            return Memory.alloc(1).writeS8(+value);
        case Il2Cpp.Type.enum.byte:
            return Memory.alloc(1).writeS8(value);
        case Il2Cpp.Type.enum.unsignedByte:
            return Memory.alloc(1).writeU8(value);
        case Il2Cpp.Type.enum.short:
            return Memory.alloc(2).writeS16(value);
        case Il2Cpp.Type.enum.unsignedShort:
            return Memory.alloc(2).writeU16(value);
        case Il2Cpp.Type.enum.int:
            return Memory.alloc(4).writeS32(value);
        case Il2Cpp.Type.enum.unsignedInt:
            return Memory.alloc(4).writeU32(value);
        case Il2Cpp.Type.enum.char:
            return Memory.alloc(2).writeU16(value);
        case Il2Cpp.Type.enum.long:
            return Memory.alloc(8).writeS64(value);
        case Il2Cpp.Type.enum.unsignedLong:
            return Memory.alloc(8).writeU64(value);
        case Il2Cpp.Type.enum.float:
            return Memory.alloc(4).writeFloat(value);
        case Il2Cpp.Type.enum.double:
            return Memory.alloc(8).writeDouble(value);
        case Il2Cpp.Type.enum.nativePointer:
        case Il2Cpp.Type.enum.unsignedNativePointer:
        case Il2Cpp.Type.enum.pointer:
        case Il2Cpp.Type.enum.string:
        case Il2Cpp.Type.enum.multidimensionalArray:
            return Memory.alloc(Process.pointerSize).writePointer(value);
        case Il2Cpp.Type.enum.valueType:
            return Memory.dup(value, type.class.valueTypeSize);
        case Il2Cpp.Type.enum.object:
        case Il2Cpp.Type.enum.class:
        case Il2Cpp.Type.enum.genericInstance:
            return value instanceof Il2Cpp.ValueType ? Memory.dup(value, type.class.valueTypeSize) : Memory.alloc(Process.pointerSize).writePointer(value);
        case Il2Cpp.Type.enum.array:
            return value;
    }
}
