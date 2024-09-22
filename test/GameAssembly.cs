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
    static byte ByteMethod()
    {
        return 0x42;
    }

    static byte ByteArgumentMethod(byte b)
    {
        return (byte)(b & 0x42);
    }

    static short ShortMethod()
    {
        return 1337;
    }

    static short ShortArgumentMethod(short s)
    {
        return (short)(s & 0x1337);
    }

    static int IntMethod()
    {
        return 42;
    }

    static int IntArgumentMethod(int i)
    {
        return i & 0x42;
    }

    static long LongMethod()
    {
        return 1337;
    }

    static long LongArgumentMethod(long l)
    {
        return l & 0x1337;
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