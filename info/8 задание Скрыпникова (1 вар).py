#1
'''import math
def x(f, *args):
    if f == 'круг':
        r = args[0]
        return math.pi*r**2
    elif f == 'прямоугольник':
        a, b = args
        return a*b
    elif f == 'треугольник':
        a, b, c = args
        p = (a+b+c)/2
        return math.sqrt(p*(p-a)*(p-b)*(p-c))
    else:
        return 'Неизвестная фигура'
f = input('Введите название фигуры (круг, прямоугольник, треугольник): ')
if f == 'круг':
    r = float(input('Введите радиус круга: '))
    print('Площадь круга: ', x(f, r))
elif f == 'прямоугольник':
    a = float(input('Введите длину прямоугольника: '))
    b = float(input('Введите ширину прямоугольника: '))
    print('Площадь прямоугольника: ', x(f, a, b))
elif f == 'треугольник':
    a = float(input('Введите длину стороны a треугольника: '))
    b = float(input('Введите длину стороны b треугольника: '))
    c = float(input('Введите длину стороны c треугольника: '))
    print('Площадь треугольника: ', x(f, a, b, c))
else:
    print('Неизвестная фигура')'''

#2
def a(x):
    b = sum(x)
    c = b / len(x) if len(x) > 0 else 0
    return b, c
x1 = [1, 2, 3, 4, 5]
x2 = [6, 7, 8, 9, 10]
x3 = [11, 12, 13, 14, 15]
for i, x in enumerate([x1, x2, x3], start=1):
    b, c = a(x)
    print(f"Массив {i}: Сумма = {b}, Среднее арифметическое = {c:.2f}")
