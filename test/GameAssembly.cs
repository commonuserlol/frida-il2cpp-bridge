using System;

class Class : Interface
{
    static int sfield;

    int field;

    static Enum enumfield;

    static Class()
    {
        Class.enumfield = Enum.Second;
    }

    unsafe void Method(bool* pointer, ref bool reference, bool[] array)
    {
        Class.sfield++;
        this.field++;
    }

    static void StaticGenericMethod<T, U>(T t, U u)
    {

    }

    static char[] ArrayMethod()
    {
        return "Frida".ToCharArray();
    }

    static bool ArrayArgumentMethod(char[] array)
    {
        return array.Length > 0;
    }

    static int[][] Array2DMethod()
    {
        return new int[][] {
            new int[] { 1, 3, 3, 7 },
            new int[] { 6, 6, 6 },
            new int[] { 4, 2 }
        };
    }

    static bool Array2DArgumentMethod(int[][] array)
    {
        return array.Length > 0 && array[0].Length > 0 && array[1].Length > 0 && array[2].Length > 0;
    }

    class InnerClass
    {
        class InnerInnerClass
        {

        }
    }
}

class PrimitivesTests
{
    static bool BoolMethod()
    {
        return true;
    }

    static bool BoolArgumentMethod(bool b)
    {
        return !b;
    }

    static sbyte SByteMethod()
    {
        unchecked { return (sbyte)0xFF; }
    }

    static sbyte SByteArgumentMethod(sbyte b)
    {
        return (sbyte)(~b);
    }

    static byte ByteMethod()
    {
        return 0xFF;
    }

    static byte ByteArgumentMethod(byte b)
    {
        return (byte)(~b);
    }

    static short ShortMethod()
    {
        unchecked { return (short)0xFFFF; }
    }

    static short ShortArgumentMethod(short s)
    {
        return (short)(~s);
    }

    static ushort UShortMethod()
    {
        return 0xFFFF;
    }

    static ushort UShortArgumentMethod(ushort s)
    {
        return (ushort)(~s);
    }

    static int IntMethod()
    {
        unchecked { return (int)0xFFFFFFFF; }
    }

    static int IntArgumentMethod(int i)
    {
        return ~i;
    }

    static uint UIntMethod()
    {
        return 0xFFFFFFFF;
    }

    static uint UIntArgumentMethod(uint i)
    {
        return ~i;
    }

    static long LongMethod()
    {
        return 0xFFFFFFFFFF;
    }

    static long LongArgumentMethod(long l)
    {
        return ~l;
    }

    static ulong ULongMethod()
    {
        return 0xFFFFFFFFFF;
    }

    static ulong ULongArgumentMethod(ulong l)
    {
        return ~l;
    }

    static float FloatMethod()
    {
        return 3.14f;
    }

    static float FloatArgumentMethod(float f)
    {
        return f * 2;
    }

    static double DoubleMethod()
    {
        return 3.1416;
    }

    static double DoubleArgumentMethod(double d)
    {
        return d * 4;
    }

    static IntPtr IntPtrMethod()
    {
        return (IntPtr)0xdeadbeef;
    }

    static IntPtr IntPtrArgumentMethod(IntPtr p)
    {
        return (IntPtr)(p.ToInt64() & 0xdeadc0de);
    }

    static string StringMethod()
    {
        return "frida-il2cpp-bridge";
    }

    static string StringArgumentMethod(string s)
    {
        return s.ToUpperInvariant();
    }

    static Struct StructMethod()
    {
        return new Struct(42);
    }

    static Struct StructArgumentMethod(Struct s)
    {
        s.a = (byte)(s.a + 1);
        return s;
    }

    static Enum EnumMethod()
    {
        return Enum.Second;
    }

    static Enum EnumArgumentMethod(Enum e)
    {
        return (Enum)((int)e + 1);
    }
}

abstract class AbstractGenericClass<T, U>
{

}

class PartiallyInflatedClass<T> : AbstractGenericClass<T, String>
{

}

class InflatedClass : AbstractGenericClass<String, String>
{

}

struct Struct
{
    public byte a;

    public Struct(byte a)
    {
        this.a = a;
    }
}

struct EmptyStruct
{

}

enum Enum
{
    First,
    Second,
    Third
}

enum LongEnum : ulong
{
    First,
    Second,
    Third
}

enum EmptyEnum
{

}


interface Interface
{

}
