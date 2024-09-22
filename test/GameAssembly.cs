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