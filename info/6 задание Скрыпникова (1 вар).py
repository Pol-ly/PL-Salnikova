s = 'Елена посадила красивую ель, и она не пугала мимо проходящих детей своими еловыми иголками'
count = 0
for s1 in s.split(' '):
    if s1.strip()[0] == 'е' or s1.strip()[0] == 'Е':
        count += 1
print(count)
