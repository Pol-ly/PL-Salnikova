#1 задание
'''x = []
N = 10
for i in range(N):
    x.append(input('Введите число: '))
print ('Максимальный элемент: ' + str(max(x)))
print ('Обратный порядок: ' + str(list(reversed(x))))'''

#2 задание
import random as rand
N = int(input('N= '))
if N>0:
    lst = [-5+10*rand.random() for i in range(N)]
    print (lst)
    a = sum(lst)/len(lst)
    for b, c in enumerate(lst):
        if c == 0:
            lst[b] = a
    print(lst)
