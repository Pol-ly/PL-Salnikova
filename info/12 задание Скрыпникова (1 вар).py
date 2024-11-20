#Блок А, 1
'''import math
x = int(input('Введите натуральное число X: '))
n = int(input('Введите натуральное число N: '))
r = (x ** n) / math.factorial(n)
print(f'Результат вычисления: {r}')'''

#Блок В, 1
def a():
    n = int(input())
    if n == 0:
        return float('-inf')
    b = a()
    return max(n, b)
print(a())
