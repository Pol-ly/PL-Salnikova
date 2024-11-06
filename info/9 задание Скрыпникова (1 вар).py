#1
'''import random
def x(y):
    a = 0
    b = 0
    N = len(y)
    for i in range(N):
        for j in range(i + 1, N):
            if y[i][j] > 0:
                a += y[i][j]
                b += 1
    return a, b
N1 = 4
y = [[random.randint(-10, 10) for _ in range(N1)] for _ in range(N1)]
print("Матрица A: ")
for z in y:
    print(z)
a, b = x(y)
print(f"Сумма положительных элементов над главной диагональю: {a}")
print(f"Количество положительных элементов над главной диагональю: {b}")'''

#2
import random
def x(y):
    for z in y:
        a = z.index(min(z))
        b = z.index(max(z))
        z[0], z[a] = z[a], z[0]
        z[-1], z[b] = z[b], z[-1]
    return y
N = 4
M = 5
y = [[random.randint(1, 20) for _ in range(M)] for _ in range(N)]
print('Исходная матрица B: ')
for z in y:
    print(z)
y1 = x(y)
print('\nИзмененная матрица B: ')
for z in y1:
    print(z)
