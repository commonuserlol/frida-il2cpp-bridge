Il2Cpp.perform(() => {
    send(`\x1b[94m\x1b[1m►\x1b[22m\x1b[0m ${$EXPECTED_UNITY_VERSION}`);

    test("Il2Cpp::unityVersion", () => {
        assert($EXPECTED_UNITY_VERSION, () => Il2Cpp.unityVersion);
    });

    test("Il2Cpp::currentThread", () => {
        disavow(null, () => Il2Cpp.currentThread);
    });

    test("Il2Cpp.Thread::id", () => {
        assert(Process.getCurrentThreadId(), () => Il2Cpp.currentThread?.id);
    });

    test("Il2Cpp.Domain::handle", () => {
        disavow(NULL, () => Il2Cpp.domain.handle);
    });

    test("Il2Cpp.Domain::assemblies", () => {
        assert(true, () => Il2Cpp.domain.assemblies.length > 0);
    });

    test("Il2Cpp.Domain::object", () => {
        assert(Il2Cpp.corlib.class("System.AppDomain"), () => Il2Cpp.domain.object.class);
    });

    test("Il2Cpp.Domain::tryAssembly", () => {
        disavow(null, () => Il2Cpp.domain.tryAssembly("mscorlib"));
        assert(null, () => Il2Cpp.domain.tryAssembly("howboring"));
        disavow(null, () => Il2Cpp.domain.tryAssembly("GameAssembly"));
    });

    test("Il2Cpp.Domain::assembly", () => {
        throws("couldn't find assembly howboring", () => Il2Cpp.domain.assembly("howboring"));
    });

    test("Il2Cpp.Assembly::name", () => {
        assert("mscorlib", () => Il2Cpp.domain.assembly("mscorlib").name);
    });

    test("Il2Cpp.Assembly::image", () => {
        assert(Il2Cpp.corlib, () => Il2Cpp.domain.assembly("mscorlib").image);
    });

    test("Il2Cpp.Assembly::object", () => {
        assert(true, () => Il2Cpp.domain.assembly("mscorlib").object.class.isSubclassOf(Il2Cpp.corlib.class("System.Reflection.Assembly")));
    });

    test("Il2Cpp::corlib", () => {
        assert(Il2Cpp.domain.assembly("mscorlib").image, () => Il2Cpp.corlib);
    });

    test("Il2Cpp.Image::name", () => {
        assert("mscorlib.dll", () => Il2Cpp.corlib.name);
    });

    test("Il2Cpp.Image::assembly", () => {
        assert(Il2Cpp.domain.assembly("mscorlib"), () => Il2Cpp.corlib.assembly);
    });

    test("Il2Cpp.Image::tryClass", () => {
        assert(null, () => Il2Cpp.corlib.tryClass("System.Boring"));
        disavow(NULL, () => Il2Cpp.corlib.tryClass("System.String")?.handle ?? NULL);
        disavow(NULL, () => Il2Cpp.corlib.tryClass("<Module>")?.handle ?? NULL);
        disavow(NULL, () => Il2Cpp.corlib.tryClass("System.Collections.Generic.List`1")?.handle ?? NULL);
    });

    test("Il2Cpp.Image::class", () => {
        throws("couldn't find class System.Boring in assembly mscorlib.dll", () => Il2Cpp.corlib.class("System.Boring"));
    });

    test("Il2Cpp.Image::classes", () => {
        assert(true, () => Il2Cpp.corlib.classes.length > 0);
        assert(true, () => Il2Cpp.domain.assembly("GameAssembly").image.classes.length > 0);
    });

    test("Il2Cpp.Image::classCount", () => {
        assert(17, () => Il2Cpp.domain.assembly("GameAssembly").image.classes.length);
        assert(17, () => Il2Cpp.domain.assembly("GameAssembly").image.classCount);
    });

    test("Il2Cpp.Class::image", () => {
        assert(Il2Cpp.corlib, () => Il2Cpp.corlib.class("System.String").image);
    });

    test("Il2Cpp.Class::assemblyName", () => {
        assert("mscorlib", () => Il2Cpp.corlib.class("System.String").assemblyName);
    });

    test("Il2Cpp.Class::actualInstanceSize", () => {
        assert(1, () => Il2Cpp.corlib.class("<Module>").actualInstanceSize);
        assert(Il2Cpp.Object.headerSize, () => Il2Cpp.corlib.class("System.Void").actualInstanceSize);
        assert(Il2Cpp.Object.headerSize + 4, () => Il2Cpp.corlib.class("System.Int32").actualInstanceSize);
    });

    test("Il2Cpp.Class::arrayElementSize", () => {
        assert(0, () => Il2Cpp.corlib.class("System.Void").arrayElementSize);
        assert(1, () => Il2Cpp.corlib.class("System.Byte").arrayElementSize);
        assert(4, () => Il2Cpp.corlib.class("System.Int32").arrayElementSize);
        assert(8, () => Il2Cpp.corlib.class("System.String").arrayElementSize);
    });

    test("Il2Cpp.Class::name", () => {
        assert("String", () => Il2Cpp.corlib.class("System.String").name);
        assert("List`1", () => Il2Cpp.corlib.class("System.Collections.Generic.List`1").name);
    });

    test("Il2Cpp.Class::namespace", () => {
        assert("System", () => Il2Cpp.corlib.class("System.String").namespace);
        assert("System.Collections.Generic", () => Il2Cpp.corlib.class("System.Collections.Generic.List`1").namespace);
        assert("", () => Il2Cpp.corlib.class("<Module>").namespace);
    });

    test("Il2Cpp.Class::fullname", () => {
        assert("System.String", () => Il2Cpp.corlib.class("System.String").fullName);
        assert("System.Collections.Generic.List`1", () => Il2Cpp.corlib.class("System.Collections.Generic.List`1").fullName);
        assert("<Module>", () => Il2Cpp.corlib.class("<Module>").fullName);
    });

    test("Il2Cpp.Class::type", () => {
        disavow(NULL, () => Il2Cpp.corlib.class("System.String").type);
    });

    test("Il2Cpp.Class::isAbstract", () => {
        assert(false, () => Il2Cpp.corlib.class("System.String").isAbstract);
        assert(true, () => Il2Cpp.corlib.class("System.IComparable").isAbstract);
        assert(true, () => Il2Cpp.domain.assembly("GameAssembly").image.class("AbstractGenericClass`2").isAbstract);
        assert(false, () => Il2Cpp.domain.assembly("GameAssembly").image.class("PartiallyInflatedClass`1").isAbstract);
    });

    test("Il2Cpp.Class::isEnum", () => {
        assert(false, () => Il2Cpp.corlib.class("System.String").isEnum);
        assert(false, () => Il2Cpp.corlib.class("System.Boolean").isEnum);
        assert(true, () => Il2Cpp.corlib.class("System.DayOfWeek").isEnum);
    });

    test("Il2Cpp.Class::isValueType", () => {
        assert(false, () => Il2Cpp.corlib.class("System.String").isValueType);
        assert(true, () => Il2Cpp.corlib.class("System.Boolean").isValueType);
        assert(true, () => Il2Cpp.corlib.class("System.DayOfWeek").isValueType);
    });

    test("Il2Cpp.Class::isGeneric", () => {
        assert(false, () => Il2Cpp.corlib.class("System.String").isGeneric);
        assert(true, () => Il2Cpp.corlib.class("System.Collections.Generic.List`1").isGeneric);
    });

    test("Il2Cpp.Class::inflate", () => {
        throws("cannot inflate class System.String as it has no generic parameters", () => Il2Cpp.corlib.class("System.String").inflate());
        throws("cannot inflate class System.Collections.Generic.List<T> as it needs 1 generic parameter(s), not 0", () => {
            return Il2Cpp.corlib.class("System.Collections.Generic.List`1").inflate();
        });
        disavow(NULL, () => {
            return Il2Cpp.corlib.class("System.Action`1").inflate(Il2Cpp.corlib.class("System.String"));
        });
    });

    test("Il2Cpp.Class::isInflated", () => {
        assert(false, () => Il2Cpp.corlib.class("System.String").isInflated);
        assert(false, () => Il2Cpp.corlib.class("System.Action`1").isInflated);
        assert(true, () => Il2Cpp.corlib.class("System.Action`1").inflate(Il2Cpp.corlib.class("System.String")).isInflated);
    });

    test("Il2Cpp.Class::isInterface", () => {
        assert(false, () => Il2Cpp.corlib.class("System.String").isInterface);
        assert(true, () => Il2Cpp.corlib.class("System.IComparable").isInterface);
        assert(false, () => Il2Cpp.domain.assembly("GameAssembly").image.class("AbstractGenericClass`2").isInterface);
        assert(false, () => Il2Cpp.domain.assembly("GameAssembly").image.class("PartiallyInflatedClass`1").isInterface);
    });

    test("Il2Cpp.Class::declaringClass", () => {
        assert(null, () => Il2Cpp.corlib.class("System.Array").declaringClass);
        assert(Il2Cpp.corlib.class("System.Threading.Timer"), () => {
            return Il2Cpp.corlib.class("System.Threading.Timer").nested("Scheduler").declaringClass;
        });
    });

    test("Il2Cpp.Class::arrayClass", () => {
        assert("String[]", () => Il2Cpp.corlib.class("System.String").arrayClass.name);
        assert("String[][]", () => Il2Cpp.corlib.class("System.String").arrayClass.arrayClass.name);
    });

    test("Il2Cpp.Class::elementClass", () => {
        const Method = () => Il2Cpp.domain.assembly("GameAssembly").image.class("Class").method("Method");

        assert(Il2Cpp.corlib.class("System.Boolean"), () => Il2Cpp.corlib.class("System.Boolean").arrayClass.elementClass);
        assert(Il2Cpp.corlib.class("System.Boolean"), () => Method().parameter("pointer").type.class.elementClass);
        assert(Il2Cpp.corlib.class("System.Boolean"), () => Method().parameter("reference").type.class.elementClass);
        assert(Il2Cpp.corlib.class("System.Boolean"), () => Method().parameter("array").type.class.elementClass);
    });

    test("Il2Cpp.Class::baseType", () => {
        const Method = () => Il2Cpp.domain.assembly("GameAssembly").image.class("Class").method("Method");

        assert(null, () => Il2Cpp.corlib.class("System.Boolean").baseType);
        assert(Il2Cpp.corlib.class("System.Boolean").type, () => Il2Cpp.corlib.class("System.Boolean").arrayClass.baseType);
        assert(Il2Cpp.corlib.class("System.Boolean").arrayClass.type, () => Il2Cpp.corlib.class("System.Boolean").arrayClass.arrayClass.baseType);
        assert(Il2Cpp.corlib.class("System.Int32").type, () => Il2Cpp.corlib.class("System.DayOfWeek").baseType);
        assert(null, () => Method().parameter("reference").type.class.baseType);
        assert(Il2Cpp.corlib.class("System.Boolean").type, () => Method().parameter("pointer").type.class.baseType);
        assert(Il2Cpp.corlib.class("System.Boolean").type, () => Method().parameter("array").type.class.baseType);
    });

    test("Il2Cpp.String::content", () => {
        assert("vfsfitvnm", () => Il2Cpp.string("vfsfitvnm").content);
    });

    test("Il2Cpp.String::length", () => {
        assert(9, () => Il2Cpp.string("vfsfitvnm").length);
    });

    test("Il2Cpp.String::content", () => {
        const string = Il2Cpp.string("vfsfitvnm");
        string.content = "frida-il2cpp-bridge";

        assert("frida-il2cpp-bridge", () => string.content);
        assert(19, () => string.length);
    });

    test("Il2Cpp.String::object", () => {
        assert(Il2Cpp.corlib.class("System.String"), () => Il2Cpp.string("vfsfitvnm").object.class);
    });

    test("Il2Cpp.Array::get", () => {
        assert(-2442, () => {
            const SystemInt32 = Il2Cpp.corlib.class("System.Int32");
            const array = Il2Cpp.array(SystemInt32, [0, -1, 12, 3900, -2442, 99]);
            return array.get(4);
        });
    });

    test("Il2Cpp.Array::set", () => {
        assert(2147483647, () => {
            const SystemInt32 = Il2Cpp.corlib.class("System.Int32");
            const array = Il2Cpp.array(SystemInt32, [0, -1, 12, 3900, -2442, 99]);
            array.set(4, 2147483647);
            return array.get(4);
        });
    });

    test("Invoking a method with a primive parameter", () => {
        const PrimitivesTests = Il2Cpp.domain.assembly("GameAssembly").image.class("PrimitivesTests");
        assert(true, () => PrimitivesTests.method("BoolMethod").invoke());
        assert(false, () => PrimitivesTests.method("BoolArgumentMethod").invoke(true));

        assert(-1, () => PrimitivesTests.method("SByteMethod").invoke());
        assert(0, () => PrimitivesTests.method("SByteArgumentMethod").invoke(0xff));

        assert(0xff, () => PrimitivesTests.method("ByteMethod").invoke());
        assert(0, () => PrimitivesTests.method("ByteArgumentMethod").invoke(0xff));

        assert(-1, () => PrimitivesTests.method("ShortMethod").invoke());
        assert(0, () => PrimitivesTests.method("ShortArgumentMethod").invoke(0xffff));

        assert(0xffff, () => PrimitivesTests.method("UShortMethod").invoke());
        assert(65280, () => PrimitivesTests.method("UShortArgumentMethod").invoke(0xff));

        assert(-1, () => PrimitivesTests.method("IntMethod").invoke());
        assert(-4096, () => PrimitivesTests.method("IntArgumentMethod").invoke(0xfff));

        assert(0xffffffff, () => PrimitivesTests.method("UIntMethod").invoke());
        assert(4293918720, () => PrimitivesTests.method("UIntArgumentMethod").invoke(0xfffff));

        assert(0xffffffffff, () => PrimitivesTests.method("LongMethod").invoke());
        assert(-1048576, () => PrimitivesTests.method("LongArgumentMethod").invoke(0xfffff));

        assert(1099511627775, () => PrimitivesTests.method("ULongMethod").invoke());
        assert(true, () => uint64("18446726481523507200").equals(PrimitivesTests.method("ULongArgumentMethod").invoke(0xfffffffffff)));

        assert(3.140000104904175, () => PrimitivesTests.method("FloatMethod").invoke());
        assert(6.28000020980835, () => PrimitivesTests.method("FloatArgumentMethod").invoke(3.14));

        assert(3.1416, () => PrimitivesTests.method("DoubleMethod").invoke());
        assert(12.5664, () => PrimitivesTests.method("DoubleArgumentMethod").invoke(3.1416));

        assert(ptr(0xdeadbeef), () => PrimitivesTests.method("IntPtrMethod").invoke());
        assert(ptr(0xdead80ce), () => PrimitivesTests.method("IntPtrArgumentMethod").invoke(ptr(0xdeadbeef)));

        assert("frida-il2cpp-bridge", () => PrimitivesTests.method("StringMethod").invoke().content);
        assert("FRIDA-IL2CPP-BRIDGE", () => PrimitivesTests.method("StringArgumentMethod").invoke(Il2Cpp.string("frida-il2cpp-bridge")).content);

        assert(42, () => PrimitivesTests.method("StructMethod").invoke().field("a").value);
        assert(43, () => PrimitivesTests.method("StructArgumentMethod").invoke(PrimitivesTests.method("StructMethod").invoke()).field("a").value);

        assert(1, () => PrimitivesTests.method("EnumMethod").invoke().field("value__").value);
        assert(2, () => PrimitivesTests.method("EnumArgumentMethod").invoke(PrimitivesTests.method("EnumMethod").invoke()).field("value__").value);
    });

    test("Every enum base type matches its 'value__' field type", () => {
        Il2Cpp.domain.assemblies.forEach(_ => {
            _.image.classes
                .filter(_ => _.isEnum)
                .forEach(_ => {
                    assert(_.field("value__").type.name, () => _.baseType.name);
                });
        });
    });

    test("Structs fields are read correctly", () => {
        assert(ptr(0xdeadbeef), () => {
            const runtimeTypeHandle = Il2Cpp.corlib.class("System.RuntimeTypeHandle").alloc();
            runtimeTypeHandle.method(".ctor").invoke(ptr(0xdeadbeef));
            return runtimeTypeHandle.unbox().field("value").value;
        });
    });

    test("Enums fields are read correctly", () => {
        assert(6, () => {
            const saturday = Il2Cpp.corlib.class("System.DayOfWeek").field("Saturday").value;
            return saturday.field("value__").value;
        });
    });

    test("Boxed structs fields are read correctly", () => {
        assert(ptr(0xdeadbeef), () => {
            const runtimeTypeHandle = Il2Cpp.corlib.class("System.RuntimeTypeHandle").alloc();
            runtimeTypeHandle.method(".ctor").invoke(ptr(0xdeadbeef));
            return runtimeTypeHandle.field("value").value;
        });
    });

    test("Boxed structs methods are invoked correctly", () => {
        assert(ptr(0xdeadbeef), () => {
            const runtimeTypeHandle = Il2Cpp.corlib.class("System.RuntimeTypeHandle").alloc();
            runtimeTypeHandle.method(".ctor").invoke(ptr(0xdeadbeef));
            return runtimeTypeHandle.handle.add(runtimeTypeHandle.field("value").offset).readPointer();
        });
        assert(ptr(0xdeadbeef), () => {
            const runtimeTypeHandle = Il2Cpp.corlib.class("System.RuntimeTypeHandle").alloc();
            runtimeTypeHandle.method(".ctor").invoke(ptr(0xdeadbeef));
            return runtimeTypeHandle.method("get_Value").invoke();
        });
        assert("System.RuntimeTypeHandle", () => Il2Cpp.corlib.class("System.RuntimeTypeHandle").alloc().toString());
    });

    test("Structs methods are invoked correctly", () => {
        assert(ptr(0xdeadbeef), () => {
            const runtimeTypeHandle = Il2Cpp.corlib.class("System.RuntimeTypeHandle").alloc().unbox();
            runtimeTypeHandle.method(".ctor").invoke(ptr(0xdeadbeef));
            return runtimeTypeHandle.method("get_Value").invoke();
        });
        assert("System.RuntimeTypeHandle", () => Il2Cpp.corlib.class("System.RuntimeTypeHandle").alloc().toString());
    });

    test("Boxing/unboxing structs works correctly", () => {
        assert(ptr(0xdeadbeef), () => {
            const runtimeTypeHandle = Il2Cpp.corlib.class("System.RuntimeTypeHandle").alloc();
            runtimeTypeHandle.method(".ctor").invoke(ptr(0xdeadbeef));
            return runtimeTypeHandle.unbox().box().unbox().box().field("value").value;
        });
    });

    test("Boxed enums fields are read correctly", () => {
        assert(1, () => {
            const MemberTypes = Il2Cpp.corlib.class("System.Reflection.MemberTypes");
            return MemberTypes.field("Constructor").value.box().field("value__").value;
        });
    });

    test("Il2Cpp.Field::value::get (static)", () => {
        assert(46, () => Il2Cpp.corlib.class("System.Type").initialize().field("Delimiter").value);
        assert("Second", () => Il2Cpp.domain.assembly("GameAssembly").image.class("Class").initialize().field("enumfield").value.toString());
        assert("79228162514264337593543950335", () => Il2Cpp.corlib.class("System.Decimal").initialize().field("MaxValue").value.toString());
        assert("True", () => Il2Cpp.corlib.class("System.Boolean").initialize().field("TrueString").value.content);
    });

    test("Il2Cpp.Field::value::set (static)", () => {
        assert(48, () => {
            const SystemType = Il2Cpp.corlib.class("System.Type").initialize();
            SystemType.field("Delimiter").value = 48;
            return SystemType.field("Delimiter").value;
        });
        assert(48, () => {
            const SystemType = Il2Cpp.corlib.class("System.Type").initialize();
            const value = SystemType.field("Delimiter").type.class.alloc();
            value.field("m_value").value = 48;
            SystemType.field("Delimiter").value = value;
            return SystemType.field("Delimiter").value;
        });
        assert("Third", () => {
            const Class = Il2Cpp.domain.assembly("GameAssembly").image.class("Class");
            Class.field("enumfield").value = Class.field("enumfield").type.class.field("Third").value;
            return Class.field("enumfield").value.toString();
        });
        assert("123456", () => {
            const SystemDecimal = Il2Cpp.corlib.class("System.Decimal").initialize();
            const value = SystemDecimal.alloc();
            value.method(".ctor", 1).invoke(123456);
            SystemDecimal.field("MaxValue").value = value;
            return SystemDecimal.field("MaxValue").value.toString();
        });
        assert("VeryTrue", () => {
            const SystemBoolean = Il2Cpp.corlib.class("System.Boolean").initialize();
            SystemBoolean.field("TrueString").value = Il2Cpp.string("VeryTrue");
            return SystemBoolean.field("TrueString").value.content;
        });
    });

    test("Invoke a method that returns an enum value", () => {
        assert("Unix", () => Il2Cpp.corlib.class("System.Environment").method("get_Platform").invoke().toString());
    });

    test("Invoke a method that takes an enum value", () => {
        assert("Sunday", () => {
            const DateTimeFormatInfo = Il2Cpp.corlib.class("System.Globalization.DateTimeFormatInfo").initialize();
            const DayOfWeek = Il2Cpp.corlib.class("System.DayOfWeek");
            return DateTimeFormatInfo.new().method("GetDayName").invoke(DayOfWeek.field("Sunday").value).content;
        });
    });

    test("Invoke a method that returns an array value", () => {
        assert(["F", "r", "i", "d", "a"], () => {
            const ArrayMethod = Il2Cpp.domain.assembly("GameAssembly").image.class("Class").method("ArrayMethod");
            return Array.from(ArrayMethod.invoke()).map(_ => String.fromCodePoint(_));
        });
    });

    test("Invoke a method that takes an array value", () => {
        const ArrayMethod = Il2Cpp.domain.assembly("GameAssembly").image.class("Class").method("ArrayArgumentMethod");
        assert(false, () => ArrayMethod.invoke(Il2Cpp.array(Il2Cpp.corlib.class("System.Char"), [])));
        assert(true, () =>
            ArrayMethod.invoke(
                Il2Cpp.array(
                    Il2Cpp.corlib.class("System.Char"),
                    ["F", "r", "i", "d", "a"].map(_ => _.charCodeAt(0))
                )
            )
        );
    });

    test("Invoke a method that returns a multidimensional array value", () => {
        const Array2DMethod = Il2Cpp.domain.assembly("GameAssembly").image.class("Class").method("Array2DMethod");
        assert(
            [
                [1, 3, 3, 7],
                [6, 6, 6],
                [4, 2]
            ],
            () => Array.from(Array2DMethod.invoke()).map(_ => Array.from(_))
        );
    });

    test("Invoke a method that takes a multidimensional array value", () => {
        const Array2DMethod = Il2Cpp.domain.assembly("GameAssembly").image.class("Class").method("Array2DArgumentMethod");
        assert(false, () => Array2DMethod.invoke(Il2Cpp.array(Il2Cpp.corlib.class("System.Int32"), [])));
        assert(true, () => {
            const firstArray = Il2Cpp.array(Il2Cpp.corlib.class("System.Int32"), [1, 3, 3, 7]);
            const secondArray = Il2Cpp.array(Il2Cpp.corlib.class("System.Int32"), [6, 6, 6]);
            const thirdArray = Il2Cpp.array(Il2Cpp.corlib.class("System.Int32"), [4, 2]);
            return Array2DMethod.invoke(Il2Cpp.array(Il2Cpp.corlib.class("System.Int32").arrayClass, [firstArray, secondArray, thirdArray]));
        });
    });

    test("References to value types are created correctly", () => {
        const Decimal = Il2Cpp.corlib.class("System.Decimal").initialize();

        const x = Decimal.alloc().unbox();
        const y = Decimal.alloc().unbox();

        x.method(".ctor").overload("System.Int32").invoke(-1234);
        y.method(".ctor").overload("System.Int32").invoke(777);

        const xRef = Il2Cpp.reference(x);

        assert(1234, () => xRef.handle.add(Decimal.field("lo").offset - Il2Cpp.Object.headerSize).readInt());

        assert(-1, () => {
            const Compare = Decimal.tryMethod("FCallCompare") ?? Decimal.tryMethod("decimalCompare");
            return Compare ? Compare.invoke(xRef, Il2Cpp.reference(y)) : Decimal.method("Sign").invoke(xRef);
        });
    });

    send(summary);
});

const summary = { type: "summary", passed: 0, failed: 0 };

function test(name, block) {
    const time = +new Date();
    try {
        block();
        const duration = +new Date() - time;
        send(`  \x1b[32m\x1b[1m✓\x1b[22m ${name}\x1b[0m \x1b[2m${duration}ms\x1b[0m`);
        summary.passed++;
    } catch (e) {
        send(`  \x1b[31m\x1b[1m𐄂\x1b[22m ${name}\n    ${e.stack}\x1b[0m`);
        summary.failed++;
    }
}

function eq(a, b) {
    return a instanceof NativePointer || a instanceof NativeStruct
        ? a.equals(b)
        : a instanceof Array || b instanceof Array
        ? JSON.stringify(a) == JSON.stringify(b)
        : a == b;
}

function assert(expected, getActual) {
    const actual = getActual();
    if (!eq(expected, actual)) {
        throw new Error(`${getActual}\n    \x1b[1m${expected}\x1b[22m was expected, but got \x1b[1m${actual}\x1b[22m`);
    }
}

function disavow(unexpected, getActual) {
    const actual = getActual();
    if (eq(unexpected, actual)) {
        throw new Error(`${getActual}\n    \x1b[1m${unexpected}\x1b[22m was not expected`);
    }
}

function throws(expected, block) {
    try {
        block();
        throw new Error("no errors");
    } catch (e) {
        assert(expected, () => e.message.replaceAll(/\x1b\[[^m]+m/g, ""));
    }
}
